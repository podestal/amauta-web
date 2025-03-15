import { useState } from "react"
import { Admin } from "../../../services/api/adminService"
import { Assistant } from "../../../services/api/assistantService"
import { Instructor } from "../../../services/api/instructorService"
import { Profile } from "../../../services/api/profileService"
import StaffForm from "./StaffForm"

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

  return (
    <>
        {currentProfile && 
        <div 
            className="bg-gray-800 px-4 py-2 rounded-lg text-white w-[70%]"
            key={currentProfile.id}
            onClick={() => setOpen(true)}
        >
            <p className="font-bold">{currentProfile.first_name} {currentProfile.last_name}</p>
        </div>}
        <StaffForm 
            // group: string
            // name: string
            group='manager'
            setOpen={setOpen}
            open={open}
            name={name}
            profile={currentProfile}
        />
    </>
  )
}

export default StaffCard