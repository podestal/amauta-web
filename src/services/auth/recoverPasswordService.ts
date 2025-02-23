import AuthClient from "./authClient"

export interface RecoverPasswordRequest {
    email: string
}

const recoverPasswordService = new AuthClient<void, RecoverPasswordRequest>('users/reset_password/')

export default recoverPasswordService