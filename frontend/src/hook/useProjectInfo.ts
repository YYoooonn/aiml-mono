"use client";

import { create } from "zustand";
import { ObjectInfo, ObjectConstructor, Project, UserInfo } from "@/@types/api";
import {
  createObject,
  deleteObject,
  fetchProject,
} from "@/app/_actions/project";
import { persist } from "zustand/middleware";

export interface ProjectAction {
  fetch: (projectId: Project["projectId"]) => Promise<void>;
  getObjects: () => Promise<void>;
  addtoObjects: (object: ObjectInfo) => void;
  createObject: (objectInfo: ObjectConstructor) => Promise<void>;
  removeObject: (objectId: string) => Promise<void>;
  updateObject: (object: ObjectInfo) => void;
  popObject: (objectId: string) => void;
}

type ProjectState = Omit<Project & ProjectAction, "projects">;

const DEFAULT: Omit<Project, "projects"> = {
  projectId: "",
  title: "",
  subtitle: "",
  objects: [],
  // TODO not implemented yet
  lastModifiedAt: "",
  createdAt: "",
  createdBy: "",
  isPublic: true,
  participants: [],
};

export const useProjectInfo = create<ProjectState>()((set, get) => ({
  projectId: "",
  title: "",
  subtitle: "",
  objects: [],
  // TODO not implemented yet
  lastModifiedAt: "",
  createdAt: "",
  createdBy: "",
  isPublic: true,
  participants: [],
  // setUser: (user) => set({user}),
  fetch: async (projectId) => {
    const response = await fetchProject(projectId);
    if (!response["error"]) {
      set(response);
    }
  },
  createObject: async (objectInfo) => {
    const response = await createObject(objectInfo, get().projectId);
    if (!response["error"]) {
      set({ objects: [...get().objects, response] });
    }
  },
  getObjects: async () => {
    const response = await fetchProject(get().projectId);
    if (response.objects) {
      set({ objects: response.objects });
    }
  },
  popObject: (objectId: string) => {},
  removeObject: async (objectId) => {
    await deleteObject(objectId, get().projectId);
    set({ objects: get().objects.filter((o) => o.objectId !== objectId) });
  },
  updateObject: (newObject) => {
    set({
      objects: get().objects.map((o) =>
        o.objectId === newObject.objectId ? newObject : o,
      ),
    });
  },
  addtoObjects: (object) => {
    set({ objects: [...get().objects, object] });
  },
}));
