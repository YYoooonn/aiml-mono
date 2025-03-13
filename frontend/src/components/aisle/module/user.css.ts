import { createVar, keyframes, style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import { leftAisleIcon, baseAisleBlock } from "./base.css";

export const userAisleIcon = leftAisleIcon;

export const projectListContainer = style({
  ...baseAisleBlock,
  display: "block",
  marginLeft: "32px",
});

export const projectList = style({
  width: "100%",
  paddingBottom: "4px",
  ...theme.textStyle.body1,
});
