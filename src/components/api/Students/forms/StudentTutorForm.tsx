import { useRef, useState } from "react"
import { Tutor } from "../../../../services/api/tutorService"
import { motion } from "framer-motion"
import Input from "../../../ui/Input"
import moment from "moment"
import Selector from "../../../ui/Selector"
import Button from "../../../ui/Button"
import Switch from "../../../ui/Switch"
import useCreateTutor, { CreateTutorData } from "../../../../hooks/api/tutor/useCreateTutor"
import { UseMutationResult } from "@tanstack/react-query"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useUpdateTutor from "../../../../hooks/api/tutor/useUpdateTutor"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"
import { departments, provinces } from "../../../../data/mockdataForGrades"
import useSchoolStore from "../../../../hooks/store/useSchoolStore"

interface Props {
    studentId: string
    tutor?: Tutor
    tutorType: string
    setPage: React.Dispatch<React.SetStateAction<number>>
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    createTutor?: UseMutationResult<Tutor, Error, CreateTutorData>
    classroomId: string
    // updateTutor?: UseMutationResult<Tutor, Error, CreateTutorData>
    studentDni?: string
    studentName?: string
}

const StudentTutorForm = ({ 
    studentId, 
    tutor, 
    tutorType, 
    setPage, 
    setOpen, 
    createTutor,
    classroomId, 
    studentDni, 
    studentName, }: Props) => {

    const school = useSchoolStore(s => s.school)
    const updateTutor = tutor && useUpdateTutor({ tutorId: (tutor.id).toString(), classroomId, studentDni, studentName })
    const createTutorInternal = !createTutor && !updateTutor && useCreateTutor({ classroomId, studentDni, studentName })
    const [loading, setLoading] = useState(false)
    const { setMessage, setShow, setType } = useNotificationsStore()
    const [tutorInfo, setTutorInfo] = useState(true)
    const access = useAuthStore(s => s.access) || ''
    

    const [dni, setDni] = useState(tutor ? tutor.dni : '')
    const [dateOfBirth, setDateOfBirth] = useState(tutor ? moment(tutor.date_of_birth).format('DD/MM/YYYY') : '')
    const [selectedDepartment, setSelectedDepartment] = useState(tutor ? tutor.state : '21')
    const [selectedProvince, setSelectedProvince] = useState(tutor ? tutor.county : '172')
    const [city, setCity] = useState(tutor ? tutor.city : 'Juliaca')
    const [instructionGrade, setInstructionGrade] = useState(tutor ? tutor.instruction_grade : '')
    const [ocupation, setOcupation] = useState(tutor ? tutor.ocupation : '')
    const [employer, setEmployer] = useState(tutor ? tutor.employer : '')
    const [civilStatus, setCivilStatus] = useState(tutor ? tutor.civil_status : '')
    const [livesWithStudent, setLivesWithStudent] = useState(tutor ? `${tutor.lives_with_student ? 'Si' : 'No'}` : 'Si')
    const [firstName, setFirstName] = useState(tutor ? tutor.first_name : '')
    const [fatherLastName, setFatherLastName] = useState(tutor ? tutor?.last_name?.split(' ')[0] : '')
    const [motherLastName, setMotherLastName] = useState(tutor ? tutor?.last_name?.split(' ')[1] : '')
    const [phoneNumber, setPhoneNumber] = useState(tutor ? tutor.phone_number : '')
    const [address, setAddress] = useState(tutor ? tutor.address : '')
    const [email, setEmail] = useState(tutor ? tutor.email : '')
    const [tutorRelationship, setTutorRelationship] = useState(tutor ? tutor.tutor_relationship : '')

    // Error handling
    const [dniError, setDniError] = useState('')
    const [dateOfBirthError, setDateOfBirthError] = useState('')
    const [stateError, setStateError] = useState('')
    const [countyError, setCountyError] = useState('')
    const [cityError, setCityError] = useState('')
    const [instructionGradeError, setInstructionGradeError] = useState('')
    const [ocupationError, setOcupationError] = useState('')
    const [employerError, setEmployerError] = useState('')
    const [civilStatusError, setCivilStatusError] = useState('')
    const [livesWithStudentError, setLivesWithStudentError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [fatherLastNameError, setFatherLastNameError] = useState('')
    const [motherLastNameError, setMotherLastNameError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [addressError, setAddressError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [tutorRelationshipError, setTutorRelationshipError] = useState('')

    // REFS
    const dniRef = useRef<HTMLInputElement>(null);
    const civilStatusRef = useRef<HTMLSelectElement>(null);
    const namesRef = useRef<HTMLInputElement>(null);
    const fatherLastNameRef = useRef<HTMLInputElement>(null);
    const motherLastNameRef = useRef<HTMLInputElement>(null);

    const scrollToField = (ref: React.RefObject<HTMLElement>) => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
          ref.current.focus();
        }
      };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let firstErrorField: React.RefObject<HTMLElement> | null = null

        if (!firstName) {
            setFirstNameError('El nombre es requerido')
            setType('error')
            setShow(true)
            setMessage('El nombre es requerido')
            if (!firstErrorField) firstErrorField = namesRef
            scrollToField(firstErrorField)
            return
        }
        if (!fatherLastName) {
            setFatherLastNameError('El apellido paterno es requerido')
            setType('error')
            setShow(true)
            setMessage('El apellido paterno es requerido')
            if (!firstErrorField) firstErrorField = fatherLastNameRef
            scrollToField(firstErrorField)
            return
        }
        if (!motherLastName) {
            setMotherLastNameError('El apellido materno es requerido')
            setType('error')
            setShow(true)
            setMessage('El apellido materno es requerido')
            if (!firstErrorField) firstErrorField = motherLastNameRef
            scrollToField(firstErrorField)
            return
        }
        if (!dni) {
            setDniError('El DNI es requerido')
            setType('error')
            setShow(true)
            setMessage('El DNI es requerido')
            if (!firstErrorField) firstErrorField = dniRef;
            scrollToField(firstErrorField);
            return
        }
        if (!civilStatus) {
            setCivilStatusError('El estado civil es requerido')
            setType('error')
            setShow(true)
            setMessage('El estado civil es requerido')
            if (!firstErrorField) firstErrorField = civilStatusRef
            scrollToField(firstErrorField);
            return
        }
        if (!dateOfBirth) {
            setDateOfBirthError('La fecha de nacimiento es requerida')
            setType('error')
            setShow(true)
            setMessage('La fecha de nacimiento es requerida')
            return
        }

        const dateRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!dateRegex.test(dateOfBirth)) {
            setDateOfBirthError("Formato incorrecto (DD/MM/YYYY)");
            setType("error");
            setShow(true);
            setMessage("El formato de fecha debe ser DD/MM/YYYY (ejemplo: 04/09/2016)");
            return;
        }

        const [day, month, year] = dateOfBirth?.split('/')

        if (!selectedDepartment) {
            setStateError('Este campo es requerido')
            return
        }
        if (!selectedProvince) {
            setCountyError('Este campo es requerido')
            return
        }
        if (!city) {
            setCityError('Este campo es requerido')
            setType('error')
            setShow(true)
            setMessage('La ciudad es requerida')
            return
        }
        // if (!instructionGrade) {
        //     setInstructionGradeError('Este campo es requerido')
        //     setType('error')
        //     setShow(true)
        //     setMessage('El grado de instrucción es requerido')
        //     return
        // }
        // if (!ocupation) {
        //     setOcupationError('Este campo es requerido')
        //     setType('error')
        //     setShow(true)
        //     setMessage('La ocupación es requerida')
        //     return
        // }
        // if (!employer) {
        //     setEmployerError('Este campo es requerido')
        //     setType('error')
        //     setShow(true)
        //     setMessage('El empleador es requerido')
        //     return
        // }

        // if (!email) {
        //     setEmailError('Este campo es requerido')
        //     setType('error')
        //     setShow(true)
        //     setMessage('El correo electrónico es requerido')
        //     return
        // }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (email && !emailRegex.test(email)) {
            setEmailError('El email no es válido');
            setType('error');
            setShow(true);
            setMessage('Por favor, ingresa un correo electrónico válido');
            return;
        }

        if (!phoneNumber) {
            setPhoneNumberError('Este campo es requerido')
            setType('error')
            setShow(true)
            setMessage('El número de teléfono es requerido')
            return
        }
        if (!address) {
            setAddressError('Este campo es requerido')
            setType('error')
            setShow(true)
            setMessage('La dirección es requerida')
            return
        }
        if (tutorType === 'O' && !tutorRelationship) {
            setTutorRelationshipError('Este campo es requerido')
            setType('error')
            setShow(true)
            setMessage('El parentesco es requerido')
            return
        }

        setLoading(true)

        createTutor && createTutor.mutate({
            tutor: {
                students: [studentId],
                dni,
                date_of_birth: moment(`${month}/${day}/${year}`).format('YYYY-MM-DD'),
                state: selectedDepartment,
                county: selectedProvince,
                city,
                instruction_grade: instructionGrade,
                ocupation,
                employer,
                civil_status: civilStatus,
                lives_with_student: livesWithStudent.toLocaleLowerCase() === 'si' ? true : false,
                first_name: firstName,
                last_name: `${fatherLastName} ${motherLastName}`,
                phone_number: phoneNumber,
                address,
                email,
                tutor_relationship: tutorRelationship,
                can_access: true, 
                tutor_type: tutorType,
                school: school.id,
                clases_details: []
            },
            access
        }, {
            onSuccess: () => {
                setPage(prev => prev + 1)
            },
            onError: () => {
                setType('error')
                setShow(true)
                setMessage('Hubo un error al guardar la información del tutor')
            },
            onSettled: () => setLoading(false)
        })

        updateTutor && updateTutor.mutate({
            tutor: {
                students: [studentId],
                dni,
                date_of_birth: moment(`${month}/${day}/${year}`).format('YYYY-MM-DD'),
                state: selectedDepartment,
                county: selectedProvince,
                city,
                instruction_grade: instructionGrade,
                ocupation,
                employer,
                civil_status: civilStatus,
                lives_with_student: livesWithStudent.toLocaleLowerCase() === 'si' ? true : false,
                first_name: firstName,
                last_name: `${fatherLastName} ${motherLastName}`,
                phone_number: phoneNumber,
                address,
                email,
                tutor_relationship: tutorRelationship,
                can_access: true, 
                tutor_type: tutorType,
                school: school.id,
                clases_details: []
            },
            access
        }, {
            onSuccess: () => {
                setOpen && setOpen(false)
                setType('success')
                setShow(true)
                setMessage('Información del tutor actualizada exitosamente!')
            },
            onError: () => {
                setType('error')
                setShow(true)
                setMessage('Hubo un error al actualizar la información del tutor')
            },
            onSettled: () => setLoading(false)
        })

        createTutorInternal && createTutorInternal.mutate({
            tutor: {
                students: [studentId],
                dni,
                date_of_birth: moment(`${month}/${day}/${year}`).format('YYYY-MM-DD'),
                state: selectedDepartment,
                county: selectedDepartment,
                city,
                instruction_grade: instructionGrade,
                ocupation,
                employer,
                civil_status: civilStatus,
                lives_with_student: livesWithStudent.toLocaleLowerCase() === 'si' ? true : false,
                first_name: firstName,
                last_name: `${fatherLastName} ${motherLastName}`,
                phone_number: phoneNumber,
                address,
                email,
                tutor_relationship: tutorRelationship,
                can_access: true, 
                tutor_type: tutorType,
                school: school.id,
                clases_details: []
            },
            access
        }, {
            onSuccess: () => {
                setOpen && setOpen(false)
                setType('success')
                setShow(true)
                setMessage('Información del tutor guardada exitosamente!')
            },
            onError: () => {
                setType('error')
                setShow(true)
                setMessage('Hubo un error al guardar la información del tutor')
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
        >
            <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 mb-12 flex justify-between items-center">
                <h2 className="text-2xl text-left font-semibold mb-6">
                    {tutorType === 'F' && 'Información del Padre'}
                    {tutorType === 'M' && 'Información de la Madre'}
                    {tutorType === 'O' && 'Información del Tutor'}
                </h2>
                <div className="flex justify-between items-center gap-4">
                    <p>
                        {tutorType === 'F' && 'Existe Información del Padre?'}
                        {tutorType === 'M' && 'Existe Información de la Madre?'}
                        {tutorType === 'O' && 'Se necesita agregar apoderado?'}
                    </p>
                    <Switch 
                        value={tutorInfo}
                        setter={setTutorInfo}
                    />
                </div>
            </div>
            {tutorInfo && <>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <Input 
                    type="text"
                    placeholder="Nombres ..."
                    value={firstName}
                    onChange={(e) => {
                        firstName && setFirstNameError('')
                        setFirstName(e.target.value)}}
                    label="Nombres"
                    error={firstNameError}
                    ref={namesRef}
                />
                <Input 
                    type="text"
                    placeholder="Apellido Paterno ..."
                    value={fatherLastName}
                    onChange={(e) => {
                        fatherLastName && setFatherLastNameError('')
                        setFatherLastName(e.target.value)}}
                    label="Apellido Paterno"
                    error={fatherLastNameError}
                    ref={fatherLastNameRef}
                />
                <Input 
                    type="text"
                    placeholder="Apellido Materno ..."
                    value={motherLastName}
                    onChange={(e) => {
                        motherLastName && setMotherLastNameError('')
                        setMotherLastName(e.target.value)}}
                    label="Apellido Materno"
                    error={motherLastNameError}
                    ref={motherLastNameRef}
                />
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <Input 
                    type="text"
                    placeholder="DNI ..."
                    value={dni}
                    onChange={(e) => {
                        dni && setDniError('')
                        setDni(e.target.value)}}
                    label="DNI"
                    error={dniError}
                    ref={dniRef}
                />
                <Selector 
                    values={[{  id: 'S', name: 'Soltero'}, {id: 'M', name: 'Casado'}, {id: 'D', name: 'Divorciado'}, {id: 'W', name: 'Viudo'}, {id: 'O', name: 'Otro'}]}
                    label="Estado Civil"
                    setter={setCivilStatus}
                    defaultValue={civilStatus && civilStatus}
                    lan="ES"
                    error={civilStatusError}
                    setError={setCivilStatusError}
                    ref={civilStatusRef}
                />
                
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <Input 
                    placeholder="DD/MM/YYYY"
                    value={dateOfBirth}
                    onChange={(e) => {
                        dateOfBirth && setDateOfBirthError('')
                        setDateOfBirth(e.target.value)}}
                    label="Fecha de Nacimiento"
                    error={dateOfBirthError}
                />
                <Selector 
                    values={departments.map(d => ({id: (d.id).toString(), name: d.name}))}
                    label='Departamento'
                    setter={setSelectedDepartment}
                    defaultValue={selectedDepartment}
                    error={stateError}
                    setError={setStateError}
                />
                <Selector 
                    values={provinces
                        .filter(p => (p.department).toString() === selectedDepartment)
                        .map(p => ({id: (p.id).toString(), name: p.name}))}
                    label='Provincia'
                    setter={setSelectedProvince}
                    defaultValue={selectedProvince}
                    error={countyError}
                    setError={setCountyError}
                />
                <Input 
                    type="text"
                    placeholder="Ciudad ..."
                    value={city}
                    onChange={(e) => {
                        city && setCityError('')
                        setCity(e.target.value)}}
                    label="Ciudad"
                    error={cityError}
                />
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <Input 
                    type="text"
                    placeholder="Grado de Instrucción ..."
                    value={instructionGrade}
                    onChange={(e) => {
                        instructionGrade && setInstructionGradeError('')
                        setInstructionGrade(e.target.value)}}
                    label="Grado de Instrucción"
                    error={instructionGradeError}
                />
                <Input 
                    type="text"
                    placeholder="Ocupación ..."
                    value={ocupation}
                    onChange={(e) => {
                        ocupation && setOcupationError('')
                        setOcupation(e.target.value)}}
                    label="Ocupación"
                    error={ocupationError}
                />
                <Input 
                    type="text"
                    placeholder="Empleador ..."
                    value={employer}
                    onChange={(e) => {
                        employer && setEmployerError('')
                        setEmployer(e.target.value)}}
                    label="Empleador"
                    error={employerError}
                />
                
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
                {/* <Input 
                    type="text"
                    placeholder="¿Vive con el alumno? ..."
                    value={livesWithStudent ? 'Si' : 'No'}
                    onChange={(e) => {
                        livesWithStudent && setLivesWithStudentError('')
                        setLivesWithStudent(e.target.value)}}
                    label="¿Vive con el alumno?"
                    error={livesWithStudentError}
                /> */}
                <Selector 
                    values={[{id: '1', name: 'Si'}, {id: '2', name: 'No'}]}
                    label="¿Vive con el alumno?"
                    setter={setLivesWithStudent}
                    defaultValue={livesWithStudent}
                    lan="ES"
                    error={livesWithStudentError}
                    setError={setLivesWithStudentError}
                />
                {tutorType === 'O' &&
                <Input 
                    type="text"
                    placeholder="Parentesco ..."
                    value={tutorRelationship}
                    onChange={(e) => {
                        tutorRelationship && setTutorRelationshipError('')
                        setTutorRelationship(e.target.value)}}
                    label="Parentesco"
                    error={tutorRelationshipError}
                />}
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <Input 
                    type="text"
                    placeholder="Correo Electrónico ..."
                    value={email}
                    onChange={(e) => {
                        email && setEmailError('')
                        setEmail(e.target.value)}}
                    label="Correo Electrónico"
                    error={emailError}
                />
                <Input 
                    type="text"
                    placeholder="Teléfono ..."
                    value={phoneNumber}
                    onChange={(e) => {
                        phoneNumber && setPhoneNumberError('')
                        setPhoneNumber(e.target.value)}}
                    label="Teléfono"
                    error={phoneNumberError}
                />
                <Input 
                    type="text"
                    placeholder="Dirección ..."
                    value={address}
                    onChange={(e) => {
                        address && setAddressError('')
                        setAddress(e.target.value)}}
                    label="Dirección"
                    error={addressError}
                />
            </div>
            </>}
            <div className="w-full flex justify-end items-center gap-4 mt-12">
                {tutor 
                ? 
                <Button 
                    label="Guardar"
                    type="submit"
                    loading={loading}
                    minWidth
                /> 
                : 
                <>
                {tutorInfo 
                ? 
                <Button 
                    label={tutorType === 'O' ? 'Terminar' : "Siguiente"}
                    type="submit"
                    loading={loading}
                    minWidth

                /> 
                : 
                <Button 
                    label={tutorType === 'O' ? 'Terminar' : "Siguiente"}
                    type="button"
                    loading={loading}
                    onClick={() => {
                        setPage(prev => prev + 1)
                        setOpen && setOpen(false)
                    }}
                />
                }
                </>}
            </div>
        </form>
    </motion.div>
  )
}

export default StudentTutorForm