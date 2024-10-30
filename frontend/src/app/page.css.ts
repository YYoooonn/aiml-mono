import { style } from "@vanilla-extract/css";
import { bordertest } from "@/components/test.css";
import * as constants from "@/styles/constants";
import { theme } from "@/styles/theme.css";

export const pageContentContainer = style({
  width: "100%",
  display: "flex",
  ...bordertest,
});

export const mainContentContainer = style({
  width: `calc(100% - 2 * ${constants.AISLEWIDTH})`,
  ...bordertest,
});

export const button = style({
  ":hover": {
    color: theme.color.red,
  },
});

// @media (prefers-color-scheme: dark) {
//   .logo {
//     filter: invert();
//   }
// }
