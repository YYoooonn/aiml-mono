import { createCookie, deleteCookie, getCookie, hasCookie } from "./auth";
import { navigate } from "./navigate";

interface UserBaseInfo {
  username: string;
  password: string;
}
export interface UpdateInfo {
  firstName: string;
  lastName: string;
  email?: string;
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

export async function updateUserInfo(props: UpdateInfo) {
  try {
    const res = await fetch("/api/user", {
      method: "PUT",
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
    if (data["token"]) {
      await createCookie(data["token"]);
    }
    return data;
  } catch (e) {
    //console.debug("Error from login :");
    //console.debug(e);
    return { error: "error from login process" };
  }
}

export async function fetchUserInfo(username?: UserBaseInfo["username"]) {
  try {
    // XXX check cookie
    const valid = await hasCookie();
    if (!valid) {
      throw new Error("authentication : no token available");
    }
    // XXX use cookie here or from client-server
    const res = await fetch("/api/user", {
      method: "GET",
    });
    const data = await res.json();
    if (data["username"]) {
      return data;
    } else {
      await deleteCookie();
      throw new Error("authentication : token invalid");
    }
  } catch (e) {
    //console.debug("Error from fetching userinfo :");
    // alert("Access invalid, please login again");
    return { error: e };
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
