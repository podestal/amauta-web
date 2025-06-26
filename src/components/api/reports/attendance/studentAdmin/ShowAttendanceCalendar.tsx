import { RiHistoryFill } from "@remixicon/react";

interface Props {
    onClick: () => void;
}

const ShowAttendanceCalendar = ({ onClick }: Props) => {

  return (
    <RiHistoryFill 
        className="text-blue-600 hover:text-blue-800 cursor-pointer text-2xl max-lg:hidden"
        onClick={onClick}
    />
  )
}

export default ShowAttendanceCalendar