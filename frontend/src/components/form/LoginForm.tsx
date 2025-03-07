"use client";

import { fetchLogin } from "@/app/_actions/user";
import { useState } from "react";
import { PasswordInput, TextInput } from "../ui/input";
import { ButtonSubmit } from "../ui/button";

import * as styles from "./form.css";
import { navigate } from "@/app/_actions/navigate";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loginData = { username: username, password: password };
      const data = await fetchLogin(loginData);
      if (data.hasOwnProperty("error")) {
        // ERROR : handle error - alert
        // alert(data["error"]);
        setError("Error: ".concat(data["error"]));
      } else {
        await navigate(`/user/${username}`)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.baseFormContainer}>
      <TextInput title={"USERNAME"} dispatch={setUsername} />
      <p style={{ marginTop: "24px" }} />
      <PasswordInput title={"PASSWORD"} dispatch={setPassword} />
      <p style={{ marginTop: "24px" }} />
      <ButtonSubmit text={"SUBMIT"} handler={handleSubmit} />
      <p style={{ marginTop: "24px" }} />
      <ButtonSubmit text={"SIGN UP"} handler={handleSubmit} />
    </div>
  );
}
