import AuthClient from "./authClient"

export interface User {
    id: number
    username: string
    email: string
    groups: string[]
    profile: string
}

const userService = new AuthClient<User>('users/me/')

export default userService