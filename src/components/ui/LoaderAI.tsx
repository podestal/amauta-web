const LoaderAI = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-10 text-white">
        {/* Spinning conic loader */}
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,red,orange,yellow,green,blue,indigo,violet,red)] animate-spin-slow"></div>
            <div className="absolute inset-1 bg-gray-900 rounded-full"></div>
        </div>

        {/* Animated text messages */}
        <div className="flex flex-col items-center text-center text-lg font-medium space-y-1">
            <span className="animate-pulse">Un momento...</span>
            <span className="text-sm text-gray-400">Estamos generando su clase</span>
        </div>
    </div>
  )
}

export default LoaderAI