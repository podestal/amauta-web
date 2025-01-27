import useLanguageStore from "../../../../hooks/store/useLanguageStore"
import { Attendance } from "../../../../services/api/attendanceService"
import getAttendanceLabel from "../../../../utils/getAttendanceLabel"
import { statusStyles } from "../../attendance/AttendanceStatus"

interface Props {
    attendances: Attendance[]
    status: string
}

const AttendanceSummaryCard = ({ attendances, status }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const attendanceCount = attendances.filter((attendance) => attendance.status === status).length
    const label = getAttendanceLabel({ lan, attendance: status })

  return (
    <div className={`h-[200px] w-full  ${statusStyles[status]} rounded-3xl flex flex-col justify-center items-center gap-6`}>
        <h2 className="text-xl text-slate-50 font-semibold">{label} Total</h2>
        <p className="text-6xl font-bold">{attendanceCount ? attendanceCount : '0'} | {attendanceCount ? ((attendanceCount/attendances.length) * 100).toFixed(0) : '0'}%</p>
    </div>
  )
}

export default AttendanceSummaryCard