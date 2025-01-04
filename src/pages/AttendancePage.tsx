import QRScanner from "../components/ui/QRScanner"

const AttendancePage = () => {

  const handleSuccess = (decodedText: string) => {
    console.log(decodedText)
    
  }

  return (
    <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen flex flex-col justify-center items-center">
      <h2 className="mb-20 text-4xl">Scanear Asistencia</h2>
      <QRScanner 
        onScanSuccess={handleSuccess}
      />
    </div>
  )
}

export default AttendancePage