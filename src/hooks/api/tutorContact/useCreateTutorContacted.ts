import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import tutorContactedService, { TutorContacted, CreateTutorContacted } from "../../../services/api/tutorContactedService"

interface CreateData {
    access: string
    tutorContacted: CreateTutorContacted
}

interface Props {
    school: string
    classroom: string
}

const useCreateTutorContacted = ({ school, classroom }: Props): UseMutationResult<TutorContacted, Error, CreateData> => {
    
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateData) => tutorContactedService.post( data.tutorContacted, data.access),
        onSuccess: res => {
            console.log('res', res)
            queryClient.invalidateQueries({queryKey: [`student-by-agendas ${school} ${classroom}`]})},
    })
}

export default useCreateTutorContacted