import { useState } from "react"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { SignUpData } from "../../../hooks/auth/useSignUp"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useNotificationsStore from "../../../hooks/store/useNotificationsStore"
import useGetClassroom from "../../../hooks/api/classroom/useGetClassroom"
import { motion } from "framer-motion"
import getClassroomDescription from "../../../utils/getClassroomDescription"
import Slider from "../../ui/Slider"
import { Profile } from "../../../services/api/profileService"
import { UseMutationResult } from "@tanstack/react-query"
import { ProfileData } from "../../../hooks/api/profile/useUpdateProfile"
import { SignUpUser } from "../../../services/auth/signUpService"

interface ErrorDjango {
    status: number
    message: string
    response:{
        data: {
            email: string[]
        }
    }
}


interface Props {
    group: string
    name: string
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    profile?: Profile
    signUp?: UseMutationResult<SignUpUser, Error, SignUpData>
    createProfile?: UseMutationResult<Profile, Error, ProfileData>
    updateProfile?: UseMutationResult<Profile, Error, ProfileData>
}

const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

const StaffForm = ({ group, name, setOpen, open, profile, signUp, createProfile, updateProfile }: Props) => {
    
    const classroomsIds = profile && profile.clases_details?.map( classroom => classroom.split('-').pop()) || []
    const classroomsIdsNumber = classroomsIds && classroomsIds?.map( id => parseInt(id || '0')) || []

    const [firstName, setFirstName] = useState(profile?.first_name || '')
    const [lastName, setLastName] = useState(profile?.last_name || '')
    const [email, setEmail] = useState( profile?.email || '')
    const [phone, setPhone] = useState(profile?.phone_number || '')
    const [selectedClassrooms, setSelectedClassrooms] = useState<number[]>(classroomsIdsNumber && classroomsIdsNumber || [])

    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState('')


    const school = useSchoolStore(s => s.school).id
    const access = useAuthStore(s => s.access) || ''
    const { setMessage, setShow, setType } = useNotificationsStore()
    const [loading, setLoading] = useState(false)
    // const [selectedClassrooms, setSelectedClassrooms] = useState([])

    const toggleClassroom = (id: number) => {
        setSelectedClassrooms((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const username = email.split('@')[0]
        const password = generatePassword()

        if (!firstName) {
            setFirstNameError('El nombre es requerido')
            setLoading(false)
            return
        }

        if (!lastName) {
            setLastNameError('El apellido es requerido')
            setLoading(false)
            return
        }

        if (!email) {
            setEmailError('El correo es requerido')
            setLoading(false)
            return
        }

        if (email && !email.includes('@') || !email.includes('.')) {
            setEmailError('El correo no es válido')
            setLoading(false)
            return
        }

        if (group !== 'manager' && selectedClassrooms.length === 0) {
            setMessage('Debe seleccionar al menos una clase')
            setType('error')
            setShow(true)
            setLoading(false)
            return
        }
        

        signUp && signUp.mutate({ user: {
            username,
            email,
            profile: group,
            first_name: firstName,
            last_name: lastName,
            password
        }}, {
            onSuccess: (data) => {
                createProfile && createProfile.mutate({ access, profile: {
                    first_name: firstName,
                    last_name: lastName,
                    user: data.id,
                    email,
                    school,
                    clases_details: [],
                    clases: selectedClassrooms,
                    phone_number: phone,
                    id: 0
                } }, {
                    onSuccess: res => {
                        console.log(res);
                        
                        setOpen(false)
                        setMessage('Usuario creado correctamente')
                        setType('success')
                        setShow(true)
                        setFirstName('')
                        setLastName('')
                        setEmail('')
                        setPhone('')
                        setSelectedClassrooms([])
                    },
                    onError: (error) => {
                        console.log(error)
                        setEmailError('Error al crear el perfil')
                        setType('error')
                        setShow(true)
                    }
                })
            },
            onError: (error) => {
                const err = error as unknown as ErrorDjango;
                if (err.status === 400 && err.response.data.email) {
                    setEmailError('Correo electrónico ya registrado')
                }  else {
                    setMessage('Error al crear el usuario')
                }
                setType('error')
                setShow(true)
            },
            onSettled: () => {
                setLoading(false)
            }
        })
        

        updateProfile && updateProfile.mutate({ access, profile: {
            first_name: firstName,
            last_name: lastName,
            user:profile?.user || 0,
            email,
            school,
            clases_details: [],
            clases: selectedClassrooms,
            phone_number: phone,
            id: profile?.id || 0
        } }, {
            onSuccess: res => {
                console.log(res);
                
                setOpen(false)
                setMessage('Usuario modificado correctamente')
                setType('success')
                setShow(true)
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
            },
            onError: err => {
                console.log(err)
                setMessage('Error al modificar el perfil')
                setType('error')
                setShow(true)
            },
            onSettled: () => {
                setLoading(false)
            }
        })
    }

    const { data: classrooms, isLoading, isError, error, isSuccess } = useGetClassroom({ access, school: school.toString() })

    if (isLoading) return <p>Cargando...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <>{open &&
        <Slider 
        isOpen={open}
        setOpen={setOpen}
    >
        <form onSubmit={handleSubmit} className="shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center dark:text-gray-200 mb-4">{profile ? 'Modificar' : 'Nuevo'} {name}</h2>
        <div className="space-y-4">
            {/* <Input label="DNI" placeholder="DNI.." value={dni} onChange={e => setDni(e.target.value)} /> */}
            <Input error={firstNameError} setError={setFirstNameError} disable={!!updateProfile} label="Nombres" placeholder="Nombres.." value={firstName}
                onChange={e => { 
                    firstName && setFirstNameError('')
                    setFirstName(e.target.value)}} />
            <Input error={lastNameError} setError={setLastNameError} disable={!!updateProfile} label="Apellidos" placeholder="Apellidos.." value={lastName} 
                onChange={e => {
                    lastName && setLastNameError('')
                    setLastName(e.target.value)}} />
            <Input error={emailError} setError={setEmailError} disable={!!updateProfile} label="Correo Electrónico" placeholder="Correo Electrónico.." value={email} 
                onChange={e => {
                    email && setEmailError('')
                    setEmail(e.target.value)}} />
            <Input disable={!!updateProfile} label="Número de Teléfono" placeholder="Número de Teléfono.." value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        {group !== 'manager' && <>
        <h2 className="my-8 text-2xl">Clases</h2>
        <motion.div
            className="flex flex-col gap-4 my-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
        <div>
            <h2 className="font-bold">Inicial</h2>
            {classrooms
            .filter( classroom => classroom.level === 'I')
            .map((classroom) => (
            <motion.button
                key={classroom.id}
                type="button"
                onClick={() => toggleClassroom(classroom.id)}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-300 m-2 ${
                selectedClassrooms.includes(classroom.id)
                    ? "bg-amber-500 text-white"
                    : "dark:bg-gray-700 bg-slate-300 dark:text-gray-300 hover:bg-amber-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                {getClassroomDescription({ grade: classroom.grade, level: classroom.level, section: classroom.section, lan: 'ES' })}
            </motion.button>
        ))}
        </div>
        <div>
            <h2 className="font-bold">Primaria</h2>
        {classrooms
            .filter( classroom => classroom.level === 'P')
            .map((classroom) => (
            <motion.button
                key={classroom.id}
                type="button"
                onClick={() => toggleClassroom(classroom.id)}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-300 m-2 ${
                selectedClassrooms.includes(classroom.id)
                    ? "bg-blue-700 text-white"
                    : "dark:bg-gray-700 bg-slate-300 dark:text-gray-300 hover:bg-blue-600 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                {getClassroomDescription({ grade: classroom.grade, level: classroom.level, section: classroom.section, lan: 'ES' })}
            </motion.button>
            ))}
        </div>
        <div>
            <h2 className="font-bold">Secundaria</h2>
        {classrooms
            .filter( classroom => classroom.level === 'S')
            .map((classroom) => (
            <motion.button
                key={classroom.id}
                type="button"
                onClick={() => toggleClassroom(classroom.id)}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-300 m-2 ${
                selectedClassrooms.includes(classroom.id)
                    ? "bg-green-500 text-white"
                    : "dark:bg-gray-700 bg-slate-300 dark:text-gray-300 hover:bg-green-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                {getClassroomDescription({ grade: classroom.grade, level: classroom.level, section: classroom.section, lan: 'ES' })}
            </motion.button>
            ))}
        </div>
        </motion.div>
        </>}
        <div className="absolute top-0 left-12 p-4">
            <Button 
                label="Guardar"
                loading={loading}
            />
        </div>
    </form>
    </Slider>
    }</>
   
  )
}

export default StaffForm