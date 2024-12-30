import { useState } from "react";
import useLanguageStore from "../../hooks/store/useLanguageStore";
import Input from "../ui/Input"
import Button from "../ui/Button";

const Login = () => {
    
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const lan = useLanguageStore(s => s.lan)

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)

        setUsernameError('')
        setPasswordError('')

        if (!email) {
            setUsernameError('Username is required')
            return
        }

        if (!password) {
            setPasswordError('Password is required')
            return
        }

        setLoading(false)

    }

  return (
    <div className="w-[60%] lg:w-[20%] mx-auto">
        <h2 className="text-4xl font-bold font-palanquin text-center mb-12">{lan === 'EN' ? 'Login' : 'Accede'}</h2>
        <form 
            onSubmit={handleLogin}
            className="w-full h-[60%] flex flex-col justify-start items-center gap-10">
            <Input 
                placeholder={lan === 'EN' ? "Email" : 'Correo Electrónico'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={usernameError}
                
            />
            <Input 
                placeholder={lan === 'EN' ? "Password" : 'Contraseña'}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={passwordError}
            />
            <Button 
                label={lan === 'EN' ? 'Login' : 'Accede'}
                loading={loading}
            />
        </form>
        {/* <p className="text-sm mt-6">Do not have an account? <Link className="dark:text-blue-600 text-blue-700 font-semibold hover:text-blue-500" to='/signup'>Register</Link></p> */}
    </div>
  )
}

export default Login