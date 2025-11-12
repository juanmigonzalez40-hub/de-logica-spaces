import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, sector, city, premises, message }: ProjectEmailRequest = await req.json();

    console.log("Enviando email de proyecto para:", name, "- Sector:", sector);

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
      from: "De Lógica Proyectos <onboarding@resend.dev>",
      to: ["jm.gonzalez@de-logica.com"],
      subject: `📋 Nueva solicitud de proyecto - ${sector} - ${name}`,
      html: emailHtml,
      reply_to: email,
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
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
