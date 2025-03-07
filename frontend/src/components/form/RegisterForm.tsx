"use client";

import redirectUser from "@/hook/redirectUser";
import { fetchLogin, fetchRegister } from "@/app/_actions/user";
import { useEffect, useState } from "react";
import { PasswordInput, TextInput } from "../ui/input";
import { ButtonSubmit } from "../ui/button";

import * as styles from "./form.css";
import { useUserInfo } from "@/hook/useUserInfo";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const resetInfo = useUserInfo((state) => state.reset);

  useEffect(() => {
    resetInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetchRegister({
      username: username,
      password: password,
      firstName: firstname,
      lastName: lastname,
      email: email,
    })
      .then((res) =>
        res.error
          ? setError("Error: ".concat(res.error))
          : fetchLogin({
              username: username,
              password: password,
            }),
      )
      .then((res) =>
        res.error ? alert("Error: ".concat(res.error)) : redirectUser(username),
      )
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={styles.baseFormContainer}>
      <TextInput title={"USERNAME"} dispatch={setUsername} />
      <p style={{ marginTop: "24px" }} />
      <PasswordInput title={"PASSWORD"} dispatch={setPassword} />
      <p style={{ marginTop: "24px" }} />
      <TextInput title={"FIRST NAME"} dispatch={setFirstName} />
      <p style={{ marginTop: "24px" }} />
      <TextInput title={"LAST NAME"} dispatch={setLastName} />
      <p style={{ marginTop: "24px" }} />
      <TextInput title={"EMAIL"} dispatch={setEmail} />
      <p style={{ marginTop: "24px" }} />
      <ButtonSubmit text={"SUBMIT"} handler={handleSubmit} />
    </div>
  );
}
