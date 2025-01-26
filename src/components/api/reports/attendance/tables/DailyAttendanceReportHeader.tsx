import { RiArrowDownSFill, RiArrowLeftCircleFill, RiArrowRightCircleFill } from "@remixicon/react"
import useLanguageStore from "../../../../../hooks/store/useLanguageStore"
import moment from "moment"

interface Props {
    selectedDay: string
    setSelectedDay: React.Dispatch<React.SetStateAction<string>>
    getDay: (day: number, month: number) => moment.Moment
    currentMonth: string
    setCurrentMonth: React.Dispatch<React.SetStateAction<string>>
}

const daysInSpanish: Record<string, string> = {
    'Mon': 'Lun',
    'Tue': 'Mar',
    'Wed': 'Mié',
    'Thu': 'Jue',
    'Fri': 'Vie',
    'Sat': 'Sáb',
    'Sun': 'Dom',
}

const monthInSpanish: Record<string, string> = {
    '1': 'Enero',
    '2': 'Febrero',
    '3': 'Marzo',
    '4': 'Abril',
    '5': 'Mayo',
    '6': 'Junio',
    '7': 'Julio',
    '8': 'Agosto',
    '9': 'Septiembre',
    '10': 'Octubre',
    '11': 'Noviembre',
    '12': 'Diciembre',
}

const DailyAttendanceReportHeader = ({ selectedDay, setSelectedDay, getDay, currentMonth, setCurrentMonth }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    let day = getDay(parseInt(selectedDay), parseInt(currentMonth))
    

    const handleNextDay = () => {
        // Start from the current full date
        let fullDate = moment().set({ date: parseInt(selectedDay), month: parseInt(currentMonth) - 1 });
        fullDate = fullDate.add(1, 'days'); // Move to the next day
    
        setSelectedDay(fullDate.date().toString()); // Update the selected day
        setCurrentMonth((fullDate.month() + 1).toString()); // Update the current month (moment months are 0-indexed)

        console.log('day', day);
        
    };
    
    const handlePreviousDay = () => {
        // Start from the current full date
        let fullDate = moment().set({ date: parseInt(selectedDay), month: parseInt(currentMonth) - 1 });
        fullDate = fullDate.subtract(1, 'days'); // Move to the previous day
    
        setSelectedDay(fullDate.date().toString()); // Update the selected day
        setCurrentMonth((fullDate.month() + 1).toString()); // Update the current month (moment months are 0-indexed)
    };

  return (
    <div className="w-full grid grid-cols-12 dark:bg-slate-900 bg-gray-200 font-bold px-2 py-6">
        {/* <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
            
        </div> */}
        <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
            <p>{lan === 'EN' ? 'UID' : 'UID'}</p> 
        </div>
        <div className="flex py-1 text-left col-span-2 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
            <p>{lan === 'EN' ? 'Name' : 'Nombres'}</p>
            <RiArrowDownSFill 
                // className={`${sortKey === 'category_name' && sortOrder === 'desc' ? 'rotate-180' : ''}`}
            />
        </div>
        <div className="flex py-1 text-left col-span-2 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
            <p>{lan === 'EN' ? 'Lastname' : 'Apellidos'}</p>
            <RiArrowDownSFill 
                // className={`${sortKey === 'created_at' && sortOrder === 'desc' ? 'rotate-180' : ''}`}
            />
        </div>
        <div className="flex py-1 col-span-2 justify-center hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
            <p>{lan === 'EN' ? 'Entrance' : 'Entrada'}</p> 
        </div>
        <div className="flex py-1 col-span-2 justify-center hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
            <p>{lan === 'EN' ? 'Exit' : 'Salida'}</p> 
        </div>
        <div className="w-[70%] mx-auto col-span-2 flex justify-between items-center dark:hover:text-slate-300">
            <RiArrowLeftCircleFill 
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={handlePreviousDay}
            />
            <p>
                {lan === "EN"
                    ? day.format("ddd DD")
                    : daysInSpanish[day.format("ddd")] + " " + day.format("DD")} 
            </p>
            <RiArrowRightCircleFill 
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={handleNextDay}
            />
        </div>
        <div className="w-full flex justify-center items-center">
            {monthInSpanish[currentMonth]}
            {/* <Selector 
                values={[
                    {id: '1', name: 'Enero'},
                    {id: '2', name: 'Febrero'},
                    {id: '3', name: 'Marzo'},
                    {id: '4', name: 'Abril'},
                    {id: '5', name: 'Mayo'},
                    {id: '6', name: 'Junio'},
                    {id: '7', name: 'Julio'},
                ]}
                defaultValue={currentMonth}
                setter={setCurrentMonth}
                /> */}
                    
        </div>
    </div>
  )
}

export default DailyAttendanceReportHeader