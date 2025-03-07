"use client";

import { ObjectInfo } from "@/@types/api";
import { useObjects } from "@/hook/useObjects";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { SelectedInfo, useSelected } from "@/hook/useSelected";
import { toMatrix4, toMatrix4decompose } from "@/utils/calc";
import { Center, Text3D } from "@react-three/drei";
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

export function ProjectObjects({
  objectInfos,
}: {
  objectInfos?: ObjectInfo[];
}) {
  const pObjects = objectInfos ? objectInfos : [];

  const { setSelected, resetSelected, selected, scale, rotation, position } =
    useSelected();

  // unmount시 selected 제거
  useEffect(() => {
    return () => resetSelected();
  }, []);

  return (
    <group>
      <SelectedObject
        selected={selected}
        scale={scale}
        rotation={rotation}
        position={position}
      />
      {pObjects.map((obj, i) => {
        return (
          <MeshObject
            key={i}
            obj={obj}
            handleSelected={() => setSelected(obj)}
          />
        );
      })}
    </group>
  );
}

function SelectedObject(props: SelectedInfo) {
  const { selected, scale, rotation, position } = props;
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

  // XXX temporary for error catch
  // projectId 53
  const newRotation = rotation.map((d) => (isNaN(d) ? 0 : d)) as any;

  // FIXME
  switch (obj.geometry) {
    case "BoxGeometry":
      return (
        <group scale={scale} position={position} rotation={newRotation}>
          <BoxObject
            id={obj.objectId}
            material={obj.material}
            handleSelected={handleSelected}
          />
        </group>
      );
    case "SphereGeometry":
      return (
        <group scale={scale} position={position} rotation={newRotation}>
          <SphereObject
            id={obj.objectId}
            material={obj.material}
            handleSelected={handleSelected}
          />
        </group>
      );
    case "ConeGeometry":
      return (
        <group scale={scale} position={position} rotation={newRotation}>
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
