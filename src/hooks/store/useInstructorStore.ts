import { create } from "zustand"
import { Instructor } from "../../services/api/instructorService"

interface InstructorState {
    instructor: Instructor | null
    setInstructor: (data: Instructor) => void
}

const useInstructorStore = create<InstructorState>(set => ({

    instructor: null,
    setInstructor: (data) => {
        set({instructor: data})
    }
}))

export default useInstructorStore