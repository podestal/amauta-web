import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { GradeByStudent } from '../../../../services/api/gradeService';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend, CategoryScale);

interface Props {
  grades:  GradeByStudent[];
};


const colorPalette = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#14b8a6', // teal
  '#eab308', // yellow
  '#6366f1', // indigo
  '#f97316', // orange
  '#22d3ee', // cyan
  '#84cc16', // lime
  '#a855f7', // purple
  '#0ea5e9', // sky
  '#d946ef', // fuchsia
  '#4ade80', // green
  '#f43f5e', // rose
  '#7c3aed', // deep purple
  '#06b6d4', // light blue
  '#b91c1c', // dark red
];

const RankingActivitiesChart: React.FC<Props> = ({ grades }) => {

  const gradeToNumeric: Record<string, number | null> = { C: 1, B: 2, A: 3, AD: 4, NA: null };
  const numericToGrade: Record<number, string> = { 1: 'C', 2: 'B', 3: 'A', 4: 'AD' };

  const sortedGrades = [...grades]
    .filter(g => gradeToNumeric[g.calification] !== null)
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());

  const gradesByAssignature: Record<string, GradeByStudent[]> = {};
  for (const grade of sortedGrades) {
    if (!gradesByAssignature[grade.assignature]) {
      gradesByAssignature[grade.assignature] = [];
    }
    gradesByAssignature[grade.assignature].push(grade);
  }
  const assignatureColors: Record<string, string> = {};
  Object.keys(gradesByAssignature).forEach((assignature, i) => {
    assignatureColors[assignature] = colorPalette[i % colorPalette.length];
  });

  const datasets = Object.entries(gradesByAssignature).map(([assignature, g]) => ({
    label: assignature,
    data: g.map(entry => ({
      x: entry.due_date,
      y: gradeToNumeric[entry.calification]!,
    })),
    borderColor: assignatureColors[assignature],
    backgroundColor: assignatureColors[assignature],
    fill: false,
    tension: 0.3,
  }));

const data = { datasets };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const value = ctx.raw;
            return `Calificación: ${numericToGrade[value]}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          callback: function (tickValue: string | number) {
            const numericValue = typeof tickValue === 'number' ? tickValue : parseInt(tickValue, 10);
            return numericToGrade[numericValue] || '';
          },
        },
        min: 1,
        max: 4,
        title: {
          display: true,
          text: 'Calificación',
        },
      },
      x: {
        type: 'time' as const,
        time: {
          unit: 'week' as const,
          tooltipFormat: 'dd MMM yyyy',
        },
        title: {
          display: true,
          text: 'Fecha de Entrega',
        },
      },
    },
  };

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Gráfico de Progreso</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <Line data={data} options={options} />
    </div>
    </>

  );
};

export default RankingActivitiesChart;
