import useSchoolStore from "../hooks/store/useSchoolStore"


const SchoolPage = () => {

    const school = useSchoolStore(s => s.school)

  return (
    <div>{school.name}</div>
  )
}

export default SchoolPage