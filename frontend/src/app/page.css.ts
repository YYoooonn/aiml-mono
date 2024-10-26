import { style } from "@vanilla-extract/css";
import { bordertest } from "@/components/test.css";
import * as constants from "@/styles/constants";

export const pageContentContainer = style({
  width: "100%",
  display: "flex",
  ...bordertest,
});

export const mainContentContainer = style({
  width: `calc(100% - 2 * ${constants.AISLEWIDTH})`,
  ...bordertest,
});

// @media (prefers-color-scheme: dark) {
//   .logo {
//     filter: invert();
//   }
// }
