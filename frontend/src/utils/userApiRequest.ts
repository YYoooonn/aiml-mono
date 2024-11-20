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

export async function userApiRequest(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PATCH" = "GET",
  body?: object,
) {
  return await fetch(`${process.env.BACKEND_API_BASE + endpoint}`, {
    method: method,
    headers: HeaderInfo,
    body: JSON.stringify(body),
  });
}

export async function userAuthRequest(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PATCH" = "GET",
  token?: string,
  body?: object,
) {
  console.debug(body);
  return await fetch(`${process.env.BACKEND_API_BASE + endpoint}`, {
    method: method,
    headers: HeaderInfo(token),
    body: JSON.stringify(body),
  });
}
