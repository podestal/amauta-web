import { useState } from "react"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import Button from "../../ui/Button"
import TextArea from "../../ui/TextArea"
import AttendanceStatusSelector from "./AttendanceStatusSelector"
import { Attendance } from "../../../services/api/attendanceService"
import { UseMutationResult } from "@tanstack/react-query"
import { CreateAttendanceData } from "../../../hooks/api/attendance/useCreateAttendance"
import useAuthStore from "../../../hooks/store/useAuthStore"
import { SimpleAttendance } from "../../../services/api/studentsService"
import { UpdateAttendanceData } from "../../../hooks/api/attendance/useUpdateAttendance"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"
import { Instructor } from "../../../services/api/instructorService"
import useNotificationsStore from "../../../hooks/store/useNotificationsStore"

interface Props {
    createAttendance?: UseMutationResult<Attendance, Error, CreateAttendanceData>
    updateAttendance?: UseMutationResult<Attendance, Error, UpdateAttendanceData>
    studentId: string
    attendance?: SimpleAttendance
    attendanceKind: string
    setOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

const AttendanceForm = ({ createAttendance, updateAttendance, studentId, attendance, attendanceKind, setOpen }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const profile = useGetProfileStore(s => s.profile)
    const instructor = profile as Instructor
    const access = useAuthStore(s => s.access) || ''
    const { setMessage, setShow, setType } = useNotificationsStore()
    const [selectedStatus, setSelectedStatus] = useState(attendance ? attendance.status : 'O')
    const [observations, setObservations] = useState(attendance ? attendance.observations : '')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('selectedStatus', selectedStatus)
        createAttendance && createAttendance.mutate(
            {attendance: {
                status: selectedStatus, 
                student: studentId, 
                created_by: `${instructor?.first_name} ${instructor?.last_name}`, 
                observations,
                attendance_type: 'M',
                kind: attendanceKind
            }, access},
            {
                onSuccess: () => {
                    setOpen(false)
                    setType('success')
                    setShow(true)
                    setMessage(lan === 'EN' ? 'Attendance registered successfully!' : 'Asistencia registrada exitosamente!')
                },
                onError: (err :any) => {                    
                    setType('error')
                    setShow(true)
                    setMessage(lan === 'EN' ? 'Error registering attendance' : err?.response?.data.error || 'Error registrando asistencia')
                }
            }
        )

        updateAttendance && updateAttendance.mutate(
            {updates: {
                status: selectedStatus,
                student: studentId,
                created_by: `${instructor?.first_name} ${instructor?.last_name}`,
                observations,
                attendance_type: 'M',
                kind: attendanceKind
            }, access},
            {
                onSuccess: () => {
                    setOpen(false)
                    setType('success')
                    setShow(true)
                    setMessage(lan === 'EN' ? 'Attendance updated successfully!' : 'Asistencia actualizada exitosamente!')
                },
                onError: () => {
                    setType('error')
                    setShow(true)
                    setMessage(lan === 'EN' ? 'Error updating attendance' : 'Error actualizando asistencia')

                }
            }
        )
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 justify-center items-center w-[70%] mx-auto">
        <h2 className="text-xl">{lan === 'EN' ? 'Register Attendance' : 'Registar Asistencia'}</h2>
        <AttendanceStatusSelector 
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
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