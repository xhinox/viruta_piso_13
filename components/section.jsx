import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section = ({ id, title, children, bgColor = "bg-transparent" }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, skewX: -5 },
        {
          y: 0,
          opacity: 1,
          skewX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-24 px-6 ${bgColor} relative`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-pixel text-2xl md:text-3xl mb-14 text-center uppercase tracking-wider text-[#00ff41] neon-green"
        >
          {"// "}{title}
        </h2>
        <div ref={contentRef}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
