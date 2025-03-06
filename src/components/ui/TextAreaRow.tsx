import { useState } from "react";
import { motion } from "framer-motion";
import { FaSave } from "react-icons/fa";
import useUpdateQuarterGrade from "../../hooks/api/quarterGrade/useUpdateQuarterGrade";
import useAuthStore from "../../hooks/store/useAuthStore";
import useNotificationsStore from "../../hooks/store/useNotificationsStore";
import { Average } from "../../services/api/studentsService";

interface TextAreaRowProps {
  placeholder?: string;
  onSubmit: (text: string) => void;
  initialValue?: string;
  canUpdate: boolean;
  quarterGrade: Average;
}

const TextAreaRow = ({ placeholder = "Write a message...", onSubmit, canUpdate, quarterGrade }: TextAreaRowProps) => {
  const [text, setText] = useState(quarterGrade ? quarterGrade.conclusion : '');
  const { setShow, setType, setMessage } = useNotificationsStore()
  const access = useAuthStore((state) => state.access) || ""
  const updateQuarterGrade = useUpdateQuarterGrade({ quarterGradeId: quarterGrade.id.toString() });

  const handleSubmit = () => {
    // if (!text.trim()) return;
    onSubmit(text);
    updateQuarterGrade.mutate(
      { 
        access, 
        quarterGrade: { conclusion: text, calification: quarterGrade.calification } 
      },
      {onSuccess: () => {
        setShow(true)
        setType('success')
        setMessage('Conclusión actualizada correctamente')
      },
      onError: () => {
        setShow(true)
        setType('error')
        setMessage('Error al actualizar la conclusión')
      }}
    );
  };

  return (
    <div className="relative w-full flex items-center border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-900">
      <textarea
        className="w-full h-20 p-2 pr-10 text-gray-800 dark:text-gray-200 bg-transparent resize-none focus:outline-none"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <motion.button
        className={`absolute right-2 bottom-2 p-2 rounded-lg bg-blue-500 ${canUpdate && 'hover:bg-blue-600'} text-white shadow-md transition-all`}
        whileTap={{ scale: 0.9 }}
        onClick={handleSubmit}
        disabled={!canUpdate}
      >
        <FaSave size={14} className={`${!canUpdate && 'opacity-40'}`} />
      </motion.button>
    </div>
  );
};

export default TextAreaRow;
