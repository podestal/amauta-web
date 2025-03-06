import { motion } from "framer-motion"
import { Competency } from "../../../../../data/mockdataForGrades"
import Input from "../../../../ui/Input"

interface Props {
    comptencies: Competency[]
    filterByName: string
    setFilterByName: React.Dispatch<React.SetStateAction<string>>
}

const GradesTableHeader = ({ comptencies, filterByName, setFilterByName }: Props) => {
  return (
    <motion.div
        className="w-full min-w-max border-collapse bg-white dark:bg-gray-900 shadow-md rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="py-10 bg-gray-950">
            <Input 
                placeholder="Buscar por nombre..."
                onChange={e => {
                    setFilterByName(e.target.value)
                }}
                value={filterByName}
            />
        </div>
        <div className="flex items-center bg-gray-800 text-white font-bold">
            <h2 className="min-w-[200px] max-w-[200px] py-3 px-4">DNI</h2>
            <h2 className="min-w-[360px] max-w-[360px] py-3 px-4">Nombres</h2>
            {comptencies
                .sort((a, b) => a.id - b.id)
                .map(competency => (
            <h2 
                key={competency.id} 
                className="py-3 px-4 text-center min-w-[400px] max-w-[400px]"
            >
                {competency.title}
            </h2>
            ))}
        </div>

    </motion.div>
  )
}

export default GradesTableHeader