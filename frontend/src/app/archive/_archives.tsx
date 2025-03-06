import * as styles from "./archive.css";
import { CardModule } from "@/components/card/CardModule";

export function Archives({ archives }: { archives: ProjectProps[] }) {
  return (
    <div className={styles.archiveContainer}>
      {archives ? (
        archives.map((val: ProjectProps, i: number) => (
          <CardModule key={i} props={val} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
