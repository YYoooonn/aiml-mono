"use client";

import DefaultCanvas from "@/components/three/Canvas";

export default function Page({ params }: { params: { projectId: string } }) {
  return (
    <div>
      <div>workspace : {params.projectId}</div>
      <DefaultCanvas />
    </div>
  );
}
