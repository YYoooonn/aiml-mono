import * as styles from "./aisle.css";

export function LeftAisleLayout({ children }: React.PropsWithChildren) {
  return <div className={styles.leftAisleContainer}>{children}</div>;
}

export function RightAisleLayout({ children }: React.PropsWithChildren) {
  return <div className={styles.rightAisleContainer}>{children}</div>;
}
