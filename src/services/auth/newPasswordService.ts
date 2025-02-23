import AuthClient from "./authClient"

export interface NewPasswordRequest {
    uid: string
    token: string
    new_password: string
}

const newPasswordService = new AuthClient<void, NewPasswordRequest>('users/reset_password_confirm/')

export default newPasswordService