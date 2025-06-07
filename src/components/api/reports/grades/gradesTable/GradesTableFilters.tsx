import { AnimatePresence, motion } from "framer-motion"
import Selector from "../../../../ui/Selector"
import { Assignature } from "../../../../../services/api/assignatureService"
import { competencies } from "../../../../../data/mockdataForGrades"
import CategorySelector from "../../../category/CategorySelector"
import { useEffect } from "react"
import getClassroomDescription from "../../../../../utils/getClassroomDescription"
import { areas } from "../../../../../data/mockdataForGrades"

interface Props {
    selectedTableType: number
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
    selectedArea: string
    classrooms: string[]
    selectedClassroom: string
    setSelectedClassroom: React.Dispatch<React.SetStateAction<string>>
}

const GradesTableFilters = ({ 
    selectedTableType,
    assignatures,
    setSelectedAssignature,
    selectedAssignature,
    setSelectedCompetency,
    selectedCompetency,
    setSelectedQuarter,
    setSelectedCategory,
    selectedQuarter,
    setSelectedArea,
    selectedArea,
    classrooms,
    selectedClassroom,
    setSelectedClassroom,

 }: Props) => {

        const filteredCompetencies = competencies.filter(competency => competency.area.toString() === assignatures.find(assignature => assignature.id.toString() === selectedAssignature)?.area.toString());
        const filteredAreasIds = assignatures.map(assignature => assignature.area.toString());
        const filteredAreas = areas.filter(area => filteredAreasIds.includes(area.id.toString()));

        useEffect(() => {
            if (selectedTableType === 1) {
                setSelectedArea(assignatures.find(assignature => assignature.id.toString() === selectedAssignature)?.area.toString() || '0')
            }
        }, [filteredCompetencies])

        useEffect(() => {
            if (selectedCompetency === '0' || selectedAssignature === '0') {
                setSelectedCategory('0')
            }
        }, [selectedCompetency, selectedAssignature])

        if (classrooms.length === 0) return <p className="text-center text-gray-500 text-xs my-4">No tiene clases asignadas aún.</p>

  return (
    <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full my-12">
        { selectedTableType === 0 && 
        <div className="grid grid-cols-5 gap-12 mb-6">
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
            <AnimatePresence>
                {selectedQuarter !== '0' && 
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <Selector 
                        label={"Clase"}
                        values={[{id: '0', name: 'Seleccione una clase'}, ...classrooms.map(classroom => {
                            const [grade, section, level, id] = classroom.split("-");
                            const classRoomDescription = getClassroomDescription({ lan:'ES', grade, section, level, short: true });
                            return {id, name: classRoomDescription}
                        }
                        )]}
                        setter={setSelectedClassroom}
                        lan="ES"
                        defaultValue={'0'}
                    />
                </motion.div>}
            </AnimatePresence>
            <AnimatePresence>
                {selectedClassroom !== '0' && 
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <Selector
                        label="Area"
                        values={[{id: '0', name: 'Todas'}, ...filteredAreas.map(area => ({id: area.id.toString(), name: area.title}))]}
                        setter={setSelectedArea}
                        defaultValue="0"
                    />
                </motion.div>}
            </AnimatePresence>
            <AnimatePresence>
                {selectedArea !== '0' && 
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <Selector 
                        label={"Curso"}
                        values={[{ id: '0', name: 'Seleccione un Curso'}, ...assignatures
                            .filter(assignature => assignature.clase === parseInt(selectedClassroom))
                            .filter(assignature => assignature.area.toString() === selectedArea)
                            .map(assignature => ({ id: assignature.id.toString(), name: assignature.title }))]
                        }
                        setter={setSelectedAssignature}
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
                    <CategorySelector 
                        setSelectedCategory={setSelectedCategory}
                        all
                    />
                </motion.div>}
            </AnimatePresence>
        </div>} 
        { selectedTableType === 1 && 
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
        </div>} 

    </motion.div>
  )
}

export default GradesTableFilters