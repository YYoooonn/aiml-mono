import { style } from "@vanilla-extract/css";
import { bordertest } from "@/components/test.css";
import { breakpoints } from "@/styles/breakpoints";
import * as constants from "@/styles/constants";

export const layoutContainer = style({
  minHeight: "100vh",
  minWidth: "100wh",
  position: "fixed",
  inset: 0,
  pointerEvents: "auto",
  overflowY: "auto",
  color: "black",
});

export const pageContentContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  ...bordertest,
});

export const mainContentContainer = style({
  width: `calc(100% - 2 * ${constants.AISLEWIDTH})`,
  padding: "8px",
  ...bordertest,
  "@media": {
    [breakpoints.mobile]: { width: "100%" },
  },
});
