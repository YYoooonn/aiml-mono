"use client";

import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const json = JSON.stringify({ username: username, password: password });
      const response = await axios.post(
        "http://13.124.220.49:8080/api/auth/register/",
        json, {
          headers:{
            "Content-Type": `application/json`,
          }
        }
      );
      const jwt = JSON.parse(response.data).token
      localStorage.setItem('token', jwt);
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
}

// export async function getUserInfo() {
//   const cookieStore = cookies();
//   const JSSESSION = cookieStore.get('JSESSIONID')

//   try {
//       const userInfoResponse = await fetch(process.env.BACKEND_URL+'/api/auth/register', {
//           method: 'GET',
//           headers: {
//               'Content-Type': 'application/json',
//               'Cookie': `JSESSIONID=${JSSESSION?.value}`
//           },
//           credentials: 'include'
//       })

//       if (!userInfoResponse.ok) {
//           return null;
//       }

//       return await userInfoResponse?.json()
//   } catch (error) {
//       console.log(error)
//       return null;
//   }

// }
