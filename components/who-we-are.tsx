"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Crown, Code2, Rocket } from "lucide-react"

export default function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section ref={ref} className="relative mx-auto max-w-[1200px] px-6 py-36">

      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="h-[500px] w-[900px] rounded-full bg-gradient-to-r from-[#48E44B]/20 via-[#9EFF3E]/20 to-transparent blur-[120px]" />
      </div>

      {/* header */}
      <div className="who-header text-center mb-20">

        <div className="inline-flex items-center rounded-full border border-[#E5E5E7] bg-white px-4 py-1 text-sm text-[#767F88]">
          Who we are
        </div>

        <h2 className="mt-6 text-[38px] md:text-[46px] tracking-tight text-[#141519]">
          Built by a passionate indie community
        </h2>

        <p className="mt-4 max-w-[560px] mx-auto text-[15px] text-[#767F88]">
          OwnMarket is a project started by a small Pakistani indie community
          aiming to build a trusted digital marketplace where creators and
          buyers can connect safely and trade digital goods.
        </p>

      </div>

      {/* grid */}
      <div className="grid gap-7 md:grid-cols-3">

        {/* founders */}
        <Card className="who-card relative overflow-hidden rounded-2xl border border-[#E5E5E7] bg-white p-8 hover:-translate-y-[8px] transition-all duration-300 hover:shadow-2xl">

          <div className="absolute inset-0 opacity-0 transition duration-500 hover:opacity-100 bg-gradient-to-br from-[#48E44B]/10 via-transparent to-[#9EFF3E]/10" />

          <div className="relative">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#48E44B]/10 ring-1 ring-[#48E44B]/20">
              <Crown size={22} />
            </div>

            <h3 className="text-[18px] font-medium text-[#141519]">
              Founders
            </h3>

            <p className="mt-3 text-sm text-[#767F88] leading-relaxed">
              The project is led by <strong>Skull</strong> and <strong>Crypto</strong>,
              two founders focused on building a modern and secure digital
              marketplace experience.
            </p>

          </div>

        </Card>

        {/* developer */}
        <Card className="who-card relative overflow-hidden rounded-2xl border border-[#E5E5E7] bg-white p-8 hover:-translate-y-[8px] transition-all duration-300 hover:shadow-2xl">

          <div className="absolute inset-0 opacity-0 transition duration-500 hover:opacity-100 bg-gradient-to-br from-[#48E44B]/10 via-transparent to-[#9EFF3E]/10" />

          <div className="relative">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#48E44B]/10 ring-1 ring-[#48E44B]/20">
              <Code2 size={22} />
            </div>

            <h3 className="text-[18px] font-medium text-[#141519]">
              Development
            </h3>

            <p className="mt-3 text-sm text-[#767F88] leading-relaxed">
              The platform is engineered by <strong>Crypto</strong>, focusing on
              performance, scalability and modern web technologies to ensure
              a smooth marketplace experience.
            </p>

          </div>

        </Card>

        {/* mission */}
        <Card className="who-card relative overflow-hidden rounded-2xl border border-[#E5E5E7] bg-white p-8 hover:-translate-y-[8px] transition-all duration-300 hover:shadow-2xl">

          <div className="absolute inset-0 opacity-0 transition duration-500 hover:opacity-100 bg-gradient-to-br from-[#48E44B]/10 via-transparent to-[#9EFF3E]/10" />

          <div className="relative">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#48E44B]/10 ring-1 ring-[#48E44B]/20">
              <Rocket size={22} />
            </div>

            <h3 className="text-[18px] font-medium text-[#141519]">
              Our Vision
            </h3>

            <p className="mt-3 text-sm text-[#767F88] leading-relaxed">
              We aim to empower digital creators and gamers by providing
              a trusted platform where anyone can buy and sell digital
              products without barriers.
            </p>

          </div>

        </Card>

      </div>

    </section>
  )
}