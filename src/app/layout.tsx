import type { Metadata } from "next";
import { geistSans, interPlexSans } from "@/assets/fonts";
import { Header, Footer, LeftAisle, RightAisle } from "@/components/components";
import "@/styles/global.css";
import * as styles from "./layout.css";

export const metadata: Metadata = {
  title: "AIML Project",
  description: "3d real-time web editing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interPlexSans.variable} ${geistSans.variable}`}
    >
      <head></head>
      <body>
        <main className={styles.layoutContainer}>
          <Header />
          <div className={styles.pageContentContainer}>
            <LeftAisle />
            <div className={styles.mainContentContainer}>{children}</div>
            <RightAisle />
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
