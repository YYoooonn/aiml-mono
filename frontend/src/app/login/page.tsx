"use client";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const loginData = { username: username, password: password };
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(loginData),
      })
      if(!response.ok){
        throw new Error(`client - client server status : ${response.status}`) 
      }
      const data = await response.json()
      console.log(data)
    }
    catch(err){
      console.log(err);
    };

  };
  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   try {
  //     const json = JSON.stringify({ username: username, password: password });
  //     const response = await axios.post(
  //       "http://13.124.220.49:8080/api/users/register",
  //       json,
  //       {
  //         headers: {
  //           "Content-Type": `application/json`,
  //         },
  //       },
  //     );

  //     // localStorage.setItem('token', response.data.jwt);
  //     // router.push('/profile');
  //   } catch (error) {
  //     console.error("가입 실패", error);
  //   }
  // };

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
