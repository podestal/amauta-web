import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

interface TextAreaRowProps {
  placeholder?: string;
  onSubmit: (text: string) => void;
  initialValue?: string;
}

const TextAreaRow = ({ placeholder = "Write a message...", onSubmit, initialValue = "" }: TextAreaRowProps) => {
  const [text, setText] = useState(initialValue);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText(""); // Clear after submit
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
        className="absolute right-2 bottom-2 p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md transition-all"
        whileTap={{ scale: 0.9 }}
        onClick={handleSubmit}
      >
        <FaPaperPlane size={14} />
      </motion.button>
    </div>
  );
};

export default TextAreaRow;
