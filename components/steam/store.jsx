import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import FeaturedCarousel from "./featured-carousel";
import GameCard from "./game-card";
import GameModal from "./game-modal";
import { games } from "./game-data";

gsap.registerPlugin(ScrollTrigger);

const Store = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef(null);
  const categoriesRef = useRef(null);
  const gridRef = useRef(null);

  const featured = games.filter((g) => g.featured);
  const specials = games.filter((g) => g.discount > 0);

  const filteredGames = searchQuery
    ? games.filter(
        (g) =>
          g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : games;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        categoriesRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Store Header */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#00ff41]/15"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
          <Link
            to="/"
            className="font-pixel text-xs text-[#00ff41] neon-green hover:text-white transition-colors shrink-0"
          >
            {"<"} PISO_13
          </Link>

          <div className="font-pixel text-sm text-[#05d9e8] tracking-wider hidden md:block">
            PIXEL_STORE
          </div>

          {/* Search */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12121a] border border-gray-800 focus:border-[#00ff41]/50 px-4 py-2 text-sm font-mono text-white outline-none transition-colors pl-9"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
              {">"}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="font-mono text-xs text-gray-500 hover:text-[#05d9e8] transition-colors hidden md:block">
              [WISHLIST]
            </button>
            <button className="font-mono text-xs text-gray-500 hover:text-[#00ff41] transition-colors hidden md:block">
              [CART: 0]
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Tabs */}
        {!searchQuery && (
          <div ref={categoriesRef} className="flex gap-3 mb-10 overflow-x-auto pb-2">
            {["Todos", "Acción", "Horror", "Indie", "Pixel Art", "Ofertas"].map(
              (cat) => (
                <button
                  key={cat}
                  className="font-mono text-xs px-4 py-2 border border-gray-800 hover:border-[#00ff41]/40 hover:text-[#00ff41] text-gray-400 transition-all whitespace-nowrap bg-[#12121a]"
                >
                  {cat}
                </button>
              )
            )}
          </div>
        )}

        {/* Featured Carousel */}
        {!searchQuery && (
          <section className="mb-16">
            <FeaturedCarousel games={featured} onSelect={setSelectedGame} />
          </section>
        )}

        {/* Special Offers */}
        {!searchQuery && specials.length > 0 && (
          <section className="mb-16">
            <h2 className="font-pixel text-sm text-[#f5d300] mb-6 tracking-wider">
              {"// "}OFERTAS_ESPECIALES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specials.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  variant="wide"
                  onClick={() => setSelectedGame(game)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Games / Search Results */}
        <section>
          <h2 className="font-pixel text-sm text-[#05d9e8] mb-6 tracking-wider">
            {"// "}
            {searchQuery
              ? `RESULTADOS: "${searchQuery.toUpperCase()}"`
              : "CATÁLOGO_COMPLETO"}
          </h2>
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => setSelectedGame(game)}
              />
            ))}
          </div>
          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <p className="font-mono text-gray-600">
                {">"} No se encontraron resultados para "{searchQuery}"
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Game Detail Modal */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
};

export default Store;
