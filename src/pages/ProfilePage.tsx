import Logout from "../components/auth/Logout";
import Avatar from "../components/ui/Avatar";
import { RiMailFill, RiPhoneFill } from "@remixicon/react";
import useGetProfileStore from "../hooks/store/useGetProfileStore";
import ThemeSelector from "../components/ui/ThemeSelector";

const ProfilePage = () => {
  const profile = useGetProfileStore((s) => s.profile);
  const user = useGetProfileStore((s) => s.user);

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden pt-10">
      {/* Profile Card */}
      <div className="p-6 bg-white dark:bg-slate-900 shadow-xl text-center relative rounded-3xl">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center">
          {profile && <Avatar firstName={profile?.first_name} lastName={profile?.last_name} />}
          <h1 className="text-xl font-bold mt-3">{profile?.first_name}</h1>
          <h1 className="text-xl font-bold mt-3">{profile?.last_name}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-4 flex flex-col items-center">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <RiMailFill className="text-xl text-blue-500" />
            <span>{user?.email || "No email provided"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <RiPhoneFill className="text-xl text-green-500" />
            <span>+51 907356233</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-[70%] mx-auto mt-8 flex flex-col gap-4">
          <ThemeSelector />
          {/* <button className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition">
            <RiEdit2Fill className="text-lg" /> Editar Perfil
          </button>
          <button className="flex items-center justify-center gap-3 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md transition">
            <RiLockPasswordFill className="text-lg" /> Cambiar Contraseña
          </button> */}
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
