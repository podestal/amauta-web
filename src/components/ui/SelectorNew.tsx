import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useState } from 'react'

interface Item {
    id: number
    name: string
}

interface Props {
    items: Item[]
    selectedItem: number
    setSelectedItem: React.Dispatch<React.SetStateAction<number>>
    label?: string
} 

const SelectorNew = ({ items, setSelectedItem, selectedItem, label }: Props) => {


    const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className="relative mb-6 max-w-md">
    <button
      onClick={() => {
          setDropdownOpen(!dropdownOpen)

      }}
      className="dropdown-classroom w-full flex justify-between items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 shadow-sm text-gray-700 dark:text-gray-200"
    >
      {selectedItem === 0 ? `${label ? label : 'Selecciona'}` : items.find(item => item.id === selectedItem)?.name}
      {dropdownOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
    </button>

    <AnimatePresence>
      {dropdownOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg"
        >
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setSelectedItem(item.id);
                setDropdownOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-gray-200"
            >
              {item.name}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  </div>
  )
}

export default SelectorNew