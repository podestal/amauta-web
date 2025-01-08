import React, { Dispatch, SetStateAction, useState, forwardRef, useEffect } from "react";
import { RiEyeFill, RiEyeOffFill } from "@remixicon/react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string
    error?: string
    type?: string
    value?: string | number
    setValue?: Dispatch<SetStateAction<string>>
    stylesContainer?: string
    label?: string
}

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

const Input = forwardRef<HTMLInputElement, Props>(({
    placeholder,
    error,
    type = "text",
    value,
    setValue,
    stylesContainer,
    label,
    ...props 
}, ref) => {
    const [showPassword, setShowPassword] = useState(type !== 'password');
    const [showError, setShowError] = useState(false)

    useEffect(() => {   

        if (!error) {
            setShowError(false)
        } else {
            setShowError(true)
        }
    }, [error])

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleCheckForNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (type === 'number') {
            if (/^\d*(\.\d*)?$/.test(newValue)) {
                setValue && setValue(newValue);
            }
        } else {
            setValue && setValue(newValue);
            
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleCheckForNumbers(e)
        if (e.target.value.length === 0) {
            setShowError(true)
        } else {
            setShowError(false)
        }
    }

    return (
        <div className={`w-full flex flex-col justify-center items-center gap-4 relative ${stylesContainer}`}>
            <div className="relative w-full">
                {label && <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-4">{label}</p>}
                <style dangerouslySetInnerHTML={{ __html: styles.animation }} />
                <input
                    ref={ref}
                    className={`bg-slate-100 dark:bg-gray-950 border-neutral-400 dark:border-gray-800 border-2 rounded-lg w-full dark:text-slate-50 text-xs px-2 py-2 focus:border-blue-700 focus:outline-none sm:text-[17px]
                                ${showError ? 'border-red-500 dark:border-red-600 shake' : 'dark:border-gray-800 border-neutral-200'}
                            `}
                    placeholder={placeholder ? placeholder : 'Input ...'}
                    type={showPassword && type === 'password' ? 'text' : type} 
                    value={value}
                    onChange={handleInputChange}
                    {...props} 
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handleShowPassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-400"
                    >
                        {showPassword ? (
                            <RiEyeFill className="size-5 shrink-0" />
                        ) : (
                            <RiEyeOffFill className="size-5 shrink-0" />
                        )}
                    </button>
                )}
            </div>
            {showError && <p className="text-xs text-red-500 mx-2">{error}</p>}
        </div>
    );
});

export default Input;