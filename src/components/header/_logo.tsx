"use client";

import { navigate } from "@/app/_actions/navigate";
import * as styles from "./header.css";

export default function Logo() {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    //console.debug("navigate home");
    navigate("/");
  };
  return (
    <div onClick={onClick} className={styles.logo}>
      "LOGO"
    </div>
  );
}
