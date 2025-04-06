import moment from "moment"
import { areas, competencies } from "../data/mockdataForGrades"

const CalificationCriteria = () => {

    const grades = [
        {id: '1', calification: 'AD', title: 'Logro destacado', description: 'Cuando el estudiante evidencia un nivel superior a lo esperado respecto a la competencia. Esto quiere decir que demuestra aprendizajes que van más álla del nivel esperado.'},
        {id: '2', calification: 'A', title: 'Logro esperado', description: 'Cuando el estudiante evidencia el nivel esperado respecto a la competencia, demostrando manejo satisfactorio en todas las tareas propuestas y en el tiempo programado.'},
        {id: '3', calification: 'B', title: 'En Proceso', description: 'Cuando el estudiante esta próximo o cerca al nivel esperado respecto a la competencia, para lo cual requiere acompañamiento durante un tiempo razonable para lograrlo. '},
        {id: '4', calification: 'C', title: 'En Inicio', description: 'Cuando  un estudiante muestra un progreso mínimo en una competencia de acuerdo al nivel esperado. Evidencia con frecuencia dificultades en el desarrollo de las tareas, por lo que necesita mayor tiempo de acompañamiento e intervención del docente.'},
    ]
    return (
        <>
            {grades.map( grade => (
                <div className="w-full grid grid-cols-12 text-xs border-collapse border-black" key={grade.id}>
                    <div className="col-span-2 text-center border border-neutral-950 flex justify-center items-center">
                        <p>{grade.calification}</p>
                    </div>
                    <div className="col-span-10 border border-neutral-950">
                        <h2 className="font-semibold mb-1">{grade.title}</h2>
                        <p>{grade.description}</p>
                    </div>

                </div>
            ))}
        </>
    )
}

const AttendanceSummaryHeader = () => {
    return (
        <div className="w-full grid grid-cols-12 text-xs border-collapse border-black">
            <div className="col-span-2 text-center border border-neutral-950 flex justify-center items-center">
                <p>Periodo</p>
            </div>
            <div className="col-span-5 text-center border border-neutral-950">
                <p>Imasistencia</p>
                <div className="w-full grid grid-cols-2">
                    <p className="border border-neutral-950">Justificada</p>
                    <p className="border border-neutral-950">Injustificada</p>
                </div>
            </div>
            <div className="col-span-5 text-center border border-neutral-950">
                <p>Tardanzas</p>
                <div className="w-full grid grid-cols-2">
                    <p className="border border-neutral-950">Justificada</p>
                    <p className="border border-neutral-950">Injustificada</p>
                </div>
            </div>
        </div>
    )
}

const AttendanceSummaryBody = () => {
    const periods = ['1', '2', '3', '4']
    return (
        <div className="w-full grid grid-cols-12 text-xs border-collapse border-black">
            {periods.map((period) => (
                <>
                <div className="col-span-2 text-center border border-neutral-950 flex justify-center items-center">
                    <p>{period}</p>
                </div>
                <div className="col-span-5 text-center border border-l-0 border-t-0 border-neutral-950 flex justify-center items-start">
                    <div className="w-full grid grid-cols-2">
                        <p className="border border-l-0 border-t-0 border-neutral-950"></p>
                        <p className="border border-l-0 border-t-0 border-neutral-950"></p>
                    </div>
                </div>
                <div className="col-span-5 text-center border border-l-0 border-t-0 border-neutral-950 flex justify-center items-start">
                    <div className="w-full grid grid-cols-2">
                        <p className="border border-l-0 border-t-0 border-neutral-950"></p>
                        <p className="border border-l-0 border-t-0 border-neutral-950"></p>
                    </div>
                </div>
                </>
            ))}
              
        </div>
    )
}

const CompetencyDescriptiveConclusionHeader = () => {
    return (
        <div className="w-full grid grid-cols-12 text-xs border-collapse border-black mt-10">
            <div className="col-span-2 text-center border border-neutral-950">
                <p>Periodo</p>
            </div>
            <div className="col-span-4 text-center border border-neutral-950">
                <p>Competencia</p>
            </div>
            <div className="col-span-6 text-center border border-neutral-950">
                <p>Conclusión Descriptiva</p>
            </div>
        </div>
    )
}

