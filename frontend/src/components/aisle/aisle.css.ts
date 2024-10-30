import { createVar, keyframes, style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";
import { bordertest } from "../test.css";
import * as constants from "@/styles/constants";

const AisleContainer = {
  display: "flex",
  color: "black",
  minWidth: constants.AISLEWIDTH,
  padding: "4px",
  alignSelf: "top",
  "@media": {
    [breakpoints.lowTablet]: { display: "none" },
  },
  ...theme.textStyle.test1,
};

export const leftAisleContainer = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "left",
  borderRight: "1px solid",
  ...AisleContainer,
});

export const rightAisleContainer = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "right",
  borderLeft: "1px solid",
  ...AisleContainer,
});
