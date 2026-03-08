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
    <html lang="en" className={`${andersonGrotesk.variable} scroll-smooth`}>
      <body 
        className="min-h-screen bg-[#FAFAFB] font-sans text-[#141519] antialiased selection:bg-[#48E44B]/30"
      >
        {/* The Header is fixed/sticky, so we add a relative wrapper for content */}
        <Header />
        
        <main className="relative flex flex-col">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}