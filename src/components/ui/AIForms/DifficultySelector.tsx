interface DifficultySelectorProps {
  value: string;
  setValue: (val: string) => void;
  options: string[];
  label: string;
}

const colors = [
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
]

const DifficultySelector = ({ value, setValue, options, label }: DifficultySelectorProps) => {

  const difficultyLevels: { label: string; color: string }[] = options.map((option, idx) => {
    return {
      label: option,
      color: colors[idx],}
  })

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md w-full border dark:border-gray-700">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}:
      </label>
      <div className="flex gap-3 w-full justify-center">
        {difficultyLevels.map(({ label, color }) => {
          const isActive = value === label;
          return (
            <button
              key={label}
              onClick={() => setValue(label)}
              type="button"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${isActive ? `${color} text-white` : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySelector;
