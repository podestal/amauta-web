import AttendanceReport from "../components/api/reports/attendance/AttendanceReport"

const ReportsPage = () => {
  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden">
        <AttendanceReport />
    </div>
  )
}

export default ReportsPage