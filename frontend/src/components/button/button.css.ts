import { style } from "@vanilla-extract/css";
import { theme } from "@/styles/theme.css";
import { bordertest } from "../test.css";

export const rootButton = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  padding: "8px",
  ...bordertest,
  ...theme.textStyle.heading4,
});

export const logoutButton = style({
  margin: "1px",
  marginLeft: "auto",
  gap: "2px",
  border: "1px solid",
  ...theme.textStyle.subtitle1,
  ":hover": {
    cursor: "pointer",
    color: theme.color.red,
  },
});
