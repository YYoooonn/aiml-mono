"use client";

import { ProjectCanvas } from "@/components/three/Canvas";
import * as styles from "./archiveCanvas.css";
import { useEffect, useState } from "react";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { ObjectInfo } from "@/@types/api";

export default function ArchiveCanvas({ id }: { id: string }) {
  const { projectId, objects, fetch } = useProjectInfo();
  const [objts, setObjts] = useState<ObjectInfo[]>([]);

  useEffect(() => {
    fetch(id).then((r) => {
      setObjts(r.objects);
      console.log(r.objects.length > 0 ? "not empty": "empty")
    });
  }, []);

  return (
    <div className={styles.archivePageContainer}>
      <ProjectCanvas objts={objts} />
    </div>
  );
}
