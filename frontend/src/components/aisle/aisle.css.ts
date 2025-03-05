import { createVar, keyframes, style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";
import { bordertest } from "../test.css";
import * as constants from "@/styles/constants";

const AisleContainer = {
  display: "block",
  // color: "black",
  minWidth: constants.AISLEWIDTH,
  alignSelf: "top",
  "@media": {
    [breakpoints.lowTablet]: { display: "none" },
  },
  ...theme.textStyle.test1,
};

export const leftAisleContainer = style({
  overflow: "hidden",
  position: "fixed",
  top: constants.HEADERHEIGHT,
  flexDirection: "column",
  height: `calc(100vh - ${constants.FOOTERHEIGHT} - ${constants.HEADERHEIGHT})`,
  // minHeight: "calc(100% - 16px)",
  float: "left",
  marginLeft: "32px",
  padding: "16px",
  border: "solid",
  borderRadius: "16px",
  // XXX TEST COLOR
  borderColor: `rgba(242, 241, 234, 0.3)`,
  borderWidth: "2px",
  backgroundColor: theme.color.black,
  color: theme.color.white,
  zIndex: 9999,
  ...AisleContainer,
});


const baseAisleBlock = {
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  height: "24px",
}

export const leftAisleBlock = style({
  ...baseAisleBlock
})

export const leftAisleSearchBlock = style({
  ...baseAisleBlock,
  backgroundColor: theme.color.gray5,
  borderRadius: "99px"
})


export const leftAisleIcon = style({
  width: "16px",
  height: "16px",
  marginRight: "8px",
  marginLeft: "4px",
  border: "1px solid white",
  borderRadius: "99px"
})

export const leftAisleText = style({
  position: "relative",
  display: "block",
  height: "100%",
  alignItems: "center",
  ...theme.textStyle.body1
})

export const projectListContainer = style({
  ...baseAisleBlock,
  marginLeft: "32px"
})

export const projectList = style({
  paddingBottom: "8px",
  ...theme.textStyle.body1
})

export const rightAisleContainer = style({
  overflowX: "hidden",
  flexDirection: "column",
  float: "right",
  borderLeft: "1px solid",
  ...AisleContainer,
});

export const clickText = style({
  ":hover": {
    cursor: "pointer",
    color: "red",
  },
});
