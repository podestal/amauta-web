import useRemoveAssignatureGrade from "../../../../hooks/api/assignatureGrade/useRemoveAssignatureGrade"
import useRemoveQuarterGrade from "../../../../hooks/api/quarterGrade/useRemoveQuearterGrade"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"

interface Props {
    isLoading: boolean
    quarterGradeId: string
    updateCacheKey: string[]
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    byAssignature?: boolean
    assignatureId: number
}

const RemoveQuarterGrade = ({ isLoading, quarterGradeId, updateCacheKey, setIsLoading, byAssignature=false, assignatureId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const removeQuarterGrade = useRemoveQuarterGrade({ quarterGradeId, updateCacheKey })
    const removeAssignatureGrade = useRemoveAssignatureGrade({ queryKey: updateCacheKey, assignatureGradeId: assignatureId })
    const { setShow, setMessage, setType } = useNotificationsStore()

    const handleRemove = () => {
        setIsLoading(true)
        if (byAssignature) {
            removeAssignatureGrade.mutate({
                access,
            }, {
                onSuccess: () => {
                    setShow(true)
                    setType('success')
                    setMessage('Nota eliminada exitosamente')
                },
                onError: () => {
                    setShow(true)
                    setType('error')
                    setMessage('Error al eliminar la nota')
                },
                onSettled: () => {
                    setIsLoading(false)
                }
            })
        } else {
            removeQuarterGrade.mutate(
                { access },
            {
                onSuccess: () => {
                    setShow(true)
                    setType('success')
                    setMessage('Nota eliminada exitosamente')
                },
                onError: () => {
                    setShow(true)
                    setType('error')
                    setMessage('Error al eliminar la nota')
                },
                onSettled: () => {
                    setIsLoading(false)
                }
            })
        }

    }

  return (
    <button
        className={`${isLoading && 'hidden'} absolute bottom-1 right-1 flex items-center gap-1 text-xs  text-gray-600 bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700 dark:text-gray-200 rounded-md shadow-md transition`}
        onClick={handleRemove}
    >
        Calcular
    </button>
  )
}

export default RemoveQuarterGrade