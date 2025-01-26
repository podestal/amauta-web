interface AttendanceStatusProps {
    status: 'O' | 'L' | 'N' | 'E' | 'T';
    label: string;
    canModify: boolean;
    onClick: () => void;
  }
  
  const statusIcons = {
    O: '✅', // On Time
    L: '⏰', // Late
    N: '❌', // No Show
    E: '🛡️', // Excused
    T: '⚠️', // Tardy
  };

  export const statusStyles: Record<string, string> = {
    'O': 'bg-green-500 shadow-green-500 text-green-100',
    'L': 'bg-orange-500 shadow-amber-500 text-amber-100',
    'N': 'bg-red-500 shadow-red-500 text-red-100',
    'E': 'bg-green-700 shadow-green-700 text-green-200',
    'T': 'bg-yellow-400 shadow-yellow-500 text-yellow-100',
};
  
  const AttendanceStatus = ({ status, label, canModify, onClick }: AttendanceStatusProps) => {
  
    return (
        <p
            onClick={canModify ? onClick : undefined}
            className={`py-4 shadow-xl px-4 text-center font-bold rounded-2xl text-xs cursor-pointer flex items-center justify-center space-x-2 ${
                canModify ? 'hover:opacity-80' : 'cursor-default'
            } ${statusStyles[status] || 'bg-gray-500'}`}
        >
            <span>{statusIcons[status] || ''}</span>
            <span>{label}</span>
        </p>
    );
  };

export default AttendanceStatus;