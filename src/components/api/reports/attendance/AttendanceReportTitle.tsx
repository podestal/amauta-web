import { useEffect, useState } from 'react'
import useGetClassroom from '../../../../hooks/api/classroom/useGetClassroom'
import useAuthStore from '../../../../hooks/store/useAuthStore'
import useLoader from '../../../../hooks/ui/useLoader'
import getClassroomDescription from '../../../../utils/getClassroomDescription'

interface Props {
    classroomId: string
}

const AttendanceReportTitle = ({ classroomId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const [classroomLabel, setClassroomLabel] = useState('')
    const { data: classrooms, isLoading, isError, error, isSuccess } = useGetClassroom({ access })

    useEffect(() => {
        const classroom = classrooms && classrooms.find( classroom => classroom.id.toString() === classroomId)
        classroom && setClassroomLabel(getClassroomDescription({ lan: 'ES', section: classroom.section, grade: classroom.grade, level: classroom.level, short: true }))
    }, [classrooms, classroomId])

    useLoader(isLoading)

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div>
        <h2 className='text-4xl text-center'>Clase: {classroomLabel}</h2>
        {/* <h2 className='text-4xl'>4to-A Secundaria</h2> */}
    </div>
  )
}

export default AttendanceReportTitle