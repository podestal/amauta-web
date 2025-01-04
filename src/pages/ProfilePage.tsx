import Logout from "../components/auth/Logout"
import InstallPWAButton from "../components/ui/InstallPWAButton"

const ProfilePage = () => {
  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden">
        <Logout />
        <InstallPWAButton />
    </div>
  )
}

export default ProfilePage