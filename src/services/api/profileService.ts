import { Admin } from "./adminService";
import APIClient from "./apiClient"
import { Assistant } from "./assistantService";
import { Instructor } from "./instructorService";
import { Tutor } from "./tutorService";

export type Profile = Tutor | Instructor | Assistant | Admin | null

interface Props {
    profileName: string
    me?: boolean
}

const getProfileService = ({ profileName, me }: Props) => {
    let url = `${profileName}/`

    if (me) {
        url = `${profileName}/me/`
    }

    return new APIClient<Profile>(url)
}

export default getProfileService