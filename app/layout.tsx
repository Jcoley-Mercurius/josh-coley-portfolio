import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Joshua Coley — AI-Powered Web Solutions for Small Businesses",
  description:
    "I build AI-powered websites and business tools for small businesses and service companies. Real business experience meets modern development. Based in Cape Coral, Florida.",
  keywords: [
    "web developer",
    "AI websites",
    "small business websites",
    "Cape Coral",
    "Fort Myers",
    "Southwest Florida",
    "freelance developer",
    "business tools",
  ],
  authors: [{ name: "Joshua Coley" }],
  openGraph: {
    title: "Joshua Coley — AI-Powered Web Solutions for Small Businesses",
    description:
      "I build AI-powered websites and business tools for small businesses and service companies. Based in Cape Coral, Florida.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
