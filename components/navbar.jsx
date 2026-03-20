import { useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 },
    );

    gsap.fromTo(
      linksRef.current,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1,
      },
    );
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["features", "gameplay", "galería", "contacto"];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#00ff41]/20"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-pixel text-sm text-[#00ff41] neon-green flicker tracking-wider">
          PISO_13
        </div>
        <div className="space-x-8 hidden md:flex">
          {navItems.map((item, i) => (
            <button
              key={item}
              ref={(el) => (linksRef.current[i] = el)}
              onClick={() => scrollTo(item === "galería" ? "galeria" : item)}
              className="text-sm font-mono text-[#05d9e8] hover:text-[#00ff41] hover:neon-green transition-all duration-300 uppercase tracking-widest"
            >
              [{item}]
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
