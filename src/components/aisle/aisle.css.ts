import { createVar, keyframes, style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";
import { bordertest } from "../test.css";
import * as constants from "@/styles/constants";

const AisleContainer = {
  display: "block",
  color: "black",
  minWidth: constants.AISLEWIDTH,
  alignSelf: "top",
  "@media": {
    [breakpoints.lowTablet]: { display: "none" },
  },
  ...theme.textStyle.test1,
};

export const leftAisleContainer = style({
  overflowX: "hidden",
  position: "absolute",
  flexDirection: "column",
  height: `calc(100vh - ${constants.FOOTERHEIGHT} - ${constants.HEADERHEIGHT})`,
  // minHeight: "calc(100% - 16px)",
  float: "left",
  marginLeft: "32px",
  padding: "16px",
  borderRadius: "16px",
  // XXX TEST COLOR
  backgroundColor: theme.color.purple,
  zIndex: 9999,
  ...AisleContainer,
});

export const rightAisleContainer = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "right",
  borderLeft: "1px solid",
  ...AisleContainer,
});

export const clickText = style({
  ":hover": {
    cursor: "pointer",
    color: "red",
  },
});
