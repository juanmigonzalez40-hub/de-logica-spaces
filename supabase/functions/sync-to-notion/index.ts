import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper to extract clean domain from email address
function extractDomain(email: string): string | null {
  if (!email) return null;
  const parts = email.split("@");
  if (parts.length < 2) return null;
  const domain = parts[1].toLowerCase().trim();
  
  const publicDomains = [
    "gmail.com", "hotmail.com", "yahoo.com", "yahoo.es", "live.com", 
    "outlook.com", "outlook.es", "icloud.com", "aol.com", "msn.com", 
    "zoho.com", "protonmail.com", "yandex.com", "mail.com", "ymail.com"
  ];
  
  if (publicDomains.includes(domain)) {
    return null;
  }
  return domain;
}

// Helper to format values for Notion properties based on their database schema type
function formatProperty(type: string | null, value: any) {
  if (!type || value === undefined || value === null) return undefined;
  
  switch (type) {
    case "title":
      return {
        title: [
          {
            text: {
              content: String(value),
            },
          },
        ],
      };
    case "rich_text":
      return {
        rich_text: [
          {
            text: {
              content: String(value),
            },
          },
        ],
      };
    case "email":
      return {
        email: String(value).trim().toLowerCase(),
      };
    case "phone_number":
      return {
        phone_number: String(value).trim(),
      };
    case "url":
      return {
        url: String(value).trim(),
      };
    case "select":
      return {
        select: {
          name: String(value),
        },
      };
    case "multi_select":
      const items = Array.isArray(value) ? value : [value];
      return {
        multi_select: items.map(item => ({ name: String(item) })),
      };
    case "number":
      const num = Number(value);
      return isNaN(num) ? undefined : { number: num };
    case "date":
      return {
        date: {
          start: String(value),
        },
      };
    case "relation":
      const ids = Array.isArray(value) ? value : [value];
      return {
        relation: ids.map(id => ({ id })),
      };
    case "status":
      return {
        status: {
          name: String(value),
        },
      };
    default:
      return undefined;
  }
}

// Helper for Notion REST API GET request
async function getNotionDatabase(dbId: string, token: string) {
  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error retrieving Notion DB (${dbId}): ${res.status} ${err}`);
  }
  return await res.json();
}

// Helper for Notion REST API query request
async function queryNotionDatabase(dbId: string, filter: any, token: string) {
  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filter }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error querying Notion DB (${dbId}): ${res.status} ${err}`);
  }
  return await res.json();
}

