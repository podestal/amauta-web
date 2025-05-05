import { create } from "zustand"
import { School } from "../../services/api/schoolService"

interface SchoolState {
    school: School
    setSchool: (school: School) => void
}

const useSchoolStore = create<SchoolState>(set => ({
    school: {
        id: 0,
        name: '',
        type_of_institution: '',
        picture_name: '',
        payment_status: '',
        automatic_late: '',
    },
    setSchool: (school) => {
        set({ school })
    }
}))

export default useSchoolStore