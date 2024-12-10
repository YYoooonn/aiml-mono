import { createVar, keyframes, style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";

export const editorContainer = style({
  width: "100%",
  position: "relative",
  zIndex: 99,
  background: theme.color.black,
  color: theme.color.gray0,
  ...theme.textStyle.subtitle1,
});

export const editorInnerContainer = style({
  position: "absolute",
  width: "100%",
  padding: "8px",
});

const baseEditorContents = {
  width: "100%",
  height: "28px",
  display: "grid",
  borderBottom: "1px solid",
  borderColor: theme.color.gray0,

  ...theme.textStyle.subtitle2,
};

export const editorContents = style({
  ...baseEditorContents,
  gridTemplateColumns: "33% 33% 33%",
  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "50% 50%",
    },
    [breakpoints.mobile]: {
      gridTemplateColumns: "100%",
    },
  },
});

export const editorContents4 = style({
  ...baseEditorContents,
  gridTemplateColumns: "25% 25% 25% 25%",
  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "50% 50%",
    },
    [breakpoints.mobile]: {
      gridTemplateColumns: "100%",
    },
  },
});

export const editorContents5 = style({
  ...baseEditorContents,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
});

export const editorItemContainer = style({
  display: "block",
  textAlign: "center",
  width: "100%",
  height: "100%",
  color: theme.color.gray0,
});

export const editorContentSlider = style({
  ...baseEditorContents,
  gridTemplateColumns: "20% 60% 20%",
});

const baseEditorItem = {
  display: "block",
  width: "100%",
  height: "16px",
};

export const editorLabel = style({
  ...baseEditorItem,
  width: "100%",
  height: "100%",
  textAlign: "center",
  ...theme.textStyle.subtitle2,
});

export const editorSelector = style({
  ...baseEditorItem,
  width: "100%",
  height: "100%",
  textAlign: "center",
  ...theme.textStyle.subtitle2,
  ":hover": {
    cursor: "pointer",
    borderStyle: "solid",
    borderWidth: "1px",
    background: theme.color.red,
  },
});

export const editorItem = style({
  ...baseEditorItem,
});

export const sliderContainer = style({
  width: "95%",
  marginLeft: "8px",
  textAlign: "center",
  ...theme.textStyle.small,
});
export const sliderLabel = style({
  display: "block",
  marginBottom: "2px",
});
export const sliderInput = style({
  appearance: "none",
  width: "100%",
  height: "5px",
  borderRadius: "5px",
  background: theme.color.gray2,
  outline: "none",
  transition: "background 0.3s",

  selectors: {
    "&::-webkit-slider-thumb": {
      appearance: "none",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: theme.color.gray3,
      cursor: "pointer",
      transition: "background 0.3s",
    },
    "&::-webkit-slider-thumb:hover": {
      background: theme.color.gray4,
    },
  },
});
