import { motion } from "framer-motion"
import useLanguageStore from "../../hooks/store/useLanguageStore"
import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import useRecoverPassword from "../../hooks/auth/useRecoverPassword"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {

    const lan = useLanguageStore(s => s.lan)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const recoverPassword = useRecoverPassword()

    const handleForgotPassword = (e:React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        recoverPassword.mutate(
            { credentials: { email } },
            { onSuccess: () => {
                setEmail('')
                setEmailError('')
                navigate('/reset-confirmation')
            },
            onError: (error) => {
                setLoading(false)
                setEmailError('Email not found')
                console.log(error)
            },
            onSettled: () => {
                setLoading(false)
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
                    {lan === 'EN' ? 'Password Recovery' : 'Recuperar Contraseña'}
                </motion.h2>

                {/* Form */}
                <motion.form 
                    onSubmit={handleForgotPassword} 
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Input 
                        type="text"
                        placeholder={lan === 'EN' ? "Email" : 'Correo Electrónico'}
                        value={email}
                        onChange={e => {
                            email && setEmailError('')
                            setEmail(e.target.value)}}
                        error={emailError}
                    />
                    <div className="flex justify-center">
                        <Button 
                            label={'Enviar'}
                            type="submit"
                            minWidth
                            loading={loading}
                            disabled={loading}
                        />
                    </div>
                </motion.form>
            </motion.div>
        </div>
  )
}

export default ForgotPassword