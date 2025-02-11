import { useState } from "react";
import useLanguageStore from "../../hooks/store/useLanguageStore";
import Input from "../ui/Input"
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";
import useNotificationsStore from "../../hooks/store/useNotificationsStore";
import { motion } from "framer-motion";

const Login = () => {
    
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const lan = useLanguageStore(s => s.lan)
    const navigate = useNavigate()
    const login = useLogin()
    const { setShow, setType, setMessage } = useNotificationsStore()

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        setUsernameError('')
        setPasswordError('')

        if (!username) {
            setUsernameError('Username is required')
            return
        }

        if (!password) {
            setPasswordError('Password is required')
            return
        }

        setLoading(true)

        login.mutate(
            { credentials: { username, password } },
            { 
            onSettled: () => {  
                setLoading(false)
            },
            onSuccess: () => {
                navigate('/app/students-main')
            },
            onError: error => {
                setShow(true);
                setType("error");
            
                // Extract specific API error messages or use a default one
                let errorMessage = "Ha ocurrido un error. Inténtalo de nuevo.";
            
                if (error.response) {
                    if (error.response.status === 401) {
                        errorMessage = "Credenciales incorrectas. Verifica tu usuario y contraseña.";
                    } else if (error.response.status === 400) {
                        errorMessage = "Solicitud incorrecta. Revisa los datos ingresados.";
                    } else if (error.response.status === 500) {
                        errorMessage = "Error en el servidor. Inténtalo más tarde.";
                    } else {
                        errorMessage = typeof error.response.data === 'string' ? error.response.data : error.message;
                    }
                }
            
                setMessage(`❌ ${errorMessage}`)
            }
            }
        )

    }

  return (
<div className="w-full min-h-screen flex justify-center items-center relative  overflow-hidden">
            {/* Glowing Floating Lights */}


            {/* Login Card */}
            <motion.div 
                className="relative w-[90%] sm:w-[60%] md:w-[40%] lg:w-[25%] bg-white/5 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-white/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Title */}
                <motion.h2 
                    className="text-4xl font-bold text-white text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {lan === 'EN' ? 'Login' : 'Accede'}
                </motion.h2>

                {/* Form */}
                <motion.form 
                    onSubmit={handleLogin} 
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Input 
                        type="text"
                        placeholder={lan === 'EN' ? "Username" : 'Nombre de usuario'}
                        value={username}
                        onChange={e => {
                            username && setUsernameError('')
                            setUsername(e.target.value)}}
                        error={usernameError}
                    />

                    <Input 
                        type="password"
                        placeholder={lan === 'EN' ? "Password" : 'Contraseña'}
                        value={password}
                        onChange={e => {
                            password && setPasswordError('')
                            setPassword(e.target.value)}}
                        error={passwordError}
                    />
                    <div className="flex justify-center">
                        <Button 
                            label={'Accede'}
                            type="submit"
                            minWidth
                            loading={loading}
                            disabled={loading}
                        />
                    </div>
                    <p className="text-xs text-center hover:text-blue-500 cursor-pointer">Olvidaeste tu Contraseña?</p>
                </motion.form>
            </motion.div>
        </div>
  )
}

export default Login