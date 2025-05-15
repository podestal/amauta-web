import { useState } from 'react';
import gsap from 'gsap';
import Flip from 'gsap/Flip';
import useGetClassroom from '../hooks/api/classroom/useGetClassroom';
import useSchoolStore from '../hooks/store/useSchoolStore';
import useAuthStore from '../hooks/store/useAuthStore';
import useLoader from '../hooks/ui/useLoader';
import RankingHeader from '../components/api/ranking/RankingHeader';
import getCurrentQuarter from '../utils/getCurrentCuarter';
import RankingStudents from '../components/api/ranking/RankingStudents';

const quarters: Record<string, number> = {
    'Q1': 0,
    'Q2': 1,
    'Q3': 2,
    'Q4': 3,
}

const RankingPage = () => {
    gsap.registerPlugin(Flip);

    const [selectedClassroomId, setSelectedClassroomId] = useState(0);
    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(quarters[currentQuarter]);
  

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