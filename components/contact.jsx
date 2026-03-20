import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={formRef} className="max-w-lg mx-auto">
      {/* Terminal window */}
      <div className="border border-[#00ff41]/30 bg-[#12121a]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#00ff41]/20 bg-[#0a0a0f]">
          <div className="w-2 h-2 rounded-full bg-[#ff2a6d]" />
          <div className="w-2 h-2 rounded-full bg-[#f5d300]" />
          <div className="w-2 h-2 rounded-full bg-[#00ff41]" />
          <span className="font-mono text-xs text-gray-600 ml-3">
            contact_form.sh
          </span>
        </div>

        <div className="p-6 space-y-5" ref={terminalRef}>
          <div className="font-mono text-xs text-gray-500 mb-4">
            <span className="text-[#00ff41]">root@piso13</span>:<span className="text-[#05d9e8]">~/contacto</span>$ init_form --secure
          </div>

          <div>
            <label className="font-mono text-xs text-[#05d9e8] block mb-2 tracking-wider">
              {">"} NOMBRE_
            </label>
            <input
              type="text"
              placeholder="Tu nombre..."
              className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00ff41] px-4 py-3 text-sm text-white font-mono outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-mono text-xs text-[#05d9e8] block mb-2 tracking-wider">
              {">"} EMAIL_
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00ff41] px-4 py-3 text-sm text-white font-mono outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-mono text-xs text-[#05d9e8] block mb-2 tracking-wider">
              {">"} MENSAJE_
            </label>
            <textarea
              rows="4"
              placeholder="Escribe tu mensaje..."
              className="w-full bg-[#0a0a0f] border border-gray-800 focus:border-[#00ff41] px-4 py-3 text-sm text-white font-mono outline-none transition-colors resize-none"
            />
          </div>

          <button className="w-full font-pixel text-[10px] py-4 border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-[#0a0a0f] transition-all duration-300 tracking-widest uppercase">
            [ENVIAR_TRANSMISIÓN]
          </button>

          <div className="font-mono text-[10px] text-gray-600 text-center pt-2">
            encrypted connection — piso13.secure.net
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
