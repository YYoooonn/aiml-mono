import { style } from "@vanilla-extract/css";
import { bordertest } from "@/components/test.css";
import * as constants from "@/styles/constants";
import { theme } from "@/styles/theme.css";

export const landingContainer = style({
  width: "100%",
  margin: "0",
  padding: "0",
  height: "100%",
  overflowY: "auto",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const landingInnerContainer = style({
  height: "100vh",
});

export const button = style({
  ":hover": {
    color: theme.color.red,
  },
});

export const landingSectionContainer = style({
  position: "relative",
  color: theme.color.ivory,
  width: "100%",
  height: "100%",
  padding: "8px",
  display: "flex",
  paddingLeft: "40px",
  ...theme.textStyle.logo,
});

// @media (prefers-color-scheme: dark) {
//   .logo {
//     filter: invert();
//   }
// }
