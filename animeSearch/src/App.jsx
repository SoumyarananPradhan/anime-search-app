import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- NEW: FAVORITES STATE ---
  // Initialize from LocalStorage immediately so we don't lose data on refresh
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("animeFavorites");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Toggle to switch views
  const [showFavorites, setShowFavorites] = useState(false);

  // --- NEW: SAVE TO LOCAL STORAGE EFFECT ---
  // Whenever 'favorites' changes, save it to the browser
  useEffect(() => {
    localStorage.setItem("animeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // --- NEW: TOGGLE LOGIC ---
  const toggleFavorite = (anime) => {
    // Check if anime is already in the list
    const isFavorite = favorites.some((fav) => fav.mal_id === anime.mal_id);

    if (isFavorite) {
      // Remove it
      setFavorites(favorites.filter((fav) => fav.mal_id !== anime.mal_id));
    } else {
      // Add it
      setFavorites([...favorites, anime]);
    }
  };

  // FETCH DATA (Only run if we are NOT looking at favorites)
  // FETCH DATA WITH DEBOUNCE
  useEffect(() => {
    if (showFavorites) return;

    // 1. Set a "Timer" to delay the fetch
    const delayDebounce = setTimeout(() => {
      
      setLoading(true);
      const url = search 
        ? `https://api.jikan.moe/v4/anime?q=${search}&sfw&page=${page}` 
        : `https://api.jikan.moe/v4/seasons/2012/summer?sfw&page=${page}`;

      fetch(url)
        .then((res) => res.json())
        .then((ans) => {
          setName(ans.data || []);
          setPagination(ans.pagination);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });

    }, 500); // <--- Wait 500ms (half a second)

    // 2. The Cleanup Function
    // If the user types again before 500ms, this runs and CANCELS the previous timer.
    return () => clearTimeout(delayDebounce);

  }, [search, page, showFavorites]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setShowFavorites(false); // Switch back to search mode if user types
  };

  // DECIDE WHAT TO SHOW: API Results OR Favorites List
  const animeList = showFavorites ? favorites : name;

  return (
    <div className="min-h-screen bg-orange-50 font-sans pb-20 relative">
      
      {/* HEADER */}
      <div className="sticky top-4 z-40 px-4">
        <header className="max-w-7xl mx-auto bg-orange-500 border-4 border-black p-4 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 
            onClick={() => setShowFavorites(false)}
            className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] whitespace-nowrap cursor-pointer hover:scale-105 transition-transform"
          >
            Anime<span className="text-yellow-300 italic">⛩️Search</span>
          </h1>
          
          <div className="flex flex-col md:flex-row w-full md:w-auto gap-3 items-center">
            {/* Search Bar */}
            <div className="w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search anime..." 
                value={search}
                onChange={handleSearchChange}
                className="w-full px-5 py-2.5 rounded-xl border-4 border-black bg-white text-md font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all placeholder:text-gray-400"
              />
            </div>
            
            {/* --- NEW: WATCHLIST BUTTON --- */}
            <button 
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-4 py-2.5 rounded-xl border-4 border-black font-black uppercase tracking-wider text-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none
                ${showFavorites ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-red-100'}`}
            >
              {showFavorites ? "Close List" : "❤️ My List"} ({favorites.length})
            </button>
          </div>
        </header>
      </div>

      {/* --- HEADER TITLE FOR LIST --- */}
      {showFavorites && (
        <div className="text-center mt-8">
          <h2 className="text-4xl font-black text-black uppercase italic drop-shadow-sm">
            My Watchlist <span className="text-red-500">❤️</span>
          </h2>
          {favorites.length === 0 && (
             <p className="mt-4 text-gray-500 font-bold">Your list is empty! Go find some anime. 🏃‍♂️</p>
          )}
        </div>
      )}

      {/* MAIN GRID */}
      <main className="max-w-7xl mx-auto p-8 mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading && !showFavorites ? (
          // SKELETON LOADING
          Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] flex flex-col h-[450px] animate-pulse">
              <div className="bg-gray-300 w-full aspect-[3/4] border-b-4 border-black/10"></div>
              <div className="p-5 flex flex-col gap-3 flex-grow">
                 <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
              </div>
            </div>
          ))
        ) : (
          // REAL CARDS (Used for both Search Results AND Favorites)
          animeList.map((r) => {
            // Check if this specific card is in favorites
            const isFav = favorites.some((f) => f.mal_id === r.mal_id);

            return (
              <div key={r.mal_id} className="group bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex flex-col relative">
                
                {/* --- NEW: HEART BUTTON ON CARD --- */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Stop the card click event
                    toggleFavorite(r);
                  }}
                  className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-colors
                    ${isFav ? 'bg-red-500 text-white' : 'bg-white text-gray-300 hover:text-red-500'}`}
                >
                  ❤️
                </button>

                <div className="relative overflow-hidden border-b-4 border-black aspect-[3/4]">
                  <img src={r.images.jpg.large_image_url || r.images.jpg.image_url} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  <div className="absolute top-3 left-3 bg-yellow-300 border-2 border-black px-3 py-1 rounded-full text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    ⭐ {r.score || "N/A"}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-black mb-3 text-black leading-tight line-clamp-2 uppercase italic">{r.title}</h2>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {r.genres.slice(0, 2).map((g) => (
                      <span key={g.name} className="bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded-md border border-orange-200 font-bold uppercase">{g.name}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t-2 border-black/5 flex items-center justify-between">
                    <span className="text-[10px] font-black text-black/40 uppercase truncate mr-2">{r.studios[0]?.name || "Independent"}</span>
                    <button onClick={() => setSelectedAnime(r)} className="bg-black text-white text-[10px] font-bold px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors shrink-0">VIEW INFO</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* PAGINATION (Hide when viewing favorites) */}
      {!loading && !showFavorites && (
        <div className="flex justify-center items-center gap-6 mt-8 pb-10">
          <button onClick={() => setPage(page - 1)} disabled={page === 1} className={`px-6 py-3 rounded-xl border-4 border-black font-black uppercase tracking-wider ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-orange-400 hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all'}`}>Previous</button>
          <span className="text-2xl font-black bg-white px-4 py-2 border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Page {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={!pagination || !pagination.has_next_page} className={`px-6 py-3 rounded-xl border-4 border-black font-black uppercase tracking-wider ${(!pagination || !pagination.has_next_page) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all'}`}>Next</button>
        </div>
      )}

      {/* MODAL (Unchanged - just hiding to save space in this response) */}
      {selectedAnime && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           {/* ... Paste your previous Modal code here ... */}
           {/* If you need me to paste the full modal code again, just ask! */}
           <div className="bg-white border-4 border-black rounded-3xl shadow-[10px_10px_0px_0px_#f97316] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setSelectedAnime(null)} className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-full border-2 border-black font-black hover:bg-red-600 transition-colors z-10">X</button>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 bg-gray-100 border-b-4 md:border-b-0 md:border-r-4 border-black">
                <img src={selectedAnime.images.jpg.large_image_url} alt={selectedAnime.title} className="w-full h-full object-cover"/>
              </div>
              <div className="p-6 md:w-2/3 flex flex-col gap-4">
                <div>
                  <h2 className="text-3xl font-black uppercase italic leading-none mb-2">{selectedAnime.title}</h2>
                  <p className="text-xs font-bold text-gray-400">{selectedAnime.title_japanese}</p>
                </div>
                {/* ... rest of modal ... */}
                <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-200">
                  <h3 className="font-black text-orange-600 mb-1 uppercase text-sm">Synopsis</h3>
                  <p className="text-sm text-gray-700 leading-relaxed h-32 overflow-y-auto pr-2">{selectedAnime.synopsis || "No synopsis available."}</p>
                </div>
                <div className="mt-auto pt-4 flex gap-3">
                  <a href={selectedAnime.url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-black text-white text-center py-3 rounded-xl border-2 border-transparent font-bold uppercase text-sm hover:bg-gray-800 transition">MyAnimeList</a>
                  <a href={`https://myanimelist.net/manga.php?q=${selectedAnime.title}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white text-black text-center py-3 rounded-xl border-4 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">📖 Read Manga</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;