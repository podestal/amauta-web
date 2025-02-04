import { useState } from "react"
import Button from "../../../ui/Button"
import Input from "../../../ui/Input"
import TextArea from "../../../ui/TextArea"
import { motion } from "framer-motion"
import { CreateHealthInfoData } from "../../../../hooks/api/student/studentInfo/useCreateHealthInfo"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import { UseMutationResult } from "@tanstack/react-query"
import { HealthInfo } from "../../../../services/api/healthInfo"
import useUpdateHealthInfo from "../../../../hooks/api/student/studentInfo/useUpdateHealthInfo"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>
    studentId: string
    nextPrev?: boolean
    healthInfo?: HealthInfo
    createHealthInfo?: UseMutationResult<HealthInfo, Error, CreateHealthInfoData>
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const StudentHealthForm = ({ 
    setPage, 
    studentId, 
    nextPrev=true, 
    healthInfo,
    createHealthInfo,
    setOpen,
}: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { setMessage, setShow, setType } = useNotificationsStore()
    const updateHealthInfo = healthInfo && useUpdateHealthInfo({ healthInfoId: healthInfo.id })

    const [weight, setWeight] = useState(healthInfo ? `${healthInfo.weight}` : '')
    const [height, setHeight] = useState(healthInfo ? `${healthInfo.height}` : '')
    const [illness, setIllness] = useState(healthInfo ? healthInfo.illness : '')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            createHealthInfo && createHealthInfo.mutate({
                healthInfo: {
                    weight: parseFloat(weight),
                    height: parseFloat(height),
                    illness,
                    student: studentId
                },
                access
            }, 
            {
                onSuccess: () => setPage(prev => prev + 1)
            }
        )
        updateHealthInfo && updateHealthInfo.mutate({  
            healthInfo: {
                weight: parseFloat(weight),
                height: parseFloat(height),
                illness,
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
        }
        )
    }
    

  return (
    <motion.div
        initial={{opacity: 0, x: 50}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5}}
    >
        <form onSubmit={handleSubmit}>
            <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 mb-12">
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
                    label={healthInfo ? 'Guardar' : 'Enviar'}
                    type="submit"
                />
            </div>
            }
        </form>
    </motion.div>
  )
}

export default StudentHealthForm