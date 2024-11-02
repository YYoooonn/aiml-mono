import { navigate } from "@/app/_actions/navigate";

export default async function pushUser(username: string) {
  //console.debug("push user");
  try {
    if (username) {
      navigate(`/user/${username}`);
    } else {
      throw new Error("error while pushing user");
    }
  } catch (err) {
    console.log(err);
  }
  return;
}
