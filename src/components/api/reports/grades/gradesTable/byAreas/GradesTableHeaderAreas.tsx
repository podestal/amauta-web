import { motion } from "framer-motion"
import Input from "../../../../../ui/Input"
import { areas } from "../../../../../../data/mockdataForGrades"
import { Assignature } from "../../../../../../services/api/assignatureService"

interface Props {
    filterByName: string
    setFilterByName: React.Dispatch<React.SetStateAction<string>>
    assignatures: Assignature[]
}

const GradesTableHeaderAreas = ({ filterByName, setFilterByName, assignatures }: Props) => {

        const filteredAreasIds = assignatures.map(assignature => assignature.area.toString());
        const filteredAreas = areas.filter(area => filteredAreasIds.includes(area.id.toString()));

  return (
    <motion.div 
    className="w-full min-w-max border-collapse bg-white dark:bg-gray-900 shadow-md rounded-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
        <div className="pb-10 dark:bg-gray-950">
            <Input 
                placeholder="Buscar por nombre..."
                onChange={e => {
                    setFilterByName(e.target.value)
                }}
                value={filterByName}
            />
        </div>
        <div className="flex items-center dark:bg-gray-800 bg-gray-300 dark:text-white font-bold h-[100px]">
            <h2 className="min-w-[200px] max-w-[200px] py-3 px-4">DNI</h2>
            <h2 className="min-w-[360px] max-w-[360px] py-3 px-4">Nombres</h2>
            {filteredAreas
            .map((area) => (
                <h2 
                    key={area.id} 
                    className="min-w-[160px] max-w-[160px] py-3 px-4 text-center"
                >
                    {area.title}
                </h2>
            ))}
        </div>
    </motion.div>
  )
}

export default GradesTableHeaderAreas