import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface ProjectEmailRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  sector: string;
  city: string;
  premises: string;
  message?: string;
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

  try {
    const raw: ProjectEmailRequest = await req.json();

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
    if (!raw.sector || typeof raw.sector !== 'string' || raw.sector.trim().length === 0 || raw.sector.length > 200) {
      return new Response(JSON.stringify({ success: false, error: "Invalid sector" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (!raw.city || typeof raw.city !== 'string' || raw.city.trim().length === 0 || raw.city.length > 200) {
      return new Response(JSON.stringify({ success: false, error: "Invalid city" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (!raw.premises || typeof raw.premises !== 'string' || !['nuevo', 'reforma'].includes(raw.premises)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid premises" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (raw.company && (typeof raw.company !== 'string' || raw.company.length > 200)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid company" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (raw.message && (typeof raw.message !== 'string' || raw.message.length > 5000)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid message" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    const name = escapeHtml(raw.name.trim());
    const email = escapeHtml(raw.email.trim());
    const phone = escapeHtml(raw.phone.trim());
    const company = raw.company ? escapeHtml(raw.company.trim()) : undefined;
    const sector = escapeHtml(raw.sector.trim());
    const city = escapeHtml(raw.city.trim());
    const premises = raw.premises;
    const message = raw.message ? escapeHtml(raw.message.trim()) : undefined;

    console.log("Enviando email de proyecto para:", raw.name, "- Sector:", raw.sector);

    const premisesText = premises === "nuevo" ? "Local nuevo" : "Reforma de local existente";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .sector-badge { display: inline-block; background: rgba(255, 255, 255, 0.2); padding: 8px 16px; border-radius: 20px; margin-top: 10px; font-size: 14px; }
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
              <h1>📋 Nueva Solicitud de Proyecto</h1>
              <div class="sector-badge">${sector}</div>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 25px;">Has recibido una nueva solicitud de información de proyecto:</p>
              
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

              <div class="field">
                <div class="field-label">🏷️ Sector:</div>
                <div class="field-value">${sector}</div>
              </div>

              <div class="field">
                <div class="field-label">📍 Ciudad:</div>
                <div class="field-value">${city}</div>
              </div>

              <div class="field">
                <div class="field-label">🏪 Tipo de Local:</div>
                <div class="field-value">${premisesText}</div>
              </div>

              ${message ? `
              <div class="field">
                <div class="field-label">💬 Detalles del Proyecto:</div>
                <div class="field-value">${message}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="field-label">🕐 Fecha y Hora:</div>
                <div class="field-value">${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}</div>
              </div>

              <div class="footer">
                <p><strong>De Lógica</strong> - Sistema de Notificaciones de Proyectos</p>
                <p style="font-size: 12px;">Este mensaje fue enviado automáticamente desde el formulario de registro de proyectos.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "De Lógica Proyectos <noreply@de-logica.com>",
      to: ["jm.gonzalez@de-logica.com"],
      subject: `📋 Nueva solicitud de proyecto - ${sector} - ${name}`,
      html: emailHtml,
      reply_to: raw.email,
    });

    console.log("Email de proyecto enviado exitosamente:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error al enviar email de proyecto:", error);
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
