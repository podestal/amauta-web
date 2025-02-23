import { motion } from 'framer-motion'
import { useState } from 'react'
import useLanguageStore from '../../hooks/store/useLanguageStore'
import Input from '../ui/Input'
import Button from '../ui/Button'

const NewPassword = () => {


    const [loading, setLoading] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const lan = useLanguageStore(s => s.lan)

    // Errors   
    const [newPasswordError, setNewPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')


    const handleNewPassword = (e:React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
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
                        value={newPassword}
                        onChange={e => {
                            newPassword && setNewPasswordError('')
                            setNewPassword(e.target.value)}}
                        error={newPasswordError}
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