import { useState } from "react";

export interface Attendance {
    date: string; // Format: YYYY-MM-DD
    status: 'Present' | 'Absent' | 'Late';
    observation?: string;
  }
  
export interface MonthlyAttendance {
    month: string; // Format: YYYY-MM (e.g., 2024-12)
    days: Attendance[];
}

interface Props {
    day: Attendance;
  }
  
  const DayAttendance: React.FC<Props> = ({ day }) => {
    return (
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <span className="font-bold">{day.date}</span>
          <span className={`ml-2 ${day.status === 'Absent' ? 'text-red-500' : day.status === 'Late' ? 'text-yellow-500' : 'text-green-500'}`}>
            {day.status}
          </span>
        </div>
        {day.observation && (
          <div className="text-gray-500 italic">
            Observation: {day.observation}
          </div>
        )}
      </div>
    );
  };
  
  const mockData: MonthlyAttendance[] = [
    {
      month: '2024-12',
      days: [
        { date: '2024-12-01', status: 'Present' },
        { date: '2024-12-02', status: 'Absent', observation: 'Sick' },
        { date: '2024-12-03', status: 'Late', observation: 'Missed the bus' },
        // More days...
      ],
    },
    {
      month: '2024-11',
      days: [
        { date: '2024-11-01', status: 'Present' },
        { date: '2024-11-02', status: 'Present' },
        { date: '2024-11-03', status: 'Absent', observation: 'Family emergency' },
        // More days...
      ],
    },
  ];

const TutorDetailedAttendance = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>('2024-12');

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedMonth(event.target.value);
    };
  
    const attendanceForMonth = mockData.find((month) => month.month === selectedMonth);
  
    return (
      <div className="max-w-4xl mx-auto p-8 ">
        <h1 className="text-2xl font-bold mb-4">Student Attendance</h1>
        <div className="mb-4">
          <label className="font-medium text-lg">Select Month:</label>
          <select
            className="ml-2 p-2 border rounded"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {mockData.map((month) => (
              <option key={month.month} value={month.month}>
                {month.month}
              </option>
            ))}
          </select>
        </div>
        {attendanceForMonth ? (
          <div className="dark:bg-slate-900 shadow rounded">
            <h2 className="text-xl font-semibold p-4 border-b">
              Attendance for {attendanceForMonth.month}
            </h2>
            {attendanceForMonth.days.map((day) => (
              <DayAttendance key={day.date} day={day} />
            ))}
          </div>
        ) : (
          <div>No attendance data available for this month.</div>
        )}
      </div>
    );
}

export default TutorDetailedAttendance