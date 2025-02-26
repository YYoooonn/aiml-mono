"use client";

import { EditorModal } from "@/components/editor/Editor";
import DefaultCanvas from "@/components/three/Canvas";
import { useChat } from "@/hook/useChat";
import { useObjects } from "@/hook/useObjects";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { useUserInfo } from "@/hook/useUserInfo";
import { useEffect, useState } from "react";
import * as styles from "./page.css";

export default function Page({ params }: { params: { projectId: string } }) {
  const setChatOn = useChat((isChatOn) => isChatOn.setChatOn);
  const setChatOff = useChat((isChatOn) => isChatOn.setChatOff);
  const fetchProjectInfo = useProjectInfo((state) => state.fetch);

  const username = useUserInfo((state) => state.username);
  //console.debug(params);
  useEffect(() => {
    setChatOn();
    fetchProjectInfo(params.projectId);
  }, []);

  useEffect(() => {
    return () => {
      setChatOff();
    };
  }, []);

  return (
    <div className={styles.projectPageContainer}>
      {/* <EditorModal /> */}
      <DefaultCanvas id={params.projectId} />
    </div>
  );
}
