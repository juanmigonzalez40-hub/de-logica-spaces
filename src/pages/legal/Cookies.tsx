const Cookies = () => {
  return (
    <main className="pt-24">
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Política de Cookies</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. ¿Qué son las cookies?</h2>
              <p>
                Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas
                páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y
                recuperar información sobre los hábitos de navegación de un usuario o de su equipo
                y, dependiendo de la información que contengan y de la forma en que utilice su
                equipo, pueden utilizarse para reconocer al usuario.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. ¿Qué tipos de cookies utiliza este sitio web?</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Cookies técnicas o necesarias</h3>
                  <p>
                    Son aquellas que permiten al usuario la navegación a través del sitio web y la
                    utilización de las diferentes opciones o servicios que en ella existen, incluyendo
                    aquellas que se utilizan para permitir la gestión y operativa de la página web y
                    habilitar sus funciones y servicios.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Cookies de análisis</h3>
                  <p>
                    Son aquellas que permiten al responsable de las mismas el seguimiento y análisis
                    del comportamiento de los usuarios de los sitios web a los que están vinculadas.
                    La información recogida mediante este tipo de cookies se utiliza en la medición
                    de la actividad de los sitios web, con el fin de introducir mejoras en función
                    del análisis de los datos de uso que hacen los usuarios del servicio.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Cookies publicitarias</h3>
                  <p>
                    Son aquellas que permiten la gestión, de la forma más eficaz posible, de los
                    espacios publicitarios que, en su caso, se hayan incluido en el sitio web. Estas
                    cookies almacenan información del comportamiento de los usuarios obtenida a través
                    de la observación continuada de sus hábitos de navegación, lo que permite
                    desarrollar un perfil específico para mostrar publicidad en función del mismo.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cookies utilizadas en este sitio web</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border border-border px-4 py-2 text-left">Cookie</th>
                      <th className="border border-border px-4 py-2 text-left">Tipo</th>
                      <th className="border border-border px-4 py-2 text-left">Finalidad</th>
                      <th className="border border-border px-4 py-2 text-left">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-2">cookieConsent</td>
                      <td className="border border-border px-4 py-2">Técnica</td>
                      <td className="border border-border px-4 py-2">
                        Almacena las preferencias de cookies del usuario
                      </td>
                      <td className="border border-border px-4 py-2">1 año</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2">_ga</td>
                      <td className="border border-border px-4 py-2">Analítica (Google Analytics)</td>
                      <td className="border border-border px-4 py-2">
                        Distingue usuarios únicos mediante un ID generado aleatoriamente
                      </td>
                      <td className="border border-border px-4 py-2">2 años</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2">_ga_*</td>
                      <td className="border border-border px-4 py-2">Analítica (Google Analytics)</td>
                      <td className="border border-border px-4 py-2">
                        Mantiene el estado de la sesión
                      </td>
                      <td className="border border-border px-4 py-2">2 años</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm">
                <strong>Nota:</strong> Esta tabla se actualizará según las cookies que se implementen
                en el sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Consentimiento</h2>
              <p>
                Al acceder a este sitio web, y de acuerdo con la normativa vigente en materia de
                protección de datos y de cookies, le informamos que utilizamos cookies. Cuando
                navega y continúa en nuestro sitio web, está consintiendo el uso de las cookies en
                los términos contenidos en la presente Política.
              </p>
              <p>
                No obstante, puede usted configurar su navegador para ser avisado de la recepción
                de cookies y, si lo desea, impedir su instalación en su equipo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cómo gestionar las cookies en su navegador</h2>
              <p>
                La mayoría de los navegadores aceptan como estándar las cookies y, con independencia
                de las mismas, permiten o impiden en los ajustes de seguridad las cookies temporales
                o memorizadas. A continuación, le proporcionamos los enlaces para la gestión de
                cookies en los principales navegadores:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                Le informamos que la desactivación de determinadas cookies puede impedir o dificultar
                la navegación o la prestación de los servicios ofrecidos en el sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Actualización de la Política de Cookies</h2>
              <p>
                De Lógica Soluciones de Marketing S.L. puede modificar esta Política de Cookies en función de
                exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política
                a las instrucciones dictadas por la Agencia Española de Protección de Datos.
              </p>
              <p>
                Cuando se produzcan cambios significativos en esta Política de Cookies, se comunicará
                a los usuarios mediante aviso informativo en el sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contacto</h2>
              <p>
                Si tiene alguna duda sobre esta Política de Cookies, puede contactar con nosotros
                en la dirección de correo electrónico info@de-logica.com o llamando al
                teléfono +34 910 742 187.
              </p>
            </section>

            <p className="text-sm mt-8">
              Última actualización: Diciembre 2025
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cookies;
