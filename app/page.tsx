import HeroBanner from "@/components/HeroBanner";
import Preview from "@/components/Preview";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
// import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Preview />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
