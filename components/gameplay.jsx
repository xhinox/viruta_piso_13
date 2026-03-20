import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import collageImg from "../assets/15d5c8be-dece-4365-accf-bc19d396df54.jpg";

gsap.registerPlugin(ScrollTrigger);

const Gameplay = () => {
  const imgRef = useRef(null);
  const frameRef = useRef(null);
  const statsRef = useRef([]);

  const stats = [
    { label: "LEVELS", value: "13", color: "#00ff41" },
    { label: "ENEMIES", value: "50+", color: "#ff2a6d" },
    { label: "BOSSES", value: "5", color: "#05d9e8" },
    { label: "SECRETS", value: "???", color: "#f5d300" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with clip path
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Frame border glow
      gsap.fromTo(
        frameRef.current,
        { boxShadow: "0 0 0px rgba(0,255,65,0)" },
        {
          boxShadow: "0 0 30px rgba(0,255,65,0.3), inset 0 0 30px rgba(0,255,65,0.05)",
          duration: 1,
          delay: 1,
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stats counter
      statsRef.current.forEach((stat, i) => {
        gsap.fromTo(
          stat,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 1 + i * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: frameRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, frameRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-10">
      {/* Screenshot frame */}
      <div
        ref={frameRef}
        className="relative border-2 border-[#00ff41]/30 p-2 bg-[#12121a] max-w-5xl mx-auto"
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[#00ff41]/20 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#ff2a6d]" />
          <div className="w-2 h-2 rounded-full bg-[#f5d300]" />
          <div className="w-2 h-2 rounded-full bg-[#00ff41]" />
          <span className="font-mono text-xs text-gray-600 ml-3">
            gameplay_preview.exe — RUNNING
          </span>
        </div>

        <img
          ref={imgRef}
          src={collageImg}
          alt="Gameplay screenshots"
          className="w-full rounded-sm"
        />
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {stats.map((stat, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            className="text-center p-4 border border-gray-800 bg-[#12121a]"
          >
            <div
              className="font-pixel text-xl md:text-2xl mb-2"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="font-mono text-xs text-gray-500 tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gameplay;
