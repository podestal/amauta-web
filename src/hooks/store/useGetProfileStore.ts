import { create } from "zustand";
import { User } from "../../services/auth/useService";
import { Tutor } from "../../services/api/tutorService";
import { Instructor } from "../../services/api/instructorService";

type Profile = Tutor | Instructor | null;

interface ProfileState {
  user: User | null;
  profile: Profile;
  setProfile: (profile: Profile) => void;
  setUser: (user: User) => void;
}

const useGetProfileStore = create<ProfileState>((set) => ({
  profile: null,
  user: null,
  setProfile: (profile) => set({ profile }),
  setUser: (user) => set({ user }),
}));

export default useGetProfileStore;
