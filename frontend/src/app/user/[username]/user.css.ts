import { createVar, keyframes, style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";

export const projectPageHeader = style({
  width: "100%",
  margin: "16px",
  marginBottom: 0,
  ...theme.textStyle.heading3,
});

export const projectContainer = style({
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateColumns: "33% 33% 33%",
  ...theme.textStyle.subtitle1,
  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "50% 50%",
    },
    [breakpoints.mobile]: {
      gridTemplateColumns: "100%",
    },
  },
});

const baseProjectItem = {
  display: "block",
  margin: "16px",
  padding: "8px",
  aspectRatio: "1/1",
  borderStyle: "dashed",
  borderColor: theme.color.black,
  borderWidth: "1px",
};

export const projectItem = style({
  ...baseProjectItem,
  position: "relative",
  borderColor: theme.color.black,
  ":hover": {
    cursor: "pointer",
    borderStyle: "solid",
    borderWidth: "1.5px",
    background: theme.color.gray2,
  },
});

export const newProjectItem = style({
  ...baseProjectItem,
  position: "relative",
  background: "rgba(255, 0, 0, 0.1)",
  borderColor: theme.color.red,
  opacity: 0.5,
  ":hover": {
    cursor: "pointer",
    borderStyle: "solid",
    borderWidth: "1.5px",
    background: "rgba(255, 0, 0, 0.2)",
  },
});

export const projectData = style({
  ...theme.textStyle.subtitle1,
  textAlign: "right",
});

export const newProjectData = style({
  ...theme.textStyle.subtitle1,
  textAlign: "right",
  color: theme.color.red,
});
export const projectDataSubtitle = style({
  ...theme.textStyle.subtitle2,
  padding: 0,
});

export const buttonContainer = style({
  display: "flex",
  height: "12px",
  position: "relative",
  borderColor: theme.color.black,
  ":hover": {
    cursor: "pointer",
    borderStyle: "solid",
    borderWidth: "1.5px",
    background: theme.color.gray2,
  },
});
