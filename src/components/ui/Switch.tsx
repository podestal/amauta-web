interface Props {
    value: boolean
    setter: React.Dispatch<React.SetStateAction<boolean>>
    label?: string
}

const Switch = ({ value, setter, label }: Props) => {

    const handleToggle = () => {
        setter((prev: boolean) => !prev)

    };


  return (
    <div className="flex flex-col justify-center items-center gap-4">
        {label && <p className="text-lg lg:text-xl dark:text-slate-50 text-center">{label}</p>}
        <div 
            className={`relative inline-block w-12 h-6 transition duration-200 ease-in 
                        ${value ? 'bg-blue-600' : 'bg-gray-300'} 
                        rounded-full cursor-pointer`}
            onClick={handleToggle}
            >
            <input 
                type="checkbox" 
                checked={value} 
                onChange={handleToggle} 
                className="sr-only peer" 
            />
            <div 
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md 
                            transition-transform duration-200 transform 
                            ${value ? 'translate-x-6' : 'translate-x-0'}`}
            ></div>
        </div>
    </div>
  )
}

export default Switch