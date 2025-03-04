import { LeftAisle } from "@/components/components";
import * as styles from "./layout.css";

export default function LeftAisleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.LeftAisleLayoutContainer}>
      <LeftAisle />
      <div className={styles.LeftAislePageContainer}>{children}</div>
    </div>
  );
}
