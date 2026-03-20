import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import img1 from "../assets/47c63198-3d01-4a16-9178-21f8cfffdf3d.jpg";
import img2 from "../assets/e8677949-6cfc-4487-8a53-341ee7965017.jpg";
import img3 from "../assets/53c8189e-3203-430b-90b6-d0741c659885.jpg";
import img4 from "../assets/af9aacad-76f4-436f-8015-7e2d641a7dee.jpg";
import img5 from "../assets/7a0f8849-d5a7-4cf1-8483-e91eca54ace7.jpg";

const images = [
  { src: img1, label: "FLOOR_13 // APEXCORE" },
  { src: img2, label: "BASEMENT // RAT_NEST" },
  { src: img3, label: "SERVER_RM // SYS_ERR" },
  { src: img4, label: "NETWORK // CABLE_BEAST" },
  { src: img5, label: "APEX_HR // BOSS_FIGHT" },
];

const Gallery = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(
          item,
          {
            y: 60,
            opacity: 0,
            rotateX: 15,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          className={`gallery-item relative group overflow-hidden border border-[#00ff41]/20 bg-[#12121a] ${
            i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
          }`}
        >
          <img
            src={img.src}
            alt={img.label}
            className="w-full aspect-square object-cover pixel-render group-hover:brightness-125 transition-all duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="font-pixel text-[8px] text-[#00ff41] neon-green tracking-wider">
              {img.label}
            </p>
          </div>

          {/* Corner bracket */}
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#00ff41]/0 group-hover:border-[#00ff41]/60 transition-all duration-300" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#00ff41]/0 group-hover:border-[#00ff41]/60 transition-all duration-300" />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
