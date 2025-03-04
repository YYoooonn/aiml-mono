import DefaultCanvas from "@/components/three/Canvas";
import * as styles from "./archiveCanvs.css";

export default async function Archive({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={styles.archivePageContainer}>
      <DefaultCanvas id={id} />
    </div>
  );
}
