import { BookOpen, ClipboardList, FilePenLine, FileText, FlaskConical } from "lucide-react";
import { Category } from "../services/api/categoryService";

interface Props {
    categories: Category[];
    exam?: boolean;
}


const getCategoriesIconMap = ({ categories, exam }: Props) => {
    let iconMap = [
        { name: 'Tarea', icon: FileText, color: 'blue-500' },
        { name: 'Trabajo en clase', icon: ClipboardList, color: 'green-500' },
        { name: 'Evaluación', icon: FilePenLine, color: 'red-500' },
        { name: 'Examen', icon: BookOpen, color: 'purple-500' },
        { name: 'Proyecto', icon: FlaskConical, color: 'yellow-500' },
    ];
    console.log('exam', exam);
    
    // if (!exam) {
    //     iconMap = iconMap.filter(icon => icon.name === 'Examen');
    // }

    return categories
        .filter(category => {
            // If exam is false, filter out the exam category
            if (!exam) {
                return category.title !== 'Examen';
            }
            return true; // Otherwise, include all categories
        })
        .map(category => {
        const iconData = iconMap.find(icon => icon.name === category.title);
        if (iconData) {
            return {
                ...category,
                icon: iconData.icon,
                color: iconData.color
            };
        } else {
            return {
                ...category,
                icon: FileText, // Default icon if no match found
                color: 'gray-500' // Default color if no match found
            };
        }

    });
}

export default getCategoriesIconMap;