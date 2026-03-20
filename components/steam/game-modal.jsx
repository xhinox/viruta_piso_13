import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GameModal = ({ game, onClose }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [inCart, setInCart] = useState(false);

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(
      modalRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
      "-=0.1"
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(modalRef.current, { y: 40, opacity: 0, duration: 0.3 });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  const handleAddToCart = () => {
    setInCart(true);
    gsap.fromTo(
      ".cart-btn",
      { scale: 0.9 },
      { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" }
    );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-10 pb-10 overflow-y-auto"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className="relative w-full max-w-4xl mx-4 bg-[#12121a] border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 font-mono text-gray-500 hover:text-[#ff2a6d] transition-colors text-lg"
        >
          [X]
        </button>

        {/* Main screenshot */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={game.screenshots[activeScreenshot]}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent" />
        </div>

        {/* Screenshot thumbnails */}
        <div className="flex gap-2 px-6 -mt-6 relative z-10">
          {game.screenshots.map((ss, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveScreenshot(i);
                gsap.fromTo(
                  ".modal-main-img",
                  { opacity: 0.5 },
                  { opacity: 1, duration: 0.3 }
                );
              }}
              className={`w-16 h-10 overflow-hidden border-2 transition-all flex-shrink-0 ${
                i === activeScreenshot
                  ? "border-[#00ff41]"
                  : "border-gray-700 hover:border-gray-500 opacity-60"
              }`}
            >
              <img
                src={ss}
                alt={`Screenshot ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title and Meta */}
          <div>
            <h2 className="font-pixel text-lg text-white mb-2 leading-relaxed">
              {game.title}
            </h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] text-[#05d9e8] border border-[#05d9e8]/30 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left - Details */}
            <div className="md:col-span-2 space-y-5">
              {/* Features */}
              <div>
                <h3 className="font-mono text-xs text-[#05d9e8] mb-3 tracking-wider">
                  {">"} CARACTERÍSTICAS_
                </h3>
                <ul className="space-y-2">
                  {game.features.map((feat, i) => (
                    <li
                      key={i}
                      className="font-mono text-xs text-gray-400 flex items-start gap-2"
                    >
                      <span className="text-[#00ff41] mt-0.5">+</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-mono text-xs text-[#05d9e8] mb-3 tracking-wider">
                  {">"} REQUISITOS_MÍNIMOS_
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(game.requirements).map(([key, val]) => (
                    <div key={key} className="font-mono text-[10px]">
                      <span className="text-gray-600 uppercase">{key}: </span>
                      <span className="text-gray-400">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Purchase */}
            <div className="space-y-4">
              {/* Rating */}
              <div className="border border-gray-800 p-4 text-center">
                <div
                  className="font-pixel text-2xl mb-1"
                  style={{ color: ratingColor }}
                >
                  {game.rating}
                </div>
                <div className="font-mono text-[10px] text-gray-500">
                  {game.reviews}
                </div>
                <div className="font-mono text-[9px] text-gray-600 mt-1">
                  {game.reviewCount.toLocaleString()} reseñas
                </div>
              </div>

              {/* Price box */}
              <div className="border border-gray-800 p-4">
                <div className="flex items-center justify-between mb-4">
                  {game.discount > 0 && (
                    <span className="bg-[#f5d300] text-[#0a0a0f] font-pixel text-[8px] px-2 py-1">
                      -{game.discount}%
                    </span>
                  )}
                  <div className="text-right">
                    {game.discount > 0 && (
                      <div className="font-mono text-xs text-gray-600 line-through">
                        ${game.price.toFixed(2)}
                      </div>
                    )}
                    <div className="font-pixel text-sm text-[#00ff41] neon-green">
                      ${finalPrice}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`cart-btn w-full font-pixel text-[9px] py-3 border-2 transition-all duration-300 tracking-wider uppercase ${
                    inCart
                      ? "border-[#00ff41] text-[#00ff41] bg-[#00ff41]/10"
                      : "border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-[#0a0a0f]"
                  }`}
                >
                  {inCart ? "[ EN CARRITO ✓ ]" : "[ AÑADIR AL CARRITO ]"}
                </button>

                <button className="w-full font-mono text-[10px] py-2 text-gray-600 hover:text-[#05d9e8] transition-colors mt-2">
                  + Añadir a lista de deseos
                </button>
              </div>

              {/* Meta info */}
              <div className="space-y-2 font-mono text-[10px]">
                <div>
                  <span className="text-gray-600">Developer: </span>
                  <span className="text-[#05d9e8]">{game.developer}</span>
                </div>
                <div>
                  <span className="text-gray-600">Publisher: </span>
                  <span className="text-gray-400">{game.publisher}</span>
                </div>
                <div>
                  <span className="text-gray-600">Release: </span>
                  <span className="text-gray-400">{game.releaseDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
