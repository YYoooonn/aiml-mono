"use client";

import { useState } from "react";
import redirectUser from "@/hook/redirectUser";
import { navigate } from "../_actions/navigate";
import Form from "@/components/form/BaseForm";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
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
          type: "text",
        },
        dispatcher: setPassword,
      },
      {
        form: {
          label: "first name",
          type: "text",
        },
        dispatcher: setFirstName,
      },
      {
        form: {
          label: "last name",
          type: "text",
        },
        dispatcher: setLastName,
      },
    ],
    error: error,
    buttonMessage: "register",
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const loginData = {
        username: username,
        password: password,
        firstName: firstname,
        lastName: lastname,
      };
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error(`client - client server status : ${response.status}`);
      }
      const data = await response.json();
      // TODO : store token in local storage
      if (data.hasOwnProperty("error")) {
        setError("Error: ".concat(data["error"]));
        // reset username and password
      } else {
        // XXX login process, need to integrate with Login
        const resLogin = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(loginData),
        });
        if (!resLogin.ok) {
          // ERROR : client - client server
          throw new Error(`client - client server status : ${resLogin.status}`);
        }

        const dataLogin = await resLogin.json();
        if (dataLogin.hasOwnProperty("error")) {
          // ERROR : handle error - alert
          alert(dataLogin["error"]);
          navigate("login");
        } else {
          redirectUser();
        }
      }
    } catch (err) {
      console.log(err);
      setError("Unprecedented error, please try again");
    }
  };
  return <Form propsWithDispatch={props} handleSubmit={handleSubmit} />;
}
