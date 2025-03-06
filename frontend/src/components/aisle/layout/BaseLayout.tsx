import * as styles from "./layout.css";

export function BaseLayout({children} : React.PropsWithChildren) {
  return (
    <div className={styles.leftAisleInnerWrapper}>
      <BaseSideNav />
      {children}
    </div>
  );
}


function BaseSideNav() {
  return (
    <>
      <AisleButton text={"Profile"}>
        <div className={styles.leftAisleIcon} />
      </AisleButton>
      <AisleButton text={"Create"}>
        <div className={styles.leftAisleIcon} />
      </AisleButton>
      <AisleButton text={"Upload"}>
        <div className={styles.leftAisleIcon} />
      </AisleButton>
    </>
  );
}

export function AisleButton({
  children,
  text,
}: {
  text: string;
} & React.PropsWithChildren) {
  return (
    <div className={styles.leftAisleBlock}>
      {children}
      <div className={styles.leftAisleText}>{text}</div>
    </div>
  );
}