import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getClassroomService, {Classroom} from "../../../services/api/clasroomService"

interface Props {
    access: string
    school: string
}

const useGetClassroom = ({ access, school }: Props): UseQueryResult<Classroom[], Error> => {

    const classroomService = getClassroomService()
    const params = { school }

    console.log('getting classrooms', params);
    

    return useQuery({
        queryKey: ['classroom'],
        queryFn: () => classroomService.get(access, params),
        enabled: school !== '0'
    })
}

export default useGetClassroom