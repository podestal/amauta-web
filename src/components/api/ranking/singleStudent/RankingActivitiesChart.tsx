import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { GradeByStudent } from '../../../../services/api/gradeService';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend, CategoryScale);

interface Props {
  grades:  GradeByStudent[];
};

const RankingActivitiesChart: React.FC<Props> = ({ grades }) => {
  const gradeToNumeric: Record<string, number | null> = { C: 1, B: 2, A: 3, AD: 4, NA: null };
  const numericToGrade: Record<number, string> = { 1: 'C', 2: 'B', 3: 'A', 4: 'AD' };

  const sortedGrades = [...grades]
    .filter(g => gradeToNumeric[g.calification] !== null)
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());

  const data = {
    labels: sortedGrades.map(g => g.due_date),
    datasets: [
      {
        label: 'Progreso de Calificaciones',
        data: sortedGrades.map(g => gradeToNumeric[g.calification]!),
        fill: false,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.3,
      },
    ],
  };

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
