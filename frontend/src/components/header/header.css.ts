import { createVar, keyframes, style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

export const headerContainer = style({
  position: "fixed",
  display: "block",
  top: "0",
  left: "0",
  alignItems: "center",
  minWidth: "100vw",
  height: constants.HEADERHEIGHT,
  padding: "16px 32px 16px 32px",

  zIndex: 9999,
  // XXX TEST COLOR
  backgroundColor: theme.color.black,
  color: theme.color.white,
  ...theme.textStyle.body1,
});

export const logo = style({
  width: "max-content",
  padding: "8px",
  ":hover": {
    cursor: "pointer",
    color: theme.color.red,
  },
  ...theme.textStyle.logo,
});

export const headerBlock = style({
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "space-between",
});

export const headerLinkBlocks = style({
  display: "flex",
  height: "100%",
  width: "452px",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
});

export const headerLink = style({
  position: "relative",
  display: "block",
  alignItems: "center",
  height: "100%",
  textDecoration: "none",
});

export const profileImg = style({
  position: "relative",
  alignItems: "center",
  display: "flex",
  width: "24px",
  height: "24px",
  borderRadius: 9999,
  backgroundColor: theme.color.ivory,
  cursor: "pointer",
});
