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
    assignatureId?: number
    byInstructor?: boolean
    byTutor?: boolean
    byClassroom?: boolean
    byAuxiliarRegister?: boolean
}

export type CreateUpdateAssignature = Omit<Assignature, 'id' | 'classroom_description'>

const getAssignatureService = ({ 
    byInstructor, 
    byTutor, 
    byClassroom, 
    assignatureId, 
    byAuxiliarRegister }: Props) => {

    let url = 'assignature/'
    if (assignatureId) {
        url = `assignature/${assignatureId}/`
    } else if (byInstructor) {
        url = 'assignature/byInstructor/'
    } else if (byTutor) {
        url = 'assignature/byTutor/'
    } else if (byClassroom) {
        url = 'assignature/byClassroom/'
    } else if (byAuxiliarRegister) {
        url = 'assignature/byAuxiliarRegister/'
    }

    return new APIClient<Assignature, CreateUpdateAssignature>(url)
}

export default getAssignatureService