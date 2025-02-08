import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <motion.section 
          className="w-full py-20 bg-gray-950 text-gray-200 text-center min-h-[90vh] mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">Sobre Nosotros</h2>
          
          <div className="max-w-4xl mx-auto text-lg leading-relaxed text-left space-y-6">
            <p>
              Nuestra plataforma ha sido diseñada para **modernizar y simplificar la gestión escolar**, proporcionando herramientas intuitivas que optimizan el trabajo administrativo y facilitan la interacción entre docentes, alumnos y padres de familia. 
            </p>

            <h3 className="text-2xl font-semibold mt-6">📌 Un Ecosistema Completo para Escuelas</h3>
            <p>
              Desde el **registro y control de asistencia** hasta la **generación de reportes detallados**, nuestra aplicación proporciona un entorno digital seguro y eficiente donde cada aspecto de la gestión escolar puede ser administrado con facilidad.  
            </p>

            <h3 className="text-2xl font-semibold mt-6">📝 Registro de Asistencia Inteligente</h3>
            <p>
              Nuestra plataforma permite **marcar asistencia en tiempo real** mediante **códigos QR y validación manual**, asegurando un control preciso de la puntualidad de los alumnos. Además, se pueden **automatizar notificaciones** a los tutores en caso de tardanzas o inasistencias.
            </p>

            <h3 className="text-2xl font-semibold mt-6">📊 Reportes Académicos y de Asistencia</h3>
            <p>
              Generamos informes detallados sobre **asistencias, rendimiento académico y actividad escolar**, permitiendo a los directivos y docentes tomar decisiones informadas para mejorar la educación.
            </p>

            <h3 className="text-2xl font-semibold mt-6">👨‍👩‍👦 Gestión de Estudiantes, Tutores y Docentes</h3>
            <p>
              Cada institución podrá **crear perfiles personalizados** para estudiantes, padres de familia, asistentes y docentes, asignando roles y permisos según sus funciones. 
            </p>

            <h3 className="text-2xl font-semibold mt-6">📩 Mensajería y Notificaciones en Tiempo Real</h3>
            <p>
              La comunicación entre la escuela y los padres es esencial. Nuestra aplicación envía **mensajes automáticos** para informar sobre eventos, reuniones, retrasos o cualquier novedad importante, manteniendo a todos informados en todo momento.
            </p>

            <h3 className="text-2xl font-semibold mt-6">📱 Plataforma Multiplataforma y Segura</h3>
            <p>
              Nuestra solución es compatible con **dispositivos móviles y computadoras**, permitiendo a docentes y administrativos acceder desde cualquier lugar. Además, garantizamos la **seguridad y privacidad** de los datos mediante tecnología de cifrado avanzada.
            </p>

            <h3 className="text-2xl font-semibold mt-6">🤖 Futuro: Automatización y Asistentes Inteligentes</h3>
            <p>
              Estamos desarrollando nuevas funcionalidades para **automatizar tareas repetitivas** y permitir que los docentes se concentren en lo más importante: **enseñar y guiar a sus alumnos**. Implementaremos inteligencia artificial para optimizar la gestión de calificaciones y tareas administrativas.
            </p>

            <h3 className="text-2xl font-semibold mt-6">🌍 Nuestra Misión</h3>
            <p>
              Nuestra meta es transformar la educación con tecnología accesible e intuitiva, brindando herramientas innovadoras para facilitar el trabajo de los docentes y mejorar la experiencia de aprendizaje de los estudiantes.
            </p>

            <p className="text-center font-semibold mt-10 text-xl">
              ¡Únete a la revolución digital en la educación con nuestra plataforma! 🚀
            </p>
          </div>
        </motion.section>
      );
}

export default AboutPage;
