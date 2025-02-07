import { RiLoader2Fill } from "@remixicon/react"
import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    loading?: boolean
    disable?: boolean
    color?: keyof typeof colors
    minWidth?: boolean
}

const colors = {
    blue: {
        enabled: 'bg-blue-700 hover:bg-blue-600 text-slate-50',
        disabled: 'bg-blue-800 text-slate-400 cursor-not-allowed',
    },
    red: {
        enabled: 'bg-red-700 hover:bg-red-600 text-slate-50',
        disabled: 'bg-red-600 text-slate-400 cursor-not-allowed',
    },
    green: {
        enabled: 'bg-green-600 hover:bg-green-500 text-slate-50',
        disabled: 'bg-green-700 text-slate-400 cursor-not-allowed',
    },
    amber: {
        enabled: 'bg-amber-600 hover:bg-amber-500 text-slate-50',
        disabled: 'bg-amber-700 text-slate-400 cursor-not-allowed',
    }
}

const Button = ({
    label,
    loading=false,
    disable=false,
    color='blue',
    minWidth=false,
    ...props
}: Props) => {

    const pickedColor = colors[color]

  return (
    <button 
        disabled={disable}
        className={`
            ${disable ? pickedColor.disabled : pickedColor.enabled}  
            py-2 px-4 text-sm rounded-md text-center my-auto ${minWidth && 'min-w-32'}`}
        {...props}    
        >
        {loading 
        ? 
        <div className="flex justify-center items-center gap-2">
            <RiLoader2Fill className="animate-spin" size={16}/> 
        </div>
        : 
        <p className="font-bold text-xs">{label}</p>
        }
    </button>
  )
}

export default Button