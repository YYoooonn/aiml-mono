import { createVar, keyframes, style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";
import { bordertest } from "../test.css";
import * as constants from "@/styles/constants";

const AisleContainer = {
  display: "flex",
  color: "black",
  width: constants.AISLEWIDTH,
  padding: "4px",
  alignSelf: "top",
  "@media": {
    [breakpoints.mobile]: { width: 0, padding: 0 },
  },
  ...theme.textStyle.test1,
};

export const leftAisleContainer = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "left",
  ...AisleContainer,
  ...bordertest,
});

export const rightAisleContainer = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "right",
  ...AisleContainer,
  ...bordertest,
});
