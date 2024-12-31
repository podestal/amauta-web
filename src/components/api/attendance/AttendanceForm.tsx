import { useState } from "react"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import Button from "../../ui/Button"
import TextArea from "../../ui/TextArea"
import AttendanceStatusSelector from "./AttendanceStatusSelector"
import { Attendance } from "../../../services/api/attendanceService"
import { UseMutationResult } from "@tanstack/react-query"
import { CreateAttendanceData } from "../../../hooks/api/attendance/useCreateAttendance"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useInstructorStore from "../../../hooks/store/useInstructorStore"

interface Props {
    createAttendance: UseMutationResult<Attendance, Error, CreateAttendanceData>
    studentId: number
}

const AttendanceForm = ({ createAttendance, studentId }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const instructor = useInstructorStore(s => s.instructor)
    const access = useAuthStore(s => s.access) || ''
    const [selectedStatus, setSelectedStatus] = useState('O')
    const [observations, setObservations] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('selectedStatus', selectedStatus)
        createAttendance.mutate(
            {attendance: {
                status: selectedStatus, 
                student: studentId, 
                created_by: `${instructor?.first_name} ${instructor?.last_name}`, 
                observations}, access}
        )
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 justify-center items-center w-[70%] mx-auto">
        <h2 className="text-xl">{lan === 'EN' ? 'Register Attendance' : 'Registar Asistencia'}</h2>
        <AttendanceStatusSelector 
            setSelectedStatus={setSelectedStatus}
        />
        <TextArea 
            placeholder={lan === 'EN' ? 'Observations' : 'Observaciones'}
            value={observations}
            onChange={e => {
                setObservations(e.target.value)
            }}
        />
        <Button 
            label={lan === 'EN' ? 'Register' : 'Registrar'}
        />
    </form>
  )
}

export default AttendanceForm