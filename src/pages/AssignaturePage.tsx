import Activities from '../components/api/activity/Activities'
import { useLocation } from 'react-router-dom'
import useGetProfileStore from '../hooks/store/useGetProfileStore'
import Lessons from '../components/api/lesson/Lessons'
import Tabs from '../components/ui/Tabs'


const AssignaturePage = () => {

  const state = useLocation().state
  const profile = useGetProfileStore(s => s.profile)
  const assignature = state.assignatureId
  const classroom = profile?.clases_details?.find( classroom => classroom.split('-')[classroom.split('-').length - 1] === (state.classroom)?.toString()) || ''
   
  // {group === 'manager'  && <Tabs
  //   tabs={[
  //     { label: "Matrículas", content: <StudentsAdmin classrooms={classrooms} /> },
  //     { label: "Alumnos", content: <ClassroomSummary classrooms={classrooms} /> },
  //     { label: "Agendas", content: <StudentsAgendas />}
  //   ]}
  // />}

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden pt-10 pb-20">
      <Tabs 
        tabs={[
          { label: 'Lecciones', content:       
            <div className='w-full min-h-screen flex justify-center items-center'>
              <Lessons 
                classroom={classroom}
                assignature={assignature}
                area={state.area}
              />
            </div> },
          { label: 'Actividades', content: 
              <Activities 
                classroom={classroom}
              />}
        ]}
      />



      
        {/* <Activities /> */}
    </div>
  )
}

export default AssignaturePage