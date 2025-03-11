"use client";

import { useModals } from "@/hook/useModals";
import Archive from "../canvas/Archive";
import * as styles from "./archive.css";
import { useEffect, useState } from "react";
import { fetchProject } from "@/app/_actions/project";
import { useRouter } from "next/navigation";

export function ArchiveModal({ id }: { id: string }) {
  const router = useRouter();
  const [archInfo, setArchInfo] = useState({ owner: "", title: "", objts: [] });

  const { close } = useModals();
  useEffect(() => {
    fetchProject(id).then((r) => {
      const owner = r.participants?.filter((p: any) => p.isOwner)[0]?.user
        ?.username;
      setArchInfo({
        owner: owner,
        title: r.title,
        objts: r.objects,
      });
    });
  }, []);

  return (
    <>
      <div className={styles.archiveHeaderContainer}>
        <div
          className={styles.buttonExit}
          onClick={() => {
            router.push("/archive");
            close();
          }}
        />
        <div className={styles.archiveTitle}>
          {archInfo.title ? archInfo.title : "untitled"}
        </div>
        <div className={styles.archiveUser}>
          {archInfo.owner ? archInfo.owner : "anonymous"}
        </div>
      </div>
      <div className={styles.archiveContentWrapper}>
        <Archive objts={archInfo.objts} />
      </div>
    </>
  );
}
