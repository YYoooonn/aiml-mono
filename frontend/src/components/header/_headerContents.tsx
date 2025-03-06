"use client";

import { navigate } from "@/app/_actions/navigate";
import * as styles from "./header.css";
import { useUserInfo } from "@/hook/useUserInfo";
import useComponentVisible from "@/hook/useComponentVisible";
import Link from "next/link";

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
  const { username, email, logout } = useUserInfo();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible();
  const handleLogout = () => {
    logout();
    setIsComponentVisible(false);
    navigate("/");
  };

  return (
    <>
      {username ? (
        <div className={styles.headerLink}>
          <div
            className={styles.profileImg}
            onClick={() => setIsComponentVisible(!isComponentVisible)}
          ></div>
        </div>
      ) : (
        <>
          <Link href={"/register"} className={styles.headerLink}>
            SignIn
          </Link>
          <Link href={"/login"} className={styles.headerLink}>
            LogIn
          </Link>
        </>
      )}
      {isComponentVisible ? (
        <div className={styles.profileDropdown} ref={ref}>
          <ProfileDropdown
            username={username}
            email={email}
            handleLogout={handleLogout}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

function ProfileDropdown({
  handleLogout,
  username,
  email,
}: {
  handleLogout: () => void;
  username?: string;
  email?: string;
}) {
  return (
    <div className={styles.profileInnerWrapper}>
      <div className={styles.dropdownList}>{username}</div>
      <div className={styles.dropdownList}>{email ? email : "empty email"}</div>
      <div className={styles.dropdownList}>
        <div className={styles.dropdownButtonWrapper}>
          <div className={styles.dropdownButton}>EDIT PROFILE</div>
          <div className={styles.dropdownButton} onClick={handleLogout}>
            SIGN OUT
          </div>
        </div>
      </div>
    </div>
  );
}
