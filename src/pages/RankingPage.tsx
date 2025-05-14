import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/24/solid';
import gsap from 'gsap';
import Flip from 'gsap/Flip';
import { useNavigate } from 'react-router-dom';
import useGetClassroom from '../hooks/api/classroom/useGetClassroom';
import useSchoolStore from '../hooks/store/useSchoolStore';
import useAuthStore from '../hooks/store/useAuthStore';
import useLoader from '../hooks/ui/useLoader';
import getClassroomDescription from '../utils/getClassroomDescription';
import SelectorNew from '../components/ui/SelectorNew';
import RankingHeader from '../components/api/ranking/RankingHeader';
import getCurrentQuarter from '../utils/getCurrentCuarter';
import RankingStudents from '../components/api/ranking/RankingStudents';

type Grade = 'C' | 'B' | 'A' | 'AD';

interface Student {
  id: number;
  name: string;
  grade: Grade;
  trend: 'up' | 'down' | 'stable';
}

interface Classroom {
  id: number;
  name: string;
  students: Student[];
}

const gradeOrder: Grade[] = ['C', 'B', 'A', 'AD'];

const dummyData: Classroom[] = [
  {
    id: 1,
    name: '1ro A Secundaria',
    students: [
      { id: 1, name: 'Juan Perez', grade: 'AD', trend: 'up' },
      { id: 2, name: 'Maria Gomez', grade: 'AD', trend: 'down' },
      { id: 3, name: 'Luis Torres', grade: 'AD', trend: 'stable' },
      { id: 4, name: 'Ana Salas', grade: 'A', trend: 'up' },
      { id: 5, name: 'Carlos Diaz', grade: 'A', trend: 'up' },
      { id: 6, name: 'Fernanda Ruiz', grade: 'A', trend: 'up' },
      { id: 7, name: 'Diego Marquez', grade: 'B', trend: 'down' },
      { id: 8, name: 'Elena Flores', grade: 'B', trend: 'stable' },
      { id: 9, name: 'Sofia Castro', grade: 'B', trend: 'up' },
      { id: 10, name: 'Andres Morales', grade: 'B', trend: 'down' },
      { id: 11, name: 'Valeria Ortega', grade: 'B', trend: 'stable' },
      { id: 12, name: 'Javier Soto', grade: 'B', trend: 'up' },
      { id: 13, name: 'Camila Rios', grade: 'B', trend: 'up' },
      { id: 14, name: 'Sebastian Herrera', grade: 'C', trend: 'up' },
      { id: 15, name: 'Natalia Vargas', grade: 'C', trend: 'down' },
      { id: 16, name: 'Mateo Jimenez', grade: 'C', trend: 'stable' },
    ],
  },
  {
    id: 2,
    name: '2do A Secundaria',
    students: [
        { id: 17, name: 'Lucas Mendoza', grade: 'AD', trend: 'up' },
        { id: 18, name: 'Isabella Paredes', grade: 'AD', trend: 'down' },
        { id: 19, name: 'Gabriel Salinas', grade: 'AD', trend: 'stable' },
        { id: 20, name: 'Victoria Aguirre', grade: 'AD', trend: 'up' },
        { id: 21, name: 'Samuel Castro', grade: 'A', trend: 'up' },
        { id: 22, name: 'Emilia Rojas', grade: 'A', trend: 'up' },
        { id: 23, name: 'Nicolas Silva', grade: 'A', trend: 'down' },
        { id: 24, name: 'Lucia Morales', grade: 'A', trend: 'stable' },
        { id: 25, name: 'Diego Torres', grade: 'A', trend: 'up' },
        { id: 26, name: 'Camila Soto', grade: 'A', trend: 'down' },
        { id: 27, name: 'Andres Herrera', grade: 'A', trend: 'stable' },
        { id: 28, name: 'Valentina Castro', grade: 'B', trend: 'up' },
        { id: 29, name: 'Mateo Vargas', grade: 'B', trend: 'up' },
        { id: 30, name: 'Sofia Jimenez', grade: 'B', trend: 'up' },
        { id: 31, name: 'Sebastian Rios', grade: 'B', trend: 'down' },
        { id: 32, name: 'Natalia Mendoza', grade: 'B', trend: 'stable' },
        { id: 33, name: 'Lucas Aguirre', grade: 'C', trend: 'up' },
        { id: 34, name: 'Isabella Salinas', grade: 'C', trend: 'down' },
    ],
  },
];

const quarters: Record<string, number> = {
    'Q1': 0,
    'Q2': 1,
    'Q3': 2,
    'Q4': 3,
}

const RankingPage = () => {
    gsap.registerPlugin(Flip);
    const navigate = useNavigate()

    const [selectedClassroom, setSelectedClassroom] = useState<Classroom>(dummyData[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showDetailed, setshowDetailed] = useState(false)
    const [selectedClassroomId, setSelectedClassroomId] = useState(0);
    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(quarters[currentQuarter]);
  
    const sortedStudents = [...selectedClassroom.students].sort(
      (a, b) => gradeOrder.indexOf(b.grade) - gradeOrder.indexOf(a.grade)
    );


    const handleStudentClick = (student: Student) => {
        const ctx = gsap.context(() => {
        const listElements = gsap.utils.toArray('.student-card');
        const dropdown = document.querySelector('.dropdown-classroom');
        const title = document.querySelector('.ranking-title');
        const quarterSelector = document.querySelector('.quarter-selector');
        const clickedCard = document.getElementById(`student-${student.id}`);
    
        const flipState = Flip.getState(clickedCard);
    
        // Animate list & dropdown out
        gsap.to(listElements, { opacity: 0, y: -50, stagger: 0.05, duration: 0.5 });
        gsap.to(dropdown, { opacity: 0, y: -20, duration: 0.3 });
        gsap.to(title, { opacity: 0, y: -20, duration: 0.3 });
        gsap.to(quarterSelector, { opacity: 0, y: -20, duration: 0.3 });
    
        // Animate clicked card to top position
        Flip.from(flipState, {
        scale: true,
        duration: 0.6,
        ease: 'power2.inOut',
        });
    })}

    const trendIcon = (trend: Student['trend']) => {
      switch (trend) {
        case 'up':
          return <ArrowUpIcon className="h-5 w-5 text-green-500" />;
        case 'down':
          return <ArrowDownIcon className="h-5 w-5 text-red-500" />;
        case 'stable':
          return <MinusIcon className="h-5 w-5 text-gray-400" />;
      }
    };

    const school = useSchoolStore((state) => state.school)
    const access = useAuthStore(s => s.access) || ''

    const { data: classrooms, isLoading, isError, error, isSuccess } = useGetClassroom({ access, school: (school.id).toString() })

    useLoader(isLoading)

    if (isError) return <p>{error.message}</p>
    if (isSuccess) 


  
    return (
<div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden min-h-screen py-10">
        <RankingHeader 
            classrooms={classrooms}
            selectedClassroomId={selectedClassroomId}
            setSelectedClassroomId={setSelectedClassroomId}
            quarter={quarter}
            setQuarter={setQuarter}
        />
  
        <div className="space-y-8">
            <RankingStudents 
                classroomId={(selectedClassroomId).toString()}
                quarter={quarter === 0 ? 'Q1' : quarter === 1 ? 'Q2' : quarter === 2 ? 'Q3' : 'Q4'}
            />
        </div>
      </div>
    );
}

export default RankingPage