const CompetencyDescriptiveConclusionBody = () => {
    const periods = ['1', '2', '3', '4']
    return (
        <div className="w-full grid grid-cols-12 text-xs border-collapse border-black">
            {periods.map((period) => (
                <>
                <div className="col-span-2 text-center border border-neutral-950 flex justify-center items-center">
                    <p>{period}</p>
                </div>
                <div className="col-span-4 text-center border border-neutral-950 py-6 flex justify-center items-start">
                    <p></p>
                </div>
                <div className="col-span-6 text-center border border-neutral-950 py-6 flex justify-center items-start">
                    <p></p>
                </div>
                </>
            ))}
        </div>
    )
}

const DescriptiveConclusionHeader = () => {
    return (
        <div className="w-full grid grid-cols-12 text-xs border-collapse border-black mt-10">
            <div className="col-span-2 text-center border border-neutral-950">
                <p>Periodo</p>
            </div>
            <div className="col-span-10 text-center border border-neutral-950">
                <p>Conclusión Descriptiva del Final del Periodo</p>
            </div>
        </div>
    )
}

const DescriptiveConclusionBody = () => {
    const periods = ['1', '2', '3', '4']
    return (
        <div className="w-full grid grid-cols-12 text-xs border-collapse border-black">
            {periods.map((period) => (
                <>
                <div className="col-span-2 text-center border border-neutral-950 flex justify-center items-center">
                    <p>{period}</p>
                </div>
                <div className="col-span-10 text-center border border-neutral-950 py-6 flex justify-center items-start">
                    <p></p>
                </div>
                </>
            ))}
        </div>
    )
}

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
<div className="w-full grid grid-cols-12 text-xs border-collapse border-black">
  <p className="col-span-2 border border-neutral-950 flex justify-center items-center p-2 text-center">
    {area.title}
  </p>

  <div className="col-span-7 grid grid-cols-1">
    {filteredCompetencies.map((competency) => (
      <div key={competency.id} className="grid grid-cols-7 w-full">
        <p className="col-span-4 border border-neutral-950 flex items-center p-1">
          {competency.title}
        </p>
        <div className="col-span-2 grid grid-cols-4">
          {grades.map((grade) => (
            <p
              key={grade}
              className="border border-neutral-950 flex justify-center items-center p-1"
            >
              {grade}
            </p>
          ))}
        </div>
        <div className="flex justify-center items-center border border-neutral-950">
          <p>AD</p>
        </div>

      </div>
      
    ))}
    
  </div>
  <div className="flex justify-center items-center border border-neutral-950">
            <p>AD</p>
        </div>
        <div className="col-span-2 flex justify-center items-center border border-neutral-950 overflow-x-auto text-center px-1">
            <p>Aasdas dafad sdf sd sdf sd</p>
        </div>
</div>
    )
}

const GradesReportHeader = () => {
    return (
        <div className="w-full grid grid-cols-12 text-xs item border-collapse border-black">
            <p className="col-span-2 border border-neutral-950 flex justify-center items-center">Area Curricular</p>
            <p className="col-span-4 border border-neutral-950 flex justify-center items-center">Competencias</p>
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
            <p className="col-span-2 border border-neutral-950 flex justify-center items-center text-center">Conclusión Descriptiva del Final del Periodo</p>
        </div>
    )
}

const GradesReportPage = () => {

    const currentYear = moment().format('YYYY')

  return (
    <div className="w-full print:text-black print:bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Informe de Progreso de Aprendizaje del Estudiante {currentYear}</h2>
        <div className="grid grid-cols-2 text-center mx-auto w-[60%] text-xs mb-8">
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
        <CompetencyDescriptiveConclusionHeader />
        <CompetencyDescriptiveConclusionBody />
        <DescriptiveConclusionHeader />
        <DescriptiveConclusionBody />
        <div className="w-full mt-10 flex justify-center gap-6">
            <div className="w-[50%]">
                <h2 className="mb-2 text-center">Resumen de Asistencias</h2>
                <AttendanceSummaryHeader />
                <AttendanceSummaryBody />
            </div>
            <div className="w-[50%]">
                <h2 className="mb-2 text-center">Escala de calificación del CNEB</h2>
                <CalificationCriteria />
            </div>
        </div>
        <div className="w-full mt-36 flex justify-evenly gap-6">
            <div className="w-[35%]">
                <p className="border-t-2 border-slate-950 text-sm text-center">
                    Firma y sello del Docente o Tutor(a)
                </p>
            </div>
            <div className="w-[35%]">
                <p className="border-t-2 border-slate-950 text-sm text-center">
                Firma y sello del Director(a)
                </p>
            </div>
        </div>
    </div>
  )
}

export default GradesReportPage