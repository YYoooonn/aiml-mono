import * as styles from "./aisle.css";
import RightAisleCotents from "./content/RightAisleContent";

export default function RightAisle() {
  return (
    <div className={styles.rightAisleContainer}>
      "right aisle"
      <RightAisleCotents />
    </div>
  );
}
