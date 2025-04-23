import React from "react";

interface ContextInputProps {
  value: string;
  setValue: (val: string) => void;
}

const ContextInput: React.FC<ContextInputProps> = ({ value, setValue }) => {
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md border dark:border-gray-700">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Contexto de la lección
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={6}
        placeholder="Escribe aquí el contexto de la lección, incluyendo objetivos, introducción, etc..."
        className="w-full resize-none p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
  );
};

export default ContextInput;
