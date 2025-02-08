import { useState } from "react"
import QRScanner from "../components/ui/QRScanner"
import StudentScannedInfo from "../components/api/Students/StudentScannedInfo"
import { motion } from "framer-motion"

const LocateStudentPage = () => {

    const [studentId, setStudentId] = useState('')

    const onScanSuccess = (decodedText: string, stopScanner: any, resumeScanner: any) => {
        console.log(stopScanner)
        console.log(resumeScanner)
        console.log(decodedText)
        const studentId = decodedText.split('-')[0]
        setStudentId(studentId)
        stopScanner()
        

    }

  return (
    <div className="pb-20">
        {studentId 
        ? 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <StudentScannedInfo 
                studentId={studentId}
            />
        </motion.div>
        : 
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl mt-20">Escanea QR de Alumno</h2>
            <QRScanner 
                onScanSuccess={onScanSuccess}
                selectedStatus='1'
            />
        </div>
        }
    </div>
  )
}

export default LocateStudentPage