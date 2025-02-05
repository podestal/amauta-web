import Button from "../components/ui/Button"
import { Link, useNavigate } from "react-router-dom"
import logo from '../assets/icons/amautapp.png'


const WebNavigator = () => {

    const navigate = useNavigate()

  return (
    <div className="w-full dark:bg-neutral-950 bg-white fixed z-40 px-20">

        <div className="w-full h-20 flex justify-between items-center">
            {/* <a href="/"><img src="/images/logo.png" alt="Logo" className="w-12 h-12"/>sdasd</a> */}
            <Link
                to="/"
                className="text-3xl font-bold "
            >
                <img src={logo} width={80} alt="amautapp" className="hover:opacity-70" />
            </Link>
            <ul className="flex w-full justify-center items-center gap-32">
                <li>Home</li>
                <li>Nosotros</li>
                <li>Legal</li>
            </ul>
            <div>
                <Button 
                    label="Ingresa"
                    onClick={() => navigate('/login')}
                />
            </div>
        </div>
    </div>
  )
}

export default WebNavigator