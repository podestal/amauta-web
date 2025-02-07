import { useRef, useState } from "react";
import AttendanceFilters from "./AttendanceFilters";
import AttendanceReportTable from "./AttendanceReportTable";
import AttendanceSummary from "./AttendanceSummary";
import moment from "moment";
import Button from "../../../ui/Button";
import html2canvas from "html2canvas";
import AttendanceReportTitle from "./AttendanceReportTitle";

const AttendanceReport = () => {

    const [selectedWeek, setSelectedWeek] = useState(moment().week().toString());
    const [selectedDay, setSelectedDay] = useState(moment().date().toString());
    const [currentMonth, setCurrentMonth] = useState((moment().month() + 1).toString());
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedType, setSelectedType] = useState('2');

    // 1️⃣ Create a reference to capture the entire report
    const reportRef = useRef<HTMLDivElement | null>(null);

    const generateImage = async () => {
      if (!reportRef.current) return;

      try {
          const canvas = await html2canvas(reportRef.current, { scale: 2 });
          const imgURL = canvas.toDataURL("image/png");

          // Create a download link
          const link = document.createElement("a");
          link.href = imgURL;
          link.download = `Attendance_Report_${moment().format("YYYYMMDD")}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } catch (error) {
          console.error("Error generating image:", error);
      }
  };

    return (
        <div className="py-12">
            
            <h2 className="text-4xl mb-8 text-center font-bold">Reporte de Asistencia</h2>
            {/* PDF Export Button */}
            <div className="flex justify-end mb-4">
                <Button
                    onClick={generateImage}
                    label="Imprimir Reporte"
                />

            </div>

            {/* Wrap all content inside this div for PDF capture */}
            <AttendanceFilters 
                setSelectedClassroom={setSelectedClassroom}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <div ref={reportRef} className="bg-white w-full attendance-report dark:bg-gray-950 p-6 shadow-lg rounded-lg">
                {selectedClassroom && 
                <AttendanceReportTitle 
                  classroomId={selectedClassroom}
                />}
                {selectedClassroom && (
                    <>
                        {selectedType === '2' && 
                        <AttendanceSummary 
                            selectedClassroom={selectedClassroom}
                            selectedWeek={selectedWeek}
                        />}
                        {selectedType === '3' && 
                        <AttendanceSummary 
                            selectedClassroom={selectedClassroom}
                            selectedDay={selectedDay}
                            currentMonth={selectedMonth}
                        />}
                        {selectedType === '1' &&
                        <AttendanceSummary 
                            selectedClassroom={selectedClassroom}
                            currentMonth={selectedMonth}
                        />}
                        
                        <AttendanceReportTable 
                            selectedClassroom={selectedClassroom}
                            selectedType={selectedType}
                            selectedWeek={selectedWeek}
                            setSelectedWeek={setSelectedWeek}
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                            currentMonth={currentMonth}
                            setCurrentMonth={setCurrentMonth}
                            selectedMonth={selectedMonth}
                            setSelectedMonth={setSelectedMonth}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AttendanceReport;
