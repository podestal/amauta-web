import AuthClient from "./authClient"

export interface AccessToken {
    access: string
}

export interface RefreshToken {
    refresh: string
}

const refreshTokenService = new AuthClient<AccessToken, RefreshToken>('jwt/refresh/')

export default refreshTokenService