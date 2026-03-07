import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const andersonGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/AndersonGrotesk/AndersonGrotesk.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AndersonGrotesk/AndersonGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OwnMarket",
  description: "OwnMarket — A trusted digital marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={andersonGrotesk.variable}>
      <body className="antialiased font-normal">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}