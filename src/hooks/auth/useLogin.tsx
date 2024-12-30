import { useMutation, UseMutationResult } from '@tanstack/react-query'
import loginService, { JWT, JWTCredentials } from '../../services/auth/loginService'
import useAuthStore from '../store/useAuthStore'

import { jwtDecode } from 'jwt-decode'

interface LoginData {
    credentials: JWTCredentials
}

interface DecodedToken {
    user_id: number
  }

const useLogin = (): UseMutationResult<JWT, Error, LoginData> => {
    const {setTokens, setUserId} = useAuthStore() 

    return useMutation({

        mutationFn: (data: LoginData) => loginService.post(data.credentials), 
        onSuccess: (jwtData: JWT) => {
            const decoded = jwtDecode<DecodedToken>(jwtData.access)
            
            setTokens(jwtData.access, jwtData.refresh)
            setUserId(decoded.user_id)
        },
        onError: (err) => {
            console.log(err) 
        },
    });
}

export default useLogin