"use client";

import Archive from "@/components/canvas/Archive";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { useEffect } from "react";

import * as styles from "./archive.css";

export default function ArchivePage({ params }: { params: { id: string } }) {
  const { title, objects, fetch, reset } = useProjectInfo();

  useEffect(() => {
    fetch(params.id);
    return () => reset();
  }, []);

  return (
    <div className={styles.archivePageContainer}>
      <Archive objts={objects} />
    </div>
  );
}
