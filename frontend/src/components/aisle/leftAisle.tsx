import * as styles from "./aisle.css";

export default function LeftAisle() {
  return (
    <div className={styles.leftAisleContainer}>
      left aisle
      <div>-----</div>
      <div>user profile</div>
      <div>project info</div>
      <div>etc.</div>
    </div>
  );
}
