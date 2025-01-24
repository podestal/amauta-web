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
  
  const AttendanceStatus = ({ status, label, canModify, onClick }: AttendanceStatusProps) => {
    const statusStyles: Record<string, string> = {
        'O': 'bg-green-500 shadow-green-500 text-green-100',
        'L': 'bg-amber-500 shadow-amber-500 text-amber-100',
        'N': 'bg-red-500 shadow-red-500 text-red-100',
        'E': 'bg-green-500 shadow-green-500 text-green-100',
        'T': 'bg-yellow-500 shadow-yellow-500 text-yellow-100',
    };
  
    return (
        <p
            onClick={canModify ? onClick : undefined}
            className={`py-2 shadow-xl px-4 text-center font-bold rounded-2xl text-xs cursor-pointer flex items-center justify-center space-x-2 ${
                canModify ? 'hover:opacity-80' : 'cursor-default'
            } ${statusStyles[status] || 'bg-gray-500'}`}
        >
            <span>{statusIcons[status] || '❓'}</span>
            <span>{label}</span>
        </p>
    );
  };

export default AttendanceStatus;