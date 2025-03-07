"use client"

import redirectUser from "@/hook/redirectUser";
import { useUserInfo } from "@/hook/useUserInfo";
import { useEffect } from "react";

// authentication check process
export default function User() {

    const {fetch} = useUserInfo()
    useEffect(() => {
        fetch().then(res => {
            res.username? redirectUser(res.username) : null
        })
    }, [])

  return <></>;
}
