"use client";

import { create, createStore } from "zustand";
import { persist } from "zustand/middleware";
import { Project, UserInfo } from "@/@types/api";
import { NextResponse } from "next/server";

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

export const userStore = createStore<UserStore>()(
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

export function getUserId() {
  return userStore.getState().userId;
}

export function getUserInfo() {
  const userStorage = userStore.getState();
  return {
    userId: userStorage.userId,
    userName: userStorage.userName,
    firstName: userStorage.firstName,
    lastName: userStorage.lastName,
    projects: userStorage.projects,
  };
}

export const setUserInfo = (data: any) => {
  const userStorage = userStore.getState();
  userStorage.setUserId(data.userId);
  userStorage.setUserName(data.username);
  userStorage.setFirstName(data.firstName);
  userStorage.setLastName(data.lastName);
  userStorage.setProjects(data.projects);
};
