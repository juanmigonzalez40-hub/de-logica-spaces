import { CTAStrip } from "@/components/sections/CTAStrip";

interface SimplePageProps {
  title: string;
  subtitle: string;
  content: string;
  ctaTitle?: string;
}

const SimplePage = ({ title, subtitle, content, ctaTitle }: SimplePageProps) => {
  return (
    <main className="pt-24">
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-custom max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed text-center">{content}</p>
          </div>
        </div>
      </section>

      <CTAStrip title={ctaTitle} />
    </main>
  );
};

export default SimplePage;
