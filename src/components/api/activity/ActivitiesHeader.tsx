import Selector from '../../ui/Selector'
import CreateActivity from './CreateActivity'

interface Props {
    area: string
    assignatureId: string
    selectedQuarter: string
    setSelectedQuarter: React.Dispatch<React.SetStateAction<string>>
}

const ActivitiesHeader = ({ area, assignatureId, setSelectedQuarter, selectedQuarter }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-12 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">📌 Tareas Asignadas</h2>
        <Selector 
            values={[{ id: 'Q1', name: 'Bimestre 1'}, { id: 'Q2', name: 'Bimestre 2'}, { id: 'Q3', name: 'Bimestre 3'}, { id: 'Q4', name: 'Bimestre 4'}]}
            lan='ES'
            setter={setSelectedQuarter}
            defaultValue={selectedQuarter}
        />
        <CreateActivity 
            area={parseInt(area)}
            assignatureId={assignatureId}
            selectedQuarter={selectedQuarter}
        />
    </div>
  )
}

export default ActivitiesHeader