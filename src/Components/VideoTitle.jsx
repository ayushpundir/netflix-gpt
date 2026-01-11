// const VideoTitle = ({ title, overview }) => {
//   return (
//     <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-linear-to-r from-black">
//       <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
//       <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
//       <div className="my-4 md:m-0">
//         <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl  rounded-lg hover:bg-opacity-80">
//           ▶️ Play
//         </button>
//         <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
//           More Info
//         </button>
//       </div>
//     </div>
//   );
// };
// export default VideoTitle;
const VideoTitle = ({ title, overview }) => {
  return (
    /* 1. Increased z-index to z-20 to ensure it's definitively above the video.
      2. Added 'pointer-events-none' to the wrapper so clicks can "pass through" 
         empty areas to the video if needed.
    */
    <div className="w-full aspect-video pt-[17%] px-6 md:px-24 absolute text-white bg-linear-to-r from-black z-20 pointer-events-none">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/2">
        {overview}
      </p>
      
      {/* 3. Added 'pointer-events-auto' specifically to the button container 
           so the buttons "capture" the mouse for hover/click.
      */}
      <div className="my-4 md:m-0 flex gap-4 pointer-events-auto">
        <button className="
          bg-white text-black
          font-semibold
          py-2.5 md:py-3
          px-6 md:px-12
          text-lg md:text-xl
          rounded-md
          shadow-lg
          hover:bg-gray-200
          active:scale-95
          transition-all duration-200
          cursor-pointer
        ">
          Play
        </button>

        <button className="
          hidden md:inline-flex
          items-center
          bg-gray-800/70 text-white
          font-medium
          py-3
          px-12
          text-xl
          rounded-md
          backdrop-blur-sm
          hover:bg-gray-700/80
          active:scale-95
          transition-all duration-200
          cursor-pointer
        ">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;