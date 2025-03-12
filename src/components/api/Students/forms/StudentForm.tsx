import { useEffect, useRef, useState } from "react"
import Button from "../../../ui/Button"
import Input from "../../../ui/Input"
import Selector from "../../../ui/Selector"
import { Classroom } from "../../../../services/api/classroomService"
import useLanguageStore from "../../../../hooks/store/useLanguageStore"
import { AnimatePresence, motion } from "framer-motion"
import { CreateStudentData } from "../../../../hooks/api/student/useCreateStudent"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import { Student } from "../../../../services/api/studentsService"
import { UseMutationResult } from "@tanstack/react-query"
import { UpdateStudentData } from "../../../../hooks/api/student/useUpdateStudent"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"
// import axios from "axios"
import useSchoolStore from "../../../../hooks/store/useSchoolStore"
import Switch from "../../../ui/Switch"
import UpdateStudentStatus from "./UpdateStudentStatus"
import { RiArrowDownSFill } from "@remixicon/react"
import useGetStudentByDni from "../../../../hooks/api/student/useGetStudentByDni"

interface Props {
  setPage?: React.Dispatch<React.SetStateAction<number>>
  classrooms: Classroom[]
  setStudentId: React.Dispatch<React.SetStateAction<string>>
  createStudent?: UseMutationResult<Student, Error, CreateStudentData>
  updateStudent?: UseMutationResult<Student, Error, UpdateStudentData>
  student?: Student
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
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

// const fetchStudent = async (dni: string) => {
//   return axios.get(`${import.meta.env.VITE_API_URL}student/${dni}/`)
//   .then(res => res.data)
//   .catch(err => {
//     throw new Error(err.response.data.message)
//   })


// }

const StudentForm = ({ 
    setPage, 
    classrooms, 
    setStudentId, 
    student, 
    createStudent, 
    updateStudent,
    setOpen,
  }: Props) => {

  const lan = useLanguageStore(s => s.lan)
  const access = useAuthStore(s => s.access) || ''
  const school = useSchoolStore(s => s.school) 

  const [loading, setLoading] = useState(false)
  const { setMessage, setShow, setType } = useNotificationsStore()

  // PERSONAL DATA
  const [dni, setDni] = useState(student ? student.dni : '')
  const [oldSchool, setOldSchool] = useState(student ? student.prev_school : '')
  const [names, setNames] = useState(student ? student.first_name : '')
  const [fatherLastName, setFatherLastName] = useState(student ? student.last_name.split(' ')[0] : '')
  const [motherLastName, setMotherLastName] = useState(student ? student.last_name.split(' ')[1] : '')
  const [tutorPhone, setTutorPhone] = useState(student ? student.tutor_phone : '')

  // CLASSROOM
  const [level, setLevel] = useState(student ? student.clase.level : '')
  const [grade, setGrade] = useState(student ? student.clase.grade : '0')
  const [section, setSection] = useState(student ? student.clase.section : '0')

  // Completemntary info show
  const [showComplementary, setShowComplementary] = useState(false)

  const setGradeSectionToDefault = () => {
    setGrade('0')
    setSection('0')
  }
  
  console.log('student', student);
  

  // LANGUAGE
  const [mainLanguage, setMainLanguage] = useState(student ? student.main_language : 'S')
  const [secondLanguage, setSecondLanguage] = useState(student ? student.second_language : 'N')

  // FAMILY DATA
  const [brothers, setBrothers] = useState(student ? (student.number_of_siblings).toString() : '')
  const [place, setPlace] = useState( student ? (student.place_in_family).toString() : '')
  const [religion, setReligion] = useState('C')
  const [livesWith, setLivesWith] = useState(student ? student.lives_with : '')
  const [tutorName, setTutorName] = useState(student ? student.tutor_name : '')

  // CONTACT
  const [address, setAddress] = useState(student ? student.address : '')
  const [phone, setPhone] = useState(student ? student.phone_number : '')
  const [cellphone, setCellphone] = useState(student ? student.celphone_number : '')

  // HEALTH
  const [insurance, setInsurance] = useState(student ? student.insurance : '')
  const [otherInsurance, setOtherInsurance] = useState('')

  // STATUS
  const [isActive, setIsActive] = useState(student ? student.is_active : true)

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
  const [otherInsuranceError, setOtherInsuranceError] = useState('')

  const [livesWithError, setLivesWithError] = useState('')
  const [tutorNameError, setTutorNameError] = useState('')

  // REFS
  const dniRef = useRef<HTMLInputElement>(null);
  const oldSchoolRef = useRef<HTMLInputElement>(null);
  const fatherLastNameRef = useRef<HTMLInputElement>(null);
  const motherLastNameRef = useRef<HTMLInputElement>(null);
  const namesRef = useRef<HTMLInputElement>(null);
  const levelRef = useRef<HTMLSelectElement>(null);
  const gradeRef = useRef<HTMLSelectElement>(null);
  const sectionRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const cellphoneRef = useRef<HTMLInputElement>(null);
  const insuranceRef = useRef<HTMLSelectElement>(null);
  const livesWithRef = useRef<HTMLSelectElement>(null);

  // const { data: studentExists } = useQuery({
  //   queryKey: ['student', dni],
  //   queryFn: () => fetchStudent(dni),
  //   enabled: dni.length === 8,
  //   staleTime: 60000,
  //   retry: false
  // })

  const { data: studentExists} = useGetStudentByDni({ dni, access, validator: true })

  useEffect(() => {
    if (studentExists && !student?.dni || student?.dni !== dni) {
      dni.length === 8 && setDniError('El estudiante ya existe')
      dni.length === 8 &&setType('error')
      dni.length === 8 &&setShow(true)
      dni.length === 8 &&setMessage('El estudiante ya existe')
    }
  }, [studentExists])

  
  const scrollToField = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current.focus();
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const classroomId = classrooms && classrooms.find(c => c.grade === grade && c.section === section && c.level === level)?.id
    let firstErrorField: React.RefObject<HTMLElement> | null = null;
    
    // if (dni === '') {
    //   setDniError('El DNI es requerido')
    //   setType('error')
    //   setShow(true)
    //   setMessage('El DNI es requerido')
    //   if (!firstErrorField) firstErrorField = dniRef;
    //   scrollToField(firstErrorField);
    //   return
    // }

    if (dni !== '' && dni.length > 8) {
      setDniError('El DNI debe tener 8 dígitos')
      setType('error')
      setShow(true)
      setMessage('El DNI debe tener 8 dígitos')
      if (!firstErrorField) firstErrorField = dniRef
      scrollToField(firstErrorField);
      return
    }

    // if (oldSchool === '') {
    //   setOldSchoolError('La IE de procedencia es requerida')
    //   setType('error')
    //   setShow(true)
    //   setMessage('La IE de procedencia es requerida')
    //   if (!firstErrorField) firstErrorField = oldSchoolRef
    //   scrollToField(firstErrorField);
    //   return;
    // }

    if (fatherLastName === '') {
      setFatherLastNameError('El apellido paterno es requerido')
      setType('error')
      setShow(true)
      setMessage('El apellido paterno es requerido')
      if (!firstErrorField) firstErrorField = fatherLastNameRef
      scrollToField(firstErrorField)
      return
    }

    if (motherLastName === '') {
      setMotherLastNameError('El apellido materno es requerido')
      setType('error')
      setShow(true)
      setMessage('El apellido materno es requerido')
      if (!firstErrorField) firstErrorField = motherLastNameRef
      scrollToField(firstErrorField)
      return
    }

    if (names === '') {
      setNamesError('El nombre es requerido')
      setType('error')
      setShow(true)
      setMessage('El nombre es requerido')
      if (!firstErrorField) firstErrorField = namesRef
      scrollToField(firstErrorField)
      return
    }

    if (level === '' || level === '0') {
      setLevelError('El nivel es requerido')
      setType('error')
      setShow(true)
      setMessage('El nivel es requerido')
      return
    }

    if (grade === '' || grade === '0') {
      setGradeError('El grado es requerido')
      setType('error')
      setShow(true)
      setMessage('El grado es requerido')
      return
    }

    if (section === '' || section === '0') {
      setSectionError('La sección es requerida')
      setType('error')
      setShow(true)
      setMessage('La sección es requerida')
      return
    }

    // if (religion === '' || religion === '0') {
    //   setReligionError('La religión es requerida')
    //   setType('error')
    //   setShow(true)
    //   setMessage('La religión es requerida')
    //   return
    // }

    // if (address === '') {
    //   setAddressError('La dirección es requerida')
    //   setType('error')
    //   setShow(true)
    //   setMessage('La dirección es requerida')
    //   return
    // }

    // if (phone === '' && cellphone === '') {
    //   setPhoneError('El teléfono es requerido')
    //   setCellphoneError('El celular es requerido')
    //   return
    // }

    // if (insurance === '' || insurance === '0') {
    //   setInsuranceError('El seguro es requerido')
    //   setType('error')
    //   setShow(true)
    //   setMessage('El seguro es requerido')
    //   return
    // }

    // if (insurance === 'O' && otherInsurance === '') {
    //   setOtherInsuranceError('El nombre del seguro es requerido')
    //   setType('error')
    //   setShow(true)
    //   setMessage('El nombre del seguro es requerido')
    //   return
    // }

    // if (livesWith === '' || livesWith === '0') {
    //   setLivesWithError('Con quién vive es requerido')
    //   setType('error')
    //   setShow(true)
    //   setMessage('Con quién vive es requerido')
    //   return
    // }

    // if (livesWith === 'A' && tutorName === '') {
    //   setTutorNameError('El nombre del apoderado es requerido')
    //   setType('error')
    //   setShow(true)
    //   setMessage('El nombre del apoderado es requerido')
    //   return
    // }

    const livesWithName = livesWith === 'A' ? tutorName : livesWith

    setLoading(true)

    createStudent && createStudent.mutate({
      student: {
        dni: dni.length === 8 ? dni : null,
        prev_school: oldSchool,
        tutor_phone: tutorPhone,
        first_name: names,
        last_name: `${fatherLastName} ${motherLastName}`,
        clase: classroomId,
        main_language: mainLanguage,
        second_language: secondLanguage === 'N' ? '' : secondLanguage,
        number_of_siblings: brothers ? parseInt(brothers) : 0,
        place_in_family: place ? parseInt(place) : 0,
        religion,
        address,
        phone_number: phone,
        celphone_number: cellphone,
        insurance,
        other_insurance: insurance === 'O' ? otherInsurance : '',
        lives_with: livesWithName,
        school: school.id,
        is_active: true
      },
      access
    }, {
      onSuccess: res => {
        setPage && showComplementary && setPage(prev => prev + 1)
        setShow(true)
        setType('success')
        setMessage('Estudiante creado exitosamente!')
        setStudentId(res.uid)
        if (!showComplementary) {
          setDni('')
          setOldSchool('')
          setFatherLastName('')
          setMotherLastName('')
          setNames('')
          setTutorPhone('')
          // setLevel('')
          // setGrade('0')
          // setSection('0')
        }
      },
      onError: err => {
        setType('error')
        setShow(true)
        setMessage(`Error: ${err.message}`)},
      onSettled: () => setLoading(false)
    })    

    updateStudent && updateStudent.mutate({
      student: {
        dni: dni.length === 8 ? dni : null,
        prev_school: oldSchool,
        tutor_phone: tutorPhone,
        first_name: names,
        last_name: `${fatherLastName} ${motherLastName}`,
        clase: classroomId,
        main_language: mainLanguage,
        second_language: secondLanguage === 'N' ? '' : secondLanguage,
        number_of_siblings: brothers ? parseInt(brothers) : 0,
        place_in_family: place ? parseInt(place) : 0,
        religion,
        address,
        phone_number: phone,
        celphone_number: cellphone,
        insurance,
        other_insurance: insurance === 'O' ? otherInsurance : '',
        lives_with: livesWithName,
        school: school.id,
        is_active: isActive
      },
      access
    }, {
      onSuccess: res => {
        console.log(res)
        setOpen && setOpen(false)
        setType('success')
        setShow(true)
        setMessage('Información del tutor actualizada exitosamente!')
      },
      onError: err => {
        setType('error')
        setShow(true)
        setMessage(`Error: ${err.message}`)
      },
      onSettled: () => setLoading(false)
    })
    setLoading(false)
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
        <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 mb-12 flex justify-between">
          <h2 className="text-2xl text-left font-semibold mb-6">Datos Personales</h2>
          {updateStudent && student
          ?
          <UpdateStudentStatus 
            student={student} 
            updateStudent={updateStudent}
            isActive={isActive}
            setIsActive={setIsActive}

          />
          :
          <div className="flex gap-8 items-center">
            <p className={`font-bold ${isActive ? 'text-green-600' : 'text-amber-400'}`}>{isActive ? 'Activo' : 'Inactivo'}</p>
            <Switch 
              value={isActive}
              setter={setIsActive}
            />
          </div>}
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
              // disable={!!student}
              ref={dniRef}
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
                ref={oldSchoolRef}
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
            ref={fatherLastNameRef}
          />
          <Input 
            label="Apellido Materno"
            value={motherLastName}
            onChange={e => {
              motherLastName && setMotherLastNameError('')
              setMotherLastName(e.target.value)}}
            error={motherLastNameError}
            placeholder="Apellido Materno ..."
            ref={motherLastNameRef}
          />
          <Input 
            label="Nombres"
            value={names}
            onChange={e => {
              names && setNamesError('')
              setNames(e.target.value)}}
            error={namesError}
            placeholder="Nombres ..."
            ref={namesRef}
          />
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          <div>
            <Selector 
              values={[{id: 'P', name: 'Primaria'}, {id: 'S', name: 'Secundaria'}, {id: 'I', name: 'Inicial'}]}
              lan={lan}
              setter={setLevel}
              label="Nivel"
              error={levelError}
              value={level}
              setError={setLevelError}
              defaultValue={level && level}
              ref={levelRef}
              setToDefault={setGradeSectionToDefault}
            />
          </div>
          {level === 'P' &&
          <motion.div
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
          >
            <Selector 
              values={[{id: '0', name: 'Selecciona'}, {id: '1', name: '1'}, {id: '2', name: '2'}, {id: '3', name: '3'}, {id: '4', name: '4'}, {id: '5', name: '5'}, {id: '6', name: '6'}]}
              setter={setGrade}
              label="Grado"
              error={gradeError}
              value={grade}
              setError={setGradeError}
              defaultValue={grade && grade}
              ref={gradeRef}
            />
          </motion.div>}
          {level === 'S' &&
          <motion.div
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
          >
            <Selector 
              values={[{id: '0', name: 'Selecciona'}, {id: '1', name: '1'}, {id: '2', name: '2'}, {id: '3', name: '3'}, {id: '4', name: '4'}, {id: '5', name: '5'}]}
              setter={setGrade}
              label="Grado"
              error={gradeError}
              value={grade}
              setError={setGradeError}
              defaultValue={grade && grade}
              ref={gradeRef}
            />
          </motion.div>}
          {level === 'I' &&
          <motion.div
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
          >
            <Selector 
              values={[{id: '0', name: 'Selecciona'}, {id: '3', name: '3 años'}, {id: '4', name: '4 años'}, {id: '5', name: '5 años'}]}
              setter={setGrade}
              label="Grado"
              error={gradeError}
              value={grade}
              setError={setGradeError}
              defaultValue={grade && grade}
              ref={gradeRef}
            />
          </motion.div>}
          {grade !== '0' && <motion.div
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
          >
            <Selector 
              values={[{id: '0', name: 'selecciona'}, ...classrooms.filter(c => c.grade === grade && c.level === level).map(c => ({id: c.section, name: c.section}))]}
              setter={setSection}
              lan={lan}
              label="Sección"
              error={sectionError}
              value={section}
              setError={setSectionError}
              defaultValue={section && section}
              ref={sectionRef}
            />
          </motion.div>}
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
            <Input 
              label="Número telefónico del apoderado"
              placeholder="Número telefónico ..."
              value={tutorPhone}
              onChange={e => setTutorPhone(e.target.value)}
            />
            <AnimatePresence>
            {!showComplementary && 
            <motion.div 
              animate={{opacity: 1}}
              transition={{duration: 0.5}}
              exit={{opacity: 0}}
              className="w-full  h-full flex justify-end items-end mt-6 col-span-2">
              <Button 
                label={'Guardar'}
                onClick={handleSubmit}
                type="submit"
                loading={loading}
                minWidth
              />
            </motion.div>}
            </AnimatePresence>
        </div>
        <div className="flex justify-start items-center gap-4">
          <p className="text-xl font-bold my-6">Información Complementaria</p>
          <motion.div
              className="cursor-pointer p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
              onClick={() => setShowComplementary(prev => !prev)}
              animate={{ rotate: showComplementary ? 180 : 0 }}
              transition={{ duration: 0.3 }}
          >
              <RiArrowDownSFill size={24} />
          </motion.div>
        </div>
        <AnimatePresence>
        {showComplementary && 
        
        <motion.div
          initial={{opacity: 0, x: 50}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.5}}
          exit={{opacity: 0, x: 50}}
        >
        <div className="grid grid-cols-3 gap-4 items-start my-8">
          <Selector 
            values={languages.filter(l => l.id !== 'N')}
            setter={setMainLanguage}
            defaultValue={mainLanguage}
            label="Lengua Materna"
            

          />
          <Selector 
            values={languages.filter(l => l.id !== mainLanguage)}
            setter={setSecondLanguage}
            defaultValue={secondLanguage ? secondLanguage : 'N'}
            label="Segunda Lengua"
            lan={lan}
          />
          <Selector 
            values={religions}
            label="Religión"
            setter={setReligion}
            lan={lan}
            error={religionError}
            setError={setReligionError}
            value={religion}
            defaultValue={religion && religion}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 my-8">
          <Input 
            label="Dirección de Domicilio"
            value={address}
            onChange={e => {
              address && setAddressError('')
              setAddress(e.target.value)}}
            error={addressError}
            placeholder="Dirección ..."
            ref={addressRef}
          />
          <Input
            label="Teléfono"
            value={phone}
            onChange={e => {
              phone && setPhoneError('')
              setPhone(e.target.value)}}
            error={phoneError}
            placeholder="Teléfono ..."
            ref={phoneRef}
          />
          <Input
            label="Celular"
            value={cellphone}
            onChange={e => {
              cellphone && setCellphoneError('')
              setCellphone(e.target.value)}}
            error={cellphoneError}
            placeholder="Celular ..."
            ref={cellphoneRef}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 my-8">
            <Input 
              label="Número de Hermanos"
              placeholder="Número de hermanos ..."
              value={brothers}
              onChange={e => setBrothers(e.target.value)}
              type="number"
            />
            <Input 
              label="Lugar en la Familia"
              placeholder="Lugar en familia ..."
              value={place}
              onChange={e => setPlace(e.target.value)}
              type="number"
            />
        </div>
        <div className="grid grid-cols-3 gap-4 my-8">
          <Selector 
            values={[{id: 'E', name: 'Essalud'}, {id: 'P', name: 'Privado'}, {id: 'S', name: 'SIS'}, {id: 'O', name:'Otro'}, {id: 'N', name: 'Sin Seguro'}, {id: 'S', name: 'No especifica'}]}
            setter={setInsurance}
            label="Seguro"
            lan={lan}
            error={insuranceError}
            setError={setInsuranceError}
            value={insurance}
            defaultValue={insurance && insurance}
            ref={insuranceRef}
          />
          {insurance === 'O' && 
          <Input 
            label="Nombre del seguro"
            placeholder="Nombre del Seguro ..."
            value={otherInsurance}
            onChange={e => {
              otherInsurance && setOtherInsuranceError('')
              setOtherInsurance(e.target.value)}}
            error={otherInsuranceError}
          />}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Selector 
            values={[{id: 'Padre', name: 'Padre'}, {id: 'Madre', name: 'Madre'}, {id: 'A', name: 'Apoderado'}]}
            setter={setLivesWith}
            label="Con quién vive"
            lan={lan}
            error={livesWithError}
            setError={setLivesWithError}
            value={livesWith}
            defaultValue={livesWith && livesWith}
            ref={livesWithRef}
          />
          {livesWith === 'A' &&
          <motion.div 
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
            className="w-full grid grid-cols-2">
            <Input 
              label="Nombre del apoderado"
              placeholder="Nombre ..."
              value={tutorName}
              onChange={e =>{
                tutorName && setTutorNameError('')
                setTutorName(e.target.value)}}
              error={tutorNameError}
            />
          </motion.div>}
        </div>
        <div className="my-8 w-full flex justify-end">
          <Button 
            label={student ? 'Guardar' : 'Siguiente'}
            onClick={handleSubmit}
            type="submit"
            loading={loading}
            minWidth
          />
        </div> 
        </motion.div>  
        }
        </AnimatePresence>
    </form>
    </motion.div>
  )
}

export default StudentForm