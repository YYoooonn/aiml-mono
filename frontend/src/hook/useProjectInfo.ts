"use client";

import { create } from "zustand";
import { ObjectInfo, Project, UserInfo } from "@/@types/api";
import { fetchProject } from "@/app/_actions/project";
import { persist } from "zustand/middleware";

interface ProjectAction {
  fetch: (username: string, projectId: Project["projectId"]) => Promise<void>;
  addtoObjects: (object: ObjectInfo) => void;
}

type ProjectState = Omit<Project & UserInfo & ProjectAction, "projects">;

export const DEFAULT: Omit<Project & UserInfo, "projects"> = {
  userId: "",
  username: "",
  firstName: "",
  lastName: "",
  projectId: "",
  title: "",
  subtitle: "",
  objects: [],
  // TODO not implemented yet
  //   lastModifiedAt: "",
  //   createdAt: "",
  //   createdBy: ""
};

export const useProjectInfo = create<ProjectState>()(
  persist(
    (set, get) => ({
      ...DEFAULT,
      // setUser: (user) => set({user}),
      fetch: async (username, projectId) => {
        set(DEFAULT);
        const response = await fetchProject(username, projectId);
        if (!response["error"]) {
          set(response);
        }
      },
      addtoObjects: (object) => set({ objects: [...get().objects, object] }),
    }),
    { name: "projectStorage" },
  ),
);
