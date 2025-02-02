import { motion } from "framer-motion"
import Button from "../../../ui/Button"
import { useState } from "react"
import Input from "../../../ui/Input"

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>
}

// name = models.CharField(max_length=255)
// phone_number = models.CharField(max_length=255)
// address = models.TextField()

const StudentEmergency = ({ setPage }: Props) => {

    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')

    // Error handling
    const [nameError, setNameError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [addressError, setAddressError] = useState('')

  return (
    <motion.div
        initial={{opacity: 0, x: 50}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5}}
    >
        <form>
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
                    onClick={() => setPage(prev => prev - 1)}
                    type="button"
                />
            </div>
        </form>
    </motion.div>
  )
}

export default StudentEmergency