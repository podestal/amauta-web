import { useParams } from 'react-router-dom'
import NewPassword from '../components/auth/NewPassword'

const NewPasswordPage = () => {

    const {uid, token} = useParams()

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden">
        {uid && token 
        ?
        <NewPassword 
            uid={uid}
            token={token}
        />
        :
        <div className='w-full h-full flex justify-center items-center'>
            <h2 className='text-3xl font-bold'>Link Inválido</h2>
        </div>
        }
    </div>
  )
}

export default NewPasswordPage