import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const url = search 
      ? `https://api.jikan.moe/v4/anime?q=${search}` 
      : `https://api.jikan.moe/v4/seasons/2012/summer`;

    fetch(url)
      .then((res) => res.json())
      .then((ans) => setName(ans.data || []))
      .catch((err) => console.error(err));
  }, [search]);

  return (
    
    <div className="min-h-screen bg-orange-50 font-sans pb-20">
      <div className="top-4 z-50 px-4">
        <header className="max-w-10xl mx-auto bg-orange-500 border-4 border-black p-4 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] whitespace-nowrap">
            Anime<span className="text-yellow-300 italic">Search</span>
          </h1>
          <div className="w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search anime... (e.g. Naruto)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-2.5 rounded-xl border-4 border-black bg-white 
                         text-md font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                         focus:outline-none focus:translate-x-0.5 focus:translate-y-0.5 
                         focus:shadow-none transition-all placeholder:text-gray-400"
            />
          </div>
        </header>
      </div>
      <main className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {name && name.map((r) => (
          <div 
            key={r.mal_id} 
            className="group bg-white border-4 border-black rounded-3xl overflow-hidden 
                       shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
                       hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex flex-col"
          >
            <div className="relative overflow-hidden border-b-4 border-black aspect-3/4">
              <img 
                src={r.images.jpg.large_image_url || r.images.jpg.image_url} 
                alt={r.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-yellow-300 border-2 border-black px-3 py-1 rounded-full text-xs font-black uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {r.score ? `⭐ ${r.score}` : "N/A"}
              </div>
            </div>

            <div className="p-5 flex flex-col grow bg-white">
              <h2 className="text-xl font-black mb-3 text-black leading-tight line-clamp-2 uppercase italic">
                {r.title}
              </h2>
              
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Genres
                </p>
                <div className="flex flex-wrap gap-1">
                  {r.genres.slice(0, 3).map((g) => (
                    <span key={g.name} className="bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded-md border border-orange-200 font-bold">
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-xs font-black text-black/40 uppercase">
                  {r.studios[0]?.name || "Independent"}
                </span>
                <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors">
                  VIEW INFO
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
      <footer className="bg-black text-white p-10 text-center">
        <p className="text-2xl font-black mb-2 italic">STAY WEEB.</p>
        <p className="text-gray-500 text-xs tracking-[0.2em] font-bold">&copy; 2025 ANIMESEARCH // BUILT FOR THE CULTURE</p>
      </footer>
    </div>
  );
}

export default App;


















// import { useState, useEffect } from "react";

// function App() {
//   const [name, setName] = useState([]);
//   const [search, setSearch] = useState("");
//   useEffect(() => {
//     fetch (`https://api.jikan.moe/v4/anime?q=${search}`)
//     .then((res) => res.json())
//     .then((ans) => setName(ans.data))
//     .catch((err) => console.error(err));
//   }, [search]);
//   return (
//     <div className="min-h-screen bg-orange-50 selection:bg-orange-500 selection:text-white font-sans">
//       <header className="bg-orange-500 border-b-4 border-black p-8 text-center sticky top-0 z-50">
//         <h1 className="text-5xl font-black text-white uppercase tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
//           Anime<span className="text-yellow-300 italic">Search</span>
//         </h1>
//         <p className="text-orange-100 font-medium mt-2">Find your next obsession ✨</p>
//       </header>
//       <div className="p-8 flex justify-center sticky top-28 z-40">
//         <input type="text" placeholder="Search anime... (e.g. Naruto)" value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-xl px-6 py-4 rounded-2xl border-4 border-black bg-white 
//                      text-lg font-bold shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
//                      focus:outline-none focus:translate-x-1 focus:translate-y-1 
//                      focus:shadow-none transition-all placeholder:text-gray-400" />
//       </div>
//       <main className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//         {name && name.map((r) => (
//           <div key={r.mal_id} className="group bg-white border-4 border-black rounded-3xl overflow-hidden 
//                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
//                        hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex flex-col">
//             <div className="relative overflow-hidden border-b-4 border-black aspect-3/4">
//               <img 
//                 src={r.images.jpg.large_image_url || r.images.jpg.image_url} 
//                 alt={r.title} 
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="p-5 flex flex-col grow bg-white">
//               <h2 className="text-xl font-black mb-3 text-black leading-tight line-clamp-2 uppercase italic">
//                 {r.title}
//               </h2>
//               <div className="space-y-2">
//                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
//                   Genres
//                 </p>
//                 <div className="flex flex-wrap gap-1">
//                   {r.genres.slice(0, 3).map((g) => (
//                     <span key={g.name} className="bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded-md border border-orange-200 font-bold">
//                       {g.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="mt-auto pt-4 flex items-center justify-between">
//                 <span className="text-xs font-black text-black/40 uppercase">
//                   {r.studios[0]?.name || "Independent"}
//                 </span>
//                 <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors">
//                   VIEW INFO
//                 </button>
//               </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>
//       <footer className="bg-orange-500 text-white p-3 text-center text-sm">
//         <p>&copy; 2025 AnimeSearch. All rights reserved.</p>
//       </footer>
//     </div>
//   )
// }
// export default App;