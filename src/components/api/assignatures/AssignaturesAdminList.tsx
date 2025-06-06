import useGetAssignaturesByClassroom from "../../../hooks/api/assignature/useGetAssignaturesByClassroom"
import useAuthStore from "../../../hooks/store/useAuthStore"
import AssignatureAdminCard from "./AssignatureAdminCard"

interface Props {
    classroomId: number
}

const AssignaturesAdminList = ({ classroomId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: assignatures, isLoading, isError, error, isSuccess} = useGetAssignaturesByClassroom({ access, classroomId })


    if (isLoading) return <p className='text-center animate-pulse text-xs my-4'>Cargando...</p>

    if (isError) return <p className='text-center text-red-500 text-xs my-4'>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div>
        {assignatures.length > 0 ? (
            <ul className="space-y-2">
                {assignatures.map(assignature => (
                    <AssignatureAdminCard 
                        key={assignature.id}
                        assignature={assignature}
                    />
                ))}
            </ul>
        ) : (
            <p className='text-center text-gray-500 text-xs my-4'>No hay asignaturas disponibles para esta clase.</p>
        )}
    </div>
  )
}

export default AssignaturesAdminList