import { useState } from "react"
import Button from "../../../ui/Button"
import Input from "../../../ui/Input"
import Selector from "../../../ui/Selector"
import { Classroom } from "../../../../services/api/classroomService"
import useLanguageStore from "../../../../hooks/store/useLanguageStore"
import { motion } from "framer-motion"

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>
  classrooms: Classroom[]
}

const languages = [
  {id: 'N', name: 'Ninguna'},
  {id: 'S', name: 'Español'},
  {id: 'E', name: 'Inglés'},
  {id: 'Q', name: 'Quechua'},
  {id: 'A', name: 'Aymara'}
]

const religions = [
  {id: 'C', name: 'Católica'},
  {id: 'E', name: 'Evangélica'},
  {id: 'J', name: 'Judía'},
  {id: 'I', name: 'Musulmana'},
  {id: 'B', name: 'Budista'},
  {id: 'M', name: 'Mormona'},
  {id: 'T', name: 'Testigos de Jehová'},
  {id: 'R', name: 'Cristiana'},
  {id: 'O', name: 'Otra'}
]

const StudentForm = ({ setPage, classrooms }: Props) => {

  const lan = useLanguageStore(s => s.lan)

  // PERSONAL DATA
  const [dni, setDni] = useState('')
  const [oldSchool, setOldSchool] = useState('')
  const [names, setNames] = useState('')
  const [fatherLastName, setFatherLastName] = useState('')
  const [motherLastName, setMotherLastName] = useState('')

  // CLASSROOM
  const [level, setLevel] = useState('')
  const [grade, setGrade] = useState('')
  const [section, setSection] = useState('')

  // LANGUAGE
  const [mainLanguage, setMainLanguage] = useState('S')
  const [secondLanguage, setSecondLanguage] = useState('N')

  // FAMILY DATA
  const [brothers, setBrothers] = useState('')
  const [place, setPlace] = useState('')
  const [religion, setReligion] = useState('C')
  const [livesWith, setLivesWith] = useState('')

  // CONTACT
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [cellphone, setCellphone] = useState('')

  // HEALTH
  const [insurance, setInsurance] = useState('')

  // ERROR HANDLING
  const [dniError, setDniError] = useState('')
  const [oldSchoolError, setOldSchoolError] = useState('')
  const [fatherLastNameError, setFatherLastNameError] = useState('')
  const [motherLastNameError, setMotherLastNameError] = useState('')
  const [namesError, setNamesError] = useState('')

  const [levelError, setLevelError] = useState('')
  const [gradeError, setGradeError] = useState('')
  const [sectionError, setSectionError] = useState('')

  const [religionError, setReligionError] = useState('')

  const [addressError, setAddressError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [cellphoneError, setCellphoneError] = useState('')

  const [insuranceError, setInsuranceError] = useState('')
  const [livesWithError, setLivesWithError] = useState('')


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const classroomId = classrooms.find(c => c.grade === grade && c.section === section && c.level === level)?.id
    
    if (dni === '') {
      setDniError('El DNI es requerido')
      return
    }

    if (dni.length > 8) {
      setDniError('El DNI debe tener 8 dígitos')
      return
    }

    if (oldSchool === '') {
      setOldSchoolError('La IE de procedencia es requerida')
      return
    }

    if (fatherLastName === '') {
      setFatherLastNameError('El apellido paterno es requerido')
      return
    }

    if (motherLastName === '') {
      setMotherLastNameError('El apellido materno es requerido')
      return
    }

    if (names === '') {
      setNamesError('El nombre es requerido')
      return
    }

    if (level === '' || level === '0') {
      setLevelError('El nivel es requerido')
      return
    }

    if (grade === '' || grade === '0') {
      setGradeError('El grado es requerido')
      return
    }

    if (section === '' || section === '0') {
      setSectionError('La sección es requerida')
      return
    }

    if (religion === '' || religion === '0') {
      setReligionError('La religión es requerida')
      return
    }

    if (address === '') {
      setAddressError('La dirección es requerida')
      return
    }

    if (phone === '' || cellphone === '') {
      phone && setPhoneError('El teléfono es requerido')
      setPhoneError('El teléfono es requerido')
      return
    }

    if (phone === '' && cellphone === '') {
      setPhoneError('El teléfono es requerido')
      setCellphoneError('El celular es requerido')
      return
    }

    setPage(prev => prev + 1)
    
    
  }

  return (
    <motion.div
      initial={{opacity: 0, x: 50}}
      animate={{opacity: 1, x: 0}}
      transition={{duration: 0.5}}
    >
      <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-12 py-12">
        <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 mb-16">
          <h2 className="text-2xl text-left font-semibold mb-6">Datos Personales</h2>
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          <Input 
              label="DNI"
              value={dni}
              onChange={(e) => {
                dni && setDniError('')
                setDni(e.target.value)}}
              placeholder="DNI ..."
              type="number"
              error={dniError}
          />
          <div className="col-span-2">
            <Input 
                label="IE de Procedencia"
                value={oldSchool}
                onChange={(e) => {
                  oldSchool && setOldSchoolError('')
                  setOldSchool(e.target.value)}}
                placeholder="IE de Procedencia ..."
                error={oldSchoolError}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          <Input 
            label="Apellido Paterno"
            value={fatherLastName}
            onChange={e => {
              fatherLastName && setFatherLastNameError('')
              setFatherLastName(e.target.value)}}
            error={fatherLastNameError}
            placeholder="Apellido Paterno ..."
          />
          <Input 
            label="Apellido Materno"
            value={motherLastName}
            onChange={e => {
              motherLastName && setMotherLastNameError('')
              setMotherLastName(e.target.value)}}
            error={motherLastNameError}
            placeholder="Apellido Materno ..."
          />
          <Input 
            label="Nombres"
            value={names}
            onChange={e => {
              names && setNamesError('')
              setNames(e.target.value)}}
            error={namesError}
            placeholder="Nombres ..."
          />
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          <div>
            <Selector 
              values={[{id: 'P', name: 'Primaria'}, {id: 'S', name: 'Secundaria'}]}
              lan={lan}
              setter={setLevel}
              label="Nivel"
              error={levelError}
              value={level}
              setError={setLevelError}
            />
          </div>
          {level && <motion.div
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
          >
            <Selector 
              values={level === 'P' 
                ? [{id: '1', name: '1'}, {id: '2', name: '2'}, {id: '3', name: '3'}, {id: '4', name: '4'}, {id: '5', name: '5'}, {id: '6', name: '6'}]
                : [{id: '1', name: '1'}, {id: '2', name: '2'}, {id: '3', name: '3'}, {id: '4', name: '4'}, {id: '5', name: '5'}]
              }
              lan={lan}
              setter={setGrade}
              label="Grado"
              error={gradeError}
              value={grade}
              setError={setGradeError}
            />
          </motion.div>}
          {grade && <motion.div
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
          >
            <Selector 
              values={classrooms.filter(c => c.grade === grade && c.level === level).map(c => ({id: c.section, name: c.section}))}
              setter={setSection}
              lan={lan}
              label="Sección"
              error={sectionError}
              value={section}
              setError={setSectionError}
            />
          </motion.div>}
        </div>
        {/* <div className="grid grid-cols-4 gap-4">
          <p>Nació de parto natural:</p>
          <p>{'Si ( )'}</p>
          <p>{'No ( )'}</p>
          <p>Fecha de nacimiento (calendat)</p>
          <Input 
            label="Departamento"
          />
          <Input 
            label="Provincia"
          />
          <Input 
            label="Distrito"
          />
        </div> */}
{/* 
    SPANISH_LANGUAGE = 'S'
    ENGLISH_LANGUAGE = 'E'
    QUECHUA_LANGUAGE = 'Q'
    AYMARA_LANGUAGE = 'A' */}
        <div className="grid grid-cols-3 gap-4 items-start">
          <Selector 
            values={languages.filter(l => l.id !== 'N')}
            setter={setMainLanguage}
            defaultValue={mainLanguage}
            label="Lengua Materna"
          />
          <Selector 
            values={languages.filter(l => l.id !== mainLanguage)}
            setter={setSecondLanguage}
            defaultValue={secondLanguage}
            label="Segunda Lengua"
            lan={lan}
          />
          {/* <Input 
            label='Número de Hermanos'
          />
          <Input 
            label='Lugar que ocupa'
          /> */}
          <Selector 
            values={religions}
            label="Religión"
            setter={setReligion}
            lan={lan}
            error={religionError}
            setError={setReligionError}
            value={religion}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input 
            label="Dirección de Domicilio"
            value={address}
            onChange={e => {
              address && setAddressError('')
              setAddress(e.target.value)}}
            error={addressError}
            placeholder="Dirección ..."
          />
          <Input
            label="Teléfono"
            value={phone}
            onChange={e => {
              phone && setPhoneError('')
              setPhone(e.target.value)}}
            error={phoneError}
            placeholder="Teléfono ..."
          />
          <Input
            label="Celular"
            value={cellphone}
            onChange={e => {
              cellphone && setCellphoneError('')
              setCellphone(e.target.value)}}
            error={cellphoneError}
            placeholder="Celular ..."
          />
          {/* <p>Croquis (google maps)</p> */}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Selector 
            values={[{id: 'E', name: 'Essalud'}, {id: 'P', name: 'Privado'}, {id: 'S', name: 'SIS'}, {id: 'N', name: 'Sin Seguro'}]}
            setter={setInsurance}
            label="Seguro"
            lan={lan}
          />
          <Selector 
            values={[{id: 'P', name: 'Padre'}, {id: 'M', name: 'Madre'}, {id: 'A', name: 'Apoderado'}]}
            setter={setLivesWith}
            label="Con quién vive"
            lan={lan}
          />
        </div>
        {livesWith === 'A' &&
        <motion.div 
          initial={{opacity: 0, x: 50}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.5}}
          className="w-full grid grid-cols-2">
          <Input 
            label="Nombre del apoderado"
            placeholder="Nombre ..."
          />
        </motion.div>}
{/* 
        ESSALUD_INSURANCE = 'E'
    PRIVATE_INSURANCE = 'P'
    SIS_INSURANCE = 'S' */}
        
        {/* <div className="w-full grid grid-cols-3 gap-4">
          <Input 
            label="Peso Actual"
          />
          <Input 
            label="Talla Actual"
          />
          <TextArea 
            placeholder="Sufre de alguna enfermedad"
          />
        </div> */}
        {/* <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 my-16">
          <h2 className="text-2xl text-left font-semibold mb-6">En Caso de Emergencia</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input 
            label="Dirección"
          />
          <Input 
            label="Teléfono"
          />
          <Input 
            label="Preguntar por:"
          />
        </div>
        */}
        <div className="my-8 w-full flex justify-end">
          <Button 
            label="Siguiente"
            onClick={handleSubmit}
            type="button"
          />
        </div> 
    </form>
    </motion.div>
  )
}

export default StudentForm