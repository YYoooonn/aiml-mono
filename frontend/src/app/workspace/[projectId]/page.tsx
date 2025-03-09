"use client";

import Workspace from "@/components/canvas/Workspace";
import * as styles from "../workspace.css";
import { useEffect } from "react";
import { useProjectInfo } from "@/hook/useProjectInfo";

export default function Page({ params }: { params: { projectId: string } }) {
  const { title, objects, fetch } = useProjectInfo();

  useEffect(() => {
    fetch(params.projectId);
  }, []);

  return (
    <div className={styles.workspaceContainer}>
      <Workspace objts={objects} />
    </div>
  );
}
