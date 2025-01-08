import { create } from 'zustand'
import useGetUser from '../auth/useGetUser'
import useGetInstructor from '../api/instructor/useGetInstructor'
import useGetTutor from '../api/tutor/useGetTutor'
import { User } from '../../services/auth/useService'

interface ProfileState {
    user: User | null
    profile: any | null
    isLoading: boolean
    error: string | null
    getProfile: (access: string) => void
}

const useGetProfileStore = create<ProfileState>(set => ({
    user: null,
    profile: null,
    isLoading: false,
    error: null,
    getProfile: async (access) => {
        
        
        if (!access) {
            set({ isLoading: false, error: "No access token" })
            return
        }

        set({ isLoading: true, error: null })

        const { data: userData, isLoading, isError, error, isSuccess } = useGetUser({access})

        if (isLoading) {
            set({ isLoading: true })
        }

        if (isError) {
            set({ isLoading: false, error: error?.message })
            return
        }

        if (isSuccess) {
            set({ user: userData })
            if (userData.groups.length > 0) {
                const group = userData.groups[0]
                if (group === 'instructor') {
                    const { data: instructorData, isLoading, isError, error, isSuccess } = useGetInstructor({access})
                    if (isLoading) {
                        set({ isLoading: true })
                    }
                    if (isError) {
                        set({ isLoading: false, error: error?.message })
                        return
                    }
                    if (isSuccess) {
                        set({ profile: instructorData })
                    }
                } else if (group === 'tutor') {
                    const { data: tutorData, isLoading, isError, error, isSuccess } = useGetTutor({access})
                    if (isLoading) {
                        set({ isLoading: true })
                    }
                    if (isError) {
                        set({ isLoading: false, error: error?.message })
                        return
                    }
                    if (isSuccess) {
                        set({ profile: tutorData })
                    }
                }
            }
        }
    }
}))

export default useGetProfileStore
