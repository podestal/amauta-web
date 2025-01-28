import Login from "../components/auth/Login"

const LoginPage = () => {

  return (
    <div className="flex lg:mr-[22rem] flex-col justify-center items-center min-h-screen w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden">
      <Login />
    </div>
  )
}

export default LoginPage