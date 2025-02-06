import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import AttendanceFilters from "./AttendanceFilters";
import AttendanceReportTable from "./AttendanceReportTable";
import useLanguageStore from "../../../../hooks/store/useLanguageStore";
import AttendanceSummary from "./AttendanceSummary";
import moment from "moment";
import Button from "../../../ui/Button";

const AttendanceReport = () => {
    const lan = useLanguageStore(s => s.lan);
    const [selectedWeek, setSelectedWeek] = useState(moment().week().toString());
    const [selectedDay, setSelectedDay] = useState(moment().date().toString());
    const [currentMonth, setCurrentMonth] = useState((moment().month() + 1).toString());
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedType, setSelectedType] = useState('2');

    // 1️⃣ Create a reference to capture the entire report
    const reportRef = useRef<HTMLDivElement | null>(null);

    // 2️⃣ Function to generate the PDF
    const handlePrint = useReactToPrint({
        // content: () => reportRef.current, // Capture the report content
        contentRef: reportRef, // Capture the report content
        documentTitle: "Attendance Report", // PDF file name
    });

    return (
        <div className="py-12">
            <h2 className="text-4xl mb-8 text-center font-bold">{lan === 'EN' ? 'Attendance Report' : 'Reporte de Asistencia'}</h2>
            
            {/* PDF Export Button */}
            <div className="flex justify-end mb-4">
                <Button
                    onClick={() => handlePrint()}
                    label="Imprimir Reporte"
                />

            </div>

            {/* Wrap all content inside this div for PDF capture */}
            <div ref={reportRef} className="bg-white dark:bg-gray-900 p-6 shadow-lg rounded-lg">
                <AttendanceFilters 
                    setSelectedClassroom={setSelectedClassroom}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                />

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
