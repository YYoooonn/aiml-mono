"use client";

import { ChangeEvent, MouseEventHandler, useState } from "react";

export default function Test() {
  const [testRes, setTestRes]: any = useState();
  const url = "CLICK TO FETCH : BACKEND_URL/api/test";

  const onClick: MouseEventHandler = async (e) => {
    const res = await fetch("/api/test")
      .then((res) => res.text())
      .catch((err) => {
        console.log(err);
      });
    setTestRes(res);
  };

  return (
    <div onClick={onClick}>
      {url}
      <div>{testRes}</div>
    </div>
  );
}
