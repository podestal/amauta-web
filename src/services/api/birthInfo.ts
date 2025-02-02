import APIClient from "./apiClient"

// date_of_birth = models.DateField()
// student = models.OneToOneField(Student, on_delete=models.CASCADE, related_name='birth_info')
// state = models.CharField(max_length=255)
// county = models.CharField(max_length=255)
// city = models.CharField(max_length=255)
// natural_birth = models.BooleanField(default=True)

export interface BirthInfo {
    id: string
    date_of_birth: string
    state: string
    county: string
    city: string
    natural_birth: boolean
}

export type BirthInfoCreateUpdate = Omit<BirthInfo, 'id'>

export default new APIClient<BirthInfo, BirthInfoCreateUpdate>('birth-info/')