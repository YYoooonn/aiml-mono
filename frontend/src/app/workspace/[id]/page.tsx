"use client";

import Workspace from "@/components/canvas/Workspace";
import * as styles from "../workspace.css";
import { useEffect } from "react";
import { useProjectInfo } from "@/hook/useProjectInfo";

export default function Page({ params }: { params: { id: string } }) {
  const { title, objects, fetch, reset } = useProjectInfo();

  useEffect(() => {
    fetch(params.id);
    return () => reset();
  }, []);

  return (
    <div className={styles.workspaceContainer}>
      <Workspace objts={objects} />
    </div>
  );
}
