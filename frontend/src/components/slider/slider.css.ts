import { createVar, keyframes, style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";

export const sliderContainer = style({
  width: "100%",
  margin: "4px auto",
  textAlign: "center",
  ...theme.textStyle.small,
});
export const sliderLabel = style({
  display: "block",
  marginBottom: "2px",
});
export const sliderInput = style({
  appearance: "none",
  width: "100%",
  height: "5px",
  borderRadius: "5px",
  background: theme.color.gray2,
  outline: "none",
  transition: "background 0.3s",

  selectors: {
    "&::-webkit-slider-thumb": {
      appearance: "none",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: theme.color.gray3,
      cursor: "pointer",
      transition: "background 0.3s",
    },
    "&::-webkit-slider-thumb:hover": {
      background: "#0056b3",
    },
  },
});
