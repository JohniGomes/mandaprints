import Nav from "@/components/manda/Nav";
import Hero from "@/components/manda/Hero";
import CollectionsIntro from "@/components/manda/CollectionsIntro";
import OldCatalog from "@/components/manda/OldCatalog";
import About from "@/components/manda/About";
import FinalCTA from "@/components/manda/FinalCTA";
import Footer from "@/components/manda/Footer";
import FloatingWA from "@/components/manda/FloatingWA";

export default function Home() {
  return (
    <div className="mp">
      <Nav />
      <main>
        <Hero />
        <CollectionsIntro />
        <OldCatalog />
        <About />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWA />
    </div>
  );
}
