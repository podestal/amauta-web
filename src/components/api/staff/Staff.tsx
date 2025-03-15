import { useState } from "react"
import Button from "../../ui/Button"
import StaffAdmin from "./StaffAdmin"
import StaffAssistants from "./StaffAssistants"
import StaffInstructors from "./StaffInstructors"
import Slider from "../../ui/Slider"
import StaffForm from "./StaffForm"
import { motion } from "framer-motion"

const profiles = [
    {id: 1, name: 'Administrativo', group: 'manager'},
    {id: 2, name: 'Docente', group: 'instructor'},
    {id: 3, name: 'Auxiliar', group: 'assistant'},
]

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

const Staff = () => {

    const [isOpen, setOpen] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState('')
    const [selectedName, setSelectedName] = useState('')

  return (
    <div
        className="grid grid-cols-3 gap-4"
    >
        {profiles.map(profile => (
            <motion.div 
                className="flex flex-col gap-4 justify-start items-center  p-4 rounded-lg shadow-lg w-full max-w-md"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
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
            </motion.div>
        ))}
        <Slider 
            isOpen={isOpen}
            setOpen={setOpen}
        >
            <StaffForm 
                group={selectedGroup}
                name={selectedName}
                setOpen={setOpen}
            />
        </Slider>
    </div>
  )
}

export default Staff