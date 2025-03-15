import { UseMutationResult, useMutation } from "@tanstack/react-query"
import signUpService, {SignUpUser, SignupCreate} from "../../services/auth/signUpService"

interface SignUpData{
    user: SignupCreate 
}

const useSignUp = (): UseMutationResult<SignUpUser, Error, SignUpData> => {
    return useMutation({
        mutationFn: (data: SignUpData) => signUpService.post(data.user),
        onSuccess: (user: SignUpUser) => {
            console.log(user)
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export default useSignUp