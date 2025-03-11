// XXX DEPRECIATED

"use client";

import * as styles from "./archive.css";
import { useEffect } from "react";
import { useProjectInfo } from "@/hook/useProjectInfo";
import Archive from "@/components/canvas/Archive";

export default function ArchiveCanvas({ id }: { id: string }) {
  const { objects, fetch } = useProjectInfo();

  useEffect(() => {
    fetch(id);
  }, []);

  return (
    <div className={styles.archivePageContainer}>
      <Archive objts={objects} />
    </div>
  );
}
