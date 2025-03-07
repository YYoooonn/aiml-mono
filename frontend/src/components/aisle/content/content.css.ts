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

export const leftAisleSearchBlock = style({
  ...baseAisleBlock,
  backgroundColor: theme.color.gray5,
  borderRadius: "99px",
});

export const leftAisleBlock = style({
  ...baseAisleBlock,
});

export const leftAisleIcon = style({
  width: "16px",
  height: "16px",
  marginRight: "8px",
  marginLeft: "4px",
  border: "1px solid white",
  borderRadius: "99px",
});

export const leftAisleText = style({
  position: "relative",
  display: "block",
  height: "100%",
  alignItems: "center",
  ...theme.textStyle.body1,
});

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

export const workspaceContainer = style({
  flexDirection: "column",
  display: "flex",
  height: "100%",
});

export const projectTitle = style({
  ...theme.textStyle.subtitle1,
});

export const profileImgContainer = style({
  marginTop: "8px",
  width: "100%",
  height: "24px",
  marginLeft: "8px",
  display: "block",
  alignItems: "center",
});

export const profileIcon = style({
  width: "20px",
  height: "20px",
  borderRadius: "20px",
  marginLeft: "-8px",
  border: "1px solid black",
  display: "flex",
  backgroundColor: theme.color.neonGreen,
});

export const usersContainer = style({
  display: "block",
  width: "100%",
  marginTop: "12px",
  height: "100%",
  flex: "0 1 auto",
  padding: "6px",
  borderRadius: "4px",
  backgroundColor: theme.color.ivory30,
});

export const socketHeader = style({
  ...theme.textStyle.subtitle1,
});

export const socketUser = style({
  display: "flex",
  marginTop: "4px",
  ...theme.textStyle.subtitle2,
});

export const headerButtonContainer = style({
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
  marginTop: "4px",
  padding: "6px",
});

export const layerContainer = style({});

export const layerTag = style({
  ...theme.textStyle.subtitle2,
});

export const chatWrapper = style({
  width: "100%",
  height: "100%",
});

export const chatInput = style({});
