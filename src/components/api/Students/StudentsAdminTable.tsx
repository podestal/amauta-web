// import { useRef, useState } from "react"
// import useGetStudents from "../../../hooks/api/student/useGetStudents"
// import useAuthStore from "../../../hooks/store/useAuthStore"
// import Input from "../../ui/Input"
// import { motion } from "framer-motion"
// import StudentAdminCard from "./StudentAdminCard"
// import { Classroom } from "../../../services/api/classroomService"
// import moment from "moment"
// import Button from "../../ui/Button"
// import Modal from "../../ui/Modal"
// // import { useReactToPrint } from "react-to-print"
// import { QRCodeSVG } from "qrcode.react"
// import QRCode from "qrcode"
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
// import { Student } from "../../../services/api/studentsService"
// import getClassroomDescription from "../../../utils/getClassroomDescription"
// import getTitleCase from "../../../utils/getTitleCase"

// interface Props {
//     classroomId: string
//     classrooms: Classroom[]
// }


// export const generateQRBase64 = async (text: string) => {
//   return await QRCode.toDataURL(text)
// }

// const StudentsAdminTable = ({ classroomId, classrooms }: Props) => {

//     const today = moment().date()
//     const currentClassroom = classrooms.find(classroom => classroom.id === parseInt(classroomId))
//     const classroomDescription = currentClassroom && getClassroomDescription({ lan: 'ES', grade: currentClassroom.grade, section: currentClassroom.section, level: currentClassroom.level })
    
    
//     const [open, setOpen] = useState(false)
//     const access = useAuthStore(s => s.access) || ''
//     const printRef = useRef<HTMLDivElement>(null)

//     const sanitizeText = (text: string): string => {
//         return text.replace(/[\t\n\r]+/g, ' ') // Replace tabs and newlines with a space
//                 .replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII if needed (optional)
//     }
      

//     const handleDownloadPDF = async (students: Student[], classroomDescription: string) => {
//         const pdfDoc = await PDFDocument.create()
//         const pageWidth = 612 // US Letter width
//         const pageHeight = 792 // US Letter height
//         const qrSize = 130 // Larger QR size
//         const marginTop = 60
//         const marginX = 40
      
//         const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
//         let page = pdfDoc.addPage([pageWidth, pageHeight])
//         let y = pageHeight - marginTop
      
//         const maxPerRow = 3
//         const rowSpacing = 60
//         const colSpacing = (pageWidth - 2 * marginX - (maxPerRow * qrSize)) / (maxPerRow - 1)
      
//         // Draw classroom title
//         const cleanClassroomDescription = sanitizeText(classroomDescription)
//         const titleFontSize = 20
//         const titleWidth = font.widthOfTextAtSize(cleanClassroomDescription, titleFontSize)
//         page.drawText(classroomDescription, {
//           x: (pageWidth - titleWidth) / 2,
//           y,
//           size: titleFontSize,
//           font,
//           color: rgb(0, 0, 0),
//         })
//         y -= titleFontSize + 30
      
//         let x = marginX
//         let rowIndex = 0
      
//         for (let i = 0; i < students.length; i++) {
//           const student = students[i]
//           const label =  sanitizeText(`${getTitleCase(student.first_name)} ${getTitleCase(student.last_name)}`)
//           const qrBase64 = await generateQRBase64(`${student.uid}-${student.first_name}`)
//           const imageBytes = await fetch(qrBase64).then(res => res.arrayBuffer())
//           const qrImage = await pdfDoc.embedPng(imageBytes)
      
//           // Add new page if needed
//           if (i !== 0 && i % (maxPerRow * 3) === 0) {
//             page = pdfDoc.addPage([pageWidth, pageHeight])
//             y = pageHeight - marginTop - titleFontSize - 30
//             x = marginX
//             rowIndex = 0
      
