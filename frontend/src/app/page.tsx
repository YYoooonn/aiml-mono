"use client";

import Link from "next/link";
import * as styles from "./page.css";
import { useEffect, useRef } from "react";
import { FullPageScroll } from "@/components/fullpagescroll/FullPageScroll";

export default function Home() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const wheelHandler = (e: any) => {
      e.preventDefault();
      // 스크롤 행동 구현
    };
    const outerDivRefCurrent = outerRef.current;
    outerDivRefCurrent?.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent?.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  return (
    <FullPageScroll>
      <div className={styles.landingSectionContainer}>
        <p>pg1: Landing</p>
      </div>
      <section className={styles.landingSectionContainer}>
        pg2:
        <div className={styles.button}>
          <Link href={"/redirect"}>Click to login</Link>
        </div>
      </section>
      <section className={styles.landingSectionContainer}>
        pg3:
        <div className={styles.button}>
          <Link href={"/register"}>Click to register</Link>
        </div>
      </section>
      <section className={styles.landingSectionContainer}>
        pg4:
        <div className={styles.button}>
          <Link href={"/archive"}>Go to Archive</Link>
        </div>
      </section>
    </FullPageScroll>
  );
}
