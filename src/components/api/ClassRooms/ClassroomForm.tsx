import { useState } from "react"
import Button from "../../ui/Button"
import Selector from "../../ui/Selector"

interface Props {
    level: string
}

const ClassroomForm = ({ level }: Props) => {

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

  return (
    <form className="grid grid-cols-3 gap-4 my-6">
        <Selector 
            values={gradeOptions}
            setter={setSelectedGrade}
            defaultValue={selectedGrade}
        />
        <Selector 
            values={[{id: '0', name:'Sección'}, {id: 'U', name:'Unica'}, {id: 'A', name: 'A'}, {id: 'B', name: 'B'}, {id: 'C', name: 'C'}]}
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