import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => navigate("/"), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center h-screen px-6"
    >
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 text-center max-w-md">
        {/* ✅ Animated Check Icon */}
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle className="text-green-500 w-16 h-16" />
        </motion.div>

        {/* 🎉 Success Message */}
        <h2 className="text-2xl font-bold dark:text-white">
          ¡Contraseña Actualizada!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Ahora puedes iniciar sesión con tu nueva contraseña.
        </p>

        {/* 🔄 Auto Redirect Message */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-6 animate-pulse">
          Redirigiendo a la página de inicio de sesión...
        </p>
      </div>
    </motion.div>
  );
};

export default PasswordResetSuccess;
