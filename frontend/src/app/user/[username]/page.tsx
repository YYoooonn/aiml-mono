"use client";

import { useEffect, useState } from "react";
// import { userStore } from "@/hook/useUserStore";
// import { fetchUserInfo } from "@/app/_actions/user";
import { Projects } from "./_project";
import * as styles from "./user.css";
import { useUserInfo } from "@/hook/useUserInfo";

export default function Page({ params }: { params: { username: string } }) {
  const fetchUserInfo = useUserInfo((state) => state.fetch);
  useEffect(() => {
    fetchUserInfo(params.username);
  }, []);

  return (
    <>
      <div>
        <div className={styles.projectPageHeader}>Projects</div>
        <Projects />
      </div>
    </>
  );
}