//             // Redraw title on new page
//             page.drawText(classroomDescription, {
//               x: (pageWidth - titleWidth) / 2,
//               y: pageHeight - marginTop,
//               size: titleFontSize,
//               font,
//               color: rgb(0, 0, 0),
//             })
//           }

          
      
//           // Draw QR code
//           page.drawImage(qrImage, {
//             x,
//             y: y - qrSize,
//             width: qrSize,
//             height: qrSize,
//           })
      
//           // Centered label under QR
//           const labelFontSize = 8
//           const labelWidth = font.widthOfTextAtSize(label, labelFontSize)
//           page.drawText(label, {
//             x: x + (qrSize - labelWidth) / 2,
//             y: y - qrSize - 15,
//             size: labelFontSize,
//             font,
//             color: rgb(0, 0, 0),
//           })
      
//           // Position updates
//           if ((i + 1) % maxPerRow === 0) {
//             rowIndex++
//             x = marginX
//             y -= qrSize + rowSpacing
//           } else {
//             x += qrSize + colSpacing
//           }
//         }
      
//         const pdfBytes = await pdfDoc.save()
//         const blob = new Blob([pdfBytes], { type: 'application/pdf' })
//         const link = document.createElement('a')
//         link.href = URL.createObjectURL(blob)
//         link.download = `QRs-${classroomDescription}.pdf`
//         link.click()
//       }
      
//     const [studentFilter, setStudentFilter] = useState('')
//     const {data: students, isLoading, isError, error, isSuccess} = useGetStudents({ access, classroomId, day: today.toString(), month: moment().month().toString() })

//     if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

//     if (isError) return <p>Error {error.message}</p>

//     if (isSuccess)

//   return (
//     <>
//     <div className="w-full flex flex-col gap-4">
//         <div className="flex gap-4">
//             <Input 
//                 value={studentFilter}
//                 onChange={e => {
//                     setStudentFilter(e.target.value)
//                 }}
//                 placeholder="Buscar por nombre"
//             />
//             <Button 
//                 label="Imprimir QRs"
//                 onClick={() => setOpen(true)}
//             />
//         </div>
//         <div className="w-full grid grid-cols-10 text-lg font-bold gap-6 px-6 py-3 dark:bg-gray-900 bg-slate-200 rounded-t-xl">
//             <p className="col-span-3">Nombres y Apellidos</p>
//             <p>Información Personal</p>
//             <p>Información Nacimiento</p>
//             <p>Información Salud</p>
//             <p>Contacto Emergencia</p>
//             <p>Información Padre</p>
//             <p>Información Madre</p>
//             <p>Información Apoderado</p>
//         </div>
//         <motion.div 
//             initial="hidden"
//             animate="visible"
//             transition={{ staggerChildren: 0.1 }}
//             className="w-full flex flex-col gap-2">
//             {students
//                 .filter( student => `${student.first_name.toLowerCase()}${student.last_name.toLowerCase()}`.includes(studentFilter.toLowerCase()))
//                 .map( student => (
//                 <StudentAdminCard 
//                     key={student.uid}
//                     student={student}
//                     classrooms={classrooms}
//                     classroomId={classroomId}
//                 />
//             ))}
//         </motion.div>
//     </div>
//     <Modal isOpen={open} onClose={() => setOpen(false)} whole>
//         <div className="flex flex-col gap-4 items-center">
//             <Button label="Imprimir" onClick={() =>{ 
                
//                 handleDownloadPDF(students, classroomDescription || "Descripción no disponible")}} />
            
