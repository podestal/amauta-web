import { motion } from 'framer-motion'
import Button from '../../../ui/Button'
import Input from '../../../ui/Input'
import { useState } from 'react'
import Selector from '../../../ui/Selector'

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const StudentBirthForm = ({ setPage }: Props) => {

    const [state, setState] = useState('')
    const [county, setCounty] = useState('')
    const [city, setCity] = useState('')
    const [naturalBirth, setNaturalBirth] = useState('1')
    const [dateOfBirth, setDateOfBirth] = useState('')

  return (
    <motion.div
        initial={{opacity: 0, x: 50}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5}}
    >
        <form>
            <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 mb-12">
                <h2 className="text-2xl text-left font-semibold mb-6">Información de Nacimiento</h2>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <Input 
                    type="text"
                    placeholder="Estado ..."
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    label="Estado"
                />
                <Input 
                    type="text"
                    placeholder="Provincia ..."
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    label="Provincia"
                />
                <Input 
                    type="text"
                    placeholder="Ciudad ..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    label="Ciudad"
                />
            </div>
            <div className='grid grid-cols-3 gap-6'>
                <Input 
                    placeholder='Fecha de Nacimiento ...'
                    label='Fecha de Nacimiento'
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                />
                <Selector 
                    values={[{id: '1', name: 'Si'}, {id: '2', name: 'No'}]}
                    label='Parto Natural'
                    setter={setNaturalBirth}
                    defaultValue={naturalBirth}
                />
            </div>
            <div className="flex justify-between items-center gap-4 mt-12">
                <Button 
                    label="Anterior"
                    onClick={() => setPage(prev => prev - 1)}
                    type="button"
                />
                <Button 
                    label="Siguiente"
                    onClick={() => setPage(prev => prev + 1)}
                    type="button"
                />
            </div>
        </form>
    </motion.div>
  )
}

export default StudentBirthForm