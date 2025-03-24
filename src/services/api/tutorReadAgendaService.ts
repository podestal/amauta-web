import APIClient from "./apiClient"

export interface TutorReadAgenda {
    id: number
    tutor: number
    student: number
}

type CreateTutorReadAgenda = Omit<TutorReadAgenda, 'id'>

const tutorReadAgendaService = new APIClient<TutorReadAgenda, CreateTutorReadAgenda>('tutor-read-agenda/getReadAgenda/')
export default tutorReadAgendaService