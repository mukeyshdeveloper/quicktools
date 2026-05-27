import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quickutils.in";

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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
