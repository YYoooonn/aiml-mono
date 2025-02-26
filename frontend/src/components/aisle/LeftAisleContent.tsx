"use client";

import { useUserInfo } from "@/hook/useUserInfo";
import { MouseEvent } from "react";
import React, { useState } from "react";
import * as styles from "./aisle.css";
import Modal from "../modal/Modal";
import Form from "../form/BaseForm";
import { redirect, usePathname } from "next/navigation";
import redirectUser from "@/hook/redirectUser";

export default function LeftAisleContent() {
  const pathname = usePathname();
  if (pathname.split("/")[1] === "user") {
    return <UserProfile />;
  }
  return <></>;
}

function UserProfile() {
  const userState = useUserInfo((state) => state);
  const handleClick = (e: MouseEvent) => {
    e.preventDefault;
    redirectUser(userState.username.concat("/edit"));
  };

  return (
    <div>
      PROFILE
      <div>USERNAME : {userState.username}</div>
      <div>
        NAME : {userState.firstName} {userState.lastName}
      </div>
      <div>EMAIL : {userState.email}</div>
      <div className={styles.clickText} onClick={handleClick}>
        EDIT PROFILE
      </div>
    </div>
  );
}
