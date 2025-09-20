import { ScaleLoader } from "react-spinners";

const SmallLoader = ({ size }) => {
  return (
    <div
      style={{ height: `${size}vh` }}
      className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="relative">
        {/* Animated book icon */}
        <div className="text-6xl mb-4 animate-bounce">📚</div>
        
        {/* Loading text with animation */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Books</h3>
          <p className="text-gray-500 text-sm animate-pulse">Discovering amazing stories for you...</p>
        </div>
        
        {/* Enhanced loader */}
        <div className="flex justify-center">
          <ScaleLoader size={60} color="#3b82f6" speedMultiplier={1.2} />
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-200 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-200 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default SmallLoader;
