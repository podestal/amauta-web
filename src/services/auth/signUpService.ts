import AuthClient from "./authClient"

// {
//     "id": 14,
//     "username": "aramis",
//     "email": "aramis@aramis.com",
//     "profile": "instructor",
//     "first_name": "aramis",
//     "last_name": "aramis"
// }

export interface SignUpUser {
    id: number
    username: string
    email: string
    profile: string
    first_name: string
    last_name: string
    password: string
}

export type SignupCreate = Omit<SignUpUser, 'id'>

const signUpService = new AuthClient<SignUpUser, SignupCreate>('users/')

export default signUpService