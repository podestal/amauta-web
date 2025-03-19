import APIClient from "./apiClient"


// ANNOUNCEMENT_TYPES = [
//     ("I", "Informative"),
//     ("A", "Attention"),
//     ("E", "Emergency"),
// ]

// VISIBILITY_LEVELS = [
//     ("G", "General"),    
//     ("C", "Clase"),    
//     ("A", "Assignature"),     
//     ("P", "Personal"),     
// ]

// title = models.CharField(max_length=255)
// description = models.TextField()
// created_at = models.DateField(auto_now_add=True)
// announcement_type = models.CharField(max_length=1, choices=ANNOUNCEMENT_TYPES, default='I')
// visibility_level = models.CharField(max_length=1, choices=VISIBILITY_LEVELS, default='G')

// # Relationships
// school = models.ForeignKey(School, on_delete=models.CASCADE, related_name="announcements")
// clase = models.ForeignKey(Clase, on_delete=models.CASCADE, null=True, blank=True, related_name="announcements") 
// assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE, null=True, blank=True, related_name="announcements")  
// student = models.ManyToManyField(Student, null=True, blank=True, related_name="announcements") 
// created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)

// def __str__(self):
//     return f"{self.get_visibility_level_display()} - {self.title}"

export interface Announcement {
    id: string
    title: string
    description: string
    created_at: string
    created_by: number
    announcement_type: 'I' | 'A' | 'E'
    visibility_level: 'G' | 'C' | 'A' | 'P'
    school: number
    clase: number
    assignature: number
    student: number
}

export type AnnouncementCreateUpdate = Omit<Announcement, 'id' | 'created_at' | 'created_by' | 'clase' | 'assignature' | 'student'> & {
    created_by?: string
    clase?: number
    assignature?: number
    student?: number
}

interface Props {
    byStudent?: boolean
    byTutor? : boolean
    byDate?: boolean
}

const getAnnouncementService = ({ byStudent, byTutor, byDate }: Props) => {
    let url = `announcement/`
    if (byStudent) {
        url = `announcement/byStudent/`
    
    } else if (byDate) {
        url = `announcement/byDate/`
    }else if (byTutor) {
        url = `announcement/byTutor/`
    }
    
    return new APIClient<Announcement, AnnouncementCreateUpdate>(url)
}

export default getAnnouncementService
