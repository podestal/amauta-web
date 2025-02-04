import { motion } from "framer-motion"
import Button from "../../../ui/Button"
import { useState } from "react"
import Input from "../../../ui/Input"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useCreateEmergencyContact from "../../../../hooks/api/student/studentInfo/useCreateEmergencyContact"

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>
    studentId: string
}

// name = models.CharField(max_length=255)
// phone_number = models.CharField(max_length=255)
// address = models.TextField()

const StudentEmergency = ({ setPage, studentId }: Props) => {

    const access = useAuthStore(s => s.access) || ''

    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')

    // Error handling
    const [nameError, setNameError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [addressError, setAddressError] = useState('')

    const createEmergencyContact = useCreateEmergencyContact()

    console.log('studentId', studentId)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!name) {
            setNameError('Este campo es requerido')
            return
        }

        if (!phoneNumber) {
            setPhoneNumberError('Este campo es requerido')
            return
        }

        if (!address) {
            setAddressError('Este campo es requerido')
            return
        }

        createEmergencyContact.mutate({
            emergencyContact: {
                name,
                phone_number: phoneNumber,
                address,
                student: studentId
            },
            access
        }, 
        {
            onSuccess: () => setPage(prev => prev + 1)
        })
    }


    

  return (
    <motion.div
        initial={{opacity: 0, x: 50}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5}}
    >
        <form
            onSubmit={handleSubmit}
        >
            <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 mb-12">
                <h2 className="text-2xl text-left font-semibold mb-6">En Caso de Emergencia</h2>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <Input 
                    type="text"
                    placeholder="Nombre ..."
                    value={name}
                    onChange={(e) => {
                        name && setNameError('')
                        setName(e.target.value)}}
                    label="Nombre"
                    error={nameError}
                />
                <Input 
                    type="text"
                    placeholder="Teléfono ..."
                    value={phoneNumber}
                    onChange={(e) => {
                        phoneNumber && setPhoneNumberError('')
                        setPhoneNumber(e.target.value)}}
                    label="Teléfono"
                    error={phoneNumberError}
                />
                <Input 
                    type="text"
                    placeholder="Dirección ..."
                    value={address}
                    onChange={(e) => {
                        address && setAddressError('')
                        setAddress(e.target.value)}}
                    label="Dirección"
                    error={addressError}
                />
            </div>
            <div className="flex justify-left items-center gap-4 mt-12">
                <Button 
                    label="Anterior"
                    type="button"
                />
                <Button 
                    label="Siguiente"
                    type="submit"
                />
            </div>
        </form>
    </motion.div>
  )
}

export default StudentEmergency