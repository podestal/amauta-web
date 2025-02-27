import APIClient from "./apiClient"

export interface Assignature {
    id: number
    title: string
    clase: number
    instructor: number
    area: number,
}

interface Props {
    byInstructor?: boolean
}

const getAssignatureService = ({ byInstructor }: Props) => {

    let url = 'assignature/'
    if (byInstructor) {
        url = 'assignature/byInstructor/'
    }

    return new APIClient<Assignature>(url)
}

export default getAssignatureService