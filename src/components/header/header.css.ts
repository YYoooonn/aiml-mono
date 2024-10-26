import { createVar, keyframes, style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";
import { bordertest } from "../test.css";

export const headerContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  padding: "8px",
  ...bordertest,
  ...theme.textStyle.heading4,
});
