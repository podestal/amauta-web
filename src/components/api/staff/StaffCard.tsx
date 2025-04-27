import { useState } from "react"
import { Admin } from "../../../services/api/adminService"
import { Assistant } from "../../../services/api/assistantService"
import { Instructor } from "../../../services/api/instructorService"
import { Profile } from "../../../services/api/profileService"
import StaffForm from "./StaffForm"
import useUpdateProfile from "../../../hooks/api/profile/useUpdateProfile"

interface Props {
    profile: Profile
    group: string
}

const StaffCard = ({ profile, group }: Props) => {

    const [open, setOpen] = useState(false)
    let name = ''
    

    let currentProfile
    if (group === 'manager') {
        currentProfile = profile as Admin
        name = 'Administrativo'
    } else if (group === 'instructor') {
        currentProfile = profile as Instructor
        name = 'Docente'
    } else if (group === 'assistant') {
        currentProfile = profile as Assistant
        name = 'Auxiliar'
    }

    const updateProfile = useUpdateProfile({ profileId: (currentProfile?.id)?.toString() || '', profileName: group })

  return (
    <>
        {currentProfile && 
        <div
        className="dark:bg-gray-900 dark:hover:bg-gray-800 bg-slate-50 hover:bg-slate-100 transition-colors px-6 py-4 rounded-2xl border-l-8 border-blue-500/70 dark:text-white w-full max-w-sm shadow-lg cursor-pointer flex items-center gap-4"
        key={currentProfile.id}
        onClick={() => setOpen(true)}
        >
            <div className="flex items-center justify-center w-12 h-12 dark:bg-gray-700 bg-gray-200 rounded-full text-lg font-semibold">
            {currentProfile.first_name[0]}{currentProfile.last_name[0]}
            </div>
            <div>
            <p className="text-lg font-semibold">{currentProfile.first_name} {currentProfile.last_name}</p>
            </div>
        </div>}
        <StaffForm 
            group={group}
            setOpen={setOpen}
            open={open}
            name={name}
            profile={currentProfile}
            updateProfile={updateProfile}
        />
    </>
  )
}

export default StaffCard