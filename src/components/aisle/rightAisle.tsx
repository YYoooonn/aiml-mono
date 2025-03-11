import * as styles from "./aisle.css";
import Editor from "./module/editor/editor";

export default function RightAisle() {
  return (
    <div className={styles.rightAisleContainer}>
      <Editor />
    </div>
  );
}
