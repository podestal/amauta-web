import { useState } from "react"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import useSignUp from "../../../hooks/auth/useSignUp"

interface Props {
    group: string
    name: string
}

const StaffForm = ({ group, name }: Props) => {

    const [dni, setDni] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    // const [selectedClassrooms, setSelectedClassrooms] = useState([])

    const signUp = useSignUp()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const username = email.split('@')[0]
        const password = `${firstName.toLowerCase()}${dni}}`


        signUp.mutate({ user: {
            username,
            email,
            profile: group,
            first_name: firstName,
            last_name: lastName,
            password
        }})
    }

  return (
    <form onSubmit={handleSubmit}>
        <h2>Nuevo {name}</h2>
        <Input 
            label="DNI"
            placeholder="DNI.."
            value={dni}
            onChange={e => setDni(e.target.value)}
        />
        <Input 
            label="Nombres"
            placeholder="Nombres.."
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
        />
        <Input 
            label="Apellidos"
            placeholder="Apellidos.."
            value={lastName}
            onChange={e => setLastName(e.target.value)}
        />
        <Input
            label="Correo Electrónico"
            placeholder="Correo Electrónico.."
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <Button 
            label="Guardar"
        />
    </form>
  )
}

export default StaffForm