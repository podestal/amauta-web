import { motion } from 'framer-motion';
import AIButton from '../components/ui/AIForms/AIButton';

const tiers = [
  {
    name: 'Gratis',
    price: 'S/ 0',
    description: 'Ideal para comenzar y explorar las funciones básicas.',
    features: [
      'Asistencias',
      'Comunicación con padres',
    ],
    cta: 'Comenzar',
  },
  {
    name: 'Amautapp',
    price: 'S/ 9.99',
    description: 'Perfecto para docentes que desean automatizar su aula.',
    features: [
      'Asistencias',
      'Crear lecciones con IA',
      'Crear actividades con IA',
      'Comunicación con padres y notificaciones',
    ],
    cta: 'Suscribirse',
  },
  {
    name: 'Amautapp Pro',
    price: 'S/ 19.99',
    description: 'Todo lo que necesitas para una gestión educativa completa.',
    features: [
      'Todo en Amautapp',
      'Calificación automática de actividades',
      'Conexión automática a SIEGIE',
      'Generación de reportes',
    ],
    cta: 'Actualizar a Pro',
  },
  {
    name: 'Instituciones Educativas',
    price: 'Contáctanos',
    description: 'Soluciones personalizadas para colegios y entidades.',
    features: [
      'Panel administrativo completo',
      'Módulo de reportes institucionales',
      'Soporte dedicado',
      'Integración con sistemas existentes',
    ],
    cta: 'Contactar',
  },
];

const PricesPage = () => {
  return (
    <div className="mt-20 min-h-screen  text-gray-900 dark:text-white py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Planes de Suscripción</h1>
        <p className="text-gray-600 dark:text-gray-400">Elige el plan que mejor se adapte a tus necesidades educativas.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl shadow-lg p-6 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{tier.name}</h2>
              <p className="text-3xl font-bold mb-4">{tier.price}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tier.description}</p>
              <ul className="space-y-2 text-sm text-left">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2 text-blue-500">✔️</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            {/* <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition font-semibold">
              {tier.cta}
            </button> */}
            <AIButton 
                label={tier.cta}
                onClick={() => console.log(`Clicked on ${tier.cta}`)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricesPage;
