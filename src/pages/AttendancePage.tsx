import QRScanner from "../components/ui/QRScanner"

const AttendancePage = () => {

  const handleSuccess = (decodedText: string) => {
    console.log(decodedText)
    
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h2 className="mb-20 text-4xl">Scanear Asistencia</h2>
      <QRScanner 
        onScanSuccess={handleSuccess}
      />
    </div>
  )
}

export default AttendancePage