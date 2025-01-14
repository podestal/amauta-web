import Logout from "../components/auth/Logout"
import Avatar from "../components/ui/Avatar"
// import Button from "../components/ui/Button"
import useGetProfileStore from "../hooks/store/useGetProfileStore"

const ProfilePage = () => {

  const profile = useGetProfileStore(s => s.profile)
  const user = useGetProfileStore(s => s.user)

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden">
        <div className="p-6 bg-gray-100 dark:bg-slate-900 rounded shadow-lg max-w-md mx-auto h-[50vh] my-10">
          <div className="flex flex-col items-center mb-6">
          {profile && <Avatar 
            firstName={profile?.first_name}
            lastName={profile?.last_name}
          />}
          <h1 className="text-lg font-bold">{profile?.first_name} {profile?.last_name}</h1>
        </div>
        <div className="mb-6">
          <h2 className="text-md font-semibold mb-2">Información de Cuenta</h2>
          <p className="text-sm">
            <strong>Correo:</strong> {user?.email}
          </p>
          <p className="text-sm">
            <strong>Celular:</strong> 907356233
          </p>
        </div>
        <div className="flex justify-start items-center gap-4">
          <Logout />
          {/* <Button 
            label="Cambiar contraseña"
          />
          <Button 
            label="Cambiar correo electrónico"
          /> */}
        </div>
      </div>
        
        

    </div>
  )
}

export default ProfilePage