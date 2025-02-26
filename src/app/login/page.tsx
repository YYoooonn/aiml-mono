"use client";

import { useState } from "react";
import redirectUser from "@/hook/redirectUser";
import Form from "@/components/form/BaseForm";
import { fetchLogin } from "../_actions/user";
import * as styles from "./login.css";

export default function Login() {
  return (
    <div className={styles.loginPageContainer}>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const props = {
    props: [
      {
        form: {
          label: "username",
          type: "text",
        },
        dispatcher: setUsername,
      },
      {
        form: {
          label: "password",
          type: "password",
        },
        dispatcher: setPassword,
      },
    ],
    error: error,
  };

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
        redirectUser(loginData.username);
      }
    } catch (err) {
      console.debug(err);
      setError("login error, please try again");
    }
  };

  return <Form propsWithDispatch={props} handleSubmit={handleSubmit} />;
}
