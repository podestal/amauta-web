import { useNavigate } from "react-router-dom"

interface Props {
    path: string
    state: any
}


const GoBack = ({ path, state }: Props) => {

    const navigate = useNavigate()

  return (
    <div className="w-full flex justify-left items-center">
        <button
        onClick={() => navigate(path, { state })}
        className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-xl shadow-lg flex items-center gap-2 tracking-wide"
        >
        ⬅
        </button>
    </div>
  )
}

export default GoBack