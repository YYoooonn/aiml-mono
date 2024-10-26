"use client";

import * as styles from "./login.css";
import { useState } from "react";

export default function LoginModule() {
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
    <div className={styles.formContainer}>
      <div className={styles.formLabel}>username :</div>
      <input
        className={styles.formInput}
        type={"text"}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <div className={styles.formLabel}>password :</div>
      <input
        className={styles.formInput}
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <div className={styles.buttonSubmit} onClick={handleSubmit}>
        {" "}
        submit{" "}
      </div>
    </div>
  );
}
