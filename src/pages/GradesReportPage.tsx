import ClassroomsReportCard from "../components/api/reports/gradeCards/ClassroomsReportCard"
// import GradeReportCard from "../components/api/reports/gradeCards/GradeReportCard"

const GradesReportPage = () => {
    return (
        <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto px-6 py-12">
            <ClassroomsReportCard />
        </div>
    )
}

export default GradesReportPage