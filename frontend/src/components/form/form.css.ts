import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";

export const formContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "8px",
  width: "80%",
  minWidth: "150px",
  border: "1.5px solid",
  ...theme.textStyle.subtitle1,
});

export const formLineContainer = style({
  display: "block",
  overflowX: "hidden",
  padding: "4px",
  flexDirection: "column",
  float: "left",
  minWidth: "100%",
});

export const formLabel = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "left",
  width: "100%",
});

export const formInput = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "left",
  width: "70%",
  padding: 0,
  paddingTop: "8px",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  borderBottom: "1.5px dashed",
  background: "transparent",

  ":focus": {
    outline: "none",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottomStyle: "solid",
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
