import { motion } from 'framer-motion'
import { useState } from 'react'
import useLanguageStore from '../../hooks/store/useLanguageStore'
import Input from '../ui/Input'
import Button from '../ui/Button'
import useNewPassword from '../../hooks/auth/useNewPassword'
import useNotificationsStore from '../../hooks/store/useNotificationsStore'
import { useNavigate } from 'react-router-dom'

interface Props {
    uid: string
    token: string
}

const NewPassword = ({ uid, token }: Props) => {


    const [loading, setLoading] = useState(false)
    const { setMessage, setShow, setType } = useNotificationsStore()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const lan = useLanguageStore(s => s.lan)

    // Errors   
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    // Handle New Password
    const newPassword = useNewPassword()

    const handleNewPassword = (e:React.FormEvent) => {
        e.preventDefault()

        if (!password) {
            setPasswordError('Este campo es requerido')
            return
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Este campo es requerido')
            return
        }

        if (password !== confirmPassword) {
            setShow(true)
            setType('error')
            setMessage('Las contraseña no coinciden')
            return
        }

        setLoading(true)
        newPassword.mutate({
            credentials: {
                uid,
                token,
                new_password: password,
            }
        }, {
            onSuccess: () => {
                setPassword('')
                setConfirmPassword('')
                setPasswordError('')
                setConfirmPasswordError('')
                navigate('/reset-success')

            },
            onError: (error) => {
                setLoading(false)
                console.log(error)
            },
            onSettled: () => {
                setLoading(false)
            }
        })
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
                    {lan === 'EN' ? 'New Password' : 'Nueva Contraseña'}
                </motion.h2>

                {/* Form */}
                <motion.form 
                    onSubmit={handleNewPassword} 
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Input 
                        type="password"
                        placeholder={lan === 'EN' ? "New Password" : 'Nueva Contraseña'}
                        value={password}
                        onChange={e => {
                            newPassword && setPasswordError('')
                            setPassword(e.target.value)}}
                        error={passwordError}
                    />

                    <Input 
                        type="password"
                        placeholder={lan === 'EN' ? "Confirm Password" : 'Confirma Contraseña'}
                        value={confirmPassword}
                        onChange={e => {
                            confirmPassword && setConfirmPasswordError('')
                            setConfirmPassword(e.target.value)}}
                        error={confirmPasswordError}
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

export default NewPassword