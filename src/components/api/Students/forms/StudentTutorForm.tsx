import { useState } from "react"
import { Tutor } from "../../../../services/api/tutorService"
import { motion } from "framer-motion"
import Input from "../../../ui/Input"
import moment from "moment"
import Selector from "../../../ui/Selector"
import Button from "../../../ui/Button"
import Switch from "../../../ui/Switch"
import { CreateTutorData } from "../../../../hooks/api/tutor/useCreateTutor"
import { UseMutationResult } from "@tanstack/react-query"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useUpdateTutor from "../../../../hooks/api/tutor/useUpdateTutor"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"

interface Props {
    studentId: string
    tutor?: Tutor
    tutorType: string
    setPage: React.Dispatch<React.SetStateAction<number>>
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    createTutor?: UseMutationResult<Tutor, Error, CreateTutorData>
    // updateTutor?: UseMutationResult<Tutor, Error, CreateTutorData>
}

const StudentTutorForm = ({ studentId, tutor, tutorType, setPage, setOpen, createTutor }: Props) => {

    console.log('studentId', studentId);
    console.log('tutorType', tutorType);

    // TODOS
    // - Update Tutor
    // - Create tutor when open this particular form
    // - Loading state for create tutor
    const updateTutor = tutor && useUpdateTutor({ tutorId: (tutor.id).toString() })
    const [loading, setLoading] = useState(false)
    const { setMessage, setShow, setType } = useNotificationsStore()
    const [tutorInfo, setTutorInfo] = useState(true)
    const access = useAuthStore(s => s.access) || ''
    

    const [dni, setDni] = useState(tutor ? tutor.dni : '')
    const [dateOfBirth, setDateOfBirth] = useState(tutor ? moment(tutor.date_of_birth).format('YYYY-MM-DD') : '')
    const [state, setState] = useState(tutor ? tutor.state : '')
    const [county, setCounty] = useState(tutor ? tutor.county : '')
    const [city, setCity] = useState(tutor ? tutor.city : '')
    const [instructionGrade, setInstructionGrade] = useState(tutor ? tutor.instruction_grade : '')
    const [ocupation, setOcupation] = useState(tutor ? tutor.ocupation : '')
    const [employer, setEmployer] = useState(tutor ? tutor.employer : '')
    const [civilStatus, setCivilStatus] = useState(tutor ? tutor.civil_status : '')
    const [livesWithStudent, setLivesWithStudent] = useState(tutor ? `${tutor.lives_with_student ? 'Si' : 'No'}` : '')
    const [firstName, setFirstName] = useState(tutor ? tutor.first_name : '')
    const [fatherLastName, setFatherLastName] = useState(tutor ? tutor.last_name.split(' ')[0] : '')
    const [motherLastName, setMotherLastName] = useState(tutor ? tutor.last_name.split(' ')[1] : '')
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!firstName) {
            setFirstNameError('Este campo es requerido')
            return
        }
        if (!fatherLastName) {
            setFatherLastNameError('Este campo es requerido')
            return
        }
        if (!motherLastName) {
            setMotherLastNameError('Este campo es requerido')
            return
        }
        if (!dni) {
            setDniError('Este campo es requerido')
            return
        }
        if (!civilStatus) {
            setCivilStatusError('Este campo es requerido')
            return
        }
        if (!dateOfBirth) {
            setDateOfBirthError('Este campo es requerido')
            return
        }
        if (!state) {
            setStateError('Este campo es requerido')
            return
        }
        if (!county) {
            setCountyError('Este campo es requerido')
            return
        }
        if (!city) {
            setCityError('Este campo es requerido')
            return
        }
        if (!instructionGrade) {
            setInstructionGradeError('Este campo es requerido')
            return
        }
        if (!ocupation) {
            setOcupationError('Este campo es requerido')
            return
        }
        if (!employer) {
            setEmployerError('Este campo es requerido')
            return
        }
        if (!phoneNumber) {
            setPhoneNumberError('Este campo es requerido')
            return
        }
        if (!address) {
            setAddressError('Este campo es requerido')
            return
        }
        if (tutorType === 'O' && !tutorRelationship) {
            setTutorRelationshipError('Este campo es requerido')
            return
        }
        if (!email) {
            setEmailError('Este campo es requerido')
            return
        }

        setLoading(true)

        createTutor && createTutor.mutate({
            tutor: {
                students: [studentId],
                dni,
                date_of_birth: dateOfBirth,
                state,
                county,
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
                tutor_type: tutorType
            },
            access
        })

        updateTutor && updateTutor.mutate({
            tutor: {
                students: [studentId],
                dni,
                date_of_birth: dateOfBirth,
                state,
                county,
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
                tutor_type: tutorType
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
                />
                <Selector 
                    values={[{  id: 'S', name: 'Soltero'}, {id: 'M', name: 'Casado'}, {id: 'D', name: 'Divorciado'}, {id: 'W', name: 'Viudo'}, {id: 'O', name: 'Otro'}]}
                    label="Estado Civil"
                    setter={setCivilStatus}
                    defaultValue={civilStatus && civilStatus}
                    lan="ES"
                    error={civilStatusError}
                    setError={setCivilStatusError}
                />
                
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <Input 
                    placeholder="YYYY-MM-DD"
                    value={dateOfBirth}
                    onChange={(e) => {
                        dateOfBirth && setDateOfBirthError('')
                        setDateOfBirth(e.target.value)}}
                    label="Fecha de Nacimiento"
                    error={dateOfBirthError}
                />
                <Input 
                    type="text"
                    placeholder="Estado ..."
                    value={state}
                    onChange={(e) => {
                        state && setStateError('')
                        setState(e.target.value)}}
                    label="Estado"
                    error={stateError}
                />
                <Input 
                    type="text"
                    placeholder="Provincia ..."
                    value={county}
                    onChange={(e) => {
                        county && setCountyError('')
                        setCounty(e.target.value)}}
                    label="Provincia"
                    error={countyError}
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
                <Input 
                    type="text"
                    placeholder="¿Vive con el alumno? ..."
                    value={livesWithStudent ? 'Si' : 'No'}
                    onChange={(e) => {
                        livesWithStudent && setLivesWithStudentError('')
                        setLivesWithStudent(e.target.value)}}
                    label="¿Vive con el alumno?"
                    error={livesWithStudentError}
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
                    placeholder="Email ..."
                    value={email}
                    onChange={(e) => {
                        email && setEmailError('')
                        setEmail(e.target.value)}}
                    label="Email"
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