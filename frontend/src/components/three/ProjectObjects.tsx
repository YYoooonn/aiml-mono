"use client";

import { ObjectInfo } from "@/@types/api";
import { useObjects } from "@/hook/useObjects";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { useSelected } from "@/hook/useSelected";
import { toMatrix4, toMatrix4decompose } from "@/utils/calc";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as THREE from "three";

const SELECTEDCOLOR = "#FFEA00";

interface MeshProps {
  obj: ObjectInfo;
  handleSelected: () => void;
}

interface MeshObjectProps {
  id: string;
  material: string;
  handleSelected: () => void;
}

export function ProjectObjects() {
  const pObjects = useProjectInfo((state) => state.objects);
  const setSelected = useSelected((state) => state.setSelected);
  const handleSelected = (obj: ObjectInfo) => {
    setSelected(obj);
  };

  return (
    <group>
      <SelectedObject />
      {pObjects.map((obj, i) => {
        return (
          <MeshObject
            key={i}
            obj={obj}
            handleSelected={() => handleSelected(obj)}
          />
        );
      })}
    </group>
  );
}

function SelectedObject() {
  const selected = useSelected((state) => state.selected);
  const scale = useSelected((state) => state.scale);
  const rotation = useSelected((state) => state.rotation);
  const position = useSelected((state) => state.position);
  if (!selected) {
    return <></>;
  }
  const matrix = toMatrix4(selected.matrix);
  // FIXME
  switch (selected.geometry) {
    case "BoxGeometry":
      return (
        <group scale={scale} rotation={rotation} position={position}>
          <group scale={[1.01, 1.01, 1.01]}>
            <mesh matrix={matrix}>
              <boxGeometry />
              <meshPhysicalMaterial color={SELECTEDCOLOR} />
            </mesh>
          </group>
        </group>
      );
    case "SphereGeometry":
      return (
        <group scale={scale} rotation={rotation} position={position}>
          <group scale={[1.01, 1.01, 1.01]}>
            <mesh matrix={matrix}>
              <sphereGeometry />
              <meshPhysicalMaterial color={SELECTEDCOLOR} />
            </mesh>
          </group>
        </group>
      );
    case "ConeGeometry":
      return (
        <group scale={scale} rotation={rotation} position={position}>
          <group scale={[1.01, 1.01, 1.01]}>
            <mesh matrix={matrix}>
              <coneGeometry />
              <meshPhysicalMaterial color={SELECTEDCOLOR} />
            </mesh>
          </group>
        </group>
      );
    default:
      return <></>;
  }
}

function MeshObject({ obj, handleSelected }: MeshProps) {
  const { position, scale, rotation } = toMatrix4decompose(obj.matrix);
  // FIXME
  switch (obj.geometry) {
    case "BoxGeometry":
      return (
        <group scale={scale} position={position} rotation={rotation}>
          <BoxObject
            id={obj.objectId}
            material={obj.material}
            handleSelected={handleSelected}
          />
        </group>
      );
    case "SphereGeometry":
      return (
        <group scale={scale} position={position} rotation={rotation}>
          <SphereObject
            id={obj.objectId}
            material={obj.material}
            handleSelected={handleSelected}
          />
        </group>
      );
    case "ConeGeometry":
      return (
        <group scale={scale} position={position} rotation={rotation}>
          <ConeObject
            id={obj.objectId}
            material={obj.material}
            handleSelected={handleSelected}
          />
        </group>
      );
    default:
      return <></>;
  }
}

function BoxObject({ id, material, handleSelected }: MeshObjectProps) {
  return (
    <mesh onClick={handleSelected}>
      <boxGeometry />
      <meshStandardMaterial color={material} />
    </mesh>
  );
}

function SphereObject({ id, material, handleSelected }: MeshObjectProps) {
  return (
    <mesh onClick={handleSelected}>
      <sphereGeometry />
      <meshStandardMaterial color={material} />
    </mesh>
  );
}

function ConeObject({ id, material, handleSelected }: MeshObjectProps) {
  return (
    <mesh onClick={handleSelected}>
      <coneGeometry />
      <meshStandardMaterial color={material} />
    </mesh>
  );
}
