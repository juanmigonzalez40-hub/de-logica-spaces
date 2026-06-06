import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

function formatProperty(type: string | null, value: any) {
  if (!type || value === undefined || value === null) return undefined;

  switch (type) {
    case "title":
      return { title: [{ text: { content: String(value) } }] };
    case "rich_text":
      return { rich_text: [{ text: { content: String(value) } }] };
    case "email":
      return { email: String(value).trim().toLowerCase() };
    case "phone_number":
      return { phone_number: String(value).trim() };
    case "url":
      return { url: String(value).trim() };
    case "select":
      return { select: { name: String(value) } };
    case "multi_select":
      const items = Array.isArray(value) ? value : [value];
      return { multi_select: items.map(item => ({ name: String(item) })) };
    case "number":
      const num = Number(value);
      return isNaN(num) ? undefined : { number: num };
    case "date":
      return { date: { start: String(value) } };
    case "relation":
      const ids = Array.isArray(value) ? value : [value];
      return { relation: ids.map(id => ({ id })) };
    case "status":
      return { status: { name: String(value) } };
    default:
      return undefined;
  }
}

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

async function updateNotionPage(pageId: string, properties: any, token: string) {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error updating Notion page (${pageId}): ${res.status} ${err}`);
  }
  return await res.json();
}

serve(async (req: Request) => {
  console.log("SYNC_TO_NOTION_VERSION_D9CC5A8");
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

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

    if (payload.type !== "INSERT" && payload.event !== "INSERT") {
      return new Response(JSON.stringify({ success: true, message: "Skipped non-INSERT event" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const record = payload.record;
    if (!record) {
      throw new Error("No record found in the webhook payload");
    }

    console.log("DEBUG_WEBHOOK_RECORD", JSON.stringify(record, null, 2));

    submissionId = record.id;
    const { 
      name, company, email, phone, cif, city, sectors, message, budget, notes, created_at, source,
      cargo, project_types, presupuesto_estimado, num_centros, aperturas_previstas, plazo_previsto 
    } = record;

    console.log(`Processing lead sync for submission ID: ${submissionId}`);
    console.log("DEBUG_COMPANY_RECORD", JSON.stringify(record, null, 2));

    const [companiesDb, opportunitiesDb, activitiesDb] = await Promise.all([
      getNotionDatabase(companiesDbId, notionToken),
      getNotionDatabase(opportunitiesDbId, notionToken),
      getNotionDatabase(activitiesDbId, notionToken),
    ]);

    let companyPageId: string | null = null;

    if (cif && cif !== "N/A" && cif !== "") {
      const normalizedCif = cif.toUpperCase().replace(/\s+/g, "");
      const filter = {
        property: "CIF",
        rich_text: { equals: normalizedCif },
      };
      console.log("DEBUG_COMPANY_MATCH_CIF", JSON.stringify(filter, null, 2));
      const response = await queryNotionDatabase(companiesDbId, filter, notionToken);
      if (response.results && response.results.length > 0) {
        companyPageId = response.results[0].id;
        console.log("Empresa encontrada por CIF.");
      }
    }

    if (!companyPageId && email) {
      const domain = extractDomain(email);
      if (domain) {
        const filter = {
          property: "Web",
          url: { contains: domain },
        };
        console.log("DEBUG_COMPANY_MATCH_DOMAIN", JSON.stringify(filter, null, 2));
        const response = await queryNotionDatabase(companiesDbId, filter, notionToken);
        if (response.results && response.results.length > 0) {
          companyPageId = response.results[0].id;
          console.log("Empresa encontrada por dominio.");
        }
      }
    }

    if (!companyPageId && email) {
      const filter = {
        property: "Email corporativo",
        email: { equals: email.trim().toLowerCase() },
      };
      console.log("DEBUG_COMPANY_MATCH_EMAIL", JSON.stringify(filter, null, 2));
      const response = await queryNotionDatabase(companiesDbId, filter, notionToken);
      if (response.results && response.results.length > 0) {
        companyPageId = response.results[0].id;
        console.log("Empresa encontrada por email.");
      }
    }

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
      { key: "Estado de cliente", value: "Lead recibido" },
    ];

    for (const field of fieldsMapping) {
      const type = companiesDb.properties[field.key]?.type;
      if (type && field.value) {
        companyProps[field.key] = formatProperty(type, field.value);
      }
    }

    const domain = extractDomain(email);
    const webType = companiesDb.properties["Web"]?.type;
    if (webType && domain) {
      companyProps["Web"] = formatProperty(webType, `https://${domain}`);
    }

    const sectorType = companiesDb.properties["Sector"]?.type;
    const combinedSectors = [];
    if (sectors && Array.isArray(sectors)) combinedSectors.push(...sectors);
    
    if (project_types && Array.isArray(project_types)) {
      const PROJECT_TYPES_MAP: Record<string, string> = {
        "implantacion_integral": "Implantación integral",
        "mobiliario_comercial": "Mobiliario a medida",
        "rotulation_corporativa": "Rotulación corporativa",
        "rotulacion_corporativa": "Rotulación corporativa",
        "produccion_grafica": "Producción gráfica",
        "renovacion_restyling": "Renovación / Restyling"
      };
      for (const pt of project_types) {
        combinedSectors.push(PROJECT_TYPES_MAP[pt] || pt);
      }
    }
    
    if (sectorType && combinedSectors.length > 0) {
      const uniqueSectors = [...new Set(combinedSectors)];
      companyProps["Sector"] = formatProperty(sectorType, uniqueSectors);
    }

    const budgetType = companiesDb.properties["Facturación estimada"]?.type;
    const budgetValue = (budget && budget.length > 0) ? budget[0] : (presupuesto_estimado || null);
    if (budgetType && budgetValue) {
      companyProps["Facturación estimada"] = formatProperty(budgetType, budgetValue);
    }

    const sedesType = companiesDb.properties["Número de sedes"]?.type;
    if (sedesType) {
      if (num_centros) {
        companyProps["Número de sedes"] = formatProperty(sedesType, num_centros);
      } else if (notes) {
        const centersMatch = notes.match(/Número de centros:\s*(.+)/i);
        if (centersMatch && centersMatch[1]) {
          companyProps["Número de sedes"] = formatProperty(sedesType, centersMatch[1].trim());
        }
      }
    }

    console.log("DEBUG_COMPANY_PROPS", JSON.stringify(companyProps, null, 2));

    if (!companyPageId) {
      console.log("Empresa creada nueva.");
      console.log("PAYLOAD_EMPRESA", JSON.stringify(companyProps, null, 2));
      const newCompany = await createNotionPage(companiesDbId, companyProps, notionToken);
      console.log("RESPUESTA_NOTION_EMPRESA", JSON.stringify(newCompany, null, 2));
      companyPageId = newCompany.id;
    } else {
      console.log("Empresa actualizada.");
      console.log("PAYLOAD_EMPRESA", JSON.stringify(companyProps, null, 2));
      const updatedCompany = await updateNotionPage(companyPageId, companyProps, notionToken);
      console.log("RESPUESTA_NOTION_EMPRESA", JSON.stringify(updatedCompany, null, 2));
    }

    const oppProps: any = {};
    const oppTitleKey = Object.keys(opportunitiesDb.properties).find(
      key => opportunitiesDb.properties[key].type === "title"
    ) || "Nombre";

    oppProps[oppTitleKey] = formatProperty("title", `Proyecto: ${company || name} - ${new Date().toLocaleDateString('es-ES')}`);

    const oppFields = [
      { key: "Empresa", value: companyPageId, typeOverride: "relation" },
      { key: "Procedencia", value: source },
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

    // MAP NEW FIELDS WITH HISTORICAL FALLBACK
    if (cargo) {
      oppProps["Cargo"] = formatProperty("rich_text", cargo);
    } else if (notes) {
      const cargoMatch = notes.match(/Cargo:\s*(.+)/i);
      if (cargoMatch && cargoMatch[1]) {
        oppProps["Cargo"] = formatProperty("rich_text", cargoMatch[1].trim());
      }
    }

    console.log("DEBUG_PROJECT_TYPES", JSON.stringify(project_types, null, 2));

    if (project_types && project_types.length > 0) {
      const PROJECT_TYPES_MAP: Record<string, string> = {
        "implantacion_integral": "Implantación integral",
        "mobiliario_comercial": "Mobiliario a medida",
        "rotulation_corporativa": "Rotulación corporativa",
        "rotulacion_corporativa": "Rotulación corporativa",
        "produccion_grafica": "Producción gráfica",
        "renovacion_restyling": "Renovación / Restyling"
      };
      const mappedTypes = project_types.map((pt: string) => PROJECT_TYPES_MAP[pt] || pt);
      oppProps["Tipo de proyecto"] = formatProperty("multi_select", mappedTypes);
    }

    if (aperturas_previstas) {
      oppProps["Aperturas previstas"] = formatProperty("select", aperturas_previstas);
    } else if (notes) {
      const apMatch = notes.match(/Aperturas previstas:\s*(.+)/i);
      if (apMatch && apMatch[1]) {
        oppProps["Aperturas previstas"] = formatProperty("select", apMatch[1].trim());
      }
    }

    if (plazo_previsto) {
      oppProps["Plazo previsto"] = formatProperty("select", plazo_previsto);
    } else if (notes) {
      const plazoMatch = notes.match(/Plazo previsto:\s*(.+)/i);
      if (plazoMatch && plazoMatch[1]) {
        oppProps["Plazo previsto"] = formatProperty("select", plazoMatch[1].trim());
      }
    }

    if (presupuesto_estimado) {
       const parsed = parseInt(presupuesto_estimado.split('-')[0].replace(/\D/g, ''), 10);
       if (!isNaN(parsed)) oppProps["Valor estimado"] = formatProperty("number", parsed);
    } else if (notes) {
       const invMatch = notes.match(/Inversión estimada:\s*(.+)/i);
       if (invMatch && invMatch[1]) {
         const parsed = parseInt(invMatch[1].split('-')[0].replace(/\D/g, ''), 10);
         if (!isNaN(parsed)) oppProps["Valor estimado"] = formatProperty("number", parsed);
       }
    }

    console.log("CREANDO OPORTUNIDAD");
    console.log("PAYLOAD_OPORTUNIDAD", JSON.stringify(oppProps, null, 2));
    const newOpp = await createNotionPage(opportunitiesDbId, oppProps, notionToken);
    console.log("OPORTUNIDAD CREADA");
    const opportunityPageId = newOpp.id;

    const actProps: any = {};
    const actTitleKey = Object.keys(activitiesDb.properties).find(
      key => activitiesDb.properties[key].type === "title"
    ) || "Actividad";

    actProps[actTitleKey] = formatProperty("title", `Formulario Web - ${name}`);

    let notesContent = "";
    if (source === "Landing A" || source === "Web Principal") {
      notesContent = `
=== DATOS DEL FORMULARIO ===
Contacto: ${name}
Empresa: ${company || 'N/A'}
CIF: ${cif || 'N/A'}
Email: ${email}
Teléfono: ${phone}
Ciudad: ${city || 'N/A'}
Tipo de proyecto: ${project_types ? project_types.join(', ') : (sectors ? sectors.join(', ') : 'N/A')}
Mensaje: ${message}

=== DETALLES ESTRUCTURADOS ===
Cargo: ${cargo || 'N/A'}
Número de centros: ${num_centros || 'N/A'}
Aperturas previstas: ${aperturas_previstas || 'N/A'}
Presupuesto estimado: ${presupuesto_estimado || 'N/A'}
Plazo previsto: ${plazo_previsto || 'N/A'}

=== NOTAS ADICIONALES ===
${notes || 'Ninguna'}
`;
    } else {
      notesContent = `
=== DATOS DEL FORMULARIO ===
Contacto: ${name}
Empresa: ${company || 'N/A'}
CIF: ${cif || 'N/A'}
Email: ${email}
Teléfono: ${phone}
Ciudad: ${city || 'N/A'}
Tipo de proyecto / Sectores: ${sectors ? sectors.join(', ') : 'N/A'}
Mensaje: ${message}

=== DETALLES ADICIONALES ===
${notes || 'Ninguno'}
`;
    }

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

    console.log("CREANDO ACTIVIDAD");
    await createNotionPage(activitiesDbId, actProps, notionToken);
    console.log("ACTIVIDAD CREADA");

    if (submissionId) {
      await supabase
        .from("contact_submissions")
        .update({
          notion_sync_status: "synced",
          notion_sync_error: null,
        })
        .eq("id", submissionId);
    }

    return new Response(JSON.stringify({ success: true, message: "Lead synced to Notion successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Sync error:", error);
    if (submissionId) {
      try {
        await supabase
          .from("contact_submissions")
          .update({
            notion_sync_status: "failed",
            notion_sync_error: error.message || String(error),
          })
          .eq("id", submissionId);
      } catch (updateDbError) {
        console.error("Failed to update status:", updateDbError);
      }
    }

    return new Response(
      JSON.stringify({ success: false, error: error.message || "An internal error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
