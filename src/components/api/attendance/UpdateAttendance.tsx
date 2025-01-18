import { useState } from "react"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { SimpleAttendance } from "../../../services/api/studentsService"
import getAttendanceLabel from "../../../utils/getAttendanceLabel"
import Modal from "../../ui/Modal"
import AttendanceForm from "./AttendanceForm"
import useUpdateAttendance from "../../../hooks/api/attendance/useUpdateAttendance"

interface Props {
    attendances: SimpleAttendance[]
    studentId: string
    classroomId: string
}

const UpdateAttendance = ({ attendances, studentId, classroomId }: Props) => {

    console.log('attendances', attendances);
    
    const [open, setOpen] = useState(false)
    const lan = useLanguageStore(s => s.lan)
    const entrance = attendances && attendances[0]
    const exit = attendances && attendances[1]
    const attendanceLabelEntrance = entrance && getAttendanceLabel({ lan, attendance: entrance.status })
    const attendanceLabelExit = exit && getAttendanceLabel({ lan, attendance: exit.status })
    const updateAttendanceEntrance = entrance && useUpdateAttendance({ attendanceId: entrance.id, classroomId })
    const updateAttendanceExit =  exit && useUpdateAttendance({ attendanceId: exit.id, classroomId })

  return (
    <>
    <>
        {entrance 
        ? 
        <>
        <p 
            onClick={() => setOpen(true)}
            className={`py-2 px-4 text-center font-bold rounded-2xl text-xs
            ${entrance.status === 'O' && 'bg-green-500'}
            ${entrance.status === 'L' && 'bg-amber-500'}
            ${entrance.status === 'N' && 'bg-red-500'}
            ${entrance.status === 'E' && 'bg-green-500'}
            ${entrance.status === 'T' && 'bg-yellow-500'}
            `}>{attendanceLabelEntrance}
        </p>
        <Modal 
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <AttendanceForm 
                studentId={studentId}
                attendance={entrance}
                updateAttendance={updateAttendanceEntrance}
                attendanceKind="I"
                setOpen={setOpen}
            />
        </Modal>
        </>
        : 
        <>
            <p className="py-2 px-4 text-center font-bold rounded-2xl text-xs bg-slate-500">Registrar</p>
        </>
        }

    </>
    {exit 
    ? 
    <>
        <p 
            onClick={() => setOpen(true)}
            className={`py-2 px-4 text-center font-bold rounded-2xl text-xs
            ${exit.status === 'O' && 'bg-green-500'}
            ${exit.status === 'L' && 'bg-amber-500'}
            ${exit.status === 'N' && 'bg-red-500'}
            ${exit.status === 'E' && 'bg-green-500'}
            ${exit.status === 'T' && 'bg-yellow-500'}
            `}>{attendanceLabelExit}
        </p>
        <Modal 
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <AttendanceForm 
                studentId={studentId}
                attendance={exit}
                updateAttendance={updateAttendanceExit}
                attendanceKind="O"
                setOpen={setOpen}
            />
        </Modal>
    </> 
    : 
    <>
        <p className="py-2 px-4 text-center font-bold rounded-2xl text-xs bg-slate-500">Registrar</p>
    </>
    }
    </>
  )
}

export default UpdateAttendance