"use client";

import { navigate } from "@/app/_actions/navigate";
import * as styles from "./header.css";
import { useUserInfo } from "@/hook/useUserInfo";
import { useModals } from "@/hook/useModals";
import { NewCardModule, NewProjectForm } from "../card/CardModule";

export function Logo() {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    //console.debug("navigate home");
    navigate("/");
  };
  return (
    <div onClick={onClick} className={styles.logo}>
      LABBIT
    </div>
  );
}

export function Profile() {
  const { username, logout } = useUserInfo();
  const handleLogout = () => {
    logout();
    console.log("logged out");
    navigate("/");
  };
  const handleClick = () => {
    alert("profile clicked");
  };

  return (
    <div className={styles.headerLink}>
      {username ? (
        <div onClick={handleLogout}>Logout</div>
      ) : (
        <div className={styles.profileImg} onClick={handleClick}></div>
      )}
    </div>
  );
}


export function Modal() {
  const { open } = useModals()

  const handleClick = () => {
    open(ModalTest)
  }

  return(
    <div className={styles.headerLink} onClick={handleClick}>Modal</div>
  )
}


function ModalTest() {

  return <div className={styles.modalTest}>modal opened</div>
}