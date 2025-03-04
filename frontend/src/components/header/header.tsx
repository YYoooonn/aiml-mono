import * as styles from "./header.css";
import { Logo, Profile } from "./_headerContents";
import { LogoutButton } from "../button/LogoutButton";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerBlock}>
        <Logo />
        <div className={styles.headerLinkBlocks}>
          <Link href={"/archive"} className={styles.headerLink}>
            Archive
          </Link>
          <Link href={"/documentation"} className={styles.headerLink}>
            Documentation
          </Link>
          <Link href={"/about"} className={styles.headerLink}>
            About
          </Link>
          <Link href={"/contact"} className={styles.headerLink}>
            Contact
          </Link>
          <Profile />
        </div>
      </div>
    </div>
  );
}
