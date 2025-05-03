import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getSchoolService, {School, CreateUpdateSchool} from "../../../services/api/schoolService"
import useSchoolStore from "../../store/useSchoolStore"

export interface UpdateSchoolData {
    access: string
    school: CreateUpdateSchool
}

interface Props {
    schoolId: number
}

const useUpdateSchool = ({ schoolId }: Props): UseMutationResult<School, Error, UpdateSchoolData> => {
    const schoolService = getSchoolService({ schoolId })
    const queryClient = useQueryClient()
    const { setSchool } = useSchoolStore()

    return useMutation({
        mutationFn: (data: UpdateSchoolData) => schoolService.update(data.school, data.access),
        onSuccess: res => {
            console.log(res)
            queryClient.invalidateQueries({ queryKey: ['school'] })
            setSchool(res)
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateSchool