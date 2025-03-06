import { BaseLayout } from "../layout/BaseLayout";
import * as styles from "./content.css";

export default function ArchiveContent() {
  return (
    <BaseLayout>
      <div className={styles.leftAisleSearchBlock}>
        <div className={styles.leftAisleIcon} />
        <div className={styles.leftAisleText}>Search</div>
      </div>
    </BaseLayout>
  );
}