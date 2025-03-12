import { motion } from "framer-motion";

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4 px-4 sm:px-8 relative text-center">
      <motion.div 
        className="flex flex-col justify-center items-center gap-4"
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="font-poppins text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight sm:leading-[4rem] md:leading-[5rem] lg:leading-[6.5rem] text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          Gestión Escolar Inteligente y Eficiente.
        </motion.h2>

        <motion.p 
          className="font-inter text-slate-800 dark:text-slate-400 text-base sm:text-lg md:text-xl text-center max-w-3xl"
          variants={heroVariants}
        >
          Una plataforma inteligente que simplifica la administración escolar. Registra asistencia en tiempo real, gestiona calificaciones, 
          envía notificaciones a los padres y genera reportes detallados, todo desde un solo lugar. Optimiza la comunicación y el control 
          académico con tecnología moderna y eficiente.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero;
