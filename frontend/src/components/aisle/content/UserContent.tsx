"use client";

import { useUserInfo } from "@/hook/useUserInfo";
import * as styles from "./content.css";
import { useState } from "react";
import redirectUser from "@/hook/redirectUser";
import { BaseLayout, AisleButton } from "../layout/BaseLayout";

export default function UserContent() {
  const { username, projects } = useUserInfo();
  const [showList, setShowList] = useState(true);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault;
    redirectUser(username.concat("/edit"));
  };
  return (
    <BaseLayout>
      <AisleButton text={"Project List"}>
        <div className={styles.leftAisleIcon} />
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
    </BaseLayout>
  );
}
