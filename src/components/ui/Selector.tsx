interface Item {
    id: string
    name: string
}

interface Props<T extends Item> {
    values: T[] // Array of generic items
    defaultValue?: string // Default selected value, corresponds to item id
    setter: (value: string) => void // Function to update the selected value
    label: string // Text that indicate the type of the selector
    all?: boolean // Boolean that conditionally renders all values
    error?: string
    lan?: string
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
const Selector = <T extends Item>({ values, defaultValue, setter, label, all, error, lan='EN' }: Props<T>) => {
  
    return (
        <div className="lg:w-full w-[60%] flex flex-col mx-auto justify-center items-center gap-4">
            {/* Label for the selector */}
            {label && <p className="dark:text-slate-50">{label}</p>}
            {/* Dropdown (select) element */}
            <style dangerouslySetInnerHTML={{ __html: styles.animation }} />
            <select
                defaultValue={defaultValue} // Set the default selected value
                onChange={e => setter(e.target.value)} // Call setter with selected value
                className={`dark:bg-gray-950 bg-slate-100  rounded-lg w-full dark:text-slate-50 text-xs pl-2 py-[8px] border-2 ${error ? 'border-red-600 shake' : ' border-neutral-400 dark:border-gray-800'}`}
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
        </div>      
    )
}

export default Selector // Export the component for use in other parts of the app