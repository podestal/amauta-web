// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import logo from "../assets/icons/amautapp.png";

// const navVariants = {
//   hidden: { opacity: 0, y: -30 },
//   visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.5 } },
// };

// const fadeInVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.5 } },
// };

// const WebNavigator = () => {
//   const navigate = useNavigate();

//   return (
//     <motion.div 
//       className="w-full bg-gray-950 text-slate-50 flex justify-center z-50 fixed top-0 max-lg:hidden"
//       initial="hidden"
//       animate="visible"
//     >
//       <div className="w-full md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px]">
//         <motion.div className="w-full h-20 flex justify-between items-center" variants={navVariants}>
          
//           {/* Logo (Fades in, no movement) */}
//           <motion.div variants={fadeInVariants}>
//             <Link to="/home" className="text-3xl font-bold flex justify-center items-center gap-2 hover:opacity-70">
//               <motion.img src={logo} width={80} alt="amautapp"/>
//               <p className="text-lg font-bold font-poppins mt-2">Amautapp</p>
//             </Link>
//           </motion.div>

//           {/* Navigation Links (Still animates from top to bottom) */}
//           <motion.ul className="flex w-full justify-center items-center gap-32" variants={navVariants}>
//             <motion.li className="hover:text-slate-400 cursor-pointer" variants={navVariants}><Link to='about'>Nosotros</Link></motion.li>
//             <motion.li className="hover:text-slate-400 cursor-pointer" variants={navVariants}><Link to='careers'>Carreras</Link></motion.li>
//             <motion.li className="hover:text-slate-400 cursor-pointer" variants={navVariants}><Link to='contact'>Contacto</Link></motion.li>
//           </motion.ul>

//           {/* Login Button (Fades in, no movement) */}
          // <motion.button 
          //   onClick={() => navigate('/')}
          //   className="relative px-8 py-2 text-white font-semibold rounded-lg border-2 border-transparent bg-neutral-950 
          //   before:absolute before:-inset-1 before:rounded-lg before:bg-gradient-to-r before:from-purple-500 before:to-blue-500 
          //   before:-z-10 before:opacity-100 hover:before:opacity-75 transition-all text-xs"
          // >
          //   Ingresa
          // </motion.button>

//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default WebNavigator;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../assets/icons/amautapp.png";

const navVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.5 } },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const WebNavigator = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      className="w-full text-white bg-gray-950 fixed top-0 z-50 max:lg:backdrop-blur-md max:lg:bg-opacity-80"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <motion.div variants={fadeInVariants}>
          <Link to="/home" className="flex items-center gap-2 hover:opacity-70">
            <img src={logo} width={50} alt="Amautapp" />
            <p className="text-lg font-bold font-poppins">Amautapp</p>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul className="hidden md:flex gap-10" variants={navVariants}>
          <motion.li className="hover:text-gray-400 cursor-pointer" variants={navVariants}><Link to='about'>Nosotros</Link></motion.li>
          <motion.li className="hover:text-gray-400 cursor-pointer" variants={navVariants}><Link to='careers'>Carreras</Link></motion.li>
          <motion.li className="hover:text-gray-400 cursor-pointer" variants={navVariants}><Link to='contact'>Contacto</Link></motion.li>
        </motion.ul>

        {/* Login Button */}
        {/* <motion.button 
          onClick={() => navigate('/')} 
          className="hidden md:block px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-80 transition-all"
        >
          Ingresa
        </motion.button> */}
        <motion.button 
            onClick={() => navigate('/')}
            className="hidden md:block relative px-8 py-2 text-white font-semibold rounded-lg border-2 border-transparent bg-neutral-950 
            before:absolute before:-inset-1 before:rounded-lg before:bg-gradient-to-r before:from-purple-500 before:to-blue-500 
            before:-z-10 before:opacity-100 hover:before:opacity-75 transition-all text-xs"
        >
            Ingresa
        </motion.button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="  top-20 left-0 w-full z-50 backdrop-blur-md bg-opacity-8  bg-opacity-90 p-6 flex flex-col items-center gap-6 md:hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link to="about" className="text-lg hover:text-gray-400" onClick={() => setIsOpen(false)}>Nosotros</Link>
            <Link to="careers" className="text-lg hover:text-gray-400" onClick={() => setIsOpen(false)}>Carreras</Link>
            <Link to="contact" className="text-lg hover:text-gray-400" onClick={() => setIsOpen(false)}>Contacto</Link>
            <Link to="download" className="text-lg hover:text-gray-400" onClick={() => setIsOpen(false)}>Descargar</Link>
            <motion.button 
            onClick={() => navigate('/')}
            className="relative px-8 py-2 text-white font-semibold rounded-lg border-2 border-transparent bg-neutral-950 
            before:absolute before:-inset-1 before:rounded-lg before:bg-gradient-to-r before:from-purple-500 before:to-blue-500 
            before:-z-10 before:opacity-100 hover:before:opacity-75 transition-all text-xs"
          >
            Ingresa
          </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default WebNavigator;

