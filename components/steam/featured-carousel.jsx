import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FeaturedCarousel = ({ games, onSelect }) => {
  const [active, setActive] = useState(0);
  const imageRef = useRef(null);
  const infoRef = useRef(null);
  const progressRef = useRef(null);
  const timerRef = useRef(null);

  const game = games[active];

  const animateTransition = () => {
    const tl = gsap.timeline();
    tl.to(imageRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.3,
    })
      .to(infoRef.current, { x: -20, opacity: 0, duration: 0.2 }, "<")
      .set(imageRef.current, { scale: 0.98 })
      .to(imageRef.current, { opacity: 1, scale: 1, duration: 0.5 })
      .to(infoRef.current, { x: 0, opacity: 1, duration: 0.4 }, "-=0.3");
  };

  const goTo = (index) => {
    if (index === active) return;
    animateTransition();
    setTimeout(() => setActive(index), 300);
  };

  // Auto-rotate
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const next = (active + 1) % games.length;
      animateTransition();
      setTimeout(() => setActive(next), 300);
    }, 6000);

    return () => clearInterval(timerRef.current);
  }, [active, games.length]);

  // Progress bar
  useEffect(() => {
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 6, ease: "none", transformOrigin: "left" }
      );
    }
  }, [active]);

  const finalPrice = game.discount
    ? (game.price * (1 - game.discount / 100)).toFixed(2)
    : game.price.toFixed(2);

  return (
    <div className="relative">
      <h2 className="font-pixel text-sm text-[#ff2a6d] mb-6 tracking-wider">
        {"// "}DESTACADOS
      </h2>

      <div
        className="relative overflow-hidden border border-gray-800 bg-[#12121a] cursor-pointer group"
        onClick={() => onSelect(game)}
      >
        {/* Main image */}
        <div className="relative aspect-[21/9] overflow-hidden">
          <img
            ref={imageRef}
            src={game.banner}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        </div>

        {/* Info overlay */}
        <div
          ref={infoRef}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
        >
          <h3 className="font-pixel text-lg md:text-2xl text-white mb-3 leading-relaxed">
            {game.title}
          </h3>

          <p className="font-mono text-sm text-gray-400 mb-4 max-w-xl line-clamp-2 hidden md:block">
            {game.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] text-[#05d9e8] border border-[#05d9e8]/30 px-2 py-1 bg-[#05d9e8]/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {game.discount > 0 && (
              <span className="bg-[#f5d300] text-[#0a0a0f] font-pixel text-[10px] px-3 py-1.5">
                -{game.discount}%
              </span>
            )}
            {game.discount > 0 && (
              <span className="font-mono text-sm text-gray-500 line-through">
                ${game.price.toFixed(2)}
              </span>
            )}
            <span className="font-pixel text-sm text-[#00ff41] neon-green">
              ${finalPrice}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-800">
          <div
            ref={progressRef}
            className="h-full bg-[#00ff41]"
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>

      {/* Slide indicators */}
      <div className="flex gap-2 mt-4 justify-center">
        {games.map((g, i) => (
          <button
            key={g.id}
            onClick={() => goTo(i)}
            className={`h-1 transition-all duration-300 ${
              i === active
                ? "w-10 bg-[#00ff41]"
                : "w-5 bg-gray-700 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
