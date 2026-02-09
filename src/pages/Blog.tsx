import { Link } from "react-router-dom";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";

const articles = [
  {
    slug: "rotulos-fachadas",
    title: "Tu fachada habla: Por qué un buen rótulo atrae más clientes que el mejor producto",
    excerpt: "Tienes el local, tienes el producto y tienes la ilusión. Pero si la gente pasa por delante de tu negocio y no mira dos veces, tienes un problema.",
    category: "Rótulos y Fachadas",
    date: "2026-02-13",
  },
  {
    slug: "mobiliario-comercial",
    title: "Mobiliario Comercial: Diseñando espacios que venden solos",
    excerpt: "¿Alguna vez has entrado en una tienda y te has sentido 'a gusto' sin saber por qué? El secreto no suele estar en el producto, sino en el diseño del espacio.",
    category: "Mobiliario Comercial",
    date: "2025-01-10",
  },
  {
    slug: "franquicias-branding",
    title: "Franquicias: El reto de mantener la misma imagen en 50 locales diferentes",
    excerpt: "La consistencia de marca es lo que genera confianza en el consumidor. Si un cliente entra en tu franquicia, debe sentir lo mismo esté donde esté.",
    category: "Franquicias y Branding",
    date: "2025-01-05",
  },
];

const Blog = () => {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-muted">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ideas útiles, sin humo. Contenido práctico para responsables de marketing, retail y expansión.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.slug} to={`/blog/${article.slug}`}>
                <Card className="h-full hover:shadow-elegant transition-shadow duration-300 group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground flex-grow mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-accent font-medium">
                      Leer artículo
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip title="¿Tienes un proyecto en mente?" />
    </main>
  );
};

export default Blog;
