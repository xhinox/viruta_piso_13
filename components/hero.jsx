import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBanner from "../assets/2b57e070-b971-4b19-9b62-2a308b32a46e.jpg";

const Hero = () => {
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scanRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Scan line sweep
    tl.fromTo(
      scanRef.current,
      { top: "-5%" },
      { top: "105%", duration: 1.5, ease: "power1.inOut" }
    );

    // Image reveal
    tl.fromTo(
      imgRef.current,
      { scale: 1.2, opacity: 0, filter: "brightness(3) saturate(0)" },
      { scale: 1, opacity: 1, filter: "brightness(1) saturate(1)", duration: 1.5 },
      "-=1"
    );

    // Title glitch in
    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0, letterSpacing: "0.5em" },
      { y: 0, opacity: 1, letterSpacing: "0.1em", duration: 0.8 },
      "-=0.8"
    );

    // Subtitle type in
    tl.fromTo(
      subtitleRef.current,
      { width: 0, opacity: 1 },
      { width: "auto", duration: 1, ease: "steps(20)" },
      "-=0.3"
    );

    // CTA button
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3"
    );

    // Floating parallax on image
    gsap.to(imgRef.current, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={heroBanner}
          alt="Viruta en el Piso 13"
          className="w-full h-full object-cover opacity-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-[#0a0a0f]/30" />
      </div>

      {/* Scan line effect */}
      <div
        ref={scanRef}
        className="absolute left-0 w-full h-1 bg-[#00ff41] z-20"
        style={{ boxShadow: "0 0 30px 10px rgba(0,255,65,0.4)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 mt-20">
        <h1
          ref={titleRef}
          data-text="VIRUTA EN EL PISO 13"
          className="font-pixel text-3xl md:text-5xl text-[#00ff41] neon-green glitch mb-6 leading-relaxed"
        >
          VIRUTA EN EL PISO 13
        </h1>

        <p
          ref={subtitleRef}
          className="font-mono text-[#05d9e8] text-lg md:text-xl mb-10 overflow-hidden whitespace-nowrap typing-cursor inline-block"
        >
          {">"} El piso que no existe, el terror que nunca termina_
        </p>

        <div ref={ctaRef}>
          <button className="font-pixel text-xs px-8 py-4 border-2 border-[#ff2a6d] text-[#ff2a6d] hover:bg-[#ff2a6d] hover:text-[#0a0a0f] transition-all duration-300 tracking-wider neon-border-pink uppercase">
            Próximamente
          </button>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-6 w-16 h-16 border-t-2 border-l-2 border-[#00ff41]/30" />
      <div className="absolute top-24 right-6 w-16 h-16 border-t-2 border-r-2 border-[#00ff41]/30" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#00ff41]/30" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#00ff41]/30" />
    </section>
  );
};

export default Hero;
