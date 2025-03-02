import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import useAuthStore from "../../../hooks/store/useAuthStore";
import useGetAssignaturesByTutor from "../../../hooks/api/assignature/useGetAssignatureByTutor";
import { useEffect } from "react";
import { AssignatureByTutor } from "../../../services/api/assignatureService";

interface Props {
  studentId: string;
  setAssignatures:  React.Dispatch<React.SetStateAction<AssignatureByTutor[]>>;
  quarter: string;
}

// Mapping number grades to letter grades (Peruvian system)
const gradeScale: Record<number, string> = {
  1: "C",  // Lowest
  2: "B",
  3: "A",
  4: "AD", // Highest
};

const gradesReverseScale: Record<string, number> = {
    "NA": 0,
    "C": 1,
    "B": 2,
    "A": 3,
    "AD": 4,
}


const GradesSummaryChart = ({ studentId, setAssignatures, quarter }: Props) => {
  const colors = ["#EF4444", "#FBBF24", "#34D399", "#3B82F6", "#A855F7", "#F472B6", "#10B981"];
  const access = useAuthStore((s) => s.access) || ""

  const { data: assignatures, isLoading, isError, error, isSuccess } = useGetAssignaturesByTutor({ access, studentId, quarter });

  useEffect(() => {
    if (assignatures) {
      setAssignatures(assignatures);
    }
  }, [assignatures])

  const data = assignatures && assignatures.map((assignature, index) => ({
    subject: assignature.title,
    grade: gradesReverseScale[assignature.average], // changes the length of bar
    letterGrade: assignature.average, // Convert to letter
    
    color: colors[index % colors.length], // Assign different color per subject
}));

  if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)


  return (
    <div className="p-4 rounded-lg shadow-md w-full">
        <h2 className="text-white text-lg font-semibold mb-2 text-center">Promedio por Curso</h2>
        <>{console.log('assignatures', assignatures)}</>
        {data && <ResponsiveContainer width="100%" height={200}>
        <BarChart layout="vertical" data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          {/* Custom X Axis to show letter grades instead of numbers */}
          <XAxis
            type="number"
            stroke="#fff"
            domain={[0, 4]} // Adjusted to fit the letter scale
            tickFormatter={(value) => gradeScale[value] || ''} // Convert numbers to letters
          />
          <YAxis dataKey="subject" type="category" stroke="#fff" width={150} />
          <Tooltip cursor={{ fill: "#333" }} />
          <Legend />

          <Bar dataKey="grade" name="Promedio">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>}
    </div>
  );
};

export default GradesSummaryChart;
