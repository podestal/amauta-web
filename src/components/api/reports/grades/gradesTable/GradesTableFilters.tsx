import { AnimatePresence, motion } from "framer-motion"
import Selector from "../../../../ui/Selector"
// import Input from "../../../../ui/Input"
import { Assignature } from "../../../../../services/api/assignatureService"
import { competencies } from "../../../../../data/mockdataForGrades"
import CategorySelector from "../../../category/CategorySelector"
import { useEffect } from "react"
import getClassroomDescription from "../../../../../utils/getClassroomDescription"

interface Props {
    assignatures: Assignature[]
    setSelectedAssignature: React.Dispatch<React.SetStateAction<string>>
    selectedAssignature: string
    setSelectedCompetency: React.Dispatch<React.SetStateAction<string>>
    selectedCompetency: string
    setSelectedQuarter: React.Dispatch<React.SetStateAction<string>>
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
    selectedQuarter: string
    selectedCategory: string
    setSelectedArea: React.Dispatch<React.SetStateAction<string>>
}

const GradesTableFilters = ({ 
    assignatures,
    setSelectedAssignature,
    selectedAssignature,
    setSelectedCompetency,
    selectedCompetency,
    setSelectedQuarter,
    setSelectedCategory,
    selectedQuarter,
    setSelectedArea,
 }: Props) => {

        const filteredCompetencies = competencies.filter(competency => competency.area.toString() === assignatures.find(assignature => assignature.id.toString() === selectedAssignature)?.area.toString());
        
        useEffect(() => {
            setSelectedArea(assignatures.find(assignature => assignature.id.toString() === selectedAssignature)?.area.toString() || '0')
        }, [filteredCompetencies])

        useEffect(() => {
            if (selectedCompetency === '0' || selectedAssignature === '0') {
                setSelectedCategory('0')
            }
        }, [selectedCompetency, selectedAssignature])

  return (
    <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full my-12">
        <div className="grid grid-cols-4 gap-12 mb-6">
            <Selector 
                label={"Curso"}
                values={assignatures.map(assignature => {
                    const [grade, section, level] = assignature.classroom_description.split("-");
                    const classRoomDescription = getClassroomDescription({ lan:'ES', grade, section, level, short: true });
                    return {id: assignature.id.toString(), name: `${assignature.title} - ${classRoomDescription
                    }`}
                })}
                setter={setSelectedAssignature}
                lan="ES"
            />
            <AnimatePresence>
                {selectedAssignature !== '0' && 
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <Selector 
                        label={"Competencia"}
                        values={[{id: '0', name:'Todas'},...filteredCompetencies.map(competency => ({id: competency.id.toString(), name: competency.title}))]}
                        setter={setSelectedCompetency}
                        lan="ES"
                        defaultValue={'0'}
                    />
                </motion.div>}
            </AnimatePresence>
            <AnimatePresence>
                {selectedAssignature !== '0' && 
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <Selector 
                        label={"Bimestre"}
                        values={[
                            {id: 'Q1', name: 'Bimestre 1'},
                            {id: 'Q2', name: 'Bimestre 2'},
                            {id: 'Q3', name: 'Bimestre 3'},
                            {id: 'Q4', name: 'Bimestre 4'},
                        ]}
                        setter={setSelectedQuarter}
                        defaultValue={selectedQuarter}
                        lan="ES"
                    />
                </motion.div>}
            </AnimatePresence>
            <AnimatePresence>
                {selectedAssignature !== '0' && selectedCompetency !== '0' && 
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <CategorySelector 
                        setSelectedCategory={setSelectedCategory}
                        all
                    />
                </motion.div>}
            </AnimatePresence>
        </div>
        {/* <Input 
            placeholder="Buscar por nombre..."
            onChange={e => {
            setFilterByName(e.target.value)
            }}
            value={filterByName}
        /> */}
    </motion.div>
  )
}

export default GradesTableFilters