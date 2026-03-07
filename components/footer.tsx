"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Twitter, Github, MessageCircle } from "lucide-react"

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".footer-col", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      })

    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={ref} className="relative mt-40 border-t border-[#E5E5E7]">

      {/* glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="h-[400px] w-[800px] rounded-full bg-gradient-to-r from-[#48E44B]/20 via-[#9EFF3E]/20 to-transparent blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-20">

        {/* top grid */}
        <div className="grid gap-12 md:grid-cols-4">

          {/* brand */}
          <div className="footer-col">

            <h3 className="text-[18px] font-semibold text-[#141519]">
              OwnMarket
            </h3>

            <p className="mt-3 text-sm text-[#767F88] leading-relaxed">
              A modern marketplace connecting digital sellers and buyers.
              Built by a passionate Pakistani indie community.
            </p>

            {/* social */}
            <div className="mt-5 flex gap-4">

              <a className="p-2 rounded-md border border-[#E5E5E7] hover:bg-[#F7F7F8] transition">
                <Twitter size={16}/>
              </a>

              <a className="p-2 rounded-md border border-[#E5E5E7] hover:bg-[#F7F7F8] transition">
                <Github size={16}/>
              </a>

              <a className="p-2 rounded-md border border-[#E5E5E7] hover:bg-[#F7F7F8] transition">
                <MessageCircle size={16}/>
              </a>

            </div>

          </div>

          {/* marketplace */}
          <div className="footer-col">

            <h4 className="text-sm font-medium text-[#141519]">
              Marketplace
            </h4>

            <div className="mt-4 flex flex-col gap-2 text-sm text-[#767F88]">

              <Link href="#">Browse products</Link>
              <Link href="#">Game items</Link>
              <Link href="#">Discord assets</Link>
              <Link href="#">Accounts</Link>
              <Link href="#">Services</Link>

            </div>

          </div>

          {/* sellers */}
          <div className="footer-col">

            <h4 className="text-sm font-medium text-[#141519]">
              Sellers
            </h4>

            <div className="mt-4 flex flex-col gap-2 text-sm text-[#767F88]">

              <Link href="#">Start selling</Link>
              <Link href="#">Seller dashboard</Link>
              <Link href="#">Seller guidelines</Link>
              <Link href="#">Fees</Link>

            </div>

          </div>

          {/* company */}
          <div className="footer-col">

            <h4 className="text-sm font-medium text-[#141519]">
              Company
            </h4>

            <div className="mt-4 flex flex-col gap-2 text-sm text-[#767F88]">

              <Link href="#">About us</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Terms of service</Link>
              <Link href="#">Privacy policy</Link>

            </div>

          </div>

        </div>

        {/* bottom */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-[#E5E5E7] pt-6 text-sm text-[#767F88]">

          <span>
            © {new Date().getFullYear()} OwnMarket. All rights reserved.
          </span>

          <span className="mt-3 md:mt-0">
            Built by Skull & Crypto
          </span>

        </div>

      </div>

    </footer>
  )
}