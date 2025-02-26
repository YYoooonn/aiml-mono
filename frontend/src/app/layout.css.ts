import { style } from "@vanilla-extract/css";
import { bordertest } from "@/components/test.css";
import { breakpoints } from "@/styles/breakpoints";
import * as constants from "@/styles/constants";
import { theme } from "@/styles/theme.css";

export const layoutContainer = style({
  minHeight: "100vh",
  width: "100vw",
  position: "fixed",
  inset: 0,
  pointerEvents: "auto",
  overflowY: "auto",
  color: "black",
});

export const pageContentContainer = style({
  minWidth: "100%",
  // TODO: SUBTRACT ONLY HEADER?
  minHeight: `calc(100vh - ${constants.HEADERHEIGHT} - ${constants.FOOTERHEIGHT})`,
});

export const mainContentContainer = style({
  width: "100%",
  height: "100%",
  "@media": {
    [breakpoints.lowTablet]: { width: "100%" },
    [breakpoints.mobile]: { width: "100%" },
  },
});
