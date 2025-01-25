import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getClassroomService, {Classroom} from "../../../services/api/clasroomService"

interface Props {
    access: string
}

const useGetClassroom = ({ access }: Props): UseQueryResult<Classroom, Error> => {

    const classroomService = getClassroomService()
    return useQuery({
        queryKey: ['classroom'],
        queryFn: () => classroomService.get(access),
    })
}

export default useGetClassroom