type NumberSelectorProps = {
  value: number;
  setValue: (val: number) => void;
  min?: number;
  max?: number;
};

const NumberSelector = ({
  value,
  setValue,
  min = 1,
  max = 100,
}: NumberSelectorProps) => {
  const handleDecrease = () => {
    if (value > min) setValue(value - 1);
  };

  const handleIncrease = () => {
    if (value < max) setValue(value + 1);
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md w-fit border dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Número de preguntas:</span>
      <button
        onClick={handleDecrease}
        type="button"
        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        −
      </button>
      <span className="text-lg font-semibold text-gray-800 dark:text-white min-w-[2ch] text-center">
        {value}
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
