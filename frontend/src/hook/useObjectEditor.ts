"use client";

import { ObjectInfo } from "@/@types/api";
import { deleteObject, updateObject } from "@/app/_actions/project";
import { toMatrix, toMatrix4decompose } from "@/utils/calc";
import { create } from "zustand";

type XYZ = [x: number, y: number, z: number];

export interface SelectedInfo {
  selected: ObjectInfo | undefined;
  position: XYZ | undefined;
  scale: XYZ | undefined;
  rotation: XYZ | undefined;
  material: string | undefined;
}

export interface ObjectActions {
  setSelected: (objectInfo: ObjectInfo) => void;
  resetSelected: () => void;
  setScale: (val: XYZ) => void;
  setPosition: (val: XYZ) => void;
  setRotation: (val: XYZ) => void;
  setMaterial: (val: string) => void;
  removeSelected: (projectId: string) => Promise<void>;
  updateMatrix: (projectId: string) => Promise<any>;
  updateMaterial: (material: string) => Promise<void>;
}

const DEFAULT: SelectedInfo = {
  selected: undefined,
  position: undefined,
  scale: undefined,
  rotation: undefined,
  material: undefined,
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
          material: obj.material ? obj.material : "#575757",
        });
      }
    },
    resetSelected: () => set(DEFAULT),
    setScale: (scale) => set({ scale: scale }),
    setPosition: (pos) => set({ position: pos }),
    setRotation: (rot) => set({ rotation: rot }),
    setMaterial: (val) => set({ material: val }),
    updateMatrix: async (id) => {
      const { selected, position, rotation, scale, material, resetSelected } =
        get();
      if (selected && position && rotation && scale) {
        const matrix = toMatrix(position, rotation, scale);
        const objectData = await updateObject(selected.objectId, id, {
          matrix: matrix,
          material: material,
        }).then((o) => (o.error ? null : o));
        if (objectData) {
          resetSelected();
          return objectData;
        } else {
          alert("error from object update");
        }
      }
      return null;
    },

    // fetch
    removeSelected: async (id) => {
      const { selected, resetSelected } = get();
      if (selected) {
        alert("NOT IMPLEMENTED YET");
        // await deleteObject(selected.objectId, id).then(() => resetSelected)
      }
    },
    updateMaterial: async (mat) => alert("NOT IMPLEMENTED YET"),
  }),
);
