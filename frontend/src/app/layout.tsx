import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Equity Research Agent — Automated Financial Analysis",
  description:
    "Professional AI-powered equity research dashboard. Automated financial analysis using LLMs and SEC filings for institutional-grade investment insights.",
  keywords: [
    "equity research",
    "AI analysis",
    "stock analysis",
    "financial dashboard",
    "SEC filings",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
