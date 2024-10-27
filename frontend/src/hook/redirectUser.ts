import { navigate } from "@/app/_actions/navigate";
import { redirect } from "next/navigation";
import { setUserInfo, getUserId } from "./useUserStore";
import { updateUserInfo } from "@/app/_actions/update";

export default async function pushUser(newURL?: string) {
  console.log("push user");
  try {
    const userInfo = await updateUserInfo();
    if (userInfo) {
      navigate(`projects/${userInfo.userId}`);
    } else {
      throw new Error("error while pushing user");
    }
  } catch (err) {
    console.log(err);
  }
  return;
}
