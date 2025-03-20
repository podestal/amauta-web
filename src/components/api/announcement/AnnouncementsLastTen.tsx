import { Announcement } from "../../../services/api/announcementService"
import AnnouncementCard from "./AnnouncementCard"

interface Props {
    announcements: Announcement[]
    selectedType: string
    selectedLevel: string
    
}


const AnnouncementsLastTen = ({ announcements, selectedType, selectedLevel }: Props) => {

    const filteredAnnouncements = announcements.filter(announcement => {
        const typeMatches = selectedType === '' || selectedType === announcement.announcement_type;
        const levelMatches = selectedLevel === '' || selectedLevel === announcement.visibility_level;
        return typeMatches && levelMatches;
    });

    filteredAnnouncements.slice(0, 10)

  return (
    <div className="overflow-y-auto h-screen">
        <h2 className="text-2xl font-bold mb-6">Ultimos 10 anuncios</h2>
        {filteredAnnouncements
        .map((announcement) => 
            <AnnouncementCard 
                key={announcement.id}
                announcement={announcement}
            />
        
        )}
    </div>
  )
}

export default AnnouncementsLastTen