"use client";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // TODO storing tokens
  // const [token, setToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginData = { username: username, password: password };
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error(`client - client server status : ${response.status}`);
      }
      const data = await response.json();
      // TODO : store token in local storage, need to remove log
      console.log(data);
      if (data.hasOwnProperty("error")) {
        alert(data["error"]);
      }
    } catch (err) {
      console.log(err);
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
