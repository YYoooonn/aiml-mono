import * as styles from "./archive.css";
import { ArchiveCard } from "@/components/card/CardModule";

export function Archives({ archives }: { archives: ProjectProps[] }) {
  return (
    <div className={styles.archiveContainer}>
      {archives ? (
        archives.map((val: ProjectProps, i: number) => (
          <ArchiveCard key={i} props={val} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
