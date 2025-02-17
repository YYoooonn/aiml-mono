import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";

export const projectContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  pointerEvents: "auto",
  overflowY: "auto",
  color: "white",
  backgroundColor: "black",
  minHeight: "20vh",
  width: "100%",
  zIndex: 100,
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

export const chatContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  pointerEvents: "auto",
  overflowY: "auto",
  color: "black",
  backgroundColor: "transparent",
  width: "100%",
  zIndex: 100,
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

export const chatInWrapper = style({
  height: "80vh",
});

export const chatHeaderContainer = style({
  position: "relative",
  borderBottom: "2px solid",
  ...theme.textStyle.subtitle2,
});

export const userHeaderContainer = style({
  position: "relative",
  paddingTop: "12px",
  borderBottom: "1px solid",
  ...theme.textStyle.subtitle2,
});

export const chatMessageContainer = style({
  position: "relative",
  minWidth: "100%",
});

export const chatMessageHeader = style({
  paddingTop: "12px",
  ...theme.textStyle.subtitle1,
});

export const chatInputContainer = style({
  display: "block",
  overflowX: "hidden",
  paddingTop: "12px",
  flexDirection: "column",
  float: "left",
  minWidth: "100%",
  ...theme.textStyle.subtitle1,
});

export const chatInput = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "left",
  width: "80%",
  padding: 0,
  paddingTop: "4px",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  borderBottom: "1.5px dashed",
  background: "transparent",
  ...theme.textStyle.subtitle2,
  ":focus": {
    outline: "none",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottomStyle: "solid",
  },
});

export const textStyle = style({
  ...theme.textStyle.medium,
});

export const chatLogContainer = style({
  maxHeight: "65vh",
  overflowX: "auto",
  overflowY: "auto",
  wordWrap: "break-word",
});

export const buttonSubmit = style({
  overflowX: "hidden",
  float: "left",
  width: "20%",
  border: "1px dashed",
  textAlign: "center",
  ...theme.textStyle.medium,
  ":hover": {
    border: "2px solid",
  },
});

export const buttonExit = style({
  display: "block",

  ":hover": {
    color: "red",
    cursor: "pointer",
  },
});
