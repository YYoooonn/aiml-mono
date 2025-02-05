import * as styles from "./aisle.css";
import RightAisleCotents from "./RightAisleContent";

export default function RightAisle() {
  return (
    <div className={styles.rightAisleContainer}>
      "right aisle"
      <RightAisleCotents />
    </div>
  );
}
