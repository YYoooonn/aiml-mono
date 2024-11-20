import * as styles from "./header.css";
import Logo from "./_logo";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <Logo />
    </div>
  );
}
