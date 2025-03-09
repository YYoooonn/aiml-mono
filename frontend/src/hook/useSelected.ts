"use client";

import { create } from "zustand";
import { UserInfo, Project, ObjectInfo, ObjectConstructor } from "@/@types/api";
import { updateUserInfo, UpdateInfo } from "@/app/_actions/user";
import { Matrix4, Vector3 } from "three";
import {
  convertMatrix,
  toMatrix,
  toMatrix4,
  toMatrix4decompose,
} from "@/utils/calc";
import {
  createObject,
  deleteObject,
  updateObject,
} from "@/app/_actions/project";

export interface SelectedInfo {
  selected: ObjectInfo | undefined;
  position: [x: number, y: number, z: number];
  scale: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
}

export interface ObjectActions extends SelectedInfo {
  setScale: ({ detail, value }: { detail: string; value: number }) => void;
  setPosition: ({ detail, value }: { detail: string; value: number }) => void;
  setRotation: ({ detail, value }: { detail: string; value: number }) => void;
  fetch: (projectId: string) => Promise<void>;
  setSelected: (objectInfo: ObjectInfo) => void;
  resetSelected: () => void;
  removeSelected: (projectId: string) => Promise<void>;
  updateMatrix: (projectId: string) => Promise<void>;
  updateMaterial: (material: string) => void;
}

const DEFAULT: SelectedInfo = {
  selected: undefined,
  position: [0, 0, 0],
  scale: [1, 1, 1],
  rotation: [0, 0, 0],
};

export const useSelected = create<ObjectActions>()((set, get) => ({
  ...DEFAULT,
  fetch: async (projectId) => {},
  setSelected: (objectInfo) => {
    if (objectInfo === get().selected) {
      get().resetSelected();
    } else {
      set({ selected: objectInfo });
      const infos = toMatrix4decompose(objectInfo.matrix);
      set({
        scale: infos.scale as any,
        rotation: infos.rotation as any,
        position: infos.position as any,
      });
    }
  },
  resetSelected: () => {
    set(DEFAULT);
  },
  removeSelected: async (projectId: string) => {
    const objectInfo = get().selected;
    if (objectInfo) {
      await deleteObject(objectInfo.objectId, projectId);
      get().resetSelected();
    }
  },
  setScale: ({ detail, value }: { detail: string; value: number }) => {
    // FIXME
    if (detail === "x") {
      set({ scale: [value, get().scale[1], get().scale[2]] });
    } else if (detail === "y") {
      set({ scale: [get().scale[0], value, get().scale[2]] });
    } else {
      set({ scale: [get().scale[0], get().scale[1], value] });
    }
  },
  setPosition: ({ detail, value }: { detail: string; value: number }) => {
    // FIXME
    if (detail === "x") {
      set({ position: [value, get().position[1], get().position[2]] });
    } else if (detail === "y") {
      set({ position: [get().position[0], value, get().position[2]] });
    } else {
      set({ position: [get().position[0], get().position[1], value] });
    }
  },
  setRotation: ({ detail, value }: { detail: string; value: number }) => {
    const rot = value;
    if (detail === "x") {
      set({ rotation: [rot, get().rotation[1], get().rotation[2]] });
    } else if (detail === "y") {
      set({ rotation: [get().rotation[0], rot, get().rotation[2]] });
    } else {
      set({ rotation: [get().rotation[0], get().rotation[1], rot] });
    }
  },
  updateMatrix: async (projectId) => {
    // UPDATE matrix
    if (get().selected) {
      const selected = get().selected;
      const matrix = toMatrix(get().position, get().rotation, get().scale);
      if (selected) {
        get().setSelected({ ...selected, matrix });
        await updateObject(selected.objectId, projectId, { matrix: matrix });
        set({ selected: undefined });
      }
    }
  },
  updateMaterial: (material) => {
    // UPDATE material
    if (get().selected) {
    }
  },
}));
