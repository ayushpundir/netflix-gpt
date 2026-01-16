import GptSearchBar from "./GptSearchBar";
import RecommendedMovies from "./RecommendedMovies";
import GptShimmer from "./GPTShimmer";
import { useSelector } from "react-redux";

const GptSearchPage = () => {

  const loading = useSelector((store) => store.gpt.loading);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image Wrapper */}
      <div className="fixed -z-10 w-full h-full">
        <img 
          className="h-full w-full object-cover" 
          src="/bg.jpg"
          alt="background" 
        />
        {/* Dark Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="pt-[30%] md:pt-[10%] flex flex-col items-center">
        <GptSearchBar />
        {loading ? <GptShimmer /> : <RecommendedMovies />}
      </div>
    </div>
  );
};

export default GptSearchPage;