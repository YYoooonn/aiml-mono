import { setUserInfo, getUserInfo } from "@/hook/useUserStore";
import { getCookie } from "@/app/_actions/auth";

const HeaderInfo: any = (token?: string) => {
  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer ".concat(token),
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

export async function updateUserInfo() {
  console.log("push user");
  try {
    const token = await getCookie();
    if (!token) {
      console.log("Token does not exist, please login again");
    }
    const userResponse = await fetch("/api/user", {
      method: "GET",
      headers: HeaderInfo(token),
    });

    console.log("pushUser user response", userResponse);

    if (!userResponse.ok) {
      throw Error("user response error");
    }
    const data = await userResponse.json();

    // TODO match with backend
    setUserInfo(data);

    const userInfo = getUserInfo();
    return userInfo;
  } catch (err) {
    console.log(err);
  }
}
