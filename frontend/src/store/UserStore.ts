import { create, createStore } from "zustand";
import { persist } from "zustand/middleware";
import { Project, UserInfo } from "@/@types/api";

interface UserStoreActions {
  // setUser: (user: UserStoreState) => void;
  setUserName: (username: UserInfo["userName"]) => void;
  setUserId: (userId: UserInfo["userId"]) => void;
  setFirstName: (userFirstName: UserInfo["firstName"]) => void;
  setLastName: (userLastName: UserInfo["lastName"]) => void;
  setProjects: (projects: UserInfo["projects"]) => void;
}

type UserStore = UserInfo & UserStoreActions;

const DEFAULT: UserInfo = {
  userId: "",
  userName: "",
  firstName: "",
  lastName: "",
  projects: [],
};

const userStore = createStore<UserStore>()(
  persist(
    (set) => ({
      userId: DEFAULT.userId,
      userName: DEFAULT.userName,
      firstName: DEFAULT.firstName,
      lastName: DEFAULT.lastName,
      projects: DEFAULT.projects,
      // setUser: (user) => set({user}),
      setUserId: (userId) => set({ userId }),
      setUserName: (userName) => set({ userName }),
      setFirstName: (firstName) => set({ firstName }),
      setLastName: (lastName) => set({ lastName }),
      setProjects: (projects) => set({ projects }),
    }),
    {
      name: "userStorage",
    },
  ),
);

export default userStore;

// interface UserStore {
//   isLoggedIn: boolean;
//   login: () => void;
//   logout: () => void;
//   kakaoLogin: () => void;
//   setUser?: (user: User) => void;
//   setUsername?: (username: User['username']) => void;
//   setUserId?: (userId: User['userId']) => void;
//   setProjects?: (projects: User['projects']) => void;
// }

// persist(
//     (set) => ({
//       isLoggedIn: false,
//       setUser: (user) => {
//         set({})
//       },
//       login: () => {
//         const userLocalStorage = localStorage.getItem("accessToken");
//         if (userLocalStorage) {
//           set({ isLoggedIn: true });
//         }
//       },
//       kakaoLogin: () => {
//         const userLocalStorage = localStorage.getItem("accessToken");
//         if (userLocalStorage) {
//           set({ isLoggedIn: true });
//         }
//       },
//       logout: () => {
//         set({ isLoggedIn: false });
//         localStorage.clear();
//       },
//     }),
//     {
//       name: "userInfo",
//     },
//   ),
