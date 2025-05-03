import SchoolForm from "../components/api/school/SchoolForm"
import useUpdateSchool from "../hooks/api/school/useUpdateSchool"
import useSchoolStore from "../hooks/store/useSchoolStore"


const SchoolPage = () => {

    const school = useSchoolStore(s => s.school)
    const updateSchool = useUpdateSchool({ schoolId: school.id })


  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden pt-10">
      <SchoolForm
        school={school}
        updateSchool={updateSchool}
      />
    </div>

  )
}

export default SchoolPage