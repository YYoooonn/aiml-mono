"use client";

import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // need to be removed
  const [testResponse, setTestResponse]: any = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = { username: username, password: password };
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
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
    <div>
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
        <button type="submit">회원가입</button>
      </form>
      <div style={{ color: "red" }}></div>
    </div>
  );
}
