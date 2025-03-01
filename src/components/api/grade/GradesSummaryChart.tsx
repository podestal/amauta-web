import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

interface Props {
  student: any;
}

// Mapping number grades to letter grades (Peruvian system)
const gradeScale: Record<number, string> = {
  1: "C",  // Lowest
  2: "B",
  3: "A",
  4: "AD", // Highest
};

// Function to convert numeric grades to letter grades
const getLetterGrade = (grade: number) => gradeScale[grade] || "C";


const GradesSummaryChart = ({ student }: Props) => {
  const colors = ["#EF4444", "#FBBF24", "#34D399", "#3B82F6", "#A855F7", "#F472B6", "#10B981"];

  // Convert grades into chart-friendly format
  const data = Object.keys(student.grades).map((subject, index) => ({
    subject,
    grade: student.grades[subject], // Numeric grade stored
    letterGrade: getLetterGrade(student.grades[subject]), // Convert to letter
    
    color: colors[index % colors.length], // Assign different color per subject
  }));

  return (
    <div className="p-4 rounded-lg shadow-md w-full">
      <h2 className="text-white text-lg font-semibold mb-2 text-center">Promedio por Curso</h2>
      <ResponsiveContainer width="100%" height={data.length * 45}>
        <BarChart layout="vertical" data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          {/* Custom X Axis to show letter grades instead of numbers */}
          <XAxis
            type="number"
            stroke="#fff"
            domain={[0, 3]} // Adjusted to fit the letter scale
            tickFormatter={(value) => gradeScale[value] || ''} // Convert numbers to letters
          />
          <YAxis dataKey="subject" type="category" stroke="#fff" width={150} />
          <Tooltip cursor={{ fill: "#333" }} />
          <Legend />

          <Bar dataKey="grade" radius={[0, 8, 8, 0]} name="Promedio">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradesSummaryChart;
