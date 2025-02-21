import { useState } from "react"
import Button from "../../../ui/Button"
import Input from "../../../ui/Input"
import TextArea from "../../../ui/TextArea"
import { motion } from "framer-motion"
import useCreateHealthInfo, { CreateHealthInfoData } from "../../../../hooks/api/student/studentInfo/useCreateHealthInfo"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import { UseMutationResult } from "@tanstack/react-query"
import { HealthInfo } from "../../../../services/api/healthInfo"
import useUpdateHealthInfo from "../../../../hooks/api/student/studentInfo/useUpdateHealthInfo"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"
import Selector from "../../../ui/Selector"
import Checkbox from "../../../ui/Checkbox"

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>
    studentId: string
    nextPrev?: boolean
    healthInfo?: HealthInfo
    createHealthInfo?: UseMutationResult<HealthInfo, Error, CreateHealthInfoData>
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    classroomId: string
}

export interface HandyCapOptions {
    id: string
    name: string
}

export const handycapOptions: HandyCapOptions[] = [
    { id: 'V', name: 'Visual' },
    { id: 'A', name: 'Autismo' },
    { id: 'M', name: 'Motora' },
    { id: 'C', name: 'Cognitiva' },
    { id: 'P', name: 'Psicológica' },
    { id: 'H', name: 'Audio-Visual' },
    { id: 'O', name: 'Otra' },
    { id: 'N', name: 'Nínguna' },
]

const StudentHealthForm = ({ 
    setPage, 
    studentId, 
    nextPrev=true, 
    healthInfo,
    createHealthInfo,
    setOpen,
    classroomId
}: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const [loading, setLoading] = useState(false)
    const { setMessage, setShow, setType } = useNotificationsStore()
    const updateHealthInfo = healthInfo && useUpdateHealthInfo({ healthInfoId: healthInfo.id, classroomId })
    const createHealthInfoInternal = !createHealthInfo && !updateHealthInfo && useCreateHealthInfo({ classroomId })

    const [weight, setWeight] = useState(healthInfo ? `${healthInfo.weight}` : '')
    const [height, setHeight] = useState(healthInfo ? `${healthInfo.height}` : '')
    const [illness, setIllness] = useState(healthInfo ? healthInfo.illness : '')
    const [handycap, setHandycap] = useState(healthInfo ? `${healthInfo.handycap}` : 'N')
    
    const [saanee, setSaanee] = useState(healthInfo ? healthInfo.saanee : false)
    const [psicopedagogy, setPsicopedagogy] = useState(healthInfo ? healthInfo.psicopedagogy : false)

    // ERROR HANDLING

    const [weightError, setWeightError] = useState('')
    const [heightError, setHeightError] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!weight) {
            setWeightError('El peso es requerido')
            setType('error')
            setShow(true)
            setMessage('El peso es requerido')
            return
        }

        if (!height) {
            setHeightError('La altura es requerida')
            setType('error')
            setShow(true)
            setMessage('La altura es requerida')
            return
        }

        setLoading(true)

        createHealthInfo && createHealthInfo.mutate({
                healthInfo: {
                    weight: parseFloat(weight),
                    height: parseFloat(height),
                    illness,
                    student: studentId,
                    handycap,
                    saanee,
                    psicopedagogy
                },
                access
            }, 
            {
                onSuccess: () => setPage(prev => prev + 1),
                onError: () => {
                    setType('error')
                    setShow(true)
                    setMessage('Hubo un error al guardar la información de salud')
                }, 
                onSettled: () => setLoading(false)
            }
        )
        

        updateHealthInfo && updateHealthInfo.mutate({  
            healthInfo: {
                weight: parseFloat(weight),
                height: parseFloat(height),
                illness,
                student: studentId,
                handycap,
                saanee,
                psicopedagogy
            },
            access
        }, {
            onSuccess: () => {
                setOpen && setOpen(false)
                setType('success')
                setShow(true)
                setMessage('Información de salud actualizada exitosamente!')
            },
            onError: () => {
                setType('error')
                setShow(true)
                setMessage('Hubo un error al actualizar la información de salud')
            },
            onSettled: () => setLoading(false)
        })
        createHealthInfoInternal && createHealthInfoInternal.mutate({  
            healthInfo: {
                weight: parseFloat(weight),
                height: parseFloat(height),
                illness,
                student: studentId,
                handycap,
                saanee,
                psicopedagogy
            },
            access
        }, {
            onSuccess: () => {
                setOpen && setOpen(false)
                setType('success')
                setShow(true)
                setMessage('Información de salud guardada exitosamente!')
            },
            onError: () => {
                setType('error')
                setShow(true)
                setMessage('Hubo un error al guardar la información de salud')
            },
            onSettled: () => setLoading(false)
        })

        setLoading(false)
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
                    error={weightError}
                />
                <Input 
                    type="number"
                    placeholder="Altura ..."
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    label="Altura"
                    error={heightError}
                />
                <TextArea 
                    placeholder="Enfermedades ..."
                    value={illness}
                    onChange={(e) => setIllness(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12 items-start">
                <Selector 
                    values={handycapOptions}
                    label='Discapacidad'
                    setter={setHandycap}
                    defaultValue={handycap}
                />
                <Checkbox 
                    label="Cuenta con apoyo SAANEE"
                    checked={saanee}
                    onChange={setSaanee}
                />
                <Checkbox 
                    label="Informe psicopedagógico"
                    checked={psicopedagogy}
                    onChange={setPsicopedagogy}
                />
            </div>
            {nextPrev 
            ? 
            <div className="flex justify-end items-center gap-4 mt-12">
                {/* <Button 
                    label="Anterior"
                    onClick={() => setPage(prev => prev - 1)}
                    type="button"
                /> */}
                <Button 
                    label="Siguiente"
                    type="submit"
                    loading={loading}
                    minWidth
                />
            </div>
            :
            <div className='w-full justify-end flex mt-12'>
                <Button 
                    label={healthInfo ? 'Guardar' : 'Enviar'}
                    type="submit"
                    loading={loading}
                    minWidth
                />
            </div>
            }
        </form>
    </motion.div>
  )
}

export default StudentHealthForm