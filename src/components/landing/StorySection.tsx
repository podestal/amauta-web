import { motion } from "framer-motion";

interface StorySectionProps {
    title: string;
    description: string;
    imgSrc1: string;
    imgSrc2: string;
    imgSrc3?: string;
    variant?: number; 
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
  
            <div className="md:text-left max-w-lg">
              <motion.h3 className="text-5xl font-bold text-white text-center"
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }} viewport={{ once: false }}>{title}</motion.h3>
              <motion.p className="mt-4 text-lg text-gray-300 text-center"
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
            <motion.img src={imgSrc3} className="w-1/3 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }} />
          </motion.div>
        )}
  
        {variant === 3 && (
          // 3️⃣ Bottom Text + Images Slide In from Left & Right
          <motion.div className="relative flex flex-col items-center justify-end h-full w-full pb-20"
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }} viewport={{ once: false }}>
            <motion.img src={imgSrc1} className="w-[600px] absolute top-0 left-0 rounded-lg shadow-lg z-10"
              initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }} />
            <motion.img src={imgSrc2} className=" w-[600px] absolute bottom-52 right-0 rounded-lg shadow-lg"
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
        className="absolute inset-0 bg-no-repeat bg-center brightness-50" 
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
        <motion.img src={imgSrc1} className="absolute top-10 left-10 w-[50%] rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }} />
        <motion.img src={imgSrc2} className="absolute bottom-10 right-10 w-[50%] rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }} />
        <motion.h3 className="text-5xl font-bold text-white z-20">{title}</motion.h3>
        <motion.p className="mt-4 text-lg text-gray-300 z-20">{description}</motion.p>
      </motion.div>
    )}
      </div>
    );
  };
  
export default StorySection;  