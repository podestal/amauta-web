import moment from "moment";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import { Student } from "../../../services/api/studentsService";
import getClassroomDescription from "../../../utils/getClassroomDescription";
import Button from "../../ui/Button";

interface Props {
  student: Student;
  showIcons?: boolean; // Toggle icons visibility
}

const tutorTypes: Record<string, string> = {
  M: "Madre",
  F: "Padre",
  O: "Apoderado",
};

const religions: Record<string, string> = {
  C: "Católica",
  E: "Evangélica",
  J: "Judía",
  I: "Musulmana",
  B: "Budista",
  M: "Mormona",
  T: "Testigo de Jehová",
  R: "Cristiana",
  O: "Otra",
};

const languages: Record<string, string> = {
  S: "Español",
  E: "Inglés",
  Q: "Quechua",
  A: "Aymara",
};

const civilStatus: Record<string, string> = {
  S: "Soltero",
  C: "Casado",
  D: "Divorciado",
  V: "Viudo",
};

const StudentInfo = ({ student, showIcons = true }: Props) => {
  const lan = useLanguageStore((s) => s.lan);
  const classroom = getClassroomDescription({
    lan,
    grade: student.clase.grade,
    section: student.clase.section,
    level: student.clase.level,
  });

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center my-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          {showIcons && "📘"} Ficha de Estudiante
        </h2>
        {/* <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          onClick={() => console.log("Print")}
        >
          {showIcons && "🖨️"} Imprimir
        </button> */}
        {!showIcons && <Button 
            label={`🖨️ Imprimir`}
            onClick={() => console.log("Print")}
        />}
      </div>

      {/* Información Principal */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-6 my-6">
        <div>
          <p className="text-2xl font-bold">{student.first_name} {student.last_name}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {showIcons && "📄"} DNI: {student.uid}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {showIcons && "🏫"} Clase: {classroom}
          </p>
        </div>
        <div className="w-32 h-40 border-2 border-gray-400 dark:border-gray-600 flex justify-center items-center rounded-lg overflow-hidden">
          {/* Aquí puedes colocar la imagen del estudiante */}
          {/* <img src={student.photo || "https://via.placeholder.com/150"} alt="Foto" className="object-cover w-full h-full" /> */}
            Foto
        </div>
      </div>

      {/* Datos Personales */}
      <h2 className="text-xl font-bold my-4">{showIcons && "📌"} Datos Personales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <p>{showIcons && "👨‍👩‍👦"} Número de Hermanos: {student.number_of_siblings || "3"}</p>
        <p>{showIcons && "📍"} Lugar que Ocupa: {student.place_in_family || "1"}</p>
        <p>{showIcons && "🏫"} Escuela Anterior: {student.prev_school || "San Francisco de Asís"}</p>
        <p>{showIcons && "🛐"} Religión: {religions[student.religion] || "Católica"}</p>
        <p>{showIcons && "🗣️"} Lengua Materna: {languages[student.main_language] || "Español"}</p>
        <p>{showIcons && "🌎"} Segunda Lengua: {languages[student.second_language] || "-"}</p>
        <p>{showIcons && "🏡"} Dirección: {student.address || "Avenida Cortes 245"}</p>
        <p>{showIcons && "📞"} Teléfono: {student.phone_number || "123456"}</p>
        <p>{showIcons && "📱"} Celular: {student.celphone_number || "123456"}</p>
      </div>

      {/* Información de Nacimiento */}
      <h2 className="text-xl font-bold my-4">{showIcons && "🎂"} Información de Nacimiento</h2>
      {student.birth_info ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p>{showIcons && "📅"} Fecha de Nacimiento: {moment(student.birth_info.date_of_birth).format("DD-MM-YYYY") || "-"}</p>
          <p>{showIcons && "🏛️"} Departamento: {student.birth_info.state || "-"}</p>
          <p>{showIcons && "🏙️"} Provincia: {student.birth_info.county || "-"}</p>
          <p>{showIcons && "🌆"} Distrito: {student.birth_info.city || "-"}</p>
        </div>
      ) : (
        <p className="text-gray-500">-</p>
      )}

      {/* Contacto de Emergencia */}
      <h2 className="text-xl font-bold my-4">{showIcons && "🚨"} Contacto de Emergencia</h2>
      {student.emergency_contact ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p>{showIcons && "👤"} Nombre: {student.emergency_contact.name || "Juan Pérez"}</p>
          <p>{showIcons && "📞"} Teléfono: {student.emergency_contact.phone_number || "123456"}</p>
          <p>{showIcons && "🏡"} Dirección: {student.emergency_contact.address || "Avenida Cortes 245"}</p>
        </div>
      ) : (
        <p className="text-gray-500">-</p>
      )}

      {/* Información de los Tutores */}
      {student.tutors.map((tutor) => (
        <div key={tutor.id} className="mt-6">
          <h2 className="text-xl font-bold my-4">
            {showIcons && "👨‍👩‍👦"} Información {tutor.tutor_type === "M" ? "de la" : "del"} {tutorTypes[tutor.tutor_type]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <p>{showIcons && "📜"} DNI: {tutor.dni || "54673322"}</p>
            <p>{showIcons && "👤"} Nombres: {tutor.first_name}</p>
            <p>{showIcons && "👥"} Apellidos: {tutor.last_name}</p>
            <p>{showIcons && "📧"} Correo electrónico: {tutor.email}</p>
            <p>{showIcons && "📞"} Teléfono: {tutor.phone_number}</p>
            <p>{showIcons && "📅"} Fecha de Nacimiento: {moment(tutor.date_of_birth).format("DD-MM-YYYY")}</p>
            <p>{showIcons && "🏛️"} Departamento: {tutor.state}</p
            ><p>{showIcons && "🏙️"} Provincia: {tutor.county}</p
            ><p>{showIcons && "🌆"} Distrito: {tutor.city}</p
            ><p>{showIcons && "📚"} Grado de Instrucción: {tutor.instruction_grade}</p
            ><p>{showIcons && "🏢"} Ocupación: {tutor.ocupation}</p>
            <p>{showIcons && "🏭"} Empleador: {tutor.employer}</p>
            <p>{showIcons && "👫"} Estado Civil: {civilStatus[tutor.civil_status]}</p>
            <p>{showIcons && "👪"} Parentesco: {tutor.tutor_relationship}</p>
            <p>{showIcons && "🏡"} Vive con el estudiante: {tutor.lives_with_student ? "Sí" : "No"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentInfo;
