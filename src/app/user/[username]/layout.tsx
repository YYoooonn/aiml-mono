import { LeftAisle } from "@/components/components";
import * as styles from "./layout.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.userLayoutContainer}>
      <LeftAisle />
      {children}
    </div>
  );
}
