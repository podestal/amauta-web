type NumberSelectorProps = {
  value: number;
  setValue: (val: number) => void;
  label: string;
  min?: number;
  max?: number;
  time?: boolean;
};

const NumberSelector = ({
  value,
  setValue,
  label,
  min = 1,
  max = 100,
  time = false,
}: NumberSelectorProps) => {
  const handleDecrease = () => {
    if (value > min) {
      time ? setValue(value - 5) : setValue(value - 1)
    };
  };

  const handleIncrease = () => {
    if (value < max) {
      time ? setValue(value + 5) : setValue(value + 1)
    };
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md w-fit border dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}:</span>
      <button
        onClick={handleDecrease}
        type="button"
        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        −
      </button>
      <span className="text-lg font-semibold text-gray-800 dark:text-white min-w-[2ch] text-center">
        {value} {time ? 'min' : ''}
      </span>
      <button
        onClick={handleIncrease}
        type="button"
        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        +
      </button>
    </div>
  );
};

export default NumberSelector;
