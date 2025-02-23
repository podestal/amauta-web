import { UseMutationResult, useMutation } from "@tanstack/react-query"
import newPasswordService, { NewPasswordRequest } from "../../services/auth/newPasswordService"

interface NewPasswordData {
    credentials: NewPasswordRequest
}

const useNewPassword = (): UseMutationResult<void, Error, NewPasswordData> => {
    return useMutation({
        mutationFn: (data: NewPasswordData) => newPasswordService.post(data.credentials),
        onSuccess: () => {
            console.log('Password reset')
        },
        onError: (error) => {
            console.error(error)
        }

    })
}

export default useNewPassword