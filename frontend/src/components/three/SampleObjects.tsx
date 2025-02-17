import { ObjectInfo } from "@/@types/api";
import { sampleBoxGeometry } from "@/assets/geometry";
import { blackMaterial, sampleMaterial } from "@/assets/material";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { randomPositions, randomRotations } from "@/utils/three";
import { Instance, Instances } from "@react-three/drei";
import { useEffect, useState } from "react";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils";

interface Position {
  position: [x: number, y: number, z: number];
}

export default function SampleObjects({ id }: { id: string }) {
  // const projectObjects = useProjectInfo(state => state.objects)
  // console.log(projectObjects)
  const seed = Number(id);
  const positions = randomPositions(seed);
  const rotations = randomRotations(seed);

  // return(
  //   <Instances geometry={sampleBoxGeometry} material={sampleMaterial} scale={0.3}>
  //     {
  //       projectObjects.map((data,i) => {
  //           return <ObjectInstance key={data.objectId} position={data.others.position} rotation={data.others.rotation}/>
  //       })
  //     }
  //   </Instances>
  // )

  return (
    <group>
      <Instances geometry={sampleBoxGeometry} material={blackMaterial}>
        {positions.map((pos, i) => {
          return (
            <ObjectInstance key={i} position={pos} rotation={rotations[i]} />
          );
        })}
      </Instances>
    </group>
  );
}

function ObjectInstance({
  position,
  rotation,
}: {
  position: Position["position"];
  rotation: Position["position"];
}) {
  return <Instance position={position} rotation={rotation} />;
}
