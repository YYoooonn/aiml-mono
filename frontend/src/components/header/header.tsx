import * as styles from "./header.css";
import Logo from "./_logo";
import { LogoutButton } from "../button/LogoutButton";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <Logo />
      <LogoutButton />
    </div>
  );
}
