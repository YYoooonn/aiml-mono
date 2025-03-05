"use client"

import { v4 as uuidv4 } from 'uuid';

import { useModalStore } from "@/hook/useModalStore"

import * as styles from "./modal.css"

function ModalContainer() {
  const {modals, close} = useModalStore()
  const handleModalClose = () => {
    close()
  }
  return (
    <>
      {modals.map((modal) => {
        const { Component, props } = modal
        props?.size
        return (
          <div key={uuidv4()} className={styles.modalBackgroundWrapper} onClick={handleModalClose}>
            <div className={styles.modalWrapper} onClick={e => e.stopPropagation()}>
              <div className={styles.pageModalInWrapper}>
              <div className={styles.modalHeader}>
                <div className={styles.buttonExit} onClick={handleModalClose}/>
              </div>
                <Component {...props} />

              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ModalContainer
