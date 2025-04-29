import { motion } from "framer-motion";
import clsx from "clsx";

interface Props {
    options: string[]
    selected: number
    setSelected: React.Dispatch<React.SetStateAction<number>>
}
// const options = ["Option 1", "Option 2"];

const MultiOptionSwitch = ({ options, selected, setSelected }: Props) => {
//   const [selected, setSelected] = useState(0);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div
        className="relative flex bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner"
        style={{ height: "3rem" }}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0 bottom-0 bg-white dark:bg-gray-600 rounded-full shadow-md"
          style={{ width: `${100 / options.length}%`, left: `${(100 / options.length) * selected}%` }}
        />

        {options.map((option, index) => (
          <button
            key={option}
            className={clsx(
              "flex-1 z-10 text-sm font-medium transition-colors duration-300",
              "focus:outline-none",
              index === selected
                ? "text-black dark:text-white"
                : "text-gray-500 dark:text-gray-300"
            )}
            onClick={() => setSelected(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MultiOptionSwitch
