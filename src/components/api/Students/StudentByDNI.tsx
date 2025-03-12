import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
    setStudentDni:React.Dispatch<React.SetStateAction<string>>
    setStudentName: React.Dispatch<React.SetStateAction<string>>
    studentDni: string
    studentName: string
}

const StudentByDNI = ({ setStudentDni, setStudentName, studentName, studentDni }: Props) => {

    const [nameOrDni, setNameOrDni] = useState('')
    const [dniError, setDniError] = useState('')
    const queryClient = useQueryClient()

    const removeAccents = (str: string) => 
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isOnlyNumbers = (value: string) => /^\d+$/.test(value);
        const isOnlyLetters = (value: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
        
        if (isOnlyNumbers(nameOrDni)) {
            if (nameOrDni.length > 8) {
                setDniError('El DNI debe tener 8 dígitos')
                return
            }
            setStudentDni(nameOrDni)
            studentName && queryClient.removeQueries({ queryKey: [`students ${studentName}`] })
            setStudentName('')
        } else if (isOnlyLetters(removeAccents(nameOrDni))) {
            setStudentName(removeAccents(nameOrDni))
            studentDni && queryClient.removeQueries({ queryKey: [`student ${studentDni}`] })
            setStudentDni('')
        }
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className="w-full h-full flex justify-center items-center gap-12">
        <Input 
            placeholder="Buscar por nombre, apellido o DNI ..."
            onChange={(e) => {
                nameOrDni && setDniError('')
                setNameOrDni(e.target.value)
            }}
            error={dniError}
        />
        <Button 
            label="Buscar"
        />
    </form>
  )
}

export default StudentByDNI