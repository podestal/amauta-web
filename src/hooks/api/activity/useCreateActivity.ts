import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getActivityService, { Activity, UpdateCreateActivity } from "../../../services/api/activityService"

export interface CreateActivityData {
    access: string
    activity: UpdateCreateActivity
}

interface Props {
    assignatureId: string
    quarter: string
    lessonId?: number
}

const useCreateActivity = ({ assignatureId, quarter, lessonId }: Props): UseMutationResult<Activity, Error, CreateActivityData> => {
    const activityService = getActivityService({ })
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateActivityData) => activityService.post(data.activity, data.access),
        onSuccess: res => {
            console.log('new activity',res);
            console.log([`key ${[`activities ${quarter} ${assignatureId}`]}`]);
            
            if (lessonId) {
                console.log('With lessonId', lessonId);
                queryClient.setQueryData<Activity[]>([`activities ${lessonId}`] , (oldData) => {
                    if (!oldData) return [res]
                    return [res, ...oldData]
                })
            } else {
                console.log('Without lessonId', assignatureId, quarter);
                queryClient.invalidateQueries({ queryKey: [`activities ${quarter} ${assignatureId}`] })
            }
       
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateActivity