import { motion } from "framer-motion"
import { Announcement } from "../../../services/api/announcementService"

interface Props {
    announcements: Announcement[]
    selectedType: string
    setSelectedType: React.Dispatch<React.SetStateAction<string>>
    selectedLevel: string
    setSelectedLevel: React.Dispatch<React.SetStateAction<string>>
}

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

const AnnouncementsSummary = ({ announcements, selectedLevel, selectedType, setSelectedLevel, setSelectedType }: Props) => {

    const informativeCount = announcements.filter(announcement => announcement.announcement_type === 'I').length
    const attentionCount = announcements.filter(announcement => announcement.announcement_type === 'A').length
    const emergencyCount = announcements.filter(announcement => announcement.announcement_type === 'E').length

    const generalCount = announcements.filter(announcement => announcement.visibility_level === 'G').length
    const claseCount = announcements.filter(announcement => announcement.visibility_level === 'C').length
    const personalCount = announcements.filter(announcement => announcement.visibility_level === 'P').length

    const boxVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    }

  return (
    <div className="w-full grid grid-cols-2 gap-6 col-span-2">
      {/* Tipo de anuncios */}

      <div className="flex flex-col gap-4">
        <motion.div 
            variants={boxVariants} 
            initial="hidden" 
            animate="visible"
            className={`${selectedType === 'I' ? 'bg-blue-700' : `${selectedType === '' ? 'bg-blue-500' : 'bg-blue-300'}`} text-white px-4 py-12 rounded-2xl shadow-lg text-center cursor-pointer hover:bg-blue-600`}
            onClick={() => selectedType === '' ? setSelectedType('I') : setSelectedType('')}
        >
          <span className="font-semibold">Informativos</span>
          <div className="text-2xl font-bold">{informativeCount}</div>
        </motion.div>

        <motion.div 
            variants={boxVariants} 
            initial="hidden" 
            animate="visible"
            className={`${selectedType === 'A' ? 'bg-yellow-700' : `${selectedType === '' ? 'bg-yellow-500' : 'bg-yellow-200'}`} text-white px-4 py-12 rounded-2xl shadow-lg text-center cursor-pointer hover:bg-yellow-600`}
            onClick={() => selectedType === '' ? setSelectedType('A') : setSelectedType('')}
        >
          <span className="font-semibold">De atención</span>
          <div className="text-2xl font-bold">{attentionCount}</div>
        </motion.div>

        <motion.div 
            variants={boxVariants} 
            initial="hidden" 
            animate="visible"
            className={`${selectedType === 'E' ? 'bg-red-700' : `${selectedType === '' ? 'bg-red-500' : 'bg-red-200'}`} text-white px-4 py-12 rounded-2xl shadow-lg text-center cursor-pointer hover:bg-red-600`}
            onClick={() => selectedType === '' ? setSelectedType('E') : setSelectedType('')}
        >
          <span className="font-semibold">De emergencia</span>
          <div className="text-2xl font-bold">{emergencyCount}</div>
        </motion.div>
      </div>

      {/* Nivel de visibilidad */}
      <div className="flex flex-col gap-4">
        <motion.div 
            variants={boxVariants} 
            initial="hidden" 
            animate="visible"
            className={`${selectedLevel === 'G' ? 'bg-green-700' : `${selectedType === '' ? 'bg-green-500' : 'bg-green-200'}`} text-white px-4 py-12 rounded-2xl shadow-lg text-center cursor-pointer hover:bg-green-600`}
            onClick={() => selectedLevel === '' ? setSelectedLevel('G') : setSelectedLevel('')}
        >
          <span className="font-semibold">Generales</span>
          <div className="text-2xl font-bold">{generalCount}</div>
        </motion.div>

        <motion.div 
            variants={boxVariants} 
            initial="hidden" 
            animate="visible"
            className={`${selectedLevel === 'C' ? 'bg-purple-700' : `${selectedType === '' ? 'bg-purple-500' : 'bg-purple-200'}`} text-white px-4 py-12 rounded-2xl shadow-lg text-center cursor-pointer hover:bg-cyan-600`}
            onClick={() => selectedLevel === '' ? setSelectedLevel('C') : setSelectedLevel('')}
        >
          <span className="font-semibold">Por clase</span>
          <div className="text-2xl font-bold">{claseCount}</div>
        </motion.div>

        <motion.div 
            variants={boxVariants} 
            initial="hidden" 
            animate="visible"
            className={`${selectedLevel === 'P' ? 'bg-cyan-700' : `${selectedType === '' ? 'bg-cyan-500' : 'bg-cyan-200'}`} text-white px-4 py-12 rounded-2xl shadow-lg text-center cursor-pointer hover:bg-cyan-900`}
            onClick={() => selectedLevel === '' ? setSelectedLevel('P') : setSelectedLevel('')}
        >
          <span className="font-semibold">Personales</span>
          <div className="text-2xl font-bold">{personalCount}</div>
        </motion.div>
      </div>
    </div>
  )
}

export default AnnouncementsSummary