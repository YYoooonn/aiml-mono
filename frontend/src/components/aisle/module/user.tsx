"use client";

import { useUserInfo } from "@/hook/useUserInfo";
import * as styles from "./user.css";
import { useState } from "react";
import redirectUser from "@/hook/redirectUser";
import { BaseNavLayout, AisleButton } from "./base";

export default function User() {
  const { username, projects } = useUserInfo();
  const [showList, setShowList] = useState(true);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault;
    redirectUser(username.concat("/edit"));
  };
  return (
    <BaseNavLayout>
      <AisleButton text={"Project List"}>
        <div className={styles.userAisleIcon} />
      </AisleButton>
      <div className={styles.projectListContainer}>
        {showList &&
          projects.map((p, i) => {
            return (
              <div key={i} className={styles.projectList}>
                {p.title}
              </div>
            );
          })}
      </div>
    </BaseNavLayout>
  );
}
