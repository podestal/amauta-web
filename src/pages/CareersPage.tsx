import { motion } from "framer-motion";

const CareersPage = () => {
  return (
    <motion.section 
      className="w-full py-20 px-6 bg-gray-950 text-gray-200 text-center min-h-[90vh] mt-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl font-bold mb-6">🚀 Trabaja con Nosotros</h2>

      <div className="max-w-4xl mx-auto text-lg leading-relaxed text-left space-y-6">
        <p>
          En <strong>Amautapp</strong>, estamos revolucionando la educación a través de la tecnología. Buscamos personas apasionadas que deseen marcar la diferencia en el sector educativo, ofreciendo soluciones innovadoras que optimicen la gestión escolar y faciliten el aprendizaje de miles de estudiantes.  
        </p>

        <h3 className="text-2xl font-semibold mt-6">💡 ¿Por qué unirte a nuestro equipo?</h3>
        <ul className="list-disc list-inside space-y-3">
          <li>Formarás parte de un equipo **dinámico, innovador y en crecimiento**.</li>
          <li>Contribuirás a la **transformación digital de la educación**.</li>
          <li>Accederás a un ambiente de trabajo **colaborativo y flexible**.</li>
          <li>Oportunidades de crecimiento **profesional y personal**.</li>
          <li>Podrás trabajar en proyectos que impactan **miles de escuelas y estudiantes**.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6">📌 Áreas en las que buscamos talento</h3>
        <p>Estamos en constante crecimiento y buscamos profesionales en diversas áreas:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="p-4 bg-gray-900 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-blue-400">🖥️ Desarrollo Web</h4>
            <p>Buscamos desarrolladores Full-Stack con experiencia en React, Django y bases de datos SQL/NoSQL.</p>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-green-400">📞 Atención al Cliente</h4>
            <p>Si te apasiona ayudar a los demás, únete a nuestro equipo de soporte y asistencia técnica.</p>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-yellow-400">📊 Ventas y Marketing</h4>
            <p>Especialistas en estrategias de venta y marketing digital para expandir nuestro alcance.</p>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-purple-400">🎨 Diseño UX/UI</h4>
            <p>Diseñadores creativos que puedan mejorar la experiencia de usuario en nuestra plataforma.</p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mt-6">🌍 Modalidad de Trabajo</h3>
        <p>
          En Amautapp, valoramos el equilibrio entre el trabajo y la vida personal. Ofrecemos **modalidad híbrida y remota**, permitiéndote trabajar desde cualquier lugar con horarios flexibles.
        </p>

        <h3 className="text-2xl font-semibold mt-6">📬 ¿Cómo aplicar?</h3>
        <p>Si crees que tienes lo que se necesita para formar parte de nuestro equipo, envíanos tu CV y cuéntanos por qué quieres trabajar con nosotros.</p>
        
        <div className="mt-8 text-center">
          <a 
            href="mailto:rrhh@amautapp.com"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Enviar CV
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default CareersPage;
