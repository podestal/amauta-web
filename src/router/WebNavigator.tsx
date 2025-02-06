import { Link, useNavigate } from "react-router-dom"
import logo from '../assets/icons/amautapp.png'


const WebNavigator = () => {

    const navigate = useNavigate()

  return (
    <div className="w-full bg-gray-950 text-slate-50 flex justify-center z-50 fixed">
        <div className="w-full md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px]">
            <div className="w-full h-20 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-3xl font-bold"
                >
                    <img src={logo} width={80} alt="amautapp" className="hover:opacity-70" />
                    {/* <p className="text-xs">Amautapp</p> */}
                </Link>
                <ul className="flex w-full justify-center items-center gap-32">
                    <li className="hover:text-slate-400 cursor-pointer">Nosotros</li>
                    <li className="hover:text-slate-400 cursor-pointer">Legal</li>
                    <li className="hover:text-slate-400 cursor-pointer">Contacto</li>
                </ul>
                <button 
                    onClick={() => navigate('/login')}
                    className="relative px-8 py-2 text-white font-semibold rounded-lg border-2 border-transparent bg-neutral-950 
                before:absolute before:-inset-1 before:rounded-lg before:bg-gradient-to-r before:from-purple-500 before:to-blue-500 
                before:-z-10 before:opacity-100 hover:before:opacity-75 transition-all text-xs">
                    Ingresa
                </button>
            </div>
        </div>
    </div>
  )
}

export default WebNavigator