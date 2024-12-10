"use client";

import { create } from "zustand";
import { UserInfo, Project, ObjectInfo, ObjectConstructor } from "@/@types/api";
import { fetchUserInfo, updateUserInfo, UpdateInfo } from "@/app/_actions/user";
import { Matrix4 } from "three";
import { convertMatrix } from "@/utils/calc";
import { createObject, deleteObject } from "@/app/_actions/project";

export interface ObjectActions {
  objects: ObjectInfo[];
  projectId: string;
  selected: string | undefined;
  selectedObj: ObjectInfo | undefined;
  fetch: (projectId: string) => Promise<void>;
  setSelected: (objectId: string) => void;
  resetSelected: () => void;
  getSelectedInfo: (objectId: string) => ObjectInfo | undefined;
  setProjectId: (projectId: string) => void;
  setObjects: (objects: ObjectInfo[]) => void;
  addObject: (objConstructor: ObjectConstructor) => Promise<void>;
  removeSelected: () => void;
  updateMatrix: (matrix: string) => void;
  updateMaterial: (material: string) => void;
}

export const useObjects = create<ObjectActions>()((set, get) => ({
  selected: undefined,
  objects: [],
  projectId: "",
  selectedObj: undefined,
  setProjectId: (projectId: string) => {
    set({ projectId: projectId });
  },
  setObjects: (objects) => {
    // objects.forEach((o) => {
    //   convertMatrix(o.matrix)
    // })
    set({ objects: objects });
  },
  fetch: async (projectId) => {},
  setSelected: (objectId) => {
    set({ selected: objectId });
    const selected = get().objects.find((o) => o.objectId === objectId);
    if (selected) {
      set({ selectedObj: selected });
    }
  },
  resetSelected: () => {
    set({ selected: undefined });
    set({ selectedObj: undefined });
  },
  getSelectedInfo: (objectId) => {
    const selected = get().objects.find((o) => o.objectId === objectId);
    return selected;
  },
  addObject: async (objConstructor) => {
    // CREATION
    const response = await createObject(objConstructor, get().projectId);
    console.log(response);
    set({ objects: [...get().objects, response] });
  },
  removeSelected: () => {
    const objId = get().selected;
    if (objId) {
      deleteObject(objId, get().projectId);
      set({ objects: get().objects.filter((o) => o.objectId != objId) });
      get().resetSelected();
    }
  },
  updateMatrix: (matrix) => {
    // UPDATE matrix
    if (get().selected) {
    }
  },
  updateMaterial: (material) => {
    // UPDATE material
    if (get().selected) {
    }
  },
}));
