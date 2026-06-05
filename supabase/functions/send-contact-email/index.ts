import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting: max 5 requests per IP per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  business_type?: string;
  message: string;
  event_id?: string;
  fbp?: string;
  fbc?: string;
  userAgent?: string;
  sourceUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), {
      status: 405, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // Rate limiting
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ success: false, error: "Too many requests. Please try again later." }), {
      status: 429, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const raw: ContactEmailRequest = await req.json();

    // Input validation
    if (!raw.name || typeof raw.name !== 'string' || raw.name.trim().length === 0 || raw.name.length > 200) {
      return new Response(JSON.stringify({ success: false, error: "Invalid name" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (!raw.email || typeof raw.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.email) || raw.email.length > 255) {
      return new Response(JSON.stringify({ success: false, error: "Invalid email" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (!raw.phone || typeof raw.phone !== 'string' || raw.phone.trim().length === 0 || raw.phone.length > 30) {
      return new Response(JSON.stringify({ success: false, error: "Invalid phone" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (!raw.message || typeof raw.message !== 'string' || raw.message.trim().length === 0 || raw.message.length > 5000) {
      return new Response(JSON.stringify({ success: false, error: "Invalid message" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (raw.company && (typeof raw.company !== 'string' || raw.company.length > 200)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid company" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (raw.business_type && (typeof raw.business_type !== 'string' || raw.business_type.length > 200)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid business type" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    const name = escapeHtml(raw.name.trim());
    const email = escapeHtml(raw.email.trim());
    const phone = escapeHtml(raw.phone.trim());
    const company = raw.company ? escapeHtml(raw.company.trim()) : undefined;
    const business_type = raw.business_type ? escapeHtml(raw.business_type.trim()) : undefined;
    const message = escapeHtml(raw.message.trim());

    console.log("Enviando email de contacto para:", raw.name);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .field-label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
            .field-value { background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #667eea; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 Nuevo Contacto - De Lógica</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 25px;">Has recibido un nuevo mensaje desde el formulario de contacto:</p>
              
              <div class="field">
                <div class="field-label">👤 Nombre:</div>
                <div class="field-value">${name}</div>
              </div>

              ${company ? `
              <div class="field">
                <div class="field-label">🏢 Empresa:</div>
                <div class="field-value">${company}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="field-label">📧 Email:</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></div>
              </div>

              <div class="field">
                <div class="field-label">📱 Teléfono:</div>
                <div class="field-value"><a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a></div>
              </div>

              ${business_type ? `
              <div class="field">
                <div class="field-label">🏪 Tipo de Negocio:</div>
                <div class="field-value">${business_type}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="field-label">💬 Mensaje:</div>
                <div class="field-value">${message}</div>
              </div>

              <div class="field">
                <div class="field-label">🕐 Fecha y Hora:</div>
                <div class="field-value">${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}</div>
              </div>

              <div class="footer">
                <p><strong>De Lógica</strong> - Sistema de Notificaciones</p>
                <p style="font-size: 12px;">Este mensaje fue enviado automáticamente desde el formulario de contacto web.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "De Lógica <noreply@de-logica.com>",
      to: ["jm.gonzalez@de-logica.com"],
      subject: `🔔 Nuevo contacto desde De Lógica - ${name}`,
      html: emailHtml,
      reply_to: raw.email,
    });

    console.log("Email enviado exitosamente:", emailResponse);

    // =========================================================================
    // META CONVERSIONS API (CAPI) INTEGRATION
    // =========================================================================
    const META_PIXEL_ID = Deno.env.get("META_PIXEL_ID");
    const META_ACCESS_TOKEN = Deno.env.get("META_ACCESS_TOKEN");

    if (raw.event_id) {
      if (META_PIXEL_ID && META_ACCESS_TOKEN) {
        try {
          const hashedEmail = await sha256(raw.email);
          
          // Limpiar y formatear teléfono (ej: +34 600 000 000 -> 34600000000)
          const cleanedPhone = raw.phone.replace(/\D/g, '');
          // Si tiene 9 dígitos y empieza por 6/7/8/9, asumimos código de país de España (34)
          const formattedPhone = (cleanedPhone.length === 9 && /^[6789]/.test(cleanedPhone))
            ? '34' + cleanedPhone
            : cleanedPhone;
          const hashedPhone = await sha256(formattedPhone);

          const capiPayload = {
            data: [
              {
                event_name: "Lead",
                event_time: Math.floor(Date.now() / 1000),
                event_id: raw.event_id,
                event_source_url: raw.sourceUrl || "https://de-logica.com/",
                action_source: "website",
                user_data: {
                  em: [hashedEmail],
                  ph: [hashedPhone],
                  client_ip_address: clientIp,
                  client_user_agent: raw.userAgent || req.headers.get("user-agent") || "",
                  fbp: raw.fbp || undefined,
                  fbc: raw.fbc || undefined,
                },
              },
            ],
          };

          console.log(`[CAPI] Enviando evento Lead a Meta CAPI con event_id: ${raw.event_id}`);
          
          const capiResponse = await fetch(
            `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(capiPayload),
            }
          );

          const capiResult = await capiResponse.json();
          if (!capiResponse.ok) {
            console.error("[CAPI] Error en respuesta de Meta CAPI:", capiResult);
          } else {
            console.log("[CAPI] Evento enviado exitosamente a Meta CAPI:", capiResult);
          }
        } catch (capiError) {
          console.error("[CAPI] Excepción al enviar evento a Meta CAPI:", capiError);
        }
      } else {
        console.warn("[CAPI] Warning: Faltan las variables de entorno META_PIXEL_ID o META_ACCESS_TOKEN en Supabase. El envío a Meta CAPI ha sido omitido.");
      }
    }

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error al enviar email de contacto:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An internal error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
