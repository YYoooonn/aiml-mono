import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";

export const pageModalContainer = style({
  position: "absolute",
  display: "flex",
  inset: 0,
  margin: `40px 40px`,
  padding: "12px 12px",
  pointerEvents: "auto",
  overflowY: "auto",
  color: "black",
  backgroundColor: "white",
  height: "80vh",
  width: "80wh",
  zIndex: 100,
  border: "1px solid black",
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
    },
  },
  "@media": {
    [breakpoints.lowTablet]: { padding: 0 },
  },
});

export const pageModalInWrapper = style({
  height: "80vh",
  width: "80%"
});

export const buttonExit = style({
  display: "block",

  ":hover": {
    color: "red",
    cursor: "pointer",
  },
});

export const buttonSubmit = style({
  width: "100%",
  height: "32px",
  border: "1px dashed",
  padding: "4px",
  textAlign: "center",
  ":hover": {
    border: "2px solid",
  },
});
