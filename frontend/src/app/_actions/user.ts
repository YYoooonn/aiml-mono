import { createCookie, deleteCookie } from "./auth";
import { navigate } from "./navigate";

interface UserBaseInfo {
  username: string;
  password: string;
}

interface RegisterInfo extends UserBaseInfo {
  firstName: string;
  lastName: string;
  email?: string;
}

export async function fetchRegister(props: RegisterInfo) {
  try {
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(props),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    //console.debug("Error from registration :");
    //console.debug(e);
    return { error: "Unprecedented Error: please try again" };
  }
}

export async function fetchLogin(props: UserBaseInfo) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: props.username,
        password: props.password,
      }),
    });
    const data = await res.json();
    console.debug(data);
    if (data["token"]) {
      createCookie(data["token"]);
    }
    return data;
  } catch (e) {
    //console.debug("Error from login :");
    //console.debug(e);
    return { error: "error from login process" };
  }
}

export async function fetchUserInfo(username: UserBaseInfo["username"]) {
  try {
    // XXX use cookie here or from client-server
    const res = await fetch("/api/user", {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
    if (data["username"]) {
      return data;
    } else {
      deleteCookie();
      throw new Error("authentication failed");
    }
  } catch (e) {
    //console.debug("Error from fetching userinfo :");
    console.debug(e);
    alert("Access invalid, please login again");
    navigate("/");
    return { error: "Access invalid, please login again" };
  }
}

export async function deleteUser(username: UserBaseInfo["username"]) {
  try {
    // XXX use cookie here or from client-server
    const res = await fetch("/api/user", {
      method: "DELETE",
    });
    const data = await res.json();
    // console.debug(data);
    if (data["username"]) {
      return data;
    } else {
      deleteCookie();
      throw new Error("authentication failed");
    }
  } catch (e) {
    //console.debug("Error from fetching userinfo :");
    console.debug(e);
    alert("Access invalid, please login again");
    navigate("/");
    return { error: "Access invalid, please login again" };
  }
}
