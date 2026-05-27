import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thequickutils.in";

const sans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = DM_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "QuickUtils - Free Online Tools for Everyday Tasks",
  description:
    "Use free browser-based calculators, text tools, generators and developer utilities with no signup.",
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics gaId="G-WQX1X1V2B1" />
      </body>
    </html>
  );
}
