// import { RiMailFill, RiMapPinFill, RiPhoneFill } from '@remixicon/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Aquí podrías enviar los datos a una API o backend
  };

  return (
    <motion.section 
      className="w-full py-20 px-6 bg-gray-950 text-gray-200 text-center min-h-[90vh] mt-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl font-bold mb-6">📞 Contáctanos</h2>
      <p className="max-w-3xl mx-auto text-lg leading-relaxed">
        ¿Tienes dudas o necesitas ayuda? Contáctanos y nuestro equipo estará encantado de asistirte.  
        Si deseas probar nuestra plataforma, solicita una <strong>Demo Gratuita</strong> llenando el siguiente formulario.
      </p>

      {/* Información de Contacto
      <div className="mt-8 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <RiMailFill className="text-blue-500 text-2xl" />
          <p className="text-lg">info@colegiotech.com</p>
        </div>
        <div className="flex items-center gap-4">
          <RiPhoneFill className="text-green-500 text-2xl" />
          <p className="text-lg">+51 987 654 321</p>
        </div>
        <div className="flex items-center gap-4">
          <RiMapPinFill className="text-red-500 text-2xl" />
          <p className="text-lg">Av. Educación 123, Lima, Perú</p>
        </div>
      </div> */}

      {/* Formulario de Solicitud de Demo */}
      <motion.div 
        className="max-w-3xl mx-auto mt-12 bg-gray-900 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-4">🚀 Solicita una Demo Gratuita</h3>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="text" 
              name="name" 
              placeholder="Nombre y Apellido"
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input 
              type="text" 
              name="school" 
              placeholder="Nombre de la Institución"
              value={formData.school}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <textarea 
              name="message"
              placeholder="Mensaje (Opcional)"
              value={formData.message}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              rows={4}
            ></textarea>
            <div className='w-[30%] mx-auto my-6'>
                <button 
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
                >
                Solicitar Demo
                </button>
            </div>
          </form>
        ) : (
          <p className="text-green-400 font-semibold mt-4">
            ✅ ¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.
          </p>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ContactPage;
