import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme.css";
import * as constants from "@/styles/constants";

export const WorkspaceContainer = style({
  height: `calc(100vh - ${constants.HEADERHEIGHT} - ${constants.FOOTERHEIGHT})`,
  width: "100%",
});
