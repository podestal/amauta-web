import logo from "../assets/icons/amautapp.png";

const Footer = () => {
  return (
    <footer className="h-80 bg-black text-white">
        <div className="w-full h-full md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto">
            <div className="grid grid-cols-3 gap-10 py-12">
                <div className="w-full h-full flex flex-col justify-start items-start gap-4">
                    <div className="flex items-center justify-start gap-2">
                        <img src={logo} width={60} alt="amautapp" className="hover:opacity-70" />
                        <p className="text-lg font-bold font-poppins mt-2">Amautapp</p>
                    </div>
                    <p className="text-sm text-slate-200">Gestión Escolar Inteligente y Eficiente.</p>
                </div>
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <h2 className="text-xl font-bold mb-4">Enlaces</h2>
                    <ul className="flex flex-col gap-2">
                        <li className="hover:text-slate-200 cursor-pointer">Nosotros</li>
                        <li className="hover:text-slate-200 cursor-pointer">Carreras</li>
                        <li className="hover:text-slate-200 cursor-pointer">Contacto</li>
                    </ul>
                </div>
                <div className="w-full h-full flex flex-col justify-start items-end">
                    <h2 className="text-xl font-bold mb-4">Legal</h2>
                    <div className="flex flex-col items-end gap-2">
                        <p className="hover:text-slate-200 cursor-pointer">Términos y condiciones</p>
                        <p className="hover:text-slate-200 cursor-pointer">Política de privacidad</p>
                    </div>
                </div>

            </div>
            <div className="w-full h-20 flex justify-center items-center py-4">
                <p>Amautapp &copy; todos los derenchos reservados.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer