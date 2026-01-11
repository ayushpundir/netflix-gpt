// import { IMG_CDN_URL } from "../utils/constants";

// const MovieCard = ({ posterPath }) => {
//   if (!posterPath) return null;
//   return (
//     <div className="w-36 md:w-48 pr-4">
//       <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
//     </div>
//   );
// };
// export default MovieCard;
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer">
      <img 
        className="rounded-lg shadow-md hover:shadow-2xl" 
        alt="Movie Card" 
        src={IMG_CDN_URL + posterPath} 
      />
    </div>
  );
};
export default MovieCard;