import { useState } from "react"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useLoader from "../../../../hooks/ui/useLoader"
import useGetClassroom from "../../../../hooks/api/classroom/useGetClassroom"
import ClasroomSelector from "./ClasroomSelector"
import Selector from "../../../ui/Selector"
import { motion } from "framer-motion"

const gradesPrimary = [
    { id: '1', name: 'Primero'},
    { id: '2', name: 'Segundo'},
    { id: '3', name: 'Tercero'},
    { id: '4', name: 'Cuarto'},
    { id: '5', name: 'Quinto'},
    { id: '6', name: 'Sexto'},
]

const gradesSecondary = [
    { id: '1', name: 'Primero'},
    { id: '2', name: 'Segundo'},
    { id: '3', name: 'Tercero'},
    { id: '4', name: 'Cuarto'},
    { id: '5', name: 'Quinto'},
]

const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
}

interface Props {
    setSelectedClassroom: React.Dispatch<React.SetStateAction<string>>
    selectedType: string
    setSelectedType: React.Dispatch<React.SetStateAction<string>>
}

const AttendanceFilters = ({ setSelectedClassroom, selectedType, setSelectedType }: Props) => {

    const access = useAuthStore(s => s.access) || ''

    const [selectedLevel, setSelectedLevel] = useState('P')
    const [selectedGrade, setSelectedGrade] = useState('1')

    const { data: classrooms, isLoading, isError, error, isSuccess } = useGetClassroom({ access })

    useLoader(isLoading)

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <motion.div 
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="w-full grid grid-cols-4 gap-12 py-4">
        <Selector 
            values={[
                { id: 'P', name: 'Primaria' },
                { id: 'S', name: 'Secundaria' },
            ]}
            setter={setSelectedLevel}
            defaultValue={selectedLevel}
            label="Nivel"
        />
        <Selector 
            values={selectedLevel === 'P' ? gradesPrimary : gradesSecondary}
            setter={setSelectedGrade}
            defaultValue={selectedGrade}
            label="Grado"
        />
        <ClasroomSelector 
            setSelectedClassroom={setSelectedClassroom}
            classrooms={classrooms
                .filter(classroom => classroom.grade === selectedGrade && classroom.level === selectedLevel)
            }
        />
        <Selector 
            values={[
                {id: '1', name: 'Mensual'},
                {id: '2', name: 'Semanal'},
                {id: '3', name: 'Diaria'},
            ]}
            setter={setSelectedType}
            defaultValue={selectedType}
            label="Tipo"
        />
    </motion.div>
  )
}

export default AttendanceFilters