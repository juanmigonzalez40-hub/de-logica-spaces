import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  business_type?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, business_type, message }: ContactEmailRequest = await req.json();

    console.log("Enviando email de contacto para:", name);

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
      reply_to: email,
    });

    console.log("Email enviado exitosamente:", emailResponse);

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
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
