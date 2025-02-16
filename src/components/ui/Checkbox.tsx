// import { useState } from "react";
import { motion } from "framer-motion";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ label, checked = false, onChange }: CheckboxProps) => {

  const toggleCheckbox = () => {
    // const newState = !isChecked;
    // setIsChecked(newState);
    // if (onChange) onChange(newState);
  };

  return (
    <label className="flex items-center cursor-pointer gap-3">
      {/* Hidden Native Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        className="hidden"
      />

      {/* Custom Checkbox */}
      <motion.div
        className={`w-6 h-6 flex items-center justify-center rounded-md border-2 transition-all 
          ${checked ? "bg-blue-500 border-blue-500" : "bg-gray-200 border-gray-400"}`
        }
        whileTap={{ scale: 0.9 }}
        onClick={toggleCheckbox}
      >
        {checked && (
          <motion.svg
            className="w-4 h-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>
        )}
      </motion.div>

      {/* Label (optional) */}
      {label && <span className="text-gray-800 dark:text-gray-300">{label}</span>}
    </label>
  );
};

export default Checkbox;
