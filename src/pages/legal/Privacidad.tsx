const Privacidad = () => {
  return (
    <main className="pt-24">
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Política de Privacidad</h1>

          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Responsable del tratamiento</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Responsable:</strong> De Lógica Soluciones de Marketing S.L.</li>
                <li><strong>NIF:</strong> B83916833</li>
                <li><strong>Domicilio:</strong> Camino de Hormigueras 124, Nave 4G, 28031 Madrid (España)</li>
                <li><strong>Email:</strong> info@de-logica.com</li>
                <li><strong>Teléfono:</strong> +34 910 742 187</li>
              </ul>
              <p className="mt-4">
                <strong>Delegado de Protección de Datos (DPD/DPO):</strong> No se ha designado DPD/DPO.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Datos tratados y procedencia</h2>
              <p>
                Tratamos los datos que nos facilitas directamente a través de formularios, correo
                electrónico o teléfono, típicamente: nombre y apellidos, empresa, email, teléfono,
                ciudad, y la información incluida en el mensaje/solicitud.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Finalidades del tratamiento</h2>
              <p>Tratamos tus datos para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>a) Formulario de contacto / solicitud de información:</strong> gestionar
                  tu solicitud y responder a tus consultas.
                </li>
                <li>
                  <strong>b) Solicitudes de proyectos / presupuestos / reuniones:</strong> evaluar
                  la solicitud, preparar propuestas y realizar comunicaciones necesarias para su
                  tramitación (incluidas llamadas o emails vinculados a la solicitud).
                </li>
                <li>
                  <strong>c) Boletín informativo / comunicaciones comerciales:</strong> enviarte
                  comunicaciones comerciales solo si lo autorizas expresamente (casilla específica)
                  o, en su caso, a clientes con relación previa para servicios similares con opción
                  de oposición sencilla.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Base jurídica (legitimación)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>a) Contacto / información / presupuesto / reunión:</strong> aplicación de
                  medidas precontractuales a petición del interesado (art. 6.1.b RGPD).
                </li>
                <li>
                  <strong>b) Newsletter / marketing a no clientes:</strong> consentimiento (art. 6.1.a
                  y art. 7 RGPD).
                </li>
                <li>
                  <strong>c) Marketing a clientes sobre servicios similares:</strong> interés legítimo
                  (art. 6.1.f RGPD) y límites de la LSSI para comunicaciones comerciales, ofreciendo
                  siempre opción de baja/oposición en cada envío.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Carácter obligatorio o facultativo de los datos</h2>
              <p>
                Los campos marcados con (*) son necesarios para gestionar tu solicitud. Si no los
                facilitas, es posible que no podamos atenderla o responder adecuadamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Conservación de los datos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Consultas / solicitudes de información:</strong> hasta 12 meses desde el
                  último contacto.
                </li>
                <li>
                  <strong>Solicitudes de proyectos / propuestas:</strong> hasta 24 meses desde la
                  última interacción si no se formaliza contratación.
                </li>
                <li>
                  <strong>Newsletter / marketing por consentimiento:</strong> hasta que retires el
                  consentimiento o solicites la baja.
                </li>
              </ul>
              <p className="mt-4">
                En todo caso, cuando proceda, los datos podrán mantenerse bloqueados durante los
                plazos necesarios para atender responsabilidades legales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Destinatarios y encargados</h2>
              <p>
                No cedemos tus datos a terceros salvo obligación legal. Podremos comunicar o permitir
                acceso a proveedores que prestan servicios necesarios (alojamiento web/hosting,
                mantenimiento, correo, analítica, herramientas de contacto/CRM), que actuarán como
                encargados del tratamiento con contrato y garantías. El RGPD permite informar por
                categorías de destinatarios cuando proceda.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Transferencias internacionales</h2>
              <p>
                Con carácter general, no se prevén transferencias internacionales.
              </p>
              <p>
                No obstante, si se utilizan servicios de terceros como Google Maps y/o Google Analytics,
                puede existir tratamiento/transferencia internacional asociada al proveedor. En tal caso,
                dichas transferencias se realizarán conforme a las garantías exigidas por el RGPD (p. ej.,
                decisiones de adecuación, cláusulas contractuales tipo u otros mecanismos aplicables).
                Existe una decisión de adecuación UE-EE.&nbsp;UU. (DPF) y Google LLC figura como
                participante certificado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Derechos de las personas</h2>
              <p>
                Puedes ejercitar tus derechos de acceso, rectificación, supresión, oposición, limitación
                y portabilidad, así como retirar el consentimiento cuando sea la base del tratamiento.
                Para ello, envía una solicitud a{" "}
                <a href="mailto:info@de-logica.com" className="text-accent underline hover:no-underline">
                  info@de-logica.com
                </a>.
              </p>
              <p>
                <strong>Verificación de identidad:</strong> podremos solicitar información adicional solo
                si existen dudas razonables sobre tu identidad.
              </p>
              <p>
                También tienes derecho a presentar reclamación ante la{" "}
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:no-underline"
                >
                  Agencia Española de Protección de Datos (AEPD)
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Decisiones automatizadas</h2>
              <p>
                No se prevén decisiones automatizadas ni elaboración de perfiles con efectos jurídicos
                sobre el interesado en el marco de los formularios de contacto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Menores de edad</h2>
              <p>
                Los servicios de este sitio web están dirigidos a mayores de 14 años. Si eres menor
                de esa edad, no debes facilitarnos tus datos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Medidas de seguridad</h2>
              <p>
                Adoptamos medidas técnicas y organizativas razonables para proteger los datos frente
                a accesos no autorizados, pérdida, alteración o divulgación.
              </p>
            </section>

            <p className="text-sm mt-8">Última actualización: Febrero 2026.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Privacidad;
