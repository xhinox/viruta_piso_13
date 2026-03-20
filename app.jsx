import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Section from "./components/section";
import Features from "./components/features";
import Gameplay from "./components/gameplay";
import Gallery from "./components/gallery";
import Contact from "./components/contact";
import bgTexture from "./assets/ccf63f58-6684-426d-9701-69499b32bbaa.jpg";

const App = () => {
  return (
    <div className="bg-[#0a0a0f] text-white min-h-screen scanlines relative">
      {/* Full-page background texture */}
      <div
        className="fixed inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `url(${bgTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="relative z-10 cyber-grid">
      <Navbar />
      <Hero />

      <main>
        <Section id="features" title="Features">
          <Features />
        </Section>

        <Section id="gameplay" title="Gameplay" bgColor="bg-[#0d0d14]">
          <Gameplay />
        </Section>

        <Section id="galeria" title="Galería">
          <Gallery />
        </Section>

        <Section id="contacto" title="Contacto" bgColor="bg-[#0d0d14]">
          <Contact />
        </Section>
      </main>

      <footer className="py-10 text-center border-t border-[#00ff41]/10">
        <p className="font-mono text-xs text-gray-600">
          <span className="text-[#00ff41]">$</span> echo "© 2026 Priruta — Viruta en el Piso 13"
        </p>
        <p className="font-pixel text-[8px] text-gray-700 mt-3 tracking-widest">
          SYSTEM_STATUS: ONLINE — ALL_FLOORS_OPERATIONAL
        </p>
      </footer>
      </div>
    </div>
  );
};

export default App;
