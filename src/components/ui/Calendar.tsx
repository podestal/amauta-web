import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import 'react-day-picker/dist/style.css';
import { RiCalendar2Fill } from '@remixicon/react';

interface Props {
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const Calendar: React.FC<Props> = ({ selectedDate, setSelectedDate }) => {
  const [open, setOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative my-auto w-full">
      <p
        className="flex  justify-center items-center gap-6 cursor-pointer text-center bg-slate-100 dark:bg-gray-950 border-neutral-400 dark:border-gray-800 border-2 rounded-lg w-full dark:text-slate-50 text-xs px-2 py-2 focus:border-blue-700 focus:outline-none"
        onClick={() => setOpen(true)}
      >
        <span className='font-bold'>Date:</span> {moment(selectedDate).format('MMMM-DD-YYYY')}
        <RiCalendar2Fill 
            className='text-blue-700'
            size={16}
        />
      </p>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={calendarRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 right-10 transform -translate-x-[-70%] z-50 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-lg"
          >
            <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;