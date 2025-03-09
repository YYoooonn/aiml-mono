"use client";

import { ObjectInfo } from "@/@types/api";
import { toMatrix4decompose } from "@/utils/calc";
import { create } from "zustand";

type XYZ = [x: number, y: number, z: number];

export interface SelectedInfo {
  selected: ObjectInfo | undefined;
  position: XYZ | undefined;
  scale: XYZ | undefined;
  rotation: XYZ | undefined;
}

export interface ObjectActions {
  setSelected: (objectInfo: ObjectInfo) => void;
  resetSelected: () => void;
  setScale: (val: XYZ) => void;
  setPosition: (val: XYZ) => void;
  setRotation: (val: XYZ) => void;
  removeSelected: (projectId: string) => Promise<void>;
  updateMatrix: (projectId: string) => Promise<void>;
  updateMaterial: (material: string) => Promise<void>;
}

const DEFAULT: SelectedInfo = {
  selected: undefined,
  position: undefined,
  scale: undefined,
  rotation: undefined,
};

export const useObjectEditor = create<SelectedInfo & ObjectActions>()(
  (set, get) => ({
    ...DEFAULT,
    setSelected: (obj: ObjectInfo) => {
      if (get().selected?.objectId === obj.objectId) {
        get().resetSelected();
      } else {
        set({ selected: obj });
        const mat = toMatrix4decompose(obj.matrix);
        set({
          position: mat.position,
          scale: mat.scale,
          rotation: mat.rotation,
        });
      }
    },
    resetSelected: () => set(DEFAULT),
    setScale: (scale) => set({ scale: scale }),
    setPosition: (pos) => set({ position: pos }),
    setRotation: (rot) => set({ rotation: rot }),

    // fetch
    removeSelected: async (id) => console.log("NOT IMPLEMENTED YET"),
    updateMatrix: async (id) => console.log("NOT IMPLEMENTED YET"),
    updateMaterial: async (mat) => console.log("NOT IMPLEMENTED YET"),
  }),
);
