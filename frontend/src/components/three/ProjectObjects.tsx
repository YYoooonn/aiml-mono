"use client";

import { ObjectInfo } from "@/@types/api";
import { SelectedInfo, useObjectEditor } from "@/hook/useObjectEditor";

import { toMatrix4, toMatrix4decompose } from "@/utils/calc";
import { useEffect } from "react";

const SELECTEDCOLOR = "#FFEA00";

interface MeshProps {
  obj: ObjectInfo;
  handleSelected: () => void;
}

export function ProjectObjects({
  objectInfos,
}: {
  objectInfos?: ObjectInfo[];
}) {
  const pObjects = objectInfos ? objectInfos : [];

  const { setSelected, resetSelected, selected, scale, rotation, position } =
    useObjectEditor();

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
  return (
    <group scale={scale} position={position} rotation={rotation}>
      <group>
        <mesh matrix={matrix}>
          {selected.geometry === "BoxGeometry" ? (
            <boxGeometry />
          ) : selected.geometry === "SphereGeometry" ? (
            <sphereGeometry />
          ) : (
            <coneGeometry />
          )}
          <meshStandardMaterial color={SELECTEDCOLOR} />
        </mesh>
      </group>
    </group>
  );
}

function MeshObject({ obj, handleSelected }: MeshProps) {
  const { position, scale, rotation } = toMatrix4decompose(obj.matrix);

  // XXX temporary for error catch
  // projectId 53
  const newRotation = rotation.map((d) => (isNaN(d) ? 0 : d)) as any;

  return (
    <group scale={scale} position={position} rotation={newRotation}>
      <mesh onClick={handleSelected}>
        {obj.geometry === "BoxGeometry" ? (
          <boxGeometry />
        ) : obj.geometry === "SphereGeometry" ? (
          <sphereGeometry />
        ) : (
          <coneGeometry />
        )}
        <meshStandardMaterial color={obj.material} />
      </mesh>
    </group>
  );
}

// interface MeshObjectProps {
//   id: string;
//   material: string;
//   handleSelected: () => void;
// }

// function BoxObject({ id, material, handleSelected }: MeshObjectProps) {
//   return (
//     <mesh onClick={handleSelected}>
//       <boxGeometry />
//       <meshStandardMaterial color={material} />
//     </mesh>
//   );
// }

// function SphereObject({ id, material, handleSelected }: MeshObjectProps) {
//   return (
//     <mesh onClick={handleSelected}>
//       <sphereGeometry />
//       <meshStandardMaterial color={material} />
//     </mesh>
//   );
// }

// function ConeObject({ id, material, handleSelected }: MeshObjectProps) {
//   return (
//     <mesh onClick={handleSelected}>
//       <coneGeometry />
//       <meshStandardMaterial color={material} />
//     </mesh>
//   );
// }