//             <div ref={printRef} className="my-10">
//                 {/* Chunk students into groups of 9 */}
//                 <h2 className="text-3xl my-6 text-center max-lg:hidden">{classroomDescription}</h2>
//                 {students.reduce((rows, student, index) => {
//                     if (index % 9 === 0) rows.push([]);
//                     rows[rows.length - 1].push(student);
//                     return rows;
//                 }, [] as Student[][]).map((group, i) => (
//                     <div key={i} className="print:break-after-page mx-10">
//                         <h2 className="text-3xl my-6 text-center md:hidden">{classroomDescription}</h2>
//                         <div className="grid grid-cols-3 gap-8 ">
//                             {group.map((student) => (
//                                 <div className="flex flex-col items-center gap-2 mt-6" key={student.uid}>
//                                     <h2 className="lg:text-sm font-semibold text-center mb-2">
//                                         {student.first_name} {student.last_name}
//                                     </h2>
//                                     <QRCodeSVG value={`${student.uid}-${student.first_name}`} size={160} />
//                                 </div>
//                             ))}
//                         </div>
                        
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </Modal>
//     </>
//   )
// }

// export default StudentsAdminTable

import { useRef, useState } from "react";
import useGetStudents from "../../../hooks/api/student/useGetStudents";
import useAuthStore from "../../../hooks/store/useAuthStore";
import Input from "../../ui/Input";
import { motion } from "framer-motion";
import StudentAdminCard from "./StudentAdminCard";
import { Classroom } from "../../../services/api/classroomService";
import moment from "moment";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { QRCodeSVG } from "qrcode.react";
import QRCode from "qrcode";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Student } from "../../../services/api/studentsService";
import getClassroomDescription from "../../../utils/getClassroomDescription";
import getTitleCase from "../../../utils/getTitleCase";

interface Props {
  classroomId: string;
  classrooms: Classroom[];
}

export const generateQRBase64 = async (text: string) => {
  return await QRCode.toDataURL(text);
};

