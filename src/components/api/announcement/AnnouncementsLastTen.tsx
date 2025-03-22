import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "@remixicon/react"
import { Announcement } from "../../../services/api/announcementService"
import AnnouncementCard from "./AnnouncementCard"

interface Props {
    announcements: Announcement[]
    selectedType: string
    selectedLevel: string
    selectedPage: number
    setSelectedPage: React.Dispatch<React.SetStateAction<number>>
}


const AnnouncementsLastTen = ({ announcements, selectedType, selectedLevel, selectedPage, setSelectedPage }: Props) => {

    const filteredAnnouncements = announcements.filter(announcement => {
        const typeMatches = selectedType === '' || selectedType === announcement.announcement_type;
        const levelMatches = selectedLevel === '' || selectedLevel === announcement.visibility_level;
        return typeMatches && levelMatches;
    });

  return (
    <div className="">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Anuncios</h2>
            <div className="flex gap-4">
                <RiArrowLeftCircleFill 
                    onClick={() => {
                        selectedPage > 1 && setSelectedPage(selectedPage - 1)}}
                    className={`  ${selectedPage > 1 ? 'cursor-pointer hover:text-blue-600' : 'text-gray-500 cursor-not-allowed'}`}/>
                <p>Página {selectedPage}</p>
                <RiArrowRightCircleFill 
                    onClick={() => {
                        announcements.length === 10 && setSelectedPage(selectedPage + 1)}}
                    className={`  ${announcements.length === 10 ? 'cursor-pointer hover:text-blue-600' : 'text-gray-500 cursor-not-allowed'}`}/>
            </div>
        </div>
        <div className="overflow-y-auto h-[650px]">
            {filteredAnnouncements.length > 0 
            ? 
            <>
            {filteredAnnouncements
            .map((announcement) => 
                <AnnouncementCard 
                    key={announcement.id}
                    announcement={announcement}
                />
            
            )}
            </> : 
            <p className="font-bold text-gray-400 mt-6">No se encontraron más anuncios ...</p>}
        </div>

    </div>
  )
}

export default AnnouncementsLastTen