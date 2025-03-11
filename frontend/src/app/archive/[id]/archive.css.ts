import { style } from "@vanilla-extract/css";
import * as constants from "@/styles/constants";

export const archivePageContainer = style({
  height: `calc(100vh - ${constants.HNFHEIGHT})`,
  width: "100%",
});
