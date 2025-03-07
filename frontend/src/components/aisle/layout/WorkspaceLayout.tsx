import * as styles from "./layout.css";

export function WorkspaceTopLayout({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.workspaceTopContainer}>
      <div className={styles.workspaceTopInner}>
        <div className={styles.aisleHeader}>
          <div className={styles.returnIcon} />
        </div>
        <div className={styles.aisleWrapper}>{children}</div>
      </div>
    </div>
  );
}

export function WorkspaceBottomLayout({ children }: React.PropsWithChildren) {
  // true == layer
  return (
    <div className={styles.workspaceBottomContainer}>
      <div className={styles.aisleWrapper}>{children}</div>
    </div>
  );
}
