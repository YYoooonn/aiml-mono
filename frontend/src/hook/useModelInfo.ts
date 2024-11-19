"use client";

import { createObject } from "@/app/_actions/project";
import { createRandomObject } from "@/utils/three";
import { create } from "zustand";
import { useProjectInfo } from "./useProjectInfo";

export interface ModelInfo {
  geometry: {};
  material: {};
  others: {};
}

interface ModelAction {
  set: (model: ModelInfo) => void;
  get: () => ModelInfo;
  setGeometry: (geometry: ModelInfo["geometry"]) => void;
  setMaterial: (material: ModelInfo["material"]) => void;
  setOthers: (aspect: ModelInfo["material"]) => void;
  submit: (projectId: string) => Promise<void>;
}

type ModelState = ModelInfo & ModelAction;

export const DEFAULT: ModelInfo = {
  geometry: {},
  material: {},
  others: {},
};

export const useModelInfo = create<ModelState>()((set, get) => ({
  ...DEFAULT,
  set: (model) => set(model),
  // XXX get material to {}
  get: () => {
    return {
      geometry: get().geometry,
      material: DEFAULT.material,
      others: get().others,
    };
  },
  setGeometry: (geometry) => set({ geometry }),
  setMaterial: (material) => set({ material }),
  setOthers: (others) => set({ others }),
  submit: async (projectId: string) => {
    const randomModel = createRandomObject();
    get().set(randomModel);
    //  console.debug(modelInfo)
    const response = await createObject(projectId, randomModel);
    //console.debug(response);
    if (!response["error"]) {
      set(DEFAULT);
    } else {
      useProjectInfo.getState().addtoObjects(response);
      //console.debug("error while creating object");
    }
  },
}));
