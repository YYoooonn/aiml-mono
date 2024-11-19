"use client";

import { useUserInfo } from "@/hook/useUserInfo";

export default function LeftAisleContent() {
  const firstname = useUserInfo((state) => state.firstName);
  const lastname = useUserInfo((state) => state.lastName);
  const username = useUserInfo((state) => state.username);

  if (username) {
    return <></>;
  }
  return (
    <div>
      PROFILE
      <div>
        {firstname} {lastname}
      </div>
      <div>EDIT PROFILE</div>
    </div>
  );
}
