import GradesTable from "../components/api/reports/grades/gradesTable/GradesTable";

const GradesSummaryPage = () => {

  // const removeAccents = (str: string) => {
  //   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  // }

  return (
    <div className="w-full mx-auto px-6 py-12">
        <GradesTable />
    </div>
  );
};

export default GradesSummaryPage;
