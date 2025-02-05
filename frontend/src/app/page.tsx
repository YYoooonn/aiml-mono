import Link from "next/link";
import * as styles from "./page.css";

export default function Home() {
  return (
    <>
      <h1> Landing </h1>
      <div className={styles.button}>
        <Link href={"/redirect"}>Click to login</Link>
      </div>
      <div className={styles.button}>
        <Link href={"/register"}>Click to register</Link>
      </div>
    </>
  );
}
