import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";

const baseBorder = {
  border: "2px solid",
  // XXX Color test
  borderColor: `rgba(242, 241, 234, 0.3)`,
  borderRadius: "16px",
};

export const leftAisleInnerWrapper = style({
  display: "block",
  width: "100%",
  height: "100%",
  padding: "16px",
  ...baseBorder,
  backgroundColor: theme.color.black,
  color: theme.color.white,
});

const baseAisleBlock = {
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  height: "24px",
};

export const leftAisleBlock = style({
  ...baseAisleBlock,
});

export const leftAisleText = style({
  position: "relative",
  display: "block",
  height: "100%",
  alignItems: "center",
  ...theme.textStyle.body1,
});

export const leftAisleIcon = style({
  width: "16px",
  height: "16px",
  marginRight: "8px",
  marginLeft: "4px",
  border: "1px solid white",
  borderRadius: "99px",
});

export const aisleHeader = style({
  width: "100%",
  margin: "4px",
  display: "block",
});

export const returnIcon = style({
  width: "12px",
  height: "12px",
  display: "block",
  borderRadius: "100px",
  backgroundColor: theme.color.red70,
  ":hover": {
    backgroundColor: theme.color.red,
    cursor: "pointer",
  },
});

export const aisleWrapper = style({
  padding: "6px",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const workspaceTopContainer = style({
  display: "block",
  width: "100%",
  height: "220px",
  padding: "8px",
  flex: "1 0 auto",
  ...baseBorder,
  backgroundColor: theme.color.black,
});

export const workspaceTopInner = style({
  flexDirection: "column",
  display: "flex",
  height: "100%",
});

export const workspaceBottomContainer = style({
  display: "block",
  width: "100%",
  height: "100%",
  flex: "1 1 auto",
  padding: "8px",
  marginTop: "12px",
  marginBottom: "0px",
  ...baseBorder,
  backgroundColor: theme.color.black,
});

export const bottomHeaderContainer = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const headerButton = {
  display: "block",
  height: "24px",
  width: "50px",
  alignContent: "center",
};

export const headerButtonUnSelected = style({
  ...headerButton,
  ...theme.textStyle.body1,
  userSelect: "none",
  textAlign: "center",
  ":hover": {
    cursor: "pointer",
    ...theme.textStyle.body1Bold,
    // backgroundColor: theme.color.ivory30,
    // borderRadius: "4px",
  },
});

export const headerButtonSelected = style({
  ...headerButton,
  ...theme.textStyle.body1Bold,
  userSelect: "none",
  textAlign: "center",
  borderRadius: "4px",
  backgroundColor: theme.color.ivory30,
});

export const bottomContentContainer = style({
  width: "100%",
  height: "100%",
  marginTop: "8px",
  padding: "6px",
});
