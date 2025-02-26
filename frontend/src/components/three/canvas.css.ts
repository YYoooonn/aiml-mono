import { createVar, keyframes, style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";
import { bordertest } from "../test.css";

export const CanvasContainer = style({
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(100, 0, 0, 0.1)",
  textAlign: "center",
  ...theme.textStyle.heading2,
});
