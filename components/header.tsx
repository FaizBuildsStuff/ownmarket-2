"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      
      <div className="mx-auto mt-4 flex h-[68px] max-w-[1200px] items-center justify-between rounded-2xl border border-gray-200 bg-white/80 px-6 backdrop-blur-md">

        {/* Logo */}
        <Link
          href="/"
          className="text-[17px] font-semibold tracking-tight text-gray-900"
        >
          OwnMarket
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 text-[14px] md:flex">

          <Link
            href="/marketplace"
            className="text-gray-500 transition-colors duration-200 hover:text-black"
          >
            Marketplace
          </Link>

          <Link
            href="/categories"
            className="text-gray-500 transition-colors duration-200 hover:text-black"
          >
            Categories
          </Link>

          <Link
            href="/pricing"
            className="text-gray-500 transition-colors duration-200 hover:text-black"
          >
            Pricing
          </Link>

          <Link
            href="/about"
            className="text-gray-500 transition-colors duration-200 hover:text-black"
          >
            About
          </Link>

        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">

          <Link
            href="/login"
            className="hidden text-[14px] text-gray-500 transition-colors duration-200 hover:text-black md:block"
          >
            Sign in
          </Link>

          <Button
            size="sm"
            className="h-9 rounded-lg bg-black px-5 text-[14px] text-white hover:bg-gray-900"
          >
            Get Started
          </Button>

        </div>

      </div>

    </header>
  )
}