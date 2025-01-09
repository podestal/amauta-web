import { create } from "zustand";
import userService, { User } from "../../services/auth/useService";
import instructorService, { Instructor } from "../../services/api/instructorService";
import tutorService, { Tutor } from "../../services/api/tutorService";

type Profile = Tutor | Instructor | null;

interface ProfileState {
  user: User | null;
  profile: Profile;
  isLoading: boolean;
  error: string | null;
  getProfile: (access: string) => Promise<void>;
}

const useGetProfileStore = create<ProfileState>((set) => ({
  user: null,
  profile: null,
  isLoading: false,
  error: null,

  getProfile: async (access: string) => {
    if (!access) {
      set({ isLoading: false, error: "No access token" });
      return;
    }

    set({ isLoading: true, error: null });

    try {

      const userData = await userService.get(access);
      set({ user: userData });
      
      if (userData.groups.length > 0) {
        const group = userData.groups[0];

        let profileData: Profile = null;
        
        if (group === "instructor") {
          profileData = await instructorService.get(access);
        } else if (group === "tutor") {
          profileData = await tutorService.get(access);
        }

        if (profileData) {
          set({ profile: profileData });
        }
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useGetProfileStore;
