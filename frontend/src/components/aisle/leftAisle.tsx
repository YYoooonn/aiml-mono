import * as styles from "./aisle.css";
import LeftAisleContent from "./LeftAisleContent";

export default function LeftAisle() {
  return (
    <div className={styles.leftAisleContainer}>
      "left aisle"
      <LeftAisleContent />
    </div>
  );
}
