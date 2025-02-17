"use client";

import { useUserInfo } from "@/hook/useUserInfo";
import * as styles from "./button.css";
import { navigate } from "@/app/_actions/navigate";

// export const dynamic = "force-dynamic";

// logout button
export function LogoutButton() {
  const username = useUserInfo((state) => state.username);
  const logout = useUserInfo((state) => state.logout);
  const handleLogout = () => {
    logout();
    console.log("logged out");
    navigate("/");
  };
  return (
    <>
      {username ? (
        <div className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
