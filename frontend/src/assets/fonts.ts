import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";

export const interPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
  variable: "--font-inter-plex-sans",
});

export const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
