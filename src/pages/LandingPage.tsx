import Hero from "../components/landing/Hero"
import { motion } from "framer-motion";

interface FeatureSectionProps {
  title: string;
  description: string;
  imgSrc: string;
  reverse?: boolean; // For alternating layouts
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, description, imgSrc, reverse = false }) => {
  return (
    <motion.div
      className={`h-screen flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-10 p-10 ${reverse ? "md:flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Image */}
      <motion.img
        src={imgSrc}
        alt={title}
        className="w-full max-w-md rounded-lg shadow-lg"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Text Content */}
      <div className="text-center md:text-left">
        <h3 className="text-4xl font-bold text-black dark:text-white">{title}</h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">{description}</p>
      </div>
    </motion.div>
  );
};

interface StorySectionProps {
  title: string;
  description: string;
  imgSrc1: string;
  imgSrc2: string;
  imgSrc3?: string;
  variant?: number; // NEW PROP for different layouts
}

const StorySection: React.FC<StorySectionProps> = ({ title, description, imgSrc1, imgSrc2, imgSrc3, variant = 1 }) => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Different Layouts Based on `variant` */}
      {variant === 1 && (
        // 1️⃣ Middle Text, Side Images
        <motion.div
          className="relative flex flex-col md:flex-row items-center justify-center gap-10"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.img src={imgSrc1} alt="Feature Image 1" className="w-1/3 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }} viewport={{ once: false }} />

          <div className="text-center md:text-left max-w-lg">
            <motion.h3 className="text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }} viewport={{ once: false }}>{title}</motion.h3>
            <motion.p className="mt-4 text-lg text-gray-300"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }} viewport={{ once: false }}>{description}</motion.p>
          </div>

          <motion.img src={imgSrc2} alt="Feature Image 2" className="w-1/3 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }} viewport={{ once: false }} />
        </motion.div>
      )}

      {variant === 2 && (
        // 2️⃣ Left Text + Images Fade In from Top & Bottom
        <motion.div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full p-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: false }}>
          <div className="text-left w-1/3">
            <motion.h3 className="text-5xl font-bold text-white" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}>{title}</motion.h3>
            <motion.p className="mt-4 text-lg text-gray-300" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}>{description}</motion.p>
          </div>
          <motion.img src={imgSrc1} className="w-1/3 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -100 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }} />
          <motion.img src={imgSrc2} className="w-1/3 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }} />
        </motion.div>
      )}

      {variant === 3 && (
        // 3️⃣ Bottom Text + Images Slide In from Left & Right
        <motion.div className="relative flex flex-col items-center justify-end h-full pb-20"
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }} viewport={{ once: false }}>
          <motion.img src={imgSrc1} className="absolute left-10 top-1/4 w-1/4 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }} />
          <motion.img src={imgSrc2} className="absolute right-10 top-1/4 w-1/4 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }} />
          <div className="text-center">
            <motion.h3 className="text-5xl font-bold text-white">{title}</motion.h3>
            <motion.p className="mt-4 text-lg text-gray-300">{description}</motion.p>
          </div>
        </motion.div>
      )}

{variant === 4 && (
  // 4️⃣ Full-Screen Background Image + Floating Text & Images
  <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
    {/* Background Image */}
    <motion.div 
      className="absolute inset-0 bg-cover bg-center brightness-75" 
      style={{ backgroundImage: `url(${imgSrc1})` }} 
      initial={{ opacity: 0, scale: 1.2 }} 
      whileInView={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 1 }} 
      viewport={{ once: false }} 
    />

    {/* Floating Text */}
    <motion.div 
      className="relative text-center z-10 p-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
    >
      <h3 className="text-5xl font-bold text-white">{title}</h3>
      <p className="mt-4 text-lg text-gray-300">{description}</p>
    </motion.div>

    {/* Floating Images (Optional) */}
    <motion.img 
      src={imgSrc2} 
      alt="Floating Image 1" 
      className="absolute top-10 left-10 w-1/4 rounded-lg shadow-lg"
      initial={{ opacity: 0, x: -50 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, delay: 0.2 }} 
      viewport={{ once: false }}
    />

    <motion.img 
      src={imgSrc3} 
      alt="Floating Image 2" 
      className="absolute bottom-10 right-10 w-1/4 rounded-lg shadow-lg"
      initial={{ opacity: 0, x: 50 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, delay: 0.3 }} 
      viewport={{ once: false }}
    />
  </div>
)}



      {variant === 5 && (
        // 5️⃣ Staggered Images + Typewriter Text
        <motion.div className="relative flex flex-col items-center justify-center text-center w-full p-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: false }}>
          <motion.img src={imgSrc1} className="absolute top-10 left-10 w-1/4 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }} />
          <motion.img src={imgSrc2} className="absolute bottom-10 right-10 w-1/4 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }} />
          <motion.h3 className="text-5xl font-bold text-white">{title}</motion.h3>
          <motion.p className="mt-4 text-lg text-gray-300">{description}</motion.p>
        </motion.div>
      )}
    </div>
  );
};



const LandingPage = () => {

  const gridVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 0.2, scale: 1, transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const } },
  };

  return (
    <div className="w-full overflow-hidden ml-0 lg:ml-0 ">
        
        <div className="max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto">
          <div className="relative h-screen flex flex-col justify-center items-center gap-4">
          <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -inset-x-8 w-[60%] h-full"
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
          {/* <FeatureSection 
            title="Gestión Escolar Inteligente y Eficiente."
            description="Una plataforma inteligente que simplifica la administración escolar. Registra asistencia en tiempo real, gestiona calificaciones, envía notificaciones a los padres y genera reportes detallados, todo desde un solo lugar. Optimiza la comunicación y el control académico con tecnología moderna y eficiente."
            imgSrc="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=3220&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
            
            <FeatureSection 
            title="Gestión Escolar Inteligente y Eficiente."
            description="Una plataforma inteligente que simplifica la administración escolar. Registra asistencia en tiempo real, gestiona calificaciones, envía notificaciones a los padres y genera reportes detallados, todo desde un solo lugar. Optimiza la comunicación y el control académico con tecnología moderna y eficiente."
            imgSrc="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=3220&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <FeatureSection 
            title="Gestión Escolar Inteligente y Eficiente."
            description="Una plataforma inteligente que simplifica la administración escolar. Registra asistencia en tiempo real, gestiona calificaciones, envía notificaciones a los padres y genera reportes detallados, todo desde un solo lugar. Optimiza la comunicación y el control académico con tecnología moderna y eficiente."
            imgSrc="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=3220&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />  */}
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