import { style } from "@vanilla-extract/css";
import * as constants from "@/styles/constants";
import { breakpoints } from "@/styles/breakpoints";

export const LeftAisleLayoutContainer = style({
  minWidth: "100%",
  minHeight: "100%",
});

export const LeftAislePageContainer = style({
  width: `calc(100% - 32px - ${constants.AISLEWIDTH})`,
  display: "block",
  marginLeft: `calc(32px + ${constants.AISLEWIDTH})`,
  "@media": {
    [breakpoints.lowTablet]: { marginLeft: 0, width: "100%" },
  },
});
