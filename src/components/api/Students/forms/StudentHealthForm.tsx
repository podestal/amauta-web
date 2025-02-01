import { useState } from "react"
import Button from "../../../ui/Button"
import Input from "../../../ui/Input"
import TextArea from "../../../ui/TextArea"

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
    <div>
        <form>
            <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 mb-16">
                <h2 className="text-2xl text-left font-semibold mb-6">Información de Salud</h2>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <Input 
                    type="number"
                    placeholder="Peso ..."
                    value={weight}
                    setValue={setWeight}
                    label="Peso"
                />
                <Input 
                    type="number"
                    placeholder="Altura ..."
                    value={height}
                    setValue={setHeight}
                    label="Altura"
                />
                <TextArea 
                    placeholder="Enfermedades ..."
                    value={illness}
                    setValue={setIllness}
                />
            </div>
            <div className="flex justify-between items-center gap-4">
                <Button 
                    label="Siguiente"
                    onClick={() => setPage(prev => prev + 1)}
                    type="submit"
                />
                <Button 
                    label="Anterior"
                    onClick={() => setPage(prev => prev - 1)}
                    type="button"
                />
            </div>
        </form>
        
    </div>
  )
}

export default StudentHealthForm