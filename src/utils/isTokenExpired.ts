import { jwtDecode } from "jwt-decode"

interface Payload {
    exp: number
}

const isTokenExpired = (token: string) => {
    try {
        const { exp } = jwtDecode<Payload>(token)
        const currentTime = Math.floor(Date.now() / 1000)
        return exp < currentTime
    } catch (error) {
        return true
    }
}

export default isTokenExpired