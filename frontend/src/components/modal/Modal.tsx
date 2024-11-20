"use client";

import { ReactNode, useEffect, useState } from "react";
import Portal from "@/components/portal";
import * as styles from "./modal.css";

interface ModalProps {
  children: ReactNode;
  selector: string;
  isOpened: boolean;
  handler: (e: React.MouseEvent) => void;
}

export default function Modal({
  children,
  selector,
  isOpened,
  handler,
}: ModalProps) {
  return (
    <Portal selector={selector} show={isOpened}>
      <div className={styles.pageModalContainer}>
        <div className={styles.pageModalInWrapper}>
          <div onClick={handler} className={styles.buttonExit}>
            {" "}
            [ exit ]{" "}
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
}
// return(
//   <Portal selector="portal" show={true}>
//     {children}
//   </Portal>
// )
// }
