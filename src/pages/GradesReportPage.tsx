import moment from "moment"
import { areas, competencies } from "../data/mockdataForGrades"

interface Area {
    id: number
    title: string
}

interface GradesReportBodyProps {
    area: Area
}

const GradesReportBody = ({area}: GradesReportBodyProps) => {

    const filteredCompetencies = competencies.filter((competency) => competency.area === area.id)
    const grades = ['AD', 'A', 'B', 'C']

    return (
        <div className="w-full grid grid-cols-12 text-xs item border-collapse border-black">
            <p className="border border-neutral-950 flex justify-center items-center p-2 text-center">{area.title}</p>
            <div className="col-span-5">
                {filteredCompetencies
                .map((competency) => (
                        <p key={competency.id} className="border border-neutral-950 flex justify-start items-center p-1">{competency.title}</p>
                ))}
            </div>
            <div className="col-span-2">
                {filteredCompetencies. map(() => (
                    <div className="w-full grid grid-cols-4">
                        {grades.map((grade) => (
                            <p key={grade} className="border border-neutral-950 flex justify-center items-center p-1">{grade}</p>
                        ))}
                    </div>
                ))}
            </div>

            {/* <p className="col-span-3 border border-neutral-950 flex justify-center items-center">Competencias</p>
            <div className="col-span-2 border border-neutral-950 flex flex-col justify-center items-center text-center">
                <p className="">Calificación por Periodo</p>
                <div className="w-full grid grid-cols-4 mt-2">
                    <p className="border border-neutral-950">1</p>
                    <p className="border border-neutral-950">2</p>
                    <p className="border border-neutral-950">3</p>
                    <p className="border border-neutral-950">4</p>
                </div>
            </div>
            <p className="border border-neutral-950 flex justify-center items-center text-center">Calf. Anual de Comp.</p>
            <p className="border border-neutral-950 flex justify-center items-center text-center">Calf. Anual de Area.</p>
            <p className="col-span-2 border border-neutral-950 flex justify-center items-center text-center">Conclusión Descriptiva del Final del Periodo</p> */}
        </div>
    )
}

const GradesReportHeader = () => {
    return (
        <div className="w-full grid grid-cols-12 text-xs item border-collapse border-black">
            <p className=" border border-neutral-950 flex justify-center items-center">Area Curricular</p>
            <p className="col-span-5 border border-neutral-950 flex justify-center items-center">Competencias</p>
            <div className="col-span-2 border border-neutral-950 flex flex-col justify-center items-center text-center">
                <p className="">Calificación por Periodo</p>
                <div className="w-full grid grid-cols-4 mt-2">
                    <p className="border border-neutral-950">1</p>
                    <p className="border border-neutral-950">2</p>
                    <p className="border border-neutral-950">3</p>
                    <p className="border border-neutral-950">4</p>
                </div>
            </div>
            <p className="border border-neutral-950 flex justify-center items-center text-center">Calf. Anual de Comp.</p>
            <p className="border border-neutral-950 flex justify-center items-center text-center">Calf. Anual de Area.</p>
            <p className="border border-neutral-950 flex justify-center items-center text-center">Conclusión Descriptiva del Final del Periodo</p>
        </div>
    )
}

const GradesReportPage = () => {

    const currentYear = moment().format('YYYY')

  return (
    <div className="w-full print:text-black print:bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Informe de Progreso de Aprendizaje del Estudiante {currentYear}</h2>
        <div className="grid grid-cols-2 text-center mx-auto w-[70%] text-xs mb-8 gap-4">
            <div className="text-left">
                <div className="grid grid-cols-3">
                    <p className="border-[1px] border-neutral-950 px-2 py-1">DRE:</p>
                    <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">dsfsdf</p>
                </div>
                <div className="grid grid-cols-3">
                    <p className="border-[1px] border-neutral-950 px-2 py-1">Nivel:</p>
                    <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">sdfsdf</p>
                </div>
                <div className="grid grid-cols-3">
                    <p className="border-[1px] border-neutral-950 px-2 py-1">Institución Educativa:</p>
                    <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">aaaa</p>
                </div>
                <div className="grid grid-cols-3">
                    <p className="border-[1px] border-neutral-950 px-2 py-1">Grado:</p>
                    <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">sdfsdf</p>
                </div>
                <div className="grid grid-cols-3">
                    <p className="border-[1px] border-neutral-950 px-2 py-1">Nombre y Apellidos:</p>
                    <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">sdsadfageawfafsdf</p>
                </div>
                <div className="grid grid-cols-3">
                    <p className="border-[1px] border-neutral-950 px-2 py-1">Código del Estudiante:</p>
                    <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">sdfsdf</p>
                </div>
            </div>
            <div className="text-left">
                <div className="grid grid-cols-3">
                    <p className="border-[1px] border-neutral-950 px-2 py-1">UGEL:</p>
                    <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">asdasd</p>
                </div>
                <div className="grid grid-cols-3">
                    <p className="border-[1px] border-neutral-950 px-2 py-1">Código Modular:</p>
                    <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">asdasd</p>
                </div>
                <div className="grid grid-cols-3">
                    <p className="border-[1px] border-neutral-950 px-2 py-1">Sección:</p>
                    <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">asdaasdfesd</p>
                </div>
                <div className="grid grid-cols-3">
                    <p className="border-[1px] border-neutral-950 px-2 py-1">DNI:</p>
                    <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">34234</p>
                </div>
            </div>
        </div>
        <GradesReportHeader />
        {areas.map((area) => (
            <GradesReportBody key={area.id} area={area} />
        ))}
    </div>
  )
}

export default GradesReportPage