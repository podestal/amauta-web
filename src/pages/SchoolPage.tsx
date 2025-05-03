import SchoolForm from "../components/api/school/SchoolForm"
import useSchoolStore from "../hooks/store/useSchoolStore"


const SchoolPage = () => {

    const school = useSchoolStore(s => s.school)

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden pt-10">
      <SchoolForm
        school={school}
        onSave={(updated) => {
          console.log("School updated:", updated);
          // Send to API here
        }}
      />
    </div>

  )
}

export default SchoolPage