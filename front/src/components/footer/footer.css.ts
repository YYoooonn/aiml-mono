import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

export const footerContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  height: constants.FOOTERHEIGHT,
  bottom: 0,
  gap: "32px",
  padding: "8px",
  backgroundColor: theme.color.black,
  ...theme.textStyle.heading4,
});
