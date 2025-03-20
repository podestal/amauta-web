import { motion } from "framer-motion";
import ClassroomGroup from "./ClassroomGroup";
import { Classroom } from "../../../services/api/classroomService";
import React from "react";

interface Props {
    classrooms: Classroom[]
    selectedClassrooms: number[]
    setSelectedClassrooms: React.Dispatch<React.SetStateAction<number[]>>
}

const ClassroomsSelector = ({ classrooms, selectedClassrooms, setSelectedClassrooms }: Props) => {

    const toggleClassroom = (id: number) => {
        setSelectedClassrooms((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    }

    return (
        <>
            <h2 className="my-8 text-2xl">Clases</h2>
            <motion.div
                className="flex flex-col gap-4 my-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <ClassroomGroup level="I" title="Inicial" color="bg-amber-500" classrooms={classrooms} selectedClassrooms={selectedClassrooms} toggleClassroom={toggleClassroom} />
                <ClassroomGroup level="P" title="Primaria" color="bg-blue-700" classrooms={classrooms} selectedClassrooms={selectedClassrooms} toggleClassroom={toggleClassroom} />
                <ClassroomGroup level="S" title="Secundaria" color="bg-green-500" classrooms={classrooms} selectedClassrooms={selectedClassrooms} toggleClassroom={toggleClassroom} />
            </motion.div>
        </>
    );
};

export default ClassroomsSelector;
