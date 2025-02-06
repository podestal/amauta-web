import { useEffect } from "react";
import Hero from "../components/landing/Hero"
import { motion } from "framer-motion";
import Lenis from "lenis";
import StorySection from "../components/landing/StorySection"

// IMGS
import attendanceTracking1 from '../assets/imgs/attendanceTracking1.png'
import attendanceTracking2 from '../assets/imgs/attendanceTracking2.png'
import attendanceTracking3 from '../assets/imgs/attendanceTracking3.png'

import attendanceReport1 from '../assets/imgs/attendanceReport1.png'
import attendanceReport2 from '../assets/imgs/attendanceReport2.png'
import attendanceReport3 from '../assets/imgs/attendanceReport3.png'

const features = [
  {
    id: "attendance-tracking",
    title: "Registro de Asistencia Inteligente",
    subTitle: "Escanea códigos QR o marca asistencia de manera manual con un sistema rápido y eficiente.",
    variant: 4,
    img1: attendanceTracking3,
    img2: attendanceTracking1,
    img3: attendanceTracking2,
  },
  {
    id: "attendance-reports",
    title: "Reportes Detallados de Asistencia",
    subTitle: "Obtén reportes diarios, semanales y mensuales con datos precisos sobre la asistencia de los estudiantes.",
    variant: 3,
    img1: attendanceReport1,
    img2: attendanceReport2,
    img3: attendanceReport3,
  },
  {
    id: "messaging-parents",
    title: "Notificaciones Instantáneas a Tutores",
    subTitle: "Informa a los tutores sobre faltas, tardanzas o cualquier asunto importante a través de mensajes automáticos.",
    variant: 5,
  },
  {
    id: "student-registration",
    title: "Fichas de Inscripción Digitales",
    subTitle: "Permite que la escuela o los padres registren y gestionen la información de los estudiantes de manera sencilla.",
    variant: 4,
  },
  {
    id: "parent-tracking",
    title: "Seguimiento de Asistencia para Padres",
    subTitle: "Los padres pueden acceder a la aplicación para revisar la asistencia de sus hijos y recibir mensajes importantes en tiempo real.",
    variant: 2,
  }
];

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
          {features.map((feature, index) => (
            <>
            {index === 0 && <div className="mt-72"/>}
            <StorySection key={index} title={feature.title} description={feature.subTitle} imgSrc1={feature.img1 ? feature.img1 : ''} imgSrc2={feature.img2 ? feature.img2 : ''} imgSrc3={feature.img3} variant={feature.variant} />
            <div className="mb-96"/>
            </>
          ))}
        </div>
        
    </div>
  )
}

export default LandingPage