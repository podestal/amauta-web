import { UseMutationResult, useMutation } from "@tanstack/react-query"
import refreshTokenService, { RefreshToken, AccessToken } from "../../services/auth/refreshTokenService"
import useAuthStore from "../store/useAuthStore"

export interface RefreshTokenData {
    token: RefreshToken
}

const useRefreshToken = (): UseMutationResult<AccessToken, Error, RefreshTokenData> => {

    const {setTokens, refresh } = useAuthStore() 
    const sameRefresh = refresh || ''

    return useMutation({
        mutationFn: (data: RefreshTokenData) => refreshTokenService.post(data.token),
        onSuccess: (res) => {
            console.log(res)
            setTokens(res.access, sameRefresh)
            localStorage.setItem("access", res.access)
        },
        onError: (err) => {
            console.log(err)
            localStorage.removeItem("refresh")
            localStorage.removeItem("access")
        }
    })
}

export default useRefreshToken