const AvisoLegal = () => {
  return (
    <main className="pt-24">
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Aviso Legal</h1>

          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Datos identificativos</h2>
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios
                de la Sociedad de la Información y de Comercio Electrónico, se informa que este
                sitio web es titularidad de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Titular:</strong> De Lógica Soluciones de Marketing S.L.</li>
                <li><strong>NIF:</strong> B83916833</li>
                <li><strong>Domicilio social:</strong> Camino de Hormigueras 124, Nave 4G, 28031 Madrid (España)</li>
                <li><strong>Teléfono:</strong> +34 910 742 187 / +34 675 61 72 80</li>
                <li><strong>Email:</strong> info@de-logica.com</li>
                <li><strong>Registro Mercantil:</strong> Madrid, Tomo 19.848, Folio 1, Sección 8, Hoja M-349648</li>
              </ul>
              <p className="mt-4">
                <strong>Sitio web / dominios:</strong><br />
                El presente Aviso Legal regula el acceso y uso del sitio web accesible, entre otros, a través de:
              </p>
              <ul className="list-disc pl-6">
                <li><a href="https://www.de-logica.com" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline">https://www.de-logica.com</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Objeto</h2>
              <p>
                El sitio web tiene por objeto facilitar información sobre los servicios de
                De Lógica Soluciones de Marketing S.L. y permitir el contacto para solicitudes
                de información, presupuestos o reuniones.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Condiciones de uso</h2>
              <p>
                El acceso y uso del sitio web atribuye la condición de Usuario e implica la
                aceptación de las presentes condiciones. El Usuario se compromete a utilizar
                el sitio web, sus contenidos y servicios conforme a la ley, la buena fe y el
                orden público.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Propiedad intelectual e industrial</h2>
              <p>
                Todos los contenidos del sitio web (textos, imágenes, diseño, código, marcas,
                logotipos, etc.) son titularidad de De Lógica Soluciones de Marketing S.L. o
                de terceros licenciantes, quedando prohibida su reproducción, distribución o
                transformación sin autorización.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Exclusión de responsabilidad</h2>
              <p>
                De Lógica Soluciones de Marketing S.L. no se responsabiliza de los daños que
                pudieran derivarse de interferencias, interrupciones, virus, averías,
                desconexiones o sobrecargas del sistema, siempre que no le sean imputables.
                Tampoco garantiza la inexistencia de errores en los contenidos, aunque adoptará
                las medidas razonables para corregirlos cuando tenga conocimiento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Enlaces a terceros</h2>
              <p>
                Este sitio web puede incluir enlaces a páginas de terceros. De Lógica Soluciones
                de Marketing S.L. no controla ni se responsabiliza de sus contenidos o políticas,
                correspondiendo al Usuario revisar sus condiciones.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Modificaciones</h2>
              <p>
                De Lógica Soluciones de Marketing S.L. se reserva el derecho a modificar en
                cualquier momento la presentación, configuración y contenido del sitio web y
                del presente Aviso Legal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Legislación aplicable y jurisdicción</h2>
              <p>Estas condiciones se rigen por la legislación española.</p>
              <p>
                Si el Usuario actúa como consumidor, serán competentes los juzgados y tribunales
                del domicilio del consumidor.
              </p>
              <p>
                En el resto de casos (B2B), las partes se someten a los juzgados y tribunales
                de Madrid, salvo norma imperativa en contrario.
              </p>
            </section>

            <p className="text-sm mt-8">Última actualización: Febrero 2026</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AvisoLegal;
