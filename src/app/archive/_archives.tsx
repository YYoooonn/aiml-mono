import { useProjectInfo } from "@/hook/useProjectInfo";
import * as styles from "./archive.css";
import { MouseEvent } from "react";
import { navigateArchive } from "../_actions/navigate";

interface ArchiveProp {
  createdAt: string;
  isPublic: boolean;
  lastModifiedAt: string;
  projectId: string;
  subtitle: string;
  title: string;
}

export function Archives({ archives }: { archives: ArchiveProp[] }) {
  return (
    <div className={styles.archiveContainer}>
      {archives ? (
        archives.map((val: ArchiveProp, i: number) => (
          <ArchiveModule key={i} archiveProp={val} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

function ArchiveModule({ archiveProp }: { archiveProp: ArchiveProp }) {
  const fetchProjectInfo = useProjectInfo((state) => state.fetch);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    // XXX ADD ENTERING PROJECT

    console.log(archiveProp.projectId);
    fetchProjectInfo(archiveProp.projectId);
    navigateArchive(archiveProp.projectId);
  };

  return (
    <div className={styles.archiveItem} onClick={handleClick}>
      <div className={styles.archiveImage}></div>
      <div className={styles.archiveData}>
        {archiveProp.title}
        <div className={styles.archiveDataSubtitle}>{archiveProp.subtitle}</div>
      </div>
    </div>
  );
}
