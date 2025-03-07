import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";

export const modalBackgroundWrapper = style({
  position: "absolute",
  width: "100vw",
  height: "100vh",
  zIndex: 999,
});

export const modalWrapper = style({
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, 0)",
  top: "84px",
  backgroundColor: theme.color.black,
});

export const pageModalContainer = style({
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  inset: 0,
  width: "90vw",
  maxWidth: "752px",
  minHeight: "432px",
  margin: "84px auto",
  pointerEvents: "auto",
  overflowY: "auto",
  color: "white",
  backgroundColor: "black",
  zIndex: 1000,
  border: "2px solid",
  borderColor: theme.color.ivory30,
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
  height: "100%",
  width: "100%",
  padding: "12px",
});

export const modalHeader = style({
  width: "100%",
  display: "flex",
});

export const buttonExit = style({
  display: "block",
  float: "right",
  height: "16px",
  width: "16px",
  marginLeft: "auto",
  marginRight: 0,
  backgroundColor: theme.color.red70,
  ":hover": {
    backgroundColor: theme.color.red,
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
