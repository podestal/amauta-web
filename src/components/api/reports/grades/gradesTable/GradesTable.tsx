import { useState } from "react";
import { competencies, } from "../../../../../data/mockdataForGrades";
import { motion } from "framer-motion";
import Button from "../../../../ui/Button";
import GradesTableFilters from "./GradesTableFilters";
import useAuthStore from "../../../../../hooks/store/useAuthStore";
import useGetAssignature from "../../../../../hooks/api/assignature/useGetAssignature";
import useLoader from "../../../../../hooks/ui/useLoader";
import GradesTableHeader from "./GradesTableHeader";
import GradesTableBody from "./GradesTableBody";
import GradesTableActivitiesHeader from "./GradesTableActivitiesHeader";
import GradesTableActivitiesBody from "./GradesTableActivitiesBody";
import getCurrentQuarter from "../../../../../utils/getCurrentCuarter";

const GradesTable = () => {

        // const gradeStyles: Record<string, string> = {
        //     "A": "bg-blue-500 text-white",
        //     "B": "bg-yellow-500 text-white",
        //     "C": "bg-red-500 text-white",
        //     "AD": "bg-green-500 text-white",
        //     "NA": "bg-gray-300 text-gray-700", 
        // };
        
        // const [students, setStudents] = useState<StudentsTable[]>(initialStudents);
        const [selectedAssignature, setSelectedAssignature] = useState('0');
        const [selectedArea, setSelectedArea] = useState('0');
        const [selectedComeptency, setSelectedCompetency] = useState('0');
        const [selectedQuarter, setSelectedQuarter] = useState(getCurrentQuarter());
        const [selectedCategory, setSelectedCategory] = useState('0');
        // const [filterByName, setFilterByName] = useState('');

        const access = useAuthStore(s => s.access) || ''
        const { data: assignatures, isLoading, isError, error, isSuccess } = useGetAssignature({ access, byInstructor: true })

        useLoader(isLoading)

        if (isError) return <p>Error: {error.message}</p>

        if(isSuccess)

  return (
    <div className="overflow-x-auto">
         <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold ">📊 Resumen de Calificaciones</h2>
            <Button 
                label="Exportar"
            />
        </motion.div>
        <GradesTableFilters 
            assignatures={assignatures}
            setSelectedAssignature={setSelectedAssignature}
            selectedAssignature={selectedAssignature}
            setSelectedCompetency={setSelectedCompetency}
            setSelectedQuarter={setSelectedQuarter}
            setSelectedCategory={setSelectedCategory}
            selectedQuarter={selectedQuarter}
            selectedCategory={selectedCategory}
            setSelectedArea={setSelectedArea}
        />
        {selectedComeptency === '0' && <>
            {selectedArea !== '0' && 
            <GradesTableHeader 
                comptencies={competencies.filter(competency => competency.area.toString() === selectedArea)}
            />}
            {selectedAssignature !== '0' && 
            <GradesTableBody 
                classroomId={(assignatures.find(assignature => assignature.id.toString() === selectedAssignature)?.clase)?.toString() || '0'}
                competencies={competencies.filter(competency => competency.area.toString() === selectedArea).map(competency => competency.id.toString())}
                selectedQuarter={selectedQuarter}
            />}
        </>}
        {selectedComeptency !== '0' && <>
            <GradesTableActivitiesHeader 
                assignatureId={selectedAssignature}
                competence={selectedComeptency}
            />
            <GradesTableActivitiesBody 
                classroomId={(assignatures.find(assignature => assignature.id.toString() === selectedAssignature)?.clase)?.toString() || '0'}
                competence={selectedComeptency}
                selectedAssignature={selectedAssignature}
            />
        </>}

    </div>
  )
}

export default GradesTable