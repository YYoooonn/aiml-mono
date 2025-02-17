"use client";

import redirectUser from "@/hook/redirectUser";
import { navigate } from "../_actions/navigate";
import { fetchUserInfo, hasCookie } from "../_actions/user";

// login redirection
export default function Redirect() {
  validate();
  return <></>;
}

async function validate() {
  const valid = await hasCookie();
  console.debug(valid);
  const data = await fetchUserInfo();
  if (data.hasOwnProperty("error")) {
    navigate("/login");
  } else {
    redirectUser(data.username);
  }
}
