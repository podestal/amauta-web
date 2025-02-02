import { useState } from "react"
import Button from "../../../ui/Button"
import Input from "../../../ui/Input"
import TextArea from "../../../ui/TextArea"
import { motion } from "framer-motion"

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const StudentHealthForm = ({ setPage }: Props) => {

    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [illness, setIllness] = useState('')

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    // }

  return (
    <motion.div
        initial={{opacity: 0, x: 50}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5}}
    >
        <form>
            <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 mb-16">
                <h2 className="text-2xl text-left font-semibold mb-6">Información de Salud</h2>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <Input 
                    type="number"
                    placeholder="Peso ..."
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    label="Peso"
                />
                <Input 
                    type="number"
                    placeholder="Altura ..."
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    label="Altura"
                />
                <TextArea 
                    placeholder="Enfermedades ..."
                    value={illness}
                    onChange={(e) => setIllness(e.target.value)}
                />
            </div>
            <div className="flex justify-between items-center gap-4">
                <Button 
                    label="Anterior"
                    onClick={() => setPage(prev => prev - 1)}
                    type="button"
                />
                <Button 
                    label="Siguiente"
                    onClick={() => setPage(prev => prev + 1)}
                    type="button"
                />
            </div>
        </form>
    </motion.div>
  )
}

export default StudentHealthForm