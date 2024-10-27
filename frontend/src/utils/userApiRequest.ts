const HeaderInfo = {
  "Content-Type": "application/json",
};

export default async function userApiRequest(
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
