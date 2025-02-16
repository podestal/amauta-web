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
import { departments, provinces, getDepartment, getProvince } from '../../../../data/mockdataForGrades'

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>
    studentId: string
    nextPrev?: boolean
    birthInfo?: BirthInfo
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    createBirthInfo?: UseMutationResult<BirthInfo, Error, CreateBirthInfoData>
}

const StudentBirthForm = ({ 
    setPage, 
    studentId, 
    nextPrev=true, 
    birthInfo, 
    setOpen,
    createBirthInfo,
}: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { setMessage, setShow, setType } = useNotificationsStore()
    const [loading, setLoading] = useState(false)
    const updateBirthInfo = birthInfo && useUpdateBirthInfo({ birthInfoId: birthInfo.id })
    const createBirthInfoInternal = !createBirthInfo && !updateBirthInfo && useCreateBirthInfo()

    const [selectedDepartment, setSelectedDepartment] = useState(birthInfo ? birthInfo.state : 'Puno')

    const [state, setState] = useState(birthInfo ? birthInfo.state : '')
    const [county, setCounty] = useState(birthInfo ? birthInfo.county : '')
    const [city, setCity] = useState(birthInfo ? birthInfo.city : '')
    const [naturalBirth, setNaturalBirth] = useState(birthInfo ? `${birthInfo.natural_birth ? '1' : '2'}` : '1')
    const [dateOfBirth, setDateOfBirth] = useState(birthInfo ? moment(birthInfo.date_of_birth).format('YYYY-MM-DD') : '')

    // Error handling

    const [stateError, setStateError] = useState('')
    const [countyError, setCountyError] = useState('')
    const [cityError, setCityError] = useState('')
    const [dateOfBirthError, setDateOfBirthError] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

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

        if (!dateOfBirth) {
            setDateOfBirthError('Este campo es requerido')
            return
        }

        setLoading(true)

        createBirthInfo && createBirthInfo.mutate({
            birthInfo: {
                state,
                county,
                city,
                natural_birth: naturalBirth === '1',
                date_of_birth: moment(dateOfBirth).format('YYYY-MM-DD'),
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
                state,
                county,
                city,
                natural_birth: naturalBirth === '1',
                date_of_birth: moment(dateOfBirth).format('YYYY-MM-DD'),
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
                state,
                county,
                city,
                natural_birth: naturalBirth === '1',
                date_of_birth: moment(dateOfBirth).format('YYYY-MM-DD'),
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
                {/* <Input 
                    type="text"
                    placeholder="Departamento ..."
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    label="Departamento"
                    error={stateError}
                />
                <Input 
                    type="text"
                    placeholder="Provincia ..."
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    label="Provincia"
                    error={countyError}
                /> */}
                <Selector 
                    values={departments.map(d => ({id: (d.id).toString(), name: d.name}))}
                    label='Departamento'
                    setter={setSelectedDepartment}
                    defaultValue={selectedDepartment}
                />
                <Selector 
                    values={provinces.map(p => ({id: (p.id).toString(), name: p.name}))}
                    label='Provincia'
                    setter={setCounty}
                    defaultValue={county}
                />
                <Input 
                    type="text"
                    placeholder="Ciudad ..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    label="Ciudad"
                    error={cityError}
                />
            </div>
            <div className='grid grid-cols-3 gap-6'>
                <Input 
                    placeholder='Fecha de Nacimiento ...'
                    label='AAAA-MM-DD'
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
            <div className="flex justify-between items-center gap-4 mt-12">
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