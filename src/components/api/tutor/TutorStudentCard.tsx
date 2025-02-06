import { motion } from "framer-motion";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import { Student } from "../../../services/api/studentsService"
import { getAttendanceStatusCount } from "../../../utils/getAttendanceStatusCount";
import getClassroomDescription from "../../../utils/getClassroomDescription";
import Button from "../../ui/Button";
import { RiArrowDownSFill } from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceSummaryChart from "../../ui/AttendanceSummaryChart";

interface Props {
    student: Student;
}

const TutorStudentCard = ({ student }: Props) => {
    const lan = useLanguageStore(s => s.lan);
    const { grade, section, level } = student.clase || {};
    const classroomDescription = getClassroomDescription({ lan, grade, section, level });
    const { onTime, excused, leftEarly, notAttended, late } = getAttendanceStatusCount(student.attendances);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const toggleDetails = () => setShow(!show);

    return (
        <motion.div
            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg text-white mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold mb-2">{student.first_name} {student.last_name}</h2>
                    <p className="text-gray-400 text-sm">{classroomDescription}</p>
                </div>

                {/* Toggle Button */}
                <motion.div
                    className="cursor-pointer p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
                    onClick={toggleDetails}
                    animate={{ rotate: show ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <RiArrowDownSFill size={24} />
                </motion.div>
            </div>

            {/* Expandable Section */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: show ? "auto" : 0, opacity: show ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-md">
                    {/* Attendance Chart */}
                    <AttendanceSummaryChart 
                        onTime={onTime}
                        leftEarly={leftEarly}
                        notAttended={notAttended}
                        late={late}
                        excused={excused}
                        lan={lan}
                        show={show}
                        student={student}
                        navigate={navigate}
                    />

                    {/* Action Button */}
                    <div className="mt-6 flex justify-center">
                        <Button 
                            onClick={() => navigate(`/app/attendance/${student.uid}`)}
                            label={lan === 'EN' ? 'View Details' : 'Ver Detalles'}
                            className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 transition rounded-md shadow-md"
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default TutorStudentCard;
