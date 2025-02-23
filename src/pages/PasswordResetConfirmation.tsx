import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Mail } from "lucide-react";

const PasswordResetConfirmation = () => {

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center h-screen px-6"
    >
      {/* Container */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 text-center max-w-md">
        
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle className="text-green-500 w-16 h-16" />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl font-bold dark:text-white">Correo Enviado</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Si existe una cuenta con ese correo, hemos enviado un enlace para restablecer su contraseña.
        </p>

        {/* Email Icon */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mt-4"
        >
          <Mail className="text-blue-500 w-10 h-10" />
        </motion.div>

        {/* Go to Login Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6"
        >
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
          >
            Volver al inicio de sesión
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PasswordResetConfirmation;
