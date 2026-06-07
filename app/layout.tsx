import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { Lato } from "next/font/google";
import { Inter } from "next/font/google";
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

const InterFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Developers' Guild — Find Your Dream Team",
  description:
    "A platform where developers connect, communicate, and collaborate. Browse projects, find teammates, and build something amazing together.",
  keywords: ["developers", "collaboration", "projects", "teamwork", "coding", "open source"],
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
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning={true}
        className={`bg-theme-primary text-theme-primary ${DMSansFont.variable} ${LatoFont.variable} ${InterFont.variable} font-inter antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
