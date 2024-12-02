import {
  MeshBasicMaterial,
  MeshDistanceMaterial,
  MeshLambertMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
} from "three";

// FIXME fix any
export const sampleMaterial = new MeshNormalMaterial() as any;
export const blackMaterial = new MeshPhysicalMaterial({
  color: "#666666",
}) as any;

export const camMaterial = new MeshPhysicalMaterial() as any;
