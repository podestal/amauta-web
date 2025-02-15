import { useRef, useState } from "react";
import AttendanceFilters from "./AttendanceFilters";
import AttendanceReportTable from "./AttendanceReportTable";
import AttendanceSummary from "./AttendanceSummary";
import moment from "moment";
import Button from "../../../ui/Button";
import html2canvas from "html2canvas";
import AttendanceReportTitle from "./AttendanceReportTitle";
import { motion } from "framer-motion";

const AttendanceReport = () => {

    const [selectedWeek, setSelectedWeek] = useState(moment().week().toString());
    const [selectedDay, setSelectedDay] = useState(moment().date().toString());
    const [currentMonth, setCurrentMonth] = useState((moment().month() + 1).toString());
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedType, setSelectedType] = useState('2');

    const [isLoading, setIsLoading] = useState(false);
    const reportRef = useRef<HTMLDivElement | null>(null);

    const generateImage = async () => {
        if (!reportRef.current) return;
        setIsLoading(true);
      
        try {
          const scale = window.devicePixelRatio || 4; // Adjust dynamically
      
          const canvas = await html2canvas(reportRef.current, {
            scale,
            useCORS: true,
            backgroundColor: "#ffffff",
            width: reportRef.current.scrollWidth,
            height: reportRef.current.scrollHeight,
            allowTaint: true,
            logging: false,
          });
      
          const imgURL = canvas.toDataURL("image/png", 1.0); // Maximum quality
      
          const link = document.createElement("a");
          link.href = imgURL;
          link.download = `Attendance_Report_${moment().format("YYYYMMDD")}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error("Error generating image:", error);
        } finally {
          setIsLoading(false);
        }
      };      
      

    return (
        <div className="py-12">
            

            {/* PDF Export Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-3 w-full mb-8">
              <h2 
                className="text-4xl text-center font-bold">
                Reporte de Asistencia
              </h2>
              <div className="col-span-2 flex justify-end items-center">
                <Button
                    onClick={generateImage}
                    loading={isLoading}
                    label="Imprimir Reporte"
                    disable={!selectedClassroom || selectedClassroom === '0'}
                    minWidth
                />
              </div>
            </motion.div>
     

            {/* Wrap all content inside this div for PDF capture */}
            <AttendanceFilters 
                setSelectedClassroom={setSelectedClassroom}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <div ref={reportRef} className="w-full attendance-report bg-gray-950 p-6 shadow-lg rounded-lg">
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
