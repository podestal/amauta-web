import { UseMutationResult, useMutation } from "@tanstack/react-query"
import recoverPasswordService, { RecoverPasswordRequest } from "../../services/auth/recoverPasswordService"

interface RecoverData {
    credentials: RecoverPasswordRequest
}

const useRecoverPassword = (): UseMutationResult<void, Error, RecoverData> => {
    return useMutation({
        mutationFn: (data: RecoverData) => recoverPasswordService.post(data.credentials),
        onSuccess: () => {
            console.log('Recover password email sent')
        },
        onError: (error) => {
            console.error(error)
        }

    })
}

export default useRecoverPassword