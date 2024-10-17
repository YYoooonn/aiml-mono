"use client";

import { MouseEventHandler, useState } from "react";

export default function Test() {
  const [testRes, setTestRes] = useState("");
  const url = "CLICK TO FETCH : BACKEND_URL/api/test";

  const onClick: MouseEventHandler = async (e) => {
    e.preventDefault();
    await fetch("/api/test")
      .then((res) => res.text())
      .then((txt) => setTestRes(txt))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div onClick={onClick}>
      {url}
      <div>{testRes}</div>
    </div>
  );
}
