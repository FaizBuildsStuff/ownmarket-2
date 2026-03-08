"use client"

import { useState, useLayoutEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: "expo.out", opacity: 0 } 
      });

      // 1. Reveal Header Shell
      tl.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
      })
      // 2. Pop in Nav Items & the CTA Button specifically
      .from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        clearProps: "all" // CRITICAL: This removes GSAP styles after it finishes
      }, "-=0.6");

    }, headerRef)

    return () => ctx.revert()
  }, [])

  const navLinks = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Categories", href: "/categories" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="fixed top-0 z-[100] w-full px-4 pt-4 md:px-6">
      <div 
        ref={headerRef}
        className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between rounded-[24px] border border-white/20 bg-white/70 px-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
      >
        {/* Logo */}
        <Link
          href="/"
          className="nav-item group flex items-center gap-2 text-[18px] font-bold tracking-tighter text-black shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white transition-transform group-hover:rotate-12">
            O
          </div>
          <span className="hidden xs:inline">OwnMarket</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-[14px] font-semibold lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-item relative text-[#767F88] transition-colors hover:text-black group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#48E44B] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right side Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="nav-item hidden text-[14px] font-bold text-[#767F88] transition-colors hover:text-black md:block"
          >
            Sign in
          </Link>

          {/* THE BUTTON: Optimized for visibility */}
          <Button
            size="sm"
            className="nav-item group flex h-11 rounded-[14px] bg-black px-6 text-[14px] font-bold text-white transition-all hover:bg-[#1a1a1a] hover:shadow-xl active:scale-95 z-10"
          >
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Join</span>
            <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/5 border border-black/5 lg:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Refined Design) */}
      {isOpen && (
        <div className="absolute left-4 right-4 top-[90px] z-[101] rounded-[32px] border border-white/20 bg-white/95 p-8 backdrop-blur-2xl shadow-2xl lg:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold tracking-tight text-[#141519]"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-black/5" />
            <div className="flex flex-col gap-4">
              <Link href="/login" className="text-center font-bold text-[#767F88] py-2">Sign in</Link>
              <Button className="w-full h-14 rounded-2xl bg-black text-lg font-bold shadow-lg shadow-black/10">
                Create Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}