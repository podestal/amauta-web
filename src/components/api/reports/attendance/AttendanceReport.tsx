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

    const pdfTitleType = selectedType === '1' ? 'Mensual' : selectedType === '2' ? 'Semanal' : 'Diario';
    const pdfTitle = `Reporte_Asistencia_${pdfTitleType}_${moment().format("DD/MM/YYYY")}.pdf`;

    // const generateImage = async () => {
    //     if (!reportRef.current) return;
    //     setIsLoading(true);
      
    //     try {
    //       const scale = window.devicePixelRatio || 4; // Adjust dynamically
      
    //       const canvas = await html2canvas(reportRef.current, {
    //         scale,
    //         useCORS: true,
    //         backgroundColor: "#ffffff",
    //         width: reportRef.current.scrollWidth,
    //         height: reportRef.current.scrollHeight,
    //         allowTaint: true,
    //         logging: false,
    //       });
      
    //       const imgURL = canvas.toDataURL("image/png", 1.0); // Maximum quality
      
    //       const link = document.createElement("a");
    //       link.href = imgURL;
    //       link.download = `Attendance_Report_${moment().format("YYYYMMDD")}.png`;
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);
    //     } catch (error) {
    //       console.error("Error generating image:", error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };      

    // const generatePDF = async () => {
    //   const { jsPDF } = await import("jspdf");
    //   if (!reportRef.current) return;
    //   setIsLoading(true);

    //   try {
    //       const canvas = await html2canvas(reportRef.current, {
    //           scale: 2, // Higher scale for better resolution
    //           useCORS: true,
    //           backgroundColor: "#ffffff",
    //           allowTaint: true,
    //           logging: false,
    //       });

    //       const imgData = canvas.toDataURL("image/png");
    //       const pdf = new jsPDF({
    //           orientation: "portrait", // or "landscape"
    //           unit: "px",
    //           format: [canvas.width, canvas.height], // Makes it one long page
    //       });

    //       pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    //       pdf.save(`Attendance_Report_${moment().format("YYYYMMDD")}.pdf`);
    //   } catch (error) {
    //       console.error("Error generating PDF:", error);
    //   } finally {
    //       setIsLoading(false);
    //   }
    // }
    // const generatePDF = async () => {
    //     const { jsPDF } = await import("jspdf");
    //     if (!reportRef.current) return;
    //     setIsLoading(true);
    
    //     try {
    //         const canvas = await html2canvas(reportRef.current, {
    //             scale: 1.5, // Reduce scale for smaller image size
    //             useCORS: true,
    //             backgroundColor: "#ffffff",
    //             logging: false,
    //         });
    
    //         const imgData = canvas.toDataURL("image/jpeg", 0.7); // Use JPEG & lower quality
    //         const pdf = new jsPDF({
    //             orientation: "portrait",
    //             unit: "px",
    //             format: "a4", // Use standard format
    //         });
    
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio
    
    //         pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    //         pdf.save(`Attendance_Report_${moment().format("YYYYMMDD")}.pdf`);
    //     } catch (error) {
    //         console.error("Error generating PDF:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    const generatePDF = async () => {
        const { jsPDF } = await import("jspdf");
        if (!reportRef.current) return;
        setIsLoading(true);
    
        try {
            const canvas = await html2canvas(reportRef.current, {
                scale: 2, // Improve resolution
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
            });
    
            const imgData = canvas.toDataURL("image/jpeg", 0.8); // JPEG with compression
            const pdfWidth = 210; // A4 width in mm
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio
    
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: [pdfWidth, pdfHeight], // Set custom height dynamically
            });
    
            pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(pdfTitle);
        } catch (error) {
            console.error("Error generating PDF:", error);
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
                    onClick={generatePDF}
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
            <div ref={reportRef} className="w-full attendance-report dark:bg-gray-950 p-6 shadow-lg rounded-lg">
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
                            currentMonth={currentMonth}
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
