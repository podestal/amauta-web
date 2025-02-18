import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { useState } from 'react'

interface Props {
    setStudentUid:React.Dispatch<React.SetStateAction<string>>
}

const StudentByDNI = ({ setStudentUid }: Props) => {

    const [dni, setDni] = useState('')
    const [dniError, setDniError] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (dni.length > 8) {
            setDniError('El DNI debe tener 8 dígitos')
            return
        }
        setStudentUid(dni)
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className="w-full h-full flex justify-center items-center gap-12">
        <Input 
            placeholder="Buscar por DNI ..."
            type="number"
            onChange={(e) => {
                dni && setDniError('')
                setDni(e.target.value)
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