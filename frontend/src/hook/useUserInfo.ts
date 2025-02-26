"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo, Project } from "@/@types/api";
import { fetchUserInfo, updateUserInfo, UpdateInfo } from "@/app/_actions/user";
import { deleteCookie } from "@/app/_actions/auth";

interface UserActions {
  // setUser: (user: UserStoreState) => void;
  setAll: (data: UserInfo) => void;
  addProject: (project: Project) => void;
  reset: () => void;
  logout: () => void;
  fetch: (username: string) => Promise<void>;
  update: (data: UpdateInfo) => Promise<void>;
  getProjects: () => Project[];
}

type UserState = UserInfo & UserActions;

const DEFAULT: UserInfo = {
  userId: "",
  username: "",
  firstName: "",
  lastName: "",
  createdAt: "",
  lastModifiedAt: "",
  email: "",
  projects: [],
};

export const useUserInfo = create<UserState>()((set, get) => ({
  ...DEFAULT,
  // setUser: (user) => set({user}),
  setAll: (data) => set(data),
  getProjects: () => get().projects,
  addProject: (project) => set({ projects: [...get().projects, project] }),
  reset: () => set(DEFAULT),
  logout: () => {
    deleteCookie();
    set(DEFAULT);
  },
  fetch: async (username) => {
    set(DEFAULT);
    const response = await fetchUserInfo(username);
    //console.debug(response);
    if (!response["error"]) {
      set(response);
    }
  },
  update: async (data) => {
    const response = await updateUserInfo(data);
    console.log("UPDATE USER INFO", response);
    if (!response["error"]) {
      console.log("UPDATE COMPLETE");
    } else {
      alert("error alert");
    }
  },
}));
