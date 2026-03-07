import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const andersonGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/AndersonGrotesk/AndersonGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
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
    {
      path: "../public/fonts/AndersonGrotesk/AndersonGrotesk-Ultrabold.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-anderson",
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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${andersonGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}