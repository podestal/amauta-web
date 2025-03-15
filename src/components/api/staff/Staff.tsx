import { useState } from "react"
import Button from "../../ui/Button"
import StaffAdmin from "./StaffAdmin"
import StaffAssistants from "./StaffAssistants"
import StaffInstructors from "./StaffInstructors"
import Slider from "../../ui/Slider"
import StaffForm from "./StaffForm"

const profiles = [
    {id: 1, name: 'Administrativo', group: 'manager'},
    {id: 2, name: 'Docente', group: 'instructor'},
    {id: 3, name: 'Auxiliar', group: 'assistant'},
]

const Staff = () => {

    const [isOpen, setOpen] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState('')
    const [selectedName, setSelectedName] = useState('')

  return (
    <div
        className="grid grid-cols-3 gap-4"
    >
        {profiles.map(profile => (
            <div 
                className="flex flex-col gap-4 items-center justify-start"
                key={profile.id}>
                <div className="flex justify-center items-center gap-4">
                    <h2 className="text-xl font-bold my-4 text-center">{profile.name}</h2>
                    <Button 
                        label="+"
                        onClick={() =>{
                            setOpen(true)
                            setSelectedGroup(profile.group)
                            setSelectedName(profile.name)
                        }}
                    />
                </div>
                {profile.group === 'instructor' && <StaffInstructors />}
                {profile.group === 'assistant' && <StaffAssistants />}
                {profile.group === 'manager' && <StaffAdmin />}
            </div>
        ))}
        <Slider 
            isOpen={isOpen}
            setOpen={setOpen}
        >
            <StaffForm 
                group={selectedGroup}
                name={selectedName}
            />
        </Slider>
    </div>
  )
}

export default Staff