const StudentsAdminTable = ({ classroomId, classrooms }: Props) => {
  const today = moment().date();
  const currentClassroom = classrooms.find(
    (classroom) => classroom.id === parseInt(classroomId)
  );
  const classroomDescription =
    currentClassroom &&
    getClassroomDescription({
      lan: "ES",
      grade: currentClassroom.grade,
      section: currentClassroom.section,
      level: currentClassroom.level,
    });

  const [open, setOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const access = useAuthStore((s) => s.access) || "";
  const printRef = useRef<HTMLDivElement>(null);

  const sanitizeText = (text: string): string => {
    return text
      .replace(/[\t\n\r]+/g, " ") // Replace tabs and newlines with a space
      .replace(/[^\x00-\x7F]/g, ""); // Remove non-ASCII if needed (optional)
  };

  const handleDownloadPDF = async (
    students: Student[],
    classroomDescription: string
  ) => {
    const pdfDoc = await PDFDocument.create();
    const pageWidth = 612; // US Letter width
    const pageHeight = 792; // US Letter height
    const qrSize = 130; // Larger QR size
    const marginTop = 60;
    const marginX = 40;

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - marginTop;

    const maxPerRow = 3;
    const rowSpacing = 60;
    const colSpacing =
      (pageWidth - 2 * marginX - maxPerRow * qrSize) / (maxPerRow - 1);

    // Draw classroom title
    const cleanClassroomDescription = sanitizeText(classroomDescription);
    const titleFontSize = 20;
    const titleWidth = font.widthOfTextAtSize(
      cleanClassroomDescription,
      titleFontSize
    );
    page.drawText(classroomDescription, {
      x: (pageWidth - titleWidth) / 2,
      y,
      size: titleFontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= titleFontSize + 30;

    let x = marginX;
    let rowIndex = 0;

    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      const label = sanitizeText(
        `${getTitleCase(student.first_name)} ${getTitleCase(student.last_name)}`
      );
      const qrBase64 = await generateQRBase64(
        `${student.uid}-${student.first_name}`
      );
      const imageBytes = await fetch(qrBase64).then((res) => res.arrayBuffer());
      const qrImage = await pdfDoc.embedPng(imageBytes);

      // Add new page if needed
      if (i !== 0 && i % (maxPerRow * 3) === 0) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - marginTop - titleFontSize - 30;
        x = marginX;
        rowIndex = 0;

        // Redraw title on new page
        page.drawText(classroomDescription, {
          x: (pageWidth - titleWidth) / 2,
          y: pageHeight - marginTop,
          size: titleFontSize,
          font,
          color: rgb(0, 0, 0),
        });
      }

      // Draw QR code
      page.drawImage(qrImage, {
        x,
        y: y - qrSize,
        width: qrSize,
        height: qrSize,
      });

      // Centered label under QR
      const labelFontSize = 8;
      const labelWidth = font.widthOfTextAtSize(label, labelFontSize);
      page.drawText(label, {
        x: x + (qrSize - labelWidth) / 2,
        y: y - qrSize - 15,
        size: labelFontSize,
        font,
        color: rgb(0, 0, 0),
      });

      // Position updates
      if ((i + 1) % maxPerRow === 0) {
        rowIndex++;
        x = marginX;
        y -= qrSize + rowSpacing;
      } else {
        x += qrSize + colSpacing;
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `QRs-${classroomDescription}.pdf`;
    link.click();
  };

  const handleSelectAll = () => {
    if (students) {
        setSelectedStudents(students);
    }
  };

  const handleDeselectAll = () => {
    setSelectedStudents([]);
  };

  const toggleStudentSelection = (student: Student) => {
    if (selectedStudents.some((s) => s.uid === student.uid)) {
      setSelectedStudents((prev) =>
        prev.filter((s) => s.uid !== student.uid)
      );
    } else {
      setSelectedStudents((prev) => [...prev, student]);
    }
  };

  const [studentFilter, setStudentFilter] = useState("");
  const {
    data: students,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetStudents({
    access,
    classroomId,
    day: today.toString(),
    month: moment().month().toString(),
  });

  if (isLoading)
    return (
      <p className="animate-pulse text-2xl text-center py-20">
        Un Momento ...
      </p>
    );

  if (isError) return <p>Error {error.message}</p>;

  if (isSuccess)
    return (
      <>
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              value={studentFilter}
              onChange={(e) => {
                setStudentFilter(e.target.value);
              }}
              placeholder="Buscar por nombre"
            />
            <Button label="Imprimir QRs" onClick={() => setOpen(true)} />
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="w-full flex flex-col gap-2"
          >
            {students
              .filter((student) =>
                `${student.first_name.toLowerCase()}${student.last_name.toLowerCase()}`.includes(
                  studentFilter.toLowerCase()
                )
              )
              .map((student) => (
                <StudentAdminCard
                  key={student.uid}
                  student={student}
                  classrooms={classrooms}
                  classroomId={classroomId}
                />
              ))}
          </motion.div>
        </div>
        <Modal isOpen={open} onClose={() => setOpen(false)} whole>
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-4">
                <Button color="green" label="Selectionar todos" onClick={handleSelectAll} />
                <Button
                    label="Imprimir"
                    onClick={() => {
                        handleDownloadPDF(
                        selectedStudents,
                        classroomDescription || "Descripción no disponible"
                        );
                    }}
                />
                <Button color="amber" label="Limpiar selección" onClick={handleDeselectAll} />
            </div>

            <div ref={printRef} className="my-10">
              <h2 className="text-3xl my-6 text-center max-lg:hidden">
                {classroomDescription}
              </h2>
              <div className="grid grid-cols-3 gap-12 w-full">
                {students.map((student) => (
                    <div
                    key={student.uid}
                    className="flex flex-col items-center gap-2 mt-6"
                    >
                    <input
                        type="checkbox"
                        checked={selectedStudents.some((s) => s.uid === student.uid)}
                        onChange={() => toggleStudentSelection(student)}
                    />
                    <h2 className="lg:text-sm font-semibold text-center mb-2">
                        {student.first_name} {student.last_name}
                    </h2>
                    <QRCodeSVG
                        value={`${student.uid}-${student.first_name}`}
                        size={160}
                    />
                    </div>
                ))}
              </div>

            </div>
          </div>
        </Modal>
      </>
    );
};

export default StudentsAdminTable;