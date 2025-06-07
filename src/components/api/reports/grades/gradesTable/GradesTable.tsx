import { useState } from "react";
import { competencies, } from "../../../../../data/mockdataForGrades";
import { motion } from "framer-motion";
import GradesTableFilters from "./GradesTableFilters";
import useAuthStore from "../../../../../hooks/store/useAuthStore";
import useGetAssignature from "../../../../../hooks/api/assignature/useGetAssignature";
import useLoader from "../../../../../hooks/ui/useLoader";
import GradesTableHeader from "./GradesTableHeader";
import GradesTableBody from "./GradesTableBody";
import GradesTableActivitiesHeader from "./GradesTableActivitiesHeader";
import GradesTableActivitiesBody from "./GradesTableActivitiesBody";
import getCurrentQuarter from "../../../../../utils/getCurrentCuarter";
import GetQuarterGradesExcel from "./GetQuarterGradesExcel";
import MultiOptionSwitch from "../../../../ui/MultiOptionSwitch";
import useGetProfileStore from "../../../../../hooks/store/useGetProfileStore";

const tableTypes = [
    { id: 0, label: 'Áreas' },
    { id: 1, label: 'Competencias' }
];


const GradesTable = () => {

    const [selectedTableType, setSelectedTableType] = useState(0);
    const [selectedAssignature, setSelectedAssignature] = useState('0');
    const [selectedArea, setSelectedArea] = useState('0');
    const [selectedComeptency, setSelectedCompetency] = useState('0');
    const [selectedQuarter, setSelectedQuarter] = useState(getCurrentQuarter());
    const [selectedCategory, setSelectedCategory] = useState('0');
    const [selectedClassroom, setSelectedClassroom] = useState('0');
    const [filterByName, setFilterByName] = useState('');


    const access = useAuthStore(s => s.access) || ''
    const profile = useGetProfileStore(s => s.profile)
    const classrooms = profile?.clases_details || [];

    if (classrooms.length === 0) return <p className="text-center text-gray-500 text-xs my-4">No tiene clases asignadas aún.</p>

    const { data: assignatures, isLoading, isError, error, isSuccess } = useGetAssignature({ access, byInstructor: true })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div className="overflow-x-auto">
        <>{console.log('profile', profile)}</>
         <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold ">📊 Resumen de Calificaciones</h2>
            <MultiOptionSwitch 
                options={tableTypes.map(option => option.label)}
                selected={selectedTableType}
                setSelected={setSelectedTableType}
            />
            <GetQuarterGradesExcel 
                selectedQuarter={selectedQuarter}
            />
        </motion.div>
        <GradesTableFilters 
            selectedTableType={selectedTableType}
            assignatures={assignatures}
            setSelectedAssignature={setSelectedAssignature}
            selectedAssignature={selectedAssignature}
            setSelectedCompetency={setSelectedCompetency}
            selectedCompetency={selectedComeptency}
            setSelectedQuarter={setSelectedQuarter}
            setSelectedCategory={setSelectedCategory}
            selectedQuarter={selectedQuarter}
            selectedCategory={selectedCategory}
            setSelectedArea={setSelectedArea}
            selectedArea={selectedArea}
            classrooms={classrooms}
            selectedClassroom={selectedClassroom}
            setSelectedClassroom={setSelectedClassroom}
        />
        <>{console.log('selectedArea', selectedArea)}</>
        {selectedComeptency === '0' && <>
            {selectedArea !== '0' && 
            <GradesTableHeader 
                comptencies={competencies.filter(competency => competency.area.toString() === selectedArea)}
                filterByName={filterByName}
                setFilterByName={setFilterByName}
            />}
            {selectedAssignature !== '0' && 
            <GradesTableBody 
                classroomId={(assignatures.find(assignature => assignature.id.toString() === selectedAssignature)?.clase)?.toString() || '0'}
                competencies={competencies.filter(competency => competency.area.toString() === selectedArea).map(competency => competency.id.toString())}
                selectedQuarter={selectedQuarter}
                filterByName={filterByName}
            />}
        </>}
        {selectedComeptency !== '0' && <>
            <GradesTableActivitiesHeader 
                assignatureId={selectedAssignature}
                competence={selectedComeptency}
                quarter={selectedQuarter}
                category={selectedCategory}
                filterByName={filterByName}
                setFilterByName={setFilterByName}
            />
            <GradesTableActivitiesBody 
                classroomId={(assignatures.find(assignature => assignature.id.toString() === selectedAssignature)?.clase)?.toString() || '0'}
                competence={selectedComeptency}
                selectedAssignature={selectedAssignature}
                quarter={selectedQuarter}
                category={selectedCategory}
                filterByName={filterByName}
            />
        </>}

    </div>
  )
}

export default GradesTable