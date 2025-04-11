// import { useState } from "react"
// import QRScanner from "../components/ui/QRScanner"
// import StudentScannedInfo from "../components/api/Students/StudentScannedInfo"
// import { motion } from "framer-motion"

// const LocateStudentPage = () => {

//     const [studentId, setStudentId] = useState('')

//     const onScanSuccess = (decodedText: string, pauseScanner: any, resumeScanner: any, stopScanner: any) => {
        // console.log(pauseScanner)
        // console.log(resumeScanner)
        // console.log(decodedText)
//         const studentId = decodedText.split('-')[0]
//         setStudentId(studentId)
//         stopScanner()
//     }

//   return (
//     <div className="pb-20">
//         {studentId 
//         ? 
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//         >
//             <StudentScannedInfo 
//                 studentId={studentId}
//             />
//         </motion.div>
//         : 
//         <div className="flex flex-col items-center justify-center h-full">
//             <h2 className="text-2xl mt-20">Escanea QR de Alumno</h2>
//             <QRScanner 
//                 onScanSuccess={onScanSuccess}
//                 selectedStatus='1'
//             />
//         </div>
//         }
//     </div>
//   )
// }

// export default LocateStudentPage

import { useState } from "react"
import QRScanner from "../components/ui/QRScanner"
import StudentScannedInfo from "../components/api/Students/StudentScannedInfo"
import { motion } from "framer-motion"
import { ScanLine, Search } from "lucide-react"
import StudentByDNI from "../components/api/Students/StudentByDNI"
import StudentByDniInfo from "../components/api/Students/StudentByDniInfo"
import StudentsByNameInfo from "../components/api/Students/StudentsByNameInfo"
import useSchoolStore from "../hooks/store/useSchoolStore"

const LocateStudentPage = () => {
    const [studentId, setStudentId] = useState('')
    const [searchMode, setSearchMode] = useState<'qr' | 'name'>('qr')
    const [studentDni, setStudentDni] = useState('')
    const [studentName, setStudentName] = useState('')
    const school = useSchoolStore(s => s.school)

    const onScanSuccess = (decodedText: string, pauseScanner: any, resumeScanner: any, stopScanner: any) => {
        const studentId = decodedText.split('-')[0]
        setStudentId(studentId)
        console.log(pauseScanner)
        console.log(resumeScanner)
        console.log(decodedText)
        stopScanner()
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pb-20 px-4 max-w-3xl mx-auto">
            {studentId ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <StudentScannedInfo studentId={studentId} />
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center pt-10 gap-6"
                >
                    <h2 className="text-3xl font-semibold mb-4 text-center">Buscar Alumno</h2>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setSearchMode('qr')}
                            className={`flex items-center gap-2 ${searchMode === 'qr' ? 'text-blue-500' : ''}`}
                        >
                            <ScanLine className="w-5 h-5" /> QR
                        </button>

                        <button

                            onClick={() => setSearchMode('name')}
                            className={`flex items-center gap-2 ${searchMode === 'name' ? 'text-blue-500' : ''}`}
                        >
                            <Search className="w-5 h-5" /> Nombre/DNI
                        </button>
                    </div>

                    <div className="w-full mt-6">
                        {searchMode === 'qr' ? (
                         <QRScanner 
                            onScanSuccess={onScanSuccess}
                            selectedStatus='1'
                        />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <>
                                <StudentByDNI studentDni={studentDni} setStudentDni={setStudentDni} studentName={studentName} setStudentName={setStudentName} />
                                <div className="mt-10" />
                                {studentDni && 
                                <StudentByDniInfo 
                                studentDni={studentDni} 
                                    classrooms={[]}
                                    classroomId={'1'}
                                />}
                                {studentName && 
                                    <StudentsByNameInfo 
                                        name={studentName}
                                        school={school.id}
                                        classrooms={[]}
                                        classroomId={'1'}
                                    />
                                }
            </>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default LocateStudentPage
