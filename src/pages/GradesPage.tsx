import { useLocation } from "react-router-dom";
import Grades from "../components/api/grade/Grades";
import GoBack from "../components/ui/GoBack";

// Sample students data


const GradesPage = () => {

  const location = useLocation()
  const activity = location.state.activity
  const assignatureId = location.state.assignatureId
  const area = location.state.area
  

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto px-6 py-12">
      <div className=" grid grid-cols-3 max-lg:hidden">
        <div className="flex items-center">
          <GoBack 
            path={`/app/assignatures/${assignatureId}/`}
            state={{area, assignatureId }}
          />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2">📊 Calificaciones</h2>
      </div>
      <div className="grid grid-cols-3 lg:hidden ">
      <GoBack 
          path={`/app/assignatures/${assignatureId}/`}
          state={{area, assignatureId }}
        />
        <h2 className="flex-1 text-2xl font-bold text-center mb-2">📊 Calificaciones</h2>
        <div></div>
      </div>
      <p className="text-xl font-semibold text-center mb-6">{activity.title}</p>
      <Grades 
        activityId={activity.id}
      />
    </div>
  );
};

export default GradesPage;
