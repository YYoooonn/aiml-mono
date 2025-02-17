import React, { ChangeEvent, useState } from "react";
import * as styles from "./slider.css";
// import * as styles from './slider.css'

export function Slider() {
  const [value, setValue] = useState(50); // Default value is 50

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className={styles.sliderContainer}>
      <label className={styles.sliderLabel}>Volume: {value}%</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className={styles.sliderInput}
      />
    </div>
  );
}

export default Slider;
