const GptShimmer = () => {
  return (
    <div className="p-4 mx-4 mt-8 bg-black/50 rounded-xl backdrop-blur-sm animate-pulse">
      {/* Simulate 3 Rows of suggestions */}
      {[1, 2, 3].map((item) => (
        <div key={item} className="mb-8 space-y-4">
          
          {/* Shimmer Title */}
          <div className="h-8 w-48 bg-gray-700 rounded-md mb-4"></div>
          
          {/* Shimmer Cards Row */}
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <div 
                key={card} 
                className="w-36 md:w-48 h-56 md:h-72 bg-gray-800 rounded-lg shrink-0"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GptShimmer;