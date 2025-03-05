import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

const baseContainer = {
  display: "block",
  margin: "16px",
  aspectRatio: "360/316",

  color: theme.color.ivory,
  opacity: "70%",
  borderWidth: "1px",
};

export const cardContainer = style({
  ...baseContainer,
  position: "relative",
  ":hover": {
    cursor: "pointer",
    opacity: "100%",
  },
});

const baseCardImage = {
  width: "100%",
  height: "85%",
  border: "solid 1px",
  backgroundColor: theme.color.white,
  opacity: "50%",
}

export const cardImage = style({
  ...baseCardImage,
  backgroundColor: theme.color.white,
});

export const newCardImage = style({
  ...baseCardImage,
  backgroundColor: theme.color.red,
});

export const cardText = style({
  ...theme.textStyle.subtitle1,
  textAlign: "right",
});

export const cardSubtitle = style({
  ...theme.textStyle.subtitle2,
  padding: 0,
});

export const formModalContainer = style({
  width: "80vw",
  maxWidth : "424px",
  padding: "20px",
  paddingTop: "12px",
  color: theme.color.ivory
})

export const formInputBlock = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "64px",
  marginBottom: "24px",
  ...theme.textStyle.body1
})

export const formTag = style({
  display: "block",
  width : "100%"
})

export const formInput = style({
  display: "block",
  marginTop: "auto",
  height: "32px",
  marginBottom: 0,

  overflow: "hidden",
  border: "none",
  background: theme.color.ivory30,

  ":focus": {
    border: "none",
    background: theme.color.ivory,
  },
})

export const boolButtonBlock = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "64px",
  marginBottom: "24px",
  ...theme.textStyle.body1
})


const baseButton = {
  height: "32px",
  alignContent: "center",
  borderRadius: "4px",
  cursor: "pointer",
  borderColor: theme.color.ivory,
}

export const buttonSelected = style({
  ...baseButton,
  width: "45%",
  textAlign: "center",
  border: "1px solid",
  backgroundColor: theme.color.ivory,
  color: theme.color.black
})

export const buttonUnselected = style({
  ...baseButton,
  width: "45%",
  textAlign: "center",
  border: "1px solid",
  backgroundColor: theme.color.black,
  color: theme.color.ivory,
})

export const submitButton = style({
  ...baseButton,
  width: "100%",
  textAlign: "center",
  border: "1px solid",
  backgroundColor: theme.color.black,
  color: theme.color.ivory,
  ":hover": {
    color: theme.color.black,
    borderColor: theme.color.neonGreen,
    backgroundColor: theme.color.neonGreen,
  },
})