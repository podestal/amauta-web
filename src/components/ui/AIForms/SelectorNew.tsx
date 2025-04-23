interface HomeworkTypeSelectorProps {
  value: string;
  setValue: (val: string) => void;
  options: string[];
}


const SelectorNew = ({ value, setValue, options }: HomeworkTypeSelectorProps) => {
  return (
    <div className="p-4 flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-md w-fit border dark:border-gray-700">
      <label className="block mb-6 text-sm font-medium text-gray-700 dark:text-gray-300">
        Tipo de tarea:
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setValue(option)}
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                value === option
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectorNew;
