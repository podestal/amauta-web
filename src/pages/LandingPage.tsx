import Hero from "../components/landing/Hero"

const LandingPage = () => {
  return (
    <div className="w-full overflow-hidden ml-0 lg:ml-0 ">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute -inset-x-8 w-[60%] h-full opacity-20" viewBox="0 0 100 100">
            <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.2"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto">
            <Hero />
        </div>

    </div>
  )
}

export default LandingPage