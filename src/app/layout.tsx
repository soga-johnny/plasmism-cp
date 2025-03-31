import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import LoadingScreen from "../components/LoadingScreen";
import PageTransitionProvider from "../components/PageTransitionProvider";
import Header from "../components/Header";
import NavigationEvents from "../components/NavigationEvents";
import { Suspense } from "react";
import ClientCursorWrapper from "../components/ClientCursorWrapper";
import ScrollToTop from "../components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "Plasmism",
  description: "プラズミズムは、最適解の設計・実装・検証・改良をコンピューターと情報表現でデザインする会社です。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${notoSansJP.variable} antialiased`}
      >
        <LoadingScreen />
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <Header />
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
        <ClientCursorWrapper />
        <ScrollToTop />
      </body>
    </html>
  );
}
