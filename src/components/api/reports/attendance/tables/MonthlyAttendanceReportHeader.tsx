import { RiArrowDownSFill } from "@remixicon/react"
import useLanguageStore from "../../../../../hooks/store/useLanguageStore"
import Selector from "../../../../ui/Selector"

interface Props {
    selectedMonth: string
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>
}

const monthsData = [
    { id: '1', name: 'Enero' },
    { id: '2', name: 'Febrero' },
    { id: '3', name: 'Marzo' },
    { id: '4', name: 'Abril' },
    { id: '5', name: 'Mayo' },
    { id: '6', name: 'Junio' },
    { id: '7', name: 'Julio' },
    { id: '8', name: 'Agosto' },
    { id: '9', name: 'Septiembre' },
    { id: '10', name: 'Octubre' },
    { id: '11', name: 'Noviembre' },
    { id: '12', name: 'Diciembre' },
]

const MonthlyAttendanceReportHeader = ({ selectedMonth, setSelectedMonth }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
<div className="w-full grid grid-cols-12 dark:bg-slate-900 bg-gray-200 font-bold px-2 py-6">

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
        <div className="w-full col-span-7 flex flex-col justify-center items-center gap-4">
            <div className="w-[40%]">
                <Selector 
                    values={monthsData}
                    setter={setSelectedMonth}
                    defaultValue={selectedMonth}
                />
            </div>
            <div className="grid grid-cols-31">
                {days.map(day => (
                    <div key={day} className="flex justify-center items-center w-8 h-8 bg-slate-800">
                        <p className="text-xs">{day}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default MonthlyAttendanceReportHeader