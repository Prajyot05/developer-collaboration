import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { Lato } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const DMSansFont = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

const LatoFont = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Developers' Guild",
  description: "Generated by RAMPP",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`bg-white text-black ${DMSansFont.variable} ${LatoFont.variable}`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
