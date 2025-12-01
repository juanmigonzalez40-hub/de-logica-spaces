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
                de la Sociedad de la Información y Comercio Electrónico, se pone en su
                conocimiento la siguiente información:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Titular:</strong> De Lógica Soluciones de Marketing S.L.</li>
                <li><strong>NIF:</strong> B83916833</li>
                <li><strong>Domicilio social:</strong> Camino de Hormigueras 124, Nave 4G, 28031 Madrid</li>
                <li><strong>Teléfono:</strong> +34 910 742 187 / +34 675 61 72 80</li>
                <li><strong>Email:</strong> info@de-logica.com</li>
                <li><strong>Registro Mercantil:</strong> Madrid, Tomo XXXXX, Folio XXX, Hoja M-XXXXXX</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Objeto</h2>
              <p>
                El presente Aviso Legal regula el acceso y utilización del sitio web www.de-logica.com,
                que De Lógica Soluciones de Marketing S.L. pone a disposición de los usuarios de Internet.
              </p>
              <p>
                El acceso al sitio web es gratuito salvo en lo relativo al coste de la conexión
                a través de la red de telecomunicaciones suministrada por el proveedor de acceso
                contratado por los usuarios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Condiciones de uso</h2>
              <p>
                El acceso, navegación y uso del sitio web de De Lógica Soluciones de Marketing S.L. implica la
                aceptación expresa y sin reservas de todas las condiciones recogidas en el presente
                Aviso Legal.
              </p>
              <p>
                El Usuario se compromete a utilizar el sitio web, los contenidos y servicios de
                conformidad con la Ley, el presente Aviso Legal, las buenas costumbres y el orden
                público.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Propiedad intelectual e industrial</h2>
              <p>
                Todos los contenidos del sitio web, incluyendo, sin carácter limitativo, textos,
                fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás
                contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente,
                son propiedad intelectual de De Lógica Soluciones de Marketing S.L., sin que puedan entenderse
                cedidos al Usuario ninguno de los derechos de explotación reconocidos por la
                normativa vigente en materia de propiedad intelectual sobre los mismos.
              </p>
              <p>
                Las marcas, nombres comerciales o signos distintivos son titularidad de
                De Lógica Soluciones de Marketing S.L., sin que pueda entenderse que el acceso al sitio web
                atribuya al Usuario derecho alguno sobre las citadas marcas, nombres comerciales
                y/o signos distintivos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Exclusión de responsabilidad</h2>
              <p>
                De Lógica Soluciones de Marketing S.L. no será responsable, en ningún caso, de los daños y
                perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo:
                errores u omisiones en los contenidos, falta de disponibilidad del sitio web o
                la transmisión de virus o programas maliciosos o lesivos en los contenidos, a
                pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Enlaces</h2>
              <p>
                En el caso de que en el sitio web se incluyesen enlaces o hipervínculos hacia
                otros sitios de Internet, De Lógica Soluciones de Marketing S.L. no ejercerá ningún tipo de
                control sobre dichos sitios y contenidos. En ningún caso De Lógica Soluciones de Marketing S.L.
                asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente
                a un sitio web ajeno.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Modificaciones</h2>
              <p>
                De Lógica Soluciones de Marketing S.L. se reserva el derecho de efectuar sin previo aviso las
                modificaciones que considere oportunas en su sitio web, pudiendo cambiar, suprimir
                o añadir tanto los contenidos y servicios que se presten a través de la misma como
                la forma en la que éstos aparezcan presentados o localizados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Legislación aplicable y jurisdicción</h2>
              <p>
                Las presentes Condiciones Generales se rigen por la legislación española. Para la
                resolución de cualquier controversia que pudiera suscitarse en relación con el sitio
                web o las actividades en él desarrolladas, De Lógica Soluciones de Marketing S.L. y el Usuario
                acuerdan someterse a los Juzgados y Tribunales de Madrid, renunciando expresamente
                a cualquier otro fuero que pudiera corresponderles.
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

export default AvisoLegal;
