import React from "react";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

interface AttendanceProps {
  onTime: number;
  leftEarly: number;
  notAttended: number;
  late: number;
  excused: number;
  lan: string
  show: boolean;
  student: { uid: string };
  navigate: (path: string) => void;
}

const AttendanceSummaryChart: React.FC<AttendanceProps> = ({
  onTime,
  leftEarly,
  notAttended,
  late,
  excused,
  lan,
  show,
}) => {
  // Data for the donut chart
  const data = {
    labels: [
      lan === "EN" ? "On Time" : "Temprano",
      lan === "EN" ? "Left Early" : "Salió Temprano",
      lan === "EN" ? "Not Attended" : "Falta",
      lan === "EN" ? "Late" : "Tardanza",
      lan === "EN" ? "Excused" : "Excusado",
    ],
    datasets: [
      {
        data: [onTime, leftEarly, notAttended, late, excused],
        backgroundColor: [
          "#22c55e", // Green
          "#facc15", // Yellow
          "#ef4444", // Red
          "#f59e0b", // Amber
          "#2E7D32", // Green
        ],
        borderWidth: 1,
      },
    ],
  };

    const itemVariants = {
        hidden: { opacity: 0, x: 50 }, // Starts off-screen to the right
        visible: { opacity: 1, x: 0 }, // Slides into place
    };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: show ? "auto" : 0,
        opacity: show ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mb-6 w-[100%] mx-auto flex justify-between"
    >
      <div className="w-[40%] flex flex-col items-center">
        <Doughnut
          data={data}
          options={{
            responsive: false,
            cutout: "60%", 
            plugins: {
                legend: {
                    display: false,
                },
            },
          }}
        />
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }} 
        className="space-y-2"
        >
            {[
                { color: "bg-green-500", label: lan === "EN" ? "On Time" : "Temprano", count: onTime },
                { color: "bg-yellow-500", label: lan === "EN" ? "Left Early" : "Salió Temprano", count: leftEarly },
                { color: "bg-red-500", label: lan === "EN" ? "Not Attended" : "Falta", count: notAttended },
                { color: "bg-amber-500", label: lan === "EN" ? "Late" : "Tardanza", count: late },
                { color: "bg-green-800", label: lan === "EN" ? "Excused" : "Excusado", count: excused },
            ].map((item, index) => (
                <motion.div
                    key={index}
                    className="flex items-center gap-2 w-full"
                    variants={itemVariants} 
                    >
                    <div className={`${item.color} w-[20px] h-[20px] rounded-full flex items-center justify-center`}>
                        <p className="text-xs font-bold text-slate-100">{item.count}</p>
                    </div>
                    <span className="ml-2 text-xs">{item.label}</span>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
  );
};

export default AttendanceSummaryChart;
