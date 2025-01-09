import React, { Dispatch, SetStateAction, useState, forwardRef, useEffect } from "react";

const styles = {
    animation: `
    @keyframes bounce {
      0% {
        transform: translateX(-8%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      25% {
        transform: translateX(8%);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
      50% {
        transform: translateX(-8%);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
      75% {
        transform: translateX(8%);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
      100% {
        transform: none;
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }
  
    .shake {
      animation: bounce 0.4s;
    }
  `
}

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string
    error?: string
    value?: string | number
    setValue?: Dispatch<SetStateAction<string>>
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(({
    placeholder,
    error,
    value,
    setValue,
    ...props 
}, ref) => {

    const [showError, setShowError] = useState(false)

    useEffect(() => {   
        if (error) {
            setShowError(true)
        }
    }, [error])

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length === 0) {
            setShowError(true)
        } else {
            setShowError(false)
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center gap-4 relative my-2">
            <div className="w-full">
                <style dangerouslySetInnerHTML={{ __html: styles.animation }} />
                <textarea
                    ref={ref} 
                    className={`h-[100px] bg-slate-100 dark:bg-gray-950  border-2  rounded-lg w-full dark:text-slate-50 text-gray-900 px-2 py-2 focus:border-blue-700 focus:outline-none text-base
                                ${error ? 'border-red-500 shake' : 'border-neutral-400 dark:border-gray-800'}
                            `}
                    placeholder={placeholder ? placeholder : 'Text ...'}
                    value={value}
                    onChange={handleTextAreaChange}
                    {...props} 
                />
            </div>
            {showError && <p className="text-xs text-red-500 mx-2">{error}</p>}
        </div>
    );
});

export default TextArea