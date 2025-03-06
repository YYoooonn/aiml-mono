import * as styles from "./aisle.css";
import LeftAisleContent from "./content/LeftAisleContent";

export default function LeftAisle() {
  return (
    <div className={styles.leftAisleContainer}>
      <LeftAisleContent />
    </div>
  );
}
