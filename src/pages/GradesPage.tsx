import { useLocation } from "react-router-dom";
import Grades from "../components/api/grade/Grades";

// Sample students data


const GradesPage = () => {

  const location = useLocation()
  const activity = location.state.activity

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">📊 Calificaciones</h2>
      <p className="text-xl font-semibold text-center mb-6">{activity.title}</p>
      <Grades 
        activityId={activity.id}
      />
    </div>
  );
};

export default GradesPage;
