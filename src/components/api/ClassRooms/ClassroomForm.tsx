import { useState } from "react"
import Button from "../../ui/Button"
import Selector from "../../ui/Selector"
import { UseMutationResult } from "@tanstack/react-query"
import { Classroom } from "../../../services/api/classroomService"
import { CreateClassroomData } from "../../../hooks/api/classroom/useCreateClassroom"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../hooks/store/useSchoolStore"

interface Props {
    level: string
    createClassroom: UseMutationResult<Classroom, Error, CreateClassroomData>
}

const ClassroomForm = ({ level, createClassroom }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const school = useSchoolStore(s => s.school) || ''
    const [selectedGrade, setSelectedGrade] = useState('0')
    const [selectedSection, setSelectedSection] = useState('0')

    const gradeOptions = []
    if (level === 'I') {
        gradeOptions.push({id: '0', name: 'Grado'}, {id: '3', name: '3 años'}, {id: '4', name: '4 años'}, {id: '5', name: '5 años'})
    } else if (level === 'P') {
        gradeOptions.push({id: '0', name: 'Grado'}, {id: '1', name: 'Primero'}, {id: '2', name: 'Segundo'}, {id: '3', name: 'Tercero'}, {id: '4', name: 'Cuarto'}, {id: '5', name: 'Quinto'}, {id: '6', name: 'Sexto'})
    } else if (level === 'S') {
        gradeOptions.push({id: '0', name: 'Grado'}, {id: '1', name: 'Primero'}, {id: '2', name: 'Segundo'}, {id: '3', name: 'Tercero'}, {id: '4', name: 'Cuarto'}, {id: '5', name: 'Quinto'})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createClassroom.mutate({
            access,
            classroom: {
                level,
                grade: selectedGrade,
                section: selectedSection,
                school: school.id
            }
        })
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className="grid grid-cols-3 gap-4 my-6">
        <Selector 
            values={gradeOptions}
            setter={setSelectedGrade}
            defaultValue={selectedGrade}
        />
        <Selector 
            values={[{id: '0', name:'Sección'}, {id: 'U', name:'Unica'}, {id: 'A', name: 'A'}, {id: 'B', name: 'B'}, {id: 'C', name: 'C'}, {id: 'D', name: 'D'}, {id: 'E', name: 'E'}, {id: 'F', name: 'F'}, {id: 'G', name: 'G'}, {id: 'H', name: 'H'}, {id: 'I', name: 'I'}, {id: 'J', name: 'J'}, {id: 'K', name: 'K'}, {id: 'L', name: 'L'}, {id: 'M', name: 'M'}, {id: 'N', name: 'N'}, {id: 'O', name: 'O'}, {id: 'P', name: 'P'}, {id: 'Q', name: 'Q'}, {id: 'R', name: 'R'}, {id: 'S', name: 'S'}, {id: 'T', name: 'T'}, {id: 'V', name: 'V'}, {id: 'W', name: 'W'}, {id: 'X', name: 'X'}, {id: 'Y', name: 'Y'}, {id: 'Z', name: 'Z'}]}
            setter={setSelectedSection}
            defaultValue={selectedSection}
        />
        <div className="flex justify-center items-center">
            <Button 
                label="Crear"
            />
        </div>
    </form>
  )
}

export default ClassroomForm