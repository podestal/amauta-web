import { Classroom } from "../../../services/api/classroomService"
import getClassroomDescription from "../../../utils/getClassroomDescription"
import SelectorNew from "../../ui/SelectorNew"

interface Props {
    classrooms: Classroom[]
    selectedClassroomId: number
    setSelectedClassroomId: React.Dispatch<React.SetStateAction<number>>
}

const RankingHeader = ({ classrooms, selectedClassroomId, setSelectedClassroomId }: Props) => {
  return (
    <>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 ranking-title">Ranking de Estudiantes</h1>
        <SelectorNew 
            items={classrooms.map( classroom => ({ id: classroom.id, name: getClassroomDescription({ lan: 'ES', grade: classroom.grade, section: classroom.section, level: classroom.level }) }))}
            selectedItem={selectedClassroomId}
            setSelectedItem={setSelectedClassroomId}
            label='Selecciona un Aula'
        />
    </>
  )
}

export default RankingHeader