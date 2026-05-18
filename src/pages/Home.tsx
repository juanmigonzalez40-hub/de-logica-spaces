import { Hero } from "@/components/sections/Hero";
import { ValueGrid } from "@/components/sections/ValueGrid";
import { ServiceTiles } from "@/components/sections/ServiceTiles";
import { SectorsGrid } from "@/components/sections/SectorsGrid";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTAStrip } from "@/components/sections/CTAStrip";

const Home = () => {
  return (
    <main>
      <Hero />
      <ValueGrid />
      <ServiceTiles />
      <SectorsGrid />
      <StatsStrip />
      <FAQSection />
      <CTAStrip />
    </main>
  );
};

export default Home;
