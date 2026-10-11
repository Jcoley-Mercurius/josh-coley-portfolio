import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RouteFocus from "./components/RouteFocus";
import "./globals.css";

const description =
  "Websites, booking experiences, SaaS portals, and marketplaces. Web and product development by Josh Coley.";

export const metadata: Metadata = {
  title: {
    default: "Mercurius Solutions · Web and product development",
    template: "%s · Mercurius Solutions",
  },
  description,
  authors: [{ name: "Josh Coley" }],
  openGraph: {
    title: "Mercurius Solutions · Web and product development",
    description,
    siteName: "Mercurius Solutions",
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
    // Lets Next turn off CSS smooth scrolling during route changes (Next 16).
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen antialiased">
        <a className="a1-btn skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <RouteFocus />
      </body>
    </html>
  );
}
