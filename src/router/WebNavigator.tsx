import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/icons/amautapp.png";

const navVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.5 } },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const WebNavigator = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="w-full bg-gray-950 text-slate-50 flex justify-center z-50 fixed top-0 max-lg:hidden"
      initial="hidden"
      animate="visible"
    >
      <div className="w-full md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px]">
        <motion.div className="w-full h-20 flex justify-between items-center" variants={navVariants}>
          
          {/* Logo (Fades in, no movement) */}
          <motion.div variants={fadeInVariants}>
            <Link to="/home" className="text-3xl font-bold flex justify-center items-center gap-2 hover:opacity-70">
              <motion.img src={logo} width={80} alt="amautapp"/>
              <p className="text-lg font-bold font-poppins mt-2">Amautapp</p>
            </Link>
          </motion.div>

          {/* Navigation Links (Still animates from top to bottom) */}
          <motion.ul className="flex w-full justify-center items-center gap-32" variants={navVariants}>
            <motion.li className="hover:text-slate-400 cursor-pointer" variants={navVariants}><Link to='about'>Nosotros</Link></motion.li>
            <motion.li className="hover:text-slate-400 cursor-pointer" variants={navVariants}><Link to='careers'>Carreras</Link></motion.li>
            <motion.li className="hover:text-slate-400 cursor-pointer" variants={navVariants}><Link to='contact'>Contacto</Link></motion.li>
          </motion.ul>

          {/* Login Button (Fades in, no movement) */}
          <motion.button 
            onClick={() => navigate('/')}
            className="relative px-8 py-2 text-white font-semibold rounded-lg border-2 border-transparent bg-neutral-950 
            before:absolute before:-inset-1 before:rounded-lg before:bg-gradient-to-r before:from-purple-500 before:to-blue-500 
            before:-z-10 before:opacity-100 hover:before:opacity-75 transition-all text-xs"
          >
            Ingresa
          </motion.button>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default WebNavigator;
