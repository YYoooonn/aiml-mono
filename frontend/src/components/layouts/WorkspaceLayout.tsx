import { LeftAisle, RightAisle } from "@/components/components";
import * as styles from "./layout.css";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.aisleLayoutContainer}>
      <LeftAisle />
      <RightAisle />
      <div className={styles.bothAislePageContainer}>{children}</div>
    </div>
  );
}
