import moment from "moment"
import { areas, competencies, mockStudentsGradeCard } from "../../../../data/mockdataForGrades"
import { useEffect, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import { Printer } from "lucide-react"
import useSchoolStore from "../../../../hooks/store/useSchoolStore"

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
              {grades[Math.floor(Math.random() * 4)]}
            </p>
          ))}
        </div>
        <div className="flex justify-center items-center border border-neutral-950">
          <p>{grades[Math.floor(Math.random() * 4)]}</p>
        </div>

      </div>
      
    ))}
    
  </div>
  <div className="flex justify-center items-center border border-neutral-950">
            <p>{grades[Math.floor(Math.random() * 4)]}</p>
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

interface Props {
    allFinalized: boolean
    level: string
    grade: string
    section: string
}

const GradeReportCard = ({ allFinalized, grade, section, level }: Props) => {

    const school = useSchoolStore((state) => state.school)
    const currentYear = moment().format('YYYY')
    const firstSixAreas = areas.slice(0, 6)
    const lastTwoAreas = areas.slice(6, 11)
    const printRef = useRef<HTMLDivElement>(null)
    const [schoolImage, setSchoolImg] = useState('')
    const handlePrint = useReactToPrint({ 
        contentRef: printRef,
        documentTitle: `Grade-Cards`,
        onAfterPrint: () => console.log("Impresión completada.")
    })

      useEffect(() => {
        import(`../../../../assets/imgs/schoolLogos/${school.picture_name}.png`)
          .then((img) => setSchoolImg(img.default))
          .catch((err) => {
            setSchoolImg('')
            console.error("Error loading school image: ", err)})
      }, [school.picture_name])


  return (
   <>
    <button
        onClick={() => {
        if (!allFinalized) return;
        handlePrint(); 
        }}
        disabled={!allFinalized}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition ${
        allFinalized
            ? "bg-green-600 hover:bg-green-700"
            : "bg-slate-300 cursor-not-allowed"
        }`}
    >
        <Printer className="w-4 h-4" />
        Imprimir Reportes
    </button>
    <div className="w-full hidden print:block" ref={printRef} >
    {mockStudentsGradeCard.map((student) => (
            <div key={student.id} className=" print:text-black print:bg-white print:w-[95%] print:mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center print:mt-10">Informe de Progreso de Aprendizaje del Estudiante {currentYear}</h2>
    
            <div className="w-full flex justify-center items-start">
                <div className="w-[20%] justify-center items-start flex">
                    <img src={schoolImage} alt="lOGO" width={80}/>
                </div>
                <div className="grid grid-cols-2 text-center mx-auto w-[60%] text-xs mb-8">
                    <div className="text-left">
                        <div className="grid grid-cols-3">
                            <p className="border-[1px] border-neutral-950 px-2 py-1">DRE:</p>
                            <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">Puno</p>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="border-[1px] border-neutral-950 px-2 py-1">Nivel:</p>
                            <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">{level === 'P' ? 'Primaria' : `${level === 'S' ? 'Secundaria' : 'Inicial'}`}</p>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="border-[1px] border-neutral-950 px-2 py-1">Institución Educativa:</p>
                            <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">{school.name}</p>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="border-[1px] border-neutral-950 px-2 py-1">Grado:</p>
                            <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">{grade}</p>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="border-[1px] border-neutral-950 px-2 py-1">Nombre y Apellidos:</p>
                            <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">{student.first_name} {student.last_name}</p>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="border-[1px] border-neutral-950 px-2 py-1">Código del Estudiante:</p>
                            <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">{student.id}</p>
                        </div>
                    </div>
                    <div className="text-left">
                        <div className="grid grid-cols-3">
                            <p className="border-[1px] border-neutral-950 px-2 py-1">UGEL:</p>
                            <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">San Román</p>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="border-[1px] border-neutral-950 px-2 py-1">Código Modular:</p>
                            <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">345345</p>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="border-[1px] border-neutral-950 px-2 py-1">Sección:</p>
                            <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">{section === 'U' ? 'Unica' : section}</p>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="border-[1px] border-neutral-950 px-2 py-1">DNI:</p>
                            <p className="border-[1px] border-neutral-950 px-2 py-1 col-span-2">{student.dni}</p>
                        </div>
                    </div>
                </div>
                <div className="w-[20%] justify-center items-start flex">
                    <img src={schoolImage} alt="lOGO" width={80}/>
                </div>
            </div>
            <GradesReportHeader />
            {firstSixAreas.map((area) => (
                <GradesReportBody key={area.id} area={area} />
            ))}
            <div className="print:break-after-page"></div>
            <div className="print:mt-10"></div>
            <GradesReportHeader />
            {lastTwoAreas.map((area) => (
                <GradesReportBody key={area.id} area={area} />
            ))}
            <CompetencyDescriptiveConclusionHeader />
            <CompetencyDescriptiveConclusionBody />
            <div className="print:break-after-page"></div>
            <div className="print:mt-10"></div>
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
            <div className="w-full mt-96 flex justify-evenly gap-6">
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
    ))}
    </div>
    
   </>
  )
}

export default GradeReportCard