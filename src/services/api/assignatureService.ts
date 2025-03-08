import APIClient from "./apiClient"

export interface Assignature {
    id: number
    title: string
    clase: number
    instructor: number
    area: number,
    classroom_description: string
}

export interface AssignatureByTutor {
    id: number
    title: string
    average: string
}


interface Props {
    byInstructor?: boolean
    byTutor?: boolean
}

const getAssignatureService = ({ byInstructor, byTutor }: Props) => {

    let url = 'assignature/'
    if (byInstructor) {
        url = 'assignature/byInstructor/'
    } else if (byTutor) {
        url = 'assignature/byTutor/'
    }

    return new APIClient<Assignature>(url)
}

export default getAssignatureService