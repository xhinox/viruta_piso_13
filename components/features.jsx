import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featureData = [
  {
    icon: "⚔️",
    title: "COMBAT_SYS",
    desc: "Enfréntate a monstruos de cable, ratas mutantes y jefes corporativos con tu fiel martillo.",
    color: "#ff2a6d",
  },
  {
    icon: "🏢",
    title: "EXPLORE_13",
    desc: "Explora el piso que no existe. Servidores corruptos, sótanos oscuros y oficinas malditas.",
    color: "#05d9e8",
  },
  {
    icon: "🔧",
    title: "UPGRADE_SYS",
    desc: "Recolecta power-ups, desbloquea habilidades y mejora a Viruta para sobrevivir el terror.",
    color: "#f5d300",
  },
];

const Features = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { x: i % 2 === 0 ? -80 : 80, opacity: 0, rotateY: 10 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {featureData.map((feature, i) => (
        <div
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className="relative p-6 bg-[#12121a] border border-[#00ff41]/10 hover:border-opacity-50 transition-all duration-500 group cyber-corners"
          style={{ borderColor: `${feature.color}33` }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.03,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
        >
          {/* Top bar decoration */}
          <div
            className="h-[2px] w-full mb-6 opacity-50"
            style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
          />

          <div className="text-4xl mb-4">{feature.icon}</div>

          <h3
            className="font-pixel text-xs mb-4 tracking-wider"
            style={{ color: feature.color }}
          >
            {feature.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed">
            {feature.desc}
          </p>

          {/* Bottom terminal line */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <span className="font-mono text-xs text-gray-600">
              root@piso13:~$ <span style={{ color: feature.color }}>status --ok</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
