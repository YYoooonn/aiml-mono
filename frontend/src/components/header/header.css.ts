import { createVar, keyframes, style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

export const headerContainer = style({
  display: "flex",
  top: "0",
  flexDirection: "row",
  alignItems: "center",
  width: "100wh",
  height: constants.HEADERHEIGHT,
  padding: "16px",
  paddingLeft: "32px",
  // XXX TEST COLOR
  backgroundColor: theme.color.green,
  ...theme.textStyle.body1,
});

export const logo = style({
  width: "max-content",
  padding: "8px",
  ":hover": {
    cursor: "pointer",
    color: theme.color.red,
  },
});
