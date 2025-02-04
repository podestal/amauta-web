import { motion } from "framer-motion"
import Button from "../../../ui/Button"
import { useState } from "react"
import Input from "../../../ui/Input"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import { CreateEmergencyContactData } from "../../../../hooks/api/student/studentInfo/useCreateEmergencyContact"
import { EmergencyContact } from "../../../../services/api/emergencyContact"
import { UseMutationResult } from "@tanstack/react-query"
import useUpdateEmergencyContact from "../../../../hooks/api/student/studentInfo/useUpdateEmergencyContact"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>
    studentId: string
    nextPrev?: boolean
    emergencyContact?: EmergencyContact
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    createEmergencyContact?: UseMutationResult<EmergencyContact, Error, CreateEmergencyContactData>
}

const StudentEmergency = ({ 
    setPage, 
    studentId, 
    nextPrev=true,
    emergencyContact,
    setOpen,
    createEmergencyContact,
}: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { setMessage, setShow, setType } = useNotificationsStore()
    const updateEmergencyContact = emergencyContact && useUpdateEmergencyContact({ emergencyContactId: emergencyContact.id })

    const [name, setName] = useState(emergencyContact ? emergencyContact.name : '')
    const [phoneNumber, setPhoneNumber] = useState(emergencyContact ? emergencyContact.phone_number : '')
    const [address, setAddress] = useState(emergencyContact ? emergencyContact.address : '')

    // Error handling
    const [nameError, setNameError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [addressError, setAddressError] = useState('')

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

        createEmergencyContact && createEmergencyContact.mutate({
            emergencyContact: {
                name,
                phone_number: phoneNumber,
                address,
                student: studentId
            },
            access
        }, 
        {
            onSuccess: () => {
                setOpen && setOpen(false)
                setType('success')
                setShow(true)
                setMessage('Información de estudiante guardada exitosamente!')
            }
        })

        updateEmergencyContact && updateEmergencyContact.mutate({
            emergencyContact: {
                name,
                phone_number: phoneNumber,
                address,
                student: studentId
            },
            access
        }, {
            onSuccess: () => {
                setOpen && setOpen(false)
                setType('success')
                setShow(true)
                setMessage('Información de salud actualizada exitosamente!')
            }
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
            {nextPrev 
            ? 
            <div className="flex justify-between items-center gap-4 mt-12">
                <Button 
                    label="Anterior"
                    onClick={() => setPage(prev => prev - 1)}
                    type="button"
                />
                <Button 
                    label="Siguiente"
                    type="submit"
                />
            </div>
            :
            <div className='w-full justify-end flex mt-12'>
                <Button 
                    label="Enviar"
                    type="submit"
                />
            </div>
            }
        </form>
    </motion.div>
  )
}

export default StudentEmergency