// Helper for Notion REST API create page request
async function createNotionPage(dbId: string, properties: any, token: string) {
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error creating Notion page in DB (${dbId}): ${res.status} ${err}`);
  }
  return await res.json();
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // 1. Initialize Clients
  const notionToken = Deno.env.get("NOTION_INTEGRATION_TOKEN");
  const companiesDbId = Deno.env.get("NOTION_DATABASE_COMPANIES_ID");
  const opportunitiesDbId = Deno.env.get("NOTION_DATABASE_OPPORTUNITIES_ID");
  const activitiesDbId = Deno.env.get("NOTION_DATABASE_ACTIVITIES_ID");

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  if (!notionToken || !companiesDbId || !opportunitiesDbId || !activitiesDbId) {
    console.error("Missing critical environment variables for Notion integration.");
    return new Response(
      JSON.stringify({ success: false, error: "Notion configuration is missing on server secrets." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  let submissionId: string | null = null;

  try {
    const payload = await req.json();
    console.log("Received Database Webhook payload:", JSON.stringify(payload));

    // Ensure we only process INSERT events to avoid webhook loops
    if (payload.type !== "INSERT" && payload.event !== "INSERT") {
      console.log(`Skipping non-INSERT event type: ${payload.type || payload.event}`);
      return new Response(JSON.stringify({ success: true, message: "Skipped non-INSERT event" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const record = payload.record;
    if (!record) {
      throw new Error("No record found in the webhook payload");
    }

    submissionId = record.id;
    const { name, company, email, phone, cif, city, sectors, message, budget, notes, created_at } = record;

    console.log(`Processing lead sync for submission ID: ${submissionId} (Email: ${email})`);

    // 2. Fetch database schemas once using raw fetch
    console.log("Retrieving Notion database schemas...");
    const [companiesDb, opportunitiesDb, activitiesDb] = await Promise.all([
      getNotionDatabase(companiesDbId, notionToken),
      getNotionDatabase(opportunitiesDbId, notionToken),
      getNotionDatabase(activitiesDbId, notionToken),
    ]);

    // 3. Search and Deduplicate Empresa
    let companyPageId: string | null = null;

    // A. Priority 1: Search by CIF
    if (cif && cif !== "N/A" && cif !== "") {
      const normalizedCif = cif.toUpperCase().replace(/\s+/g, "");
      console.log(`Search Step 1: Querying company by CIF: ${normalizedCif}`);
      const filter = {
        property: "CIF",
        rich_text: {
          equals: normalizedCif,
        },
      };
      const response = await queryNotionDatabase(companiesDbId, filter, notionToken);
      if (response.results && response.results.length > 0) {
        companyPageId = response.results[0].id;
        console.log("Company matched by CIF:", companyPageId);
      }
    }

    // B. Priority 2: Search by Web Domain
    if (!companyPageId && email) {
      const domain = extractDomain(email);
      if (domain) {
        console.log(`Search Step 2: Querying company by Web Domain containing: ${domain}`);
        const filter = {
          property: "Web",
          url: {
            contains: domain,
          },
        };
        const response = await queryNotionDatabase(companiesDbId, filter, notionToken);
        if (response.results && response.results.length > 0) {
          companyPageId = response.results[0].id;
          console.log("Company matched by Web Domain:", companyPageId);
        }
      }
    }

    // C. Priority 3: Search by Email Corporativo
    if (!companyPageId && email) {
      console.log(`Search Step 3: Querying company by Email corporativo: ${email}`);
      const filter = {
        property: "Email corporativo",
        email: {
          equals: email.trim().toLowerCase(),
        },
      };
      const response = await queryNotionDatabase(companiesDbId, filter, notionToken);
      if (response.results && response.results.length > 0) {
        companyPageId = response.results[0].id;
        console.log("Company matched by Email corporativo:", companyPageId);
      }
    }

    // 4. Create Empresa if not exists
    if (!companyPageId) {
      console.log("Company not found in CRM. Creating new Empresa page...");
      const companyProps: any = {};
      
      const compTitleKey = Object.keys(companiesDb.properties).find(
        key => companiesDb.properties[key].type === "title"
      ) || "Nombre empresa";

      companyProps[compTitleKey] = formatProperty("title", company || name || "Empresa Sin Nombre");

      const fieldsMapping = [
        { key: "CIF", value: cif ? cif.toUpperCase().replace(/\s+/g, "") : null },
        { key: "Email corporativo", value: email },
        { key: "Teléfono principal", value: phone },
        { key: "Ciudad", value: city },
        { key: "País", value: "España" },
        { key: "Estado de cliente", value: "Lead" },
      ];

      for (const field of fieldsMapping) {
        const type = companiesDb.properties[field.key]?.type;
        if (type && field.value) {
          companyProps[field.key] = formatProperty(type, field.value);
        }
      }

      // Handle extracted Web domain URL
      const domain = extractDomain(email);
      const webType = companiesDb.properties["Web"]?.type;
      if (webType && domain) {
        companyProps["Web"] = formatProperty(webType, `https://${domain}`);
      }

      // Handle Sectors (multi_select)
      const sectorType = companiesDb.properties["Sector"]?.type;
      if (sectorType && sectors && sectors.length > 0) {
        companyProps["Sector"] = formatProperty(sectorType, sectors);
      }

      // Handle Facturación estimada from budget array
      const budgetType = companiesDb.properties["Facturación estimada"]?.type;
      if (budgetType && budget && budget.length > 0) {
        companyProps["Facturación estimada"] = formatProperty(budgetType, budget[0]);
      }

      // Handle Número de sedes from notes centers extraction
      const sedesType = companiesDb.properties["Número de sedes"]?.type;
      if (sedesType && notes) {
        const centersMatch = notes.match(/Número de centros:\s*(.+)/i);
        if (centersMatch && centersMatch[1]) {
          companyProps["Número de sedes"] = formatProperty(sedesType, centersMatch[1].trim());
        }
      }

      const newCompany = await createNotionPage(companiesDbId, companyProps, notionToken);
      companyPageId = newCompany.id;
      console.log(`New Empresa page created with ID: ${companyPageId}`);
    }

    // 5. Create Oportunidad Comercial
    console.log("Creating Oportunidad Comercial page...");
    const oppProps: any = {};

    const oppTitleKey = Object.keys(opportunitiesDb.properties).find(
      key => opportunitiesDb.properties[key].type === "title"
    ) || "Nombre";

    oppProps[oppTitleKey] = formatProperty("title", `Proyecto: ${company || name} - ${new Date().toLocaleDateString('es-ES')}`);

    const oppFields = [
      { key: "Empresa", value: companyPageId, typeOverride: "relation" },
      { key: "Procedencia", value: "Landing A" },
      { key: "Campaña", value: "Implantación Comercial" },
      { key: "Estado comercial", value: "Lead recibido" },
      { key: "Valor estimado", value: null },
      { key: "Fecha entrada", value: created_at ? new Date(created_at).toISOString() : new Date().toISOString(), typeOverride: "date" },
      { key: "Contacto", value: name },
      { key: "Email", value: email },
      { key: "Teléfono", value: phone },
    ];

    for (const field of oppFields) {
      const type = field.typeOverride ?? opportunitiesDb.properties[field.key]?.type;
      if (type) {
        oppProps[field.key] = formatProperty(type, field.value);
      }
    }

    const newOpp = await createNotionPage(opportunitiesDbId, oppProps, notionToken);
    const opportunityPageId = newOpp.id;
    console.log(`New Oportunidad page created with ID: ${opportunityPageId}`);

    // 6. Create Actividad Comercial
    console.log("Creating Actividad Comercial page...");
    const actProps: any = {};

    const actTitleKey = Object.keys(activitiesDb.properties).find(
      key => activitiesDb.properties[key].type === "title"
    ) || "Actividad";

    actProps[actTitleKey] = formatProperty("title", `Formulario Web - ${name}`);

    // Format rich text notes details
    const notesContent = `
=== DATOS DEL FORMULARIO ===
Contacto: ${name}
Empresa: ${company || 'N/A'}
CIF: ${cif || 'N/A'}
Email: ${email}
Teléfono: ${phone}
Ciudad: ${city || 'N/A'}
Tipo de proyecto: ${sectors ? sectors.join(', ') : 'N/A'}
Mensaje: ${message}

=== DETALLES ADICIONALES ===
${notes || 'Ninguno'}
`;

    const actFields = [
      { key: "Tipo actividad", value: "Formulario Web" },
      { key: "Fecha", value: new Date().toISOString(), typeOverride: "date" },
      { key: "Resultado", value: "Interesado" },
      { key: "Notas", value: notesContent.trim() },
      { key: "Oportunidad", value: opportunityPageId, typeOverride: "relation" },
      { key: "Empresa", value: companyPageId, typeOverride: "relation" },
      { key: "Responsable", value: null },
    ];

    for (const field of actFields) {
      const type = field.typeOverride ?? activitiesDb.properties[field.key]?.type;
      if (type) {
        actProps[field.key] = formatProperty(type, field.value);
      }
    }

    await createNotionPage(activitiesDbId, actProps, notionToken);
    console.log("New Actividad page created successfully in Notion.");

    // 7. Update status to synced in Supabase
    if (submissionId) {
      console.log(`Updating submission ${submissionId} status to synced in Supabase...`);
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .update({
          notion_sync_status: "synced",
          notion_sync_error: null,
        })
        .eq("id", submissionId);
      
      if (dbError) throw dbError;
    }

    return new Response(JSON.stringify({ success: true, message: "Lead synced to Notion successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Sync error occurred in sync-to-notion Edge Function:", error);

    // 8. Update status to failed and store the error message in Supabase
    if (submissionId) {
      try {
        console.log(`Updating submission ${submissionId} status to failed in Supabase...`);
        await supabase
          .from("contact_submissions")
          .update({
            notion_sync_status: "failed",
            notion_sync_error: error.message || String(error),
          })
          .eq("id", submissionId);
      } catch (updateDbError) {
        console.error("Failed to update sync error in contact_submissions table:", updateDbError);
      }
    }

    return new Response(
      JSON.stringify({ success: false, error: error.message || "An internal error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
