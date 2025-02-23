import NewPassword from '../components/auth/NewPassword'

const NewPasswordPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden">
        <NewPassword />
    </div>
  )
}

export default NewPasswordPage