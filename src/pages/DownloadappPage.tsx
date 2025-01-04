import InstallPWAButton from "../components/ui/InstallPWAButton";
import { motion } from "framer-motion";
import useLanguageStore from "../hooks/store/useLanguageStore";

const DownloadappPage = () => {
  const lan = useLanguageStore((s) => s.lan);

  return (
    <div className="w-full relative min-h-screen bg-transparent flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 sm:w-40 sm:h-40 bg-blue-500 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 sm:w-60 sm:h-60 bg-pink-500 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-36 h-36 sm:w-48 sm:h-48 bg-purple-500 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6"
      >
        {lan === "EN" ? "Download Our App" : "Descarga Nuestra App"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-base sm:text-lg lg:text-xl text-center max-w-xs sm:max-w-md mb-8 sm:mb-10"
      >
        {lan === "EN"
          ? "Experience the best features by installing our app on your device. It’s fast, reliable, and built for you!"
          : "Experimenta las mejores características instalando nuestra app en tu dispositivo. ¡Es rápido, confiable y está hecho para ti!"}
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="flex justify-center"
      >
        <InstallPWAButton />
      </motion.div>
    </div>
  );
};

export default DownloadappPage;
