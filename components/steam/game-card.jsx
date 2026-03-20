import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GameCard = ({ game, variant = "default", onClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const finalPrice = game.discount
    ? (game.price * (1 - game.discount / 100)).toFixed(2)
    : game.price.toFixed(2);

  const ratingColor =
    game.rating >= 90
      ? "#00ff41"
      : game.rating >= 75
      ? "#05d9e8"
      : game.rating >= 60
      ? "#f5d300"
      : "#ff2a6d";

  if (variant === "wide") {
    return (
      <div
        ref={cardRef}
        onClick={onClick}
        className="group flex bg-[#12121a] border border-gray-800 hover:border-[#f5d300]/40 cursor-pointer transition-all duration-300 overflow-hidden"
        onMouseEnter={(e) =>
          gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3 })
        }
        onMouseLeave={(e) =>
          gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })
        }
      >
        {/* Image */}
        <div className="w-1/3 min-h-[140px] overflow-hidden relative">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 bg-[#f5d300] text-[#0a0a0f] font-pixel text-[8px] px-2 py-1">
            -{game.discount}%
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-sm text-white font-bold mb-1 group-hover:text-[#f5d300] transition-colors">
              {game.title}
            </h3>
            <div className="flex gap-2 mb-2 flex-wrap">
              {game.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] text-gray-500 border border-gray-800 px-1.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="font-mono text-[10px] text-gray-600 leading-relaxed line-clamp-2">
              {game.description}
            </p>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div
              className="font-mono text-[10px]"
              style={{ color: ratingColor }}
            >
              {game.reviews} ({game.reviewCount.toLocaleString()})
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-gray-600 line-through">
                ${game.price.toFixed(2)}
              </span>
              <span className="font-pixel text-xs text-[#00ff41] neon-green">
                ${finalPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group bg-[#12121a] border border-gray-800 hover:border-[#00ff41]/30 cursor-pointer transition-all duration-300 overflow-hidden"
      onMouseEnter={(e) =>
        gsap.to(e.currentTarget, { scale: 1.03, duration: 0.3 })
      }
      onMouseLeave={(e) =>
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })
      }
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent" />

        {game.discount > 0 && (
          <div className="absolute top-2 right-2 bg-[#f5d300] text-[#0a0a0f] font-pixel text-[8px] px-2 py-1">
            -{game.discount}%
          </div>
        )}

        {/* Rating badge */}
        <div
          className="absolute top-2 left-2 font-pixel text-[8px] px-2 py-1 border"
          style={{ color: ratingColor, borderColor: ratingColor }}
        >
          {game.rating}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-mono text-sm text-white font-bold mb-1 group-hover:text-[#00ff41] transition-colors truncate">
          {game.title}
        </h3>

        <div className="flex gap-1.5 mb-3 flex-wrap">
          {game.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[8px] text-gray-600 border border-gray-800/60 px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
          <span className="font-mono text-[10px] text-gray-600">
            {game.developer}
          </span>
          <div className="flex items-center gap-2">
            {game.discount > 0 && (
              <span className="font-mono text-[10px] text-gray-600 line-through">
                ${game.price.toFixed(2)}
              </span>
            )}
            <span className="font-pixel text-[10px] text-[#00ff41]">
              ${finalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
