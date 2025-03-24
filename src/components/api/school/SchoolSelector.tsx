import useAuthStore from '../../../hooks/store/useAuthStore'
import useGetSchools from '../../../hooks/api/school/useGetSchools'
import Selector from '../../ui/Selector'
import { useEffect, useState } from 'react'
import useSchoolStore from '../../../hooks/store/useSchoolStore'

const SchoolSelector = () => {

    const access = useAuthStore(s => s.access) || ''
    const [selectedSchool, setSelectedSchool] = useState<string>()
    const setSchool = useSchoolStore(s => s.setSchool)
    const school = useSchoolStore(s => s.school)
    const {data: schools, isLoading, isError, error, isSuccess} = useGetSchools({ access })

    useEffect(() => {
        if (selectedSchool && schools) {
            const foundSchool = schools.find(school => school.id === parseInt(selectedSchool))
            console.log(selectedSchool)
            foundSchool && setSchool(foundSchool)
            console.log('School',school)
        }
    }, [selectedSchool])

    if (isLoading) return <div className='animate-pulse text-center'>Cargando...</div>
    if (isError) return <div className='text-center'>Error: {error?.message}</div>
    if (isSuccess) 

  return (
    <Selector 
        values={schools.map( school => ({ 'id': (school.id).toString(), 'name': school.name }))}
        setter={setSelectedSchool}
        lan='ES'
    />
  )
}

export default SchoolSelector