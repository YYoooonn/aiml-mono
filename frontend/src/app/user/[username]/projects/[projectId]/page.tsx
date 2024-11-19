"use client";

import DefaultCanvas from "@/components/three/Canvas";
import { useChat } from "@/hook/useChat";
import { useModelInfo } from "@/hook/useModelInfo";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { useUserInfo } from "@/hook/useUserInfo";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { projectId: string } }) {
  const setChatOn = useChat((isChatOn) => isChatOn.setChatOn);
  const setChatOff = useChat((isChatOn) => isChatOn.setChatOff);
  const fetchProjectInfo = useProjectInfo((state) => state.fetch);
  const username = useUserInfo((state) => state.username);
  const submitModel = useModelInfo((state) => state.submit);
  //console.debug(params);
  useEffect(() => {
    setChatOn();
    fetchProjectInfo(username, params.projectId);
  }, []);

  useEffect(() => {
    return () => {
      setChatOff();
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("currently for test purpose");
    // submitModel(params.projectId)
    console.log("object submitted");
  };

  return (
    <div>
      <div>workspace : {params.projectId}</div>
      <div onClick={handleClick}> test </div>
      <DefaultCanvas id={params.projectId} />
    </div>
  );
}
