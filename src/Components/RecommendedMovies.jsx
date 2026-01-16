// import { useSelector } from "react-redux";
// import MovieList from "./MovieList";

// const RecommendedMovies = () => {
//   const { movieResultsByTMDB, movieNamesByGPT } = useSelector(
//     (store) => store.gpt
//   );

//   if (!movieNamesByGPT) return null;

//   return (
//     /* 1. Outer Container: 
//           - Used 'backdrop-blur-xl' for a frosted glass look.
//           - Added a subtle gradient background for depth.
//           - Added a specific shadow to make it "float".
//     */
//     <div className="
//         mx-4 md:mx-12 my-8 p-6 md:p-8 
//         bg-linear-to-br from-gray-900/95 to-black/95 
//         rounded-2xl 
//         border border-white/10 
//         shadow-[0_0_30px_rgba(147,51,234,0.15)] 
//         backdrop-blur-xl 
//         overflow-hidden
//         animate-fade-in
//     ">
      
//       {/* 2. Header Section */}
//       <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-10 border-b border-white/10 pb-6">
//         <div className="flex items-center gap-3">
//           <span className="text-4xl animate-pulse filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
//             ✨
//           </span>
//           <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
//             <span className="bg-linear-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
//               AI Picks For You
//             </span>
//           </h2>
//         </div>
//         <p className="text-gray-400 text-sm md:text-base font-medium ml-1 md:ml-auto">
//           Curated by Gemini AI based on your mood
//         </p>
//       </div>

//       {/* 3. Movie Lists Container */}
//       <div className="space-y-12 relative z-10">
//         {movieNamesByGPT.map((movieName, index) => (
//           /* Wrapper div to add separation between categories */
//           <div key={movieName} className="relative group">
            
//             {/* Optional: Subtle divider line that fades out */}
//             {index !== 0 && (
//               <div className="absolute -top-6 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-800 to-transparent"></div>
//             )}

//             <MovieList
//               title={movieName}
//               movies={movieResultsByTMDB[index]}
//             />
//           </div>
//         ))}
//       </div>
      
//     </div>
//   );
// };

// export default RecommendedMovies;
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const RecommendedMovies = () => {
  const { movieResultsByTMDB, movieNamesByGPT } = useSelector(
    (store) => store.gpt
  );

  if (!movieNamesByGPT) return null;

  return (
    /* 1. Outer Container */
    <div className="w-full max-w-6xl mx-4 md:mx-auto my-8 p-6 md:p-8 bg-linear-to-br from-gray-900/95 to-black/95 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(147,51,234,0.15)] backdrop-blur-xl overflow-hidden animate-fade-in">
      
      {/* 2. Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="text-4xl animate-pulse filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            ✨
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="bg-linear-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              AI Picks For You
            </span>
          </h2>
        </div>
        <p className="text-gray-400 text-sm md:text-base font-medium ml-1 md:ml-auto">
          Curated by Gemini AI based on your mood
        </p>
      </div>

      {/* 3. Movie list container */}
      <div className="relative z-20 w-full min-w-0">
        <div className="space-y-10 relative z-10 w-full min-w-0">
          {movieNamesByGPT.map((movieName, index) => (
            /* use index in key to prevent crashes if GPT gives duplicate names */
            <div key={movieName + index} className="relative group w-full min-w-0">
              {index !== 0 && (
                <div className="absolute -top-6 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-800 to-transparent"></div>
              )}

              {/* MovieList handles horizontal scrolling internally */}
              <MovieList
                title={movieName}
                movies={movieResultsByTMDB[index]}
              />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default RecommendedMovies;