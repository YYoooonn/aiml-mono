"use client";

import { usePathname } from "next/navigation";
import UserContent from "./UserContent";
import ArchiveContent from "./ArchiveContent";
import WorkspaceContent from "./WorksapceContent";

export default function LeftAisleContent() {

  const pathname = usePathname().split("/")[1];

  if (pathname === "user") {
    return <UserContent />;
  } else if (pathname === "archive") {
    return <ArchiveContent />;
  } else if (pathname === "workspace") {
    return <WorkspaceContent />
  }
  return <></>;
}
