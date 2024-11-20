"use client";

import { useEffect, useState } from "react";
import redirectUser from "@/hook/redirectUser";
import { navigate } from "../_actions/navigate";
import Form from "@/components/form/BaseForm";
import { fetchRegister, fetchLogin } from "../_actions/user";
import { useUserInfo } from "@/hook/useUserInfo";

export default function Register() {
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
      {
        form: {
          label: "email",
          type: "text",
        },
        dispatcher: setEmail,
      },
    ],
    error: error,
    buttonMessage: "register",
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const registerData = {
        username: username,
        password: password,
        firstName: firstname,
        lastName: lastname,
        email: email,
      };

      const data = await fetchRegister(registerData);
      if (data.hasOwnProperty("error")) {
        // error message from backend
        setError("Error: ".concat(data["error"]));
      } else {
        // XXX login process, need to integrate with Login
        const res = await fetchLogin({
          username: registerData.username,
          password: registerData.password,
        });
        if (res.hasOwnProperty("error")) {
          // ERROR : handle error - alert
          alert(res["error"]);
          navigate("/login");
        } else {
          redirectUser(username);
        }
      }
    } catch (err) {
      // console.log(err);
      setError("Unprecedented error, please try again");
    }
  };
  return <Form propsWithDispatch={props} handleSubmit={handleSubmit} />;
}
