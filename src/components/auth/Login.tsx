import { useState } from "react";
import useLanguageStore from "../../hooks/store/useLanguageStore";
import Input from "../ui/Input"
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";
import useNotificationsStore from "../../hooks/store/useNotificationsStore";

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
                setShow(true)
                setType('error')
                setMessage(`Error: ${error.message}`)
            }
            }
        )

    }

  return (
    <div className="w-[60%] lg:w-[20%] mx-auto">
        <h2 className="text-4xl font-bold font-palanquin text-center mb-12">{lan === 'EN' ? 'Login' : 'Accede'}</h2>
        <form 
            onSubmit={handleLogin}
            className="w-full h-[60%] flex flex-col justify-start items-center gap-10">
            <Input 
                placeholder={lan === 'EN' ? "Username" : 'Usuario'}
                value={username}
                onChange={e => setUsername(e.target.value)}
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
    </div>
  )
}

export default Login