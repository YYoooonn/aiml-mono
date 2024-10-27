"use client";

import { navigate } from "@/app/_actions/navigate";
import * as styles from "./header.css";

export default function Logo() {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("click event");
    navigate("/");
  };
  return (
    <div onClick={onClick} className={styles.logo}>
      AIML Project
    </div>
  );
}
