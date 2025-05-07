import { RiPencilFill } from "@remixicon/react"
import { Activity } from "../../../services/api/activityService"
import ActivityForm from "./ActivityForm"
import { useState } from "react"
import Modal from "../../ui/Modal"
import { motion } from "framer-motion"
import useUpdateActivity from "../../../hooks/api/activity/useUpdateActivity"

interface Props {
    activity: Activity
    area: number
    assignatureId: string
}

const UpdateActivity = ({ activity, area, assignatureId }: Props) => {

    const [open, setOpen] = useState(false)
    const updateActivity  = useUpdateActivity({ activityId: activity.id.toString(), assignatureId, quarter: activity.quarter })
  return (
    <>
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="">
            <RiPencilFill 
                className="text-white transition-transform duration-200 transform hover:scale-110 cursor-pointer p-2 rounded-full bg-blue-500 shadow-md"
                size={32}
                onClick={(e) => {
                    e.stopPropagation()
                    setOpen(true)
                }}
            />
        </motion.div>
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            whole
        >
            <ActivityForm 
                activity={activity}
                setOpen={setOpen}
                area={area}
                assignatureId={assignatureId}
                updateActivity={updateActivity}
            />
        </Modal>
    </>
  )
}

export default UpdateActivity