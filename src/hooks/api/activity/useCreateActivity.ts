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
            console.log([`activities ${lessonId}`]);
            
            if (lessonId) {
                queryClient.setQueryData<Activity[]>([`activities ${lessonId}`] , (oldData) => {
                    if (!oldData) return [res]
                    return [res, ...oldData]
                })
            } else {
                queryClient.setQueryData<Activity[]>([`activities ${quarter} ${assignatureId}`], (oldData) => {
                    if (!oldData) return [res]
                    return [res, ...oldData]
                })
            }
       
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateActivity