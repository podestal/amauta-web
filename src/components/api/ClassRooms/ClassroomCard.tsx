import { useNavigate } from "react-router-dom";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import getClassroomDescription from "../../../utils/getClassroomDescription";
import { motion } from "framer-motion";
import { FaChalkboardTeacher } from "react-icons/fa";

interface Props {
  classroom: string;
}

const ClassroomCard = ({ classroom }: Props) => {
  const lan = useLanguageStore((s) => s.lan);
  const [grade, section, level, id] = classroom.split("-");
  const classRoomDescription = getClassroomDescription({ lan, grade, section, level });
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/app/students?classroom=${id}`, { state: { level, classroom: id } });
  };

  const colorThemes = [
    { bg: "bg-blue-500", hoverBg: "hover:bg-blue-600", border: "border-blue-500", shadow: "shadow-blue-600" },
    { bg: "bg-green-500", hoverBg: "hover:bg-green-600", border: "border-green-500", shadow: "shadow-green-600" },
    { bg: "bg-red-500", hoverBg: "hover:bg-red-600", border: "border-red-500", shadow: "shadow-red-600" },
    { bg: "bg-purple-500", hoverBg: "hover:bg-purple-600", border: "border-purple-500", shadow: "shadow-purple-600" },
    { bg: "bg-yellow-500", hoverBg: "hover:bg-yellow-600", border: "border-yellow-500", shadow: "shadow-yellow-600" },
  ];

  const colorIndex = parseInt(id) % colorThemes.length;
  const selectedColor = colorThemes[colorIndex];

  return (
    <motion.div
      onClick={handleNavigate}
      className={`w-full shadow-2xl cursor-pointer border-b-2 border-r-2 rounded-3xl py-8 px-6 flex flex-col justify-center items-center mt-10 text-white 
      ${selectedColor.bg} ${selectedColor.hoverBg} ${selectedColor.border} ${selectedColor.shadow}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-4xl mb-4">
        <FaChalkboardTeacher />
      </div>

      <p className="text-xl font-bold tracking-wide">{classRoomDescription}</p>
    </motion.div>
  );
};

export default ClassroomCard;
