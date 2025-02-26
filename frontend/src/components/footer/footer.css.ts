import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

export const footerContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  height: constants.FOOTERHEIGHT,
  gap: "32px",
  padding: "8px",
  borderTop: "1px solid",
  ...theme.textStyle.heading4,
});
