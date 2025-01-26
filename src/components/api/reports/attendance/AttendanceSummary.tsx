import { RiTimeFill } from "@remixicon/react"
import useLanguageStore from "../../../../hooks/store/useLanguageStore"

const AttendanceSummary = () => {

    const lan = useLanguageStore(s => s.lan)

  return (
    <div className="w-[90%] flex justify-between items-center gap-12 my-12 mx-auto">
        <div className="h-[200px] w-full bg-green-600 shadow-2xl shadow-slate-400 rounded-3xl flex flex-col justify-center items-center gap-6">
            <h2 className="text-2xl">{lan === 'EN' ? 'Total Excused' : 'Excusado Total'}</h2>
            <p className="text-6xl font-bold">45 | 33%</p>
        </div>
        <div className="h-[200px] w-full bg-red-600 shadow-2xl shadow-slate-400 rounded-3xl flex flex-col justify-center items-center gap-6">
            <h2 className="text-2xl">{lan === 'EN' ? 'Total No Show' : 'Faltas Total'}</h2>
            <p className="text-6xl font-bold">12 | 20%</p>
        </div>
        <div className="h-[200px] w-full bg-amber-500 shadow-2xl shadow-slate-400 rounded-3xl flex flex-col justify-center items-center gap-6">
            <h2 className="text-2xl">{lan === 'EN' ? 'Total Late' : 'Tardanzas Total'}</h2>
            <p className="text-6xl font-bold">22 | 15%</p>
        </div>
    </div>
  )
}

export default AttendanceSummary