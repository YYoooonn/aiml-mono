import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";

export const formContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "8px",
  width: "80%",
  ...theme.textStyle.subtitle1,
});

export const formLabel = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "left",
  width: "40%",
});

export const formInput = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "left",
  width: "70%",
  padding: 0,
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  borderBottomStyle: "dashed",
  borderWidth: "2px",
  background: "transparent",

  ":focus": {
    outline: "none",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottomStyle: "solid",
  },
});
