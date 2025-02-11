import { RiFacebookBoxFill, RiInstagramFill, RiTwitterXFill } from "@remixicon/react";
import logo from "../assets/icons/amautapp.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12 max-lg:hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} width={60} alt="Amautapp" className="hover:opacity-70" />
              <p className="text-lg font-bold font-poppins">Amautapp</p>
            </div>
            <p className="text-sm text-slate-300">
              Gestión Escolar Inteligente y Eficiente.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col justify-start items-center">
            <h2 className="text-xl font-bold mb-4 text-slate-200">Enlaces</h2>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="hover:text-blue-400 transition cursor-pointer">Nosotros</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Carreras</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Contacto</li>
            </ul>
          </div>

          {/* Legal & Socials */}
          <div className="flex flex-col justify-start items-end">
            <h2 className="text-xl font-bold mb-4 text-slate-200">Legal</h2>
            <div className="flex flex-col items-end gap-2 text-sm">
              <p className="hover:text-blue-400 transition cursor-pointer">Términos y condiciones</p>
              <p className="hover:text-blue-400 transition cursor-pointer">Política de privacidad</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6">
              <RiFacebookBoxFill className="text-2xl hover:text-blue-500 cursor-pointer transition" />
              <RiInstagramFill className="text-2xl hover:text-pink-500 cursor-pointer transition" />
              <RiTwitterXFill className="text-2xl hover:text-gray-500 cursor-pointer transition" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="w-full text-center border-t border-gray-700 mt-10 pt-4 text-sm text-slate-400">
          Amautapp &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
