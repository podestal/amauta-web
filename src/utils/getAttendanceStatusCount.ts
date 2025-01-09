import { SimpleAttendance } from "../services/api/studentsService";

export const getAttendanceStatusCount = (attendances: SimpleAttendance[]) => {
    return attendances.reduce((acc, attendance) => {
        switch (attendance.status) {
            case 'O':
                acc.onTime += 1;
                break;
            case 'L':
                acc.late += 1;
                break;
            case 'N':
                acc.notAttended += 1;
                break;
            case 'E':
                acc.excused += 1;
                break;
            case 'T':
                acc.leftEarly += 1;
                break;
            default:
                break;
        }
        return acc;
    },
    {
        onTime: 0,
        late: 0,
        notAttended: 0,
        excused: 0,
        leftEarly: 0,
    });
}