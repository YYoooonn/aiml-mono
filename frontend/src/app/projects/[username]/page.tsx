"use client";
import { UserInfo } from "@/@types/api";
import { getUserInfo } from "@/hook/useUserStore";
import { useState, useEffect } from "react";
import * as styles from "./user.css";
import { ProjectModule, NewProjectModule } from "./_project";

export default function Page({ params }: { params: { username: string } }) {
  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    setUserInfo(getUserInfo());
  }, []);

  return (
    <div>
      <div className={styles.projectPageHeader}>Projects</div>
      <div className={styles.projectContainer}>
        {userInfo?.projects.map((project, i) => {
          return (
            <ProjectModule
              key={i}
              index={i}
              project={project}
              userId={userInfo.userId}
            />
          );
        })}
        <NewProjectModule dispatcher={setUserInfo} />
      </div>
    </div>
  );
}
