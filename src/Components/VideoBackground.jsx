// import { useSelector } from "react-redux";
// import useMovieTrailer from "../hooks/useMovieTrailer";

// const VideoBackground = ({ movieId }) => {
//   const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

//   useMovieTrailer(movieId);

//   return (
//     <div className=" w-screen">
//       <iframe
//         className="w-screen aspect-video"
//         src={
//           "https://www.youtube.com/embed/" +
//           trailerVideo?.key +
//           "?&autoplay=1&mute=1"
//         }
//         title="YouTube video player"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//       ></iframe>
//     </div>
//   );
// };
// export default VideoBackground;
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  return (
    <div className="w-full aspect-video overflow-hidden bg-black">
      <iframe
        className="w-full aspect-video scale-150 origin-center -translate-y-12 md:-translate-y-20" 
        /* scale-150: Makes the video 50% larger than the container to crop the edges
           -translate-y: Pulls the video UP so the title bar is hidden behind the header/off-screen
        */
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1&controls=0&rel=0&showinfo=0&modestbranding=1&loop=1&playlist=" +
          trailerVideo?.key
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      
      {/* Visual Overlay: This ensures the video doesn't interfere with clicks on your UI */}
      <div className="absolute inset-0 bg-transparent z-10"></div>
    </div>
  );
};
export default VideoBackground;