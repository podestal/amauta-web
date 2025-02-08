import { useState } from "react"
import QRScanner from "../components/ui/QRScanner"

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
    <div>
        {studentId 
        ? 
        <h1>Student Found</h1>
        : 
        <>
        <h1>Locate Student Page</h1>
        <QRScanner 
            onScanSuccess={onScanSuccess}
            selectedStatus='1'
        />
        </>
        }
    </div>
  )
}

export default LocateStudentPage