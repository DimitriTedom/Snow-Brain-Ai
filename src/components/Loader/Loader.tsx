const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Main Loading Animation */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-spin border-t-blue-400"></div>
        {/* Inner ring */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-white/20 rounded-full animate-spin animate-reverse border-t-purple-400"></div>
        {/* Center dot */}
        <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Snow Brain AI
        </h3>
        <p className="text-white/60 text-sm animate-pulse">
          Initializing AI Assistant...
        </p>
      </div>

      {/* Loading Dots */}
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
}

export default Loader