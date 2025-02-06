import { useEffect } from "react";
import Hero from "../components/landing/Hero"
import { motion } from "framer-motion";
import Lenis from "lenis";
import StorySection from "../components/landing/StorySection"

const LandingPage = () => {

  const gridVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 0.2, scale: 1, transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const } },
  };

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
  
      requestAnimationFrame(raf)
}, [])

  return (
    <div className="w-full overflow-hidden ml-0 lg:ml-0 ">
        
        <div className="max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto">
          <div className="relative h-screen flex flex-col justify-center items-center gap-4">
          <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -inset-x-8 w-[80%] h-full"
              viewBox="0 0 100 100"
              initial="hidden"
              animate="visible"
              variants={gridVariants}
            >
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </motion.svg>
            <Hero />
          </div>
          <StorySection title="Gestión Escolar Inteligente" description="..." imgSrc1="..." imgSrc2="..." variant={1} />
          <StorySection title="Asistencia en Tiempo Real" description="..." imgSrc1="..." imgSrc2="..." variant={2} />
          <StorySection title="Calificaciones Digitales" description="..." imgSrc1="..." imgSrc2="..." variant={3} />
          <StorySection title="Comunicación con Padres" description="..." imgSrc1="..." imgSrc2="..." variant={4} />
          <StorySection title="Reportes y Análisis" description="..." imgSrc1="..." imgSrc2="..." variant={5} />
        </div>
        
    </div>
  )
}

export default LandingPage