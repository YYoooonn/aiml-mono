"use client";

import { useUserInfo } from "@/hook/useUserInfo";
import { MouseEvent, PropsWithChildren, useEffect } from "react";
import React, { useState } from "react";
import * as styles from "./aisle.css";
import Modal from "../modal/Modal";
import Form from "../form/BaseForm";
import { redirect, usePathname } from "next/navigation";
import redirectUser from "@/hook/redirectUser";

export default function LeftAisleContent() {
  const pathname = usePathname().split("/")[1];
  if (pathname === "user") {
    return <UserContent />;
  } else if (pathname === "archive") {
    return <ArchiveContent />
  }
  return <></>;
}

function BaseContent() {
  return(
    <>
    <AisleButton text={"Profile"}>
    <div className={styles.leftAisleIcon}/>
  </AisleButton>
  <AisleButton text={"Create"}>
    <div className={styles.leftAisleIcon}/>
  </AisleButton>
  <AisleButton text={"Upload"}>
    <div className={styles.leftAisleIcon}/>
  </AisleButton>
    </>
  )
}

function UserContent() {
  const {username, projects} = useUserInfo();
  const [showList, setShowList] =  useState(true)
  
  const handleClick = (e: MouseEvent) => {
    e.preventDefault;
    redirectUser(username.concat("/edit"));
  };
  return (
    <>
      <BaseContent />
      <AisleButton text={"Project List"}>
      <div className={styles.leftAisleIcon}/>
      </AisleButton>
      <div className={styles.projectListContainer}>
        {showList && projects.map((p, i) => {
          console.log(p.title)
          return <div key={i} className={styles.projectList}>{p.title}</div>
        })}
      </div>
    </>
  );
}

function ArchiveContent(){
  return (
    <>
      <BaseContent />
      <div className={styles.leftAisleSearchBlock}>
        <div className={styles.leftAisleIcon}/>
        <div className={styles.leftAisleText}>
        Search
    </div>
      </div>
    </>
  );
}


function AisleButton({
  children,
  text
}: {
  text: string;
} & PropsWithChildren) {
  return(
    <div className={styles.leftAisleBlock}>
    {children}
    <div className={styles.leftAisleText}>
      {text}
    </div>
  </div>
  );
}
