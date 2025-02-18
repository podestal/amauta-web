import { motion } from 'framer-motion'
import Button from '../../../ui/Button'
import Input from '../../../ui/Input'
import { useState } from 'react'
import Selector from '../../../ui/Selector'
import useCreateBirthInfo, { CreateBirthInfoData } from '../../../../hooks/api/student/studentInfo/useCreateBirthInfo'
import useAuthStore from '../../../../hooks/store/useAuthStore'
import moment from 'moment'
import { BirthInfo } from '../../../../services/api/birthInfo'
import { UseMutationResult } from '@tanstack/react-query'
import useUpdateBirthInfo from '../../../../hooks/api/student/studentInfo/useUpdateBirthInfo'
import useNotificationsStore from '../../../../hooks/store/useNotificationsStore'
import { departments, provinces } from '../../../../data/mockdataForGrades'

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>
    studentId: string
    nextPrev?: boolean
    birthInfo?: BirthInfo
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    createBirthInfo?: UseMutationResult<BirthInfo, Error, CreateBirthInfoData>
    classroomId: string
}

const StudentBirthForm = ({ 
    setPage, 
    studentId, 
    nextPrev=true, 
    birthInfo, 
    setOpen,
    createBirthInfo,
    classroomId,
}: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { setMessage, setShow, setType } = useNotificationsStore()
    const [loading, setLoading] = useState(false)
    const updateBirthInfo = birthInfo && useUpdateBirthInfo({ birthInfoId: birthInfo.id, classroomId })
    const createBirthInfoInternal = !createBirthInfo && !updateBirthInfo && useCreateBirthInfo({ classroomId })

    const [selectedDepartment, setSelectedDepartment] = useState(birthInfo ? birthInfo.state : '21')
    const [selectedProvince, setSelectedProvince] = useState(birthInfo ? birthInfo.county : '172')
    const [city, setCity] = useState(birthInfo ? birthInfo.city : 'Juliaca')
    const [naturalBirth, setNaturalBirth] = useState(birthInfo ? `${birthInfo.natural_birth ? '1' : '2'}` : '1')
    const [dateOfBirth, setDateOfBirth] = useState(birthInfo ? moment(birthInfo.date_of_birth).format('DD/MM/YYYY') : '')

    // Error handling

    const [stateError, setStateError] = useState('')
    const [countyError, setCountyError] = useState('')
    const [cityError, setCityError] = useState('')
    const [dateOfBirthError, setDateOfBirthError] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!selectedDepartment) {
            setStateError('Este campo es requerido')
            setType('error')
            setShow(true)
            setMessage('El departamento es requerido')
            return
        }

        if (!selectedProvince) {
            setCountyError('Este campo es requerido')
            setType('error')
            setShow(true)
            setMessage('La provincia es requerida')
            return
        }

        if (!city) {
            setCityError('Este campo es requerido')
            setType('error')
            setShow(true)
            setMessage('La ciudad es requerida')
            return
        }

        if (!dateOfBirth) {
            setDateOfBirthError('Este campo es requerido')
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

        const [day, month, year] = dateOfBirth.split('/')

        setLoading(true)

        createBirthInfo && createBirthInfo.mutate({
            birthInfo: {
                state: selectedDepartment,
                county: selectedProvince,
                city,
                natural_birth: naturalBirth === '1',
                date_of_birth: moment(`${month}/${day}/${year}`).format('YYYY-MM-DD'),
                student: studentId
            },
            access
        }, {
            onSuccess: () => {
                setPage(prev => prev + 1)
            },
            onError: () => {
                setType('error')
                setShow(true)
                setMessage('Ocurrió un error al guardar la información de nacimiento')
            },
            onSettled: () => setLoading(false)
        })

        updateBirthInfo && updateBirthInfo.mutate({
            birthInfo: {
                state: selectedDepartment,
                county: selectedProvince,
                city,
                natural_birth: naturalBirth === '1',
                date_of_birth: moment(`${month}/${day}/${year}`).format('YYYY-MM-DD'),
                student: studentId
            },
            access
        }, {
            onSuccess: () => {
                setOpen && setOpen(false)
                setType('success')
                setShow(true)
                setMessage('Información de salud actualizada exitosamente!')
            },
            onError: () => {
                setType('error')
                setShow(true)
                setMessage('Ocurrió un error al guardar la información de nacimiento')
            },
            onSettled: () => setLoading(false)
        })

        createBirthInfoInternal && createBirthInfoInternal.mutate({
            birthInfo: {
                state: selectedDepartment,
                county: selectedProvince,
                city,
                natural_birth: naturalBirth === '1',
                date_of_birth: moment(`${month}/${day}/${year}`).format('YYYY-MM-DD'),
                student: studentId
            },
            access
        }, {
            onSuccess: () => {
                setOpen && setOpen(false)
                setType('success')
                setShow(true)
                setMessage('Información de salud guardada exitosamente!')
            },
            onError: () => {
                setType('error')
                setShow(true)
                setMessage('Ocurrió un error al guardar la información de nacimiento')
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
            <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 mb-12">
                <h2 className="text-2xl text-left font-semibold mb-6">Información de Nacimiento</h2>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
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
            <div className='grid grid-cols-3 gap-6'>
                <Input 
                    placeholder='DD/MM/YYYY'
                    label='Fecha de Nacimiento'
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                    error={dateOfBirthError}
                />
                <Selector 
                    values={[{id: '1', name: 'Si'}, {id: '2', name: 'No'}]}
                    label='Parto Natural'
                    setter={setNaturalBirth}
                    defaultValue={naturalBirth}
                />
            </div>
            {nextPrev 
            ? 
            <div className="flex justify-end items-center gap-4 mt-12">
                {/* <Button 
                    label="Anterior"
                    onClick={() => setPage(prev => prev - 1)}
                    type="button"
                /> */}
                <Button 
                    label="Siguiente"
                    type="submit"
                    loading={loading}
                    minWidth
                />
            </div>
            :
            <div className='w-full justify-end flex mt-12'>
                <Button 
                    label={birthInfo ? 'Guardar' : "Enviar"}
                    type="submit"
                    loading={loading}
                    minWidth
                />
            </div>
            }
        </form>
    </motion.div>
  )
}

export default StudentBirthForm