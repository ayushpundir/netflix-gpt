import { useRef } from "react";
import { aiClient } from "../utils/googleAi"; 
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult, setGptLoading, setGptError } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (error) {
      console.error("TMDB Error:", error);
      return null;
    }
  };

  const handleGptSearchClick = async () => {
    const userQuery = searchText.current.value;
    if (!userQuery) return;

    // trigger shimmer ui
    dispatch(setGptLoading());

    // Ask for exact movie titles from GPT
    const gptPrompt = `
      Act as a strict Movie Recommendation API.
      
      User Query: "${userQuery}"
      
      Instructions:
      1. Analyze the query to see if a specific number of movies is requested (e.g., "10 funny movies").
      2. If a number is specified, return exactly that many (maximum 15 to strictly avoid rate limits).
      3. If no number is specified, return exactly 5 movies.
      4. Use full official IMDB/TMDB movie titles only.
      5. Output MUST be a single comma-separated string.
      6. STRICTLY NO introduction, NO numbering, NO markdown, and NO code blocks.
      
      Example Output:
      Gadar Ek Prem Katha, Sholay, Don, Golmaal: Fun Unlimited, Koi Mil Gaya
    `;

    try {
      const response = await aiClient.models.generateContent({
        //model: "gemini-3-flash-preview",
        model: "gemini-2.5-flash-lite",
        contents: gptPrompt,
      });

      const gptResponse = response.text; 

      if (!gptResponse) {
          console.error("No response from AI");
          dispatch(setGptError("No response from AI"));
          return;
      }

      const gptMovies = gptResponse.split(",").map((movie) => movie.trim());
      
      // Fetch raw data (fuzzy results) from each api calls takes time but map don't wait for each so this arrays store 
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const rawTmdbResults = await Promise.all(promiseArray);

      // filter logic
      // We iterate through the raw results and keep only exact matches
      const exactMatches = rawTmdbResults.map((movieList, index) => {
        const gptName = gptMovies[index].toLowerCase();

        const filteredList = movieList.filter((movie) => 
           movie.title.toLowerCase() === gptName || 
           movie.original_title.toLowerCase() === gptName
        );

        // Fallback to raw results if strict filter returns empty
        return filteredList.length > 0 ? filteredList : movieList; 
      });

      // 4. Update Redux (This action also sets loading = false)
      dispatch(addGptMovieResult({
          movieNamesByGPT: gptMovies,
          movieResultsByTMDB: exactMatches,
      }));

    } catch (error) {
      console.error("GPT Search Failed:", error);
      dispatch(setGptError("Search failed. Please try again."));
    }
  };

  return (
    <div className="w-full max-w-4xl px-4">
      <form
        className="bg-black/80 grid grid-cols-12 rounded-xl border border-white/20 shadow-2xl backdrop-blur-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
          placeholder="What would you like to watch today?"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-lg transition-all duration-200 active:scale-95 shadow-[0_0_15px_rgba(126,34,206,0.5)]"
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
      <p className="text-white/60 text-center mt-4 text-sm font-medium">
        Powered by Google AI
      </p>
    </div>
  );
};

export default GptSearchBar;