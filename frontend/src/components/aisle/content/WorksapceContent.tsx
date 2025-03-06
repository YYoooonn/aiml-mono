"use client"

import { useEffect, useState } from "react";
import * as styles from "./content.css";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { ObjectInfo } from "@/@types/api";
import { useChat } from "@/hook/useChat";
import { useUserInfo } from "@/hook/useUserInfo";
import { ChatSocket } from "@/components/socket/ChatSocket";
import { WorkspaceBottomLayout, WorkspaceTopLayout } from "../layout/WorkspaceLayout";

export default function WorkspaceContent(){

    const { title, objects } = useProjectInfo();

  return(
    <div className={styles.workspaceContainer}>
        <WorkspaceTopLayout >
            <WorkspaceInfos title={title}/>
        </WorkspaceTopLayout>
        <WorkspaceBottomLayout>
            <WorkspaceUtils />
        </WorkspaceBottomLayout>
    </div>
)
}

function WorkspaceInfos({title}: {title?: string}){
    return(
            <>
                <div className={styles.projectTitle}>{title? title : "PROJECT NAME"}</div>
                <div className={styles.profileImgContainer}>
                    <ProfileImages />
                </div>
                <div className={styles.usersContainer}>
                    <div className={styles.socketHeader}>Online</div>
                    <div className={styles.socketUser}>participant1</div>
                    <div className={styles.socketUser}>participant2</div>
                    <div className={styles.socketUser}>participant3</div>
                </div>
            </>
    )
}

function ProfileImages(){
    return(
        <div style={{width: "100%", height: "100%", display: "flex"}}>
            <div className={styles.profileIcon}/>
            <div className={styles.profileIcon}/>
            <div className={styles.profileIcon}/>
            <div className={styles.profileIcon}/>
        </div>
    )
}

function WorkspaceUtils({objects} : {objects?:ObjectInfo[]} ){
    // true == layer
    const [isSelected, setIsSelected] = useState(true)
    return(
            <>
                <div className={styles.headerButtonContainer}>
                    <div className={isSelected? styles.headerButtonSelected : styles.headerButtonUnSelected} onClick={() => setIsSelected(true)}>Layer</div>
                    <div className={isSelected? styles.headerButtonUnSelected : styles.headerButtonSelected} onClick={() => setIsSelected(false)}>Chat</div>
                </div>
                <div className={styles.bottomContentContainer}>
                    {isSelected? <Layers objects={objects}/> : <Chat />}
                </div>
            </>
    )
}

function Layers({objects} : {objects?:ObjectInfo[]}){
    return(
    <div className={styles.layerContainer}>
        {objects?.map((o) => {
            return(<Layer obj={o}/>)
        })}
    </div>)
}

function Layer({obj} : {obj: ObjectInfo}){
    return(
        <div className={styles.layerTag}>
            {obj.geometry}
        </div>
    )
}


function Chat(){

    const username = useUserInfo((state) => state.username)
    useEffect(() => {
        setChatOn()
    }, [])

    useEffect(() => {
        return () => setChatOff()
    }, [])

    const {setChatOn, setChatOff} = useChat();

    return(
    <div className={styles.chatWrapper} >
        <ChatSocket {...{username: username}}/>
    </div>)
}