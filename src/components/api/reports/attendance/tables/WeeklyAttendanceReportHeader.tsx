import { RiArrowDownSFill, RiArrowLeftCircleFill, RiArrowRightCircleFill } from "@remixicon/react"
import useLanguageStore from "../../../../../hooks/store/useLanguageStore"

interface Props {
    weekDays: moment.Moment[]
    selectedWeek: string
    setSelectedWeek: React.Dispatch<React.SetStateAction<string>>
}

const daysInSpanish: Record<string, string> = {
    'Mon': 'Lun',
    'Tue': 'Mar',
    'Wed': 'Mié',
    'Thu': 'Jue',
    'Fri': 'Vie',
}

const WeeklyAttendanceReportHeader = ({ weekDays, selectedWeek, setSelectedWeek }: Props) => {
    const lan = useLanguageStore(s => s.lan)

    const handleNextWeek = () => {
        if (parseInt(selectedWeek) < 52) {
            setSelectedWeek((parseInt(selectedWeek) + 1).toString())
        }
    }

    const handlePrevWeek = () => {
        if (parseInt(selectedWeek) > 1) {
            setSelectedWeek((parseInt(selectedWeek) - 1).toString())
        }
    }

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
        <div>
            <RiArrowLeftCircleFill 
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={handlePrevWeek}
            />
        </div>
        {weekDays.map((day, index) => (
            <div
            key={index}
            className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
        >
            <p>
                {lan === "EN"
                    ? day.format("ddd DD")
                    : daysInSpanish[day.format("ddd")] + " " + day.format("DD")} 
            </p>
        </div>
        ))}
        <div>
            <RiArrowRightCircleFill 
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={handleNextWeek}
            />
        </div>
    </div>
  )
}

export default WeeklyAttendanceReportHeader