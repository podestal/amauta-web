import { UseMutationResult } from "@tanstack/react-query"
import { QuarterGrade } from "../../../../services/api/quarterGradeService"
import { CreateQuarterGradeData } from "../../../../hooks/api/quarterGrade/useUpdateQuarterGrade"

interface Props{
    getUpdateQuarterGrade: () => UseMutationResult<QuarterGrade, Error, CreateQuarterGradeData> | null
}

const UpdateQuarterGrade = ({ getUpdateQuarterGrade }: Props) => {
  return (
    <div>UpdateQuarterGrade</div>
  )
}

export default UpdateQuarterGrade