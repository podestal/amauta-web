import { motion } from "framer-motion";

const DownloadPage = () => {
  return (
    <motion.section
      className="w-full py-20 bg-gray-950 text-gray-200 text-center min-h-[90vh] mt-20 px-4 md:px-10 lg:px-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">📲 Cómo Instalar Amautapp</h2>

      <div className="max-w-4xl mx-auto text-lg leading-relaxed text-left space-y-6">
        <p className="text-center">
          **Amautapp** es una PWA (**Progressive Web App**), lo que significa que puedes instalarla en tu celular o computadora directamente desde tu navegador, sin necesidad de descargarla desde una tienda de aplicaciones.
        </p>

        <h3 className="text-2xl font-semibold mt-6">📱 Instalar Amautapp en Android</h3>
        <ol className="list-decimal list-inside space-y-2 pl-5 md:pl-8">
          <li>Asegúrate de tener la última versión de **Google Chrome** en tu dispositivo.</li>
          <li>Abre <a href="https://amautapp.com" className="text-blue-400 hover:underline">Amautapp</a> en el navegador.</li>
          <li>Desliza la página hacia abajo hasta que aparezca la opción **"Añadir Amautapp a la pantalla de inicio"**.</li>
          <li>Toca en **"Añadir"**.</li>
          <li>Busca el ícono de Amautapp en tu pantalla de inicio y ábrela como una app nativa.</li>
        </ol>

        <h3 className="text-2xl font-semibold mt-6">💻 Instalar Amautapp en Windows</h3>
        <ol className="list-decimal list-inside space-y-2 pl-5 md:pl-8">
          <li>Asegúrate de tener la última versión de **Google Chrome** o **Microsoft Edge** en tu PC.</li>
          <li>Visita <a href="https://amautapp.com" className="text-blue-400 hover:underline">Amautapp</a> en el navegador.</li>
          <li>Haz clic en el ícono de los **tres puntos (⋮) en la parte superior derecha**.</li>
          <li>Selecciona **"Instalar Amautapp"**.</li>
          <li>Confirma la instalación y busca el acceso directo en tu escritorio o menú de inicio.</li>
        </ol>

        <h3 className="text-2xl font-semibold mt-6">🍏 Instalar Amautapp en iOS</h3>
        <ol className="list-decimal list-inside space-y-2 pl-5 md:pl-8">
          <li>Abre **Safari** y ve a <a href="https://amautapp.com" className="text-blue-400 hover:underline">Amautapp</a>.</li>
          <li>Toca el botón **Compartir** (📤).</li>
          <li>Desliza hacia abajo y selecciona **"Añadir a la pantalla de inicio"**.</li>
          <li>Presiona **"Añadir"** y busca el ícono de Amautapp en tu pantalla de inicio.</li>
        </ol>

        <p className="text-center font-semibold mt-10 text-xl">
          🚀 ¡Listo! Ya puedes disfrutar de **Amautapp** en tu dispositivo.
        </p>
      </div>
    </motion.section>
  );
};

export default DownloadPage