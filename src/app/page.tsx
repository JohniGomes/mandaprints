import Nav from "@/components/manda/Nav";
import Hero from "@/components/manda/Hero";
import CollectionsGallery from "@/components/manda/CollectionsGallery";
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
        <CollectionsGallery />
        <About />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWA />
    </div>
  );
}
