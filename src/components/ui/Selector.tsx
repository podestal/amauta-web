import { forwardRef } from "react"

interface Item {
    id: string
    name: string
}

interface Props<T extends Item> {
    values: T[] // Array of generic items
    defaultValue?: string // Default selected value, corresponds to item id
    value?: string // Selected value, corresponds to item id
    setter: (value: any) => void // Function to update the selected value
    label?: string // Text that indicate the type of the selector
    all?: boolean // Boolean that conditionally renders all values
    error?: string
    setError?: (value: string) => void
    lan?: string
    setToDefault?: () => void
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

// Selector component that uses a generic type T, extending the Item interface
const Selector = forwardRef<HTMLSelectElement, Props<Item>>(
  ({ values, defaultValue, value, setter, label, all, error, setError, lan = "EN", setToDefault }, ref) => {
  
    return (
        <div className="lg:w-full w-[60%] flex flex-col mx-auto justify-center items-center gap-2">
            {/* Label for the selector */}
            {label && <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-4">{label}</p>}
            {/* Dropdown (select) element */}
            <style dangerouslySetInnerHTML={{ __html: styles.animation }} />
            <select
                ref={ref}
                defaultValue={defaultValue} // Set the default selected value
                onChange={e => {
                  if(setError) {
                    value && setError('')
                  }
                  setToDefault && setToDefault()
                  console.log('is Changing', e.target.value);
                  
                  setter(e.target.value)
                }}
                className={`dark:bg-gray-950 bg-slate-100  rounded-lg w-full dark:text-slate-50 text-xs pl-2 py-[10px] border-2 ${error ? 'border-red-600 shake' : ' border-neutral-400 dark:border-gray-800'}`}
            >
                {all 
                ?
                <option value={0}>All</option>
                :
                <>
                { !defaultValue && <option value={0}>{lan === 'EN' ? 'Select' : 'Selecciona'}</option>} 
                </>
                }

                {values.map((value) => (
                    <option key={value.id} value={value.id}>
                        {value.name} {/* Display the name of the item */}
                    </option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500 mx-2">{error}</p>}
        </div>      
    )
}
)

export default Selector // Export the component for use in other parts of the app