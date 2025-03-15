import { useState } from "react"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import useSignUp from "../../../hooks/auth/useSignUp"
import useCreateProfile from "../../../hooks/api/profile/useCreateProfile"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useNotificationsStore from "../../../hooks/store/useNotificationsStore"

interface Props {
    group: string
    name: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const StaffForm = ({ group, name, setOpen }: Props) => {

    const [dni, setDni] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const school = useSchoolStore(s => s.school).id
    const access = useAuthStore(s => s.access) || ''
    const { setMessage, setShow, setType } = useNotificationsStore()
    const [isLoading, setIsLoading] = useState(false)
    // const [selectedClassrooms, setSelectedClassrooms] = useState([])

    const signUp = useSignUp()
    const createProfile = useCreateProfile({ profileName: group })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const username = email.split('@')[0]
        const password = `${firstName.toLowerCase()}${dni}}`


        signUp.mutate({ user: {
            username,
            email,
            profile: group,
            first_name: firstName,
            last_name: lastName,
            password
        }}, {
            onSuccess: (data) => {
                createProfile.mutate({ access, profile: {
                    first_name: firstName,
                    last_name: lastName,
                    user: data.id,
                    email,
                    school,
                    clases_details: [],
                    clases: [5],
                    phone_number: phone,
                    id: 0
                } }, {
                    onSuccess: () => {
                        setOpen(false)
                        setMessage('Usuario creado correctamente')
                        setType('success')
                        setShow(true)
                        setDni('')
                        setFirstName('')
                        setLastName('')
                        setEmail('')
                        setPhone('')
                    },
                    onError: err => {
                        console.log(err)
                        setMessage('Error al crear el perfil')
                        setType('error')
                        setShow(true)
                    }
                })
            },
            onError: (err) => {
                console.log(err)
            },
            onSettled: () => {
                setIsLoading(false)
            }
        })
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
        <Input
            label="Número de Teléfono"
            placeholder="Número de Teléfono.."
            value={phone}
            onChange={e => setPhone(e.target.value)}
        />
        <Button 
            label="Guardar"
            loading={isLoading}
        />
    </form>
  )
}

export default StaffForm