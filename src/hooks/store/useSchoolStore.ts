import { create } from "zustand"
import { School } from "../../services/api/schoolService"

interface SchoolState {
    school: School | null
    setSchool: (school: School) => void
}

const useSchoolStore = create<SchoolState>(set => ({
    school: null,
    setSchool: (school) => {
        set({ school })
    }
}))

export default useSchoolStore