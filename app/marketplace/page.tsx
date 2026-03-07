"use client"

import Image from "next/image"
import { useState, useLayoutEffect, useRef } from "react"
import { Star, Search, ArrowRight, Zap } from "lucide-react"
import { gsap } from "gsap"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const products = [
  { id: 1, title: "SaaS Dashboard UI Kit", price: "$29", category: "UI Kit", rating: 4.8, author: "AR", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a" },
  { id: 2, title: "Next.js SaaS Starter", price: "$49", category: "Template", rating: 4.9, author: "NK", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c" },
  { id: 3, title: "Modern Landing Pages Pack", price: "$19", category: "Design", rating: 4.7, author: "DL", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
  { id: 4, title: "Tailwind Components Library", price: "$39", category: "Components", rating: 4.9, author: "TS", image: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
  { id: 5, title: "Mobile App UI Kit", price: "$24", category: "UI Kit", rating: 4.6, author: "MX", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3" },
  { id: 6, title: "Framer Motion Animations Pack", price: "$32", category: "Animation", rating: 4.8, author: "FM", image: "https://images.unsplash.com/photo-1550439062-609e1531270e" },
]

export default function MarketplacePage() {
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: "expo.out" },
        delay: 0.1 
      })

      // 1. Hero Reveal
      tl.from(".hero-animate", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.1,
      })

      // 2. Grid items reveal with a more modern "pop"
      tl.from(".product-card", {
        scale: 0.9,
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: {
          each: 0.08,
          grid: "auto"
        },
        clearProps: "all"
      }, "-=0.8")

      // 3. Perfect Floating Blobs (No hard edges)
      gsap.to(".gradient-blob", {
        x: "random(-120, 120)",
        y: "random(-80, 80)",
        rotation: "random(-20, 20)",
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#FAFAFB] px-4 md:px-8 pb-32 overflow-x-hidden">
      
      {/* PERFECT GRADIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
        <div className="gradient-blob absolute -top-40 -left-[15%] h-[800px] w-[800px] rounded-full bg-[#48E44B]/10 blur-[140px] opacity-60" />
        <div className="gradient-blob absolute top-[5%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#9EFF3E]/15 blur-[120px]" />
        <div className="gradient-blob absolute bottom-[20%] left-[10%] h-[700px] w-[900px] rounded-full bg-[#48E44B]/5 blur-[180px]" />
      </div>

      <div className="mx-auto max-w-[1300px]">
        {/* HERO SECTION */}
        <section className="pt-20 pb-16 md:pt-32 md:pb-24 text-center relative z-10">
          <Badge className="hero-animate mb-8 bg-white/60 backdrop-blur-xl border-[#E5E5E7] text-[#141519] px-5 py-1.5 font-semibold shadow-sm hover:bg-white transition-colors">
            <Zap size={14} className="mr-2 fill-[#48E44B] text-[#48E44B]" />
            New: Marketplace v2.0
          </Badge>

          <h1 className="hero-animate text-[40px] md:text-[84px] font-bold leading-[0.95] tracking-tight text-[#141519]">
            Digital products for <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#141519] via-[#2D3135] to-[#48E44B]">modern builders.</span>
          </h1>

          <p className="hero-animate mt-8 max-w-[580px] mx-auto text-base md:text-xl text-[#767F88] font-medium">
            Browse our curated collection of high-end assets designed to scale your next big idea.
          </p>

          {/* SEARCH BAR - Maxed Design */}
          <div className="hero-animate mt-14 flex justify-center">
            <div className="relative w-full max-w-[640px] group px-4">
              <Search size={22} className="absolute left-8 top-1/2 -translate-y-1/2 text-[#767F88] group-focus-within:text-[#48E44B] transition-colors" />
              <Input
                placeholder="Search components, templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-14 h-16 rounded-[22px] border-[#E5E5E7] bg-white shadow-2xl shadow-black/[0.04] focus-visible:ring-2 focus-visible:ring-[#48E44B]/30 text-lg transition-all"
              />
            </div>
          </div>
        </section>

        {/* FILTER BAR - Responsive and Swipable */}
        <section className="hero-animate mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border-y border-[#E5E5E7]/50 py-8">
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
            {["All Products", "UI Kits", "Templates", "Design", "Framer"].map((btn, i) => (
              <Button 
                key={btn} 
                variant={i === 0 ? "default" : "outline"} 
                className={`rounded-full px-8 h-11 text-sm font-semibold transition-all ${i === 0 ? "bg-[#141519] hover:bg-[#2D3135]" : "bg-white hover:border-[#141519]"}`}
              >
                {btn}
              </Button>
            ))}
          </div>

          <Select>
            <SelectTrigger className="w-full md:w-[220px] h-11 rounded-2xl bg-white border-[#E5E5E7] font-semibold">
              <SelectValue placeholder="Sort: Trending" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="new">Newest Arrivals</SelectItem>
            </SelectContent>
          </Select>
        </section>

        {/* PRODUCT GRID */}
        <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <Card
              key={product.id}
              className="product-card group relative flex flex-col justify-between overflow-hidden border border-[#E5E5E7] rounded-[32px] bg-white transition-all duration-500 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-3"
            >
              <div className="relative h-[280px] w-full overflow-hidden p-3">
                <div className="relative h-full w-full overflow-hidden rounded-[24px]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#141519] border-none font-bold py-1 px-4 shadow-sm">
                    {product.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-8 pt-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#141519] leading-tight group-hover:text-[#48E44B] transition-colors duration-300">
                    {product.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex items-center bg-[#48E44B]/10 px-2.5 py-1 rounded-lg">
                    <Star size={14} className="fill-[#48E44B] text-[#48E44B] mr-1" />
                    <span className="text-sm font-bold text-[#141519]">{product.rating}</span>
                  </div>
                  <span className="text-sm font-medium text-[#767F88]">Premium Asset</span>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#F1F1F3] pt-6">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#767F88]">License</span>
                    <span className="text-2xl font-black text-[#141519]">{product.price}</span>
                  </div>
                  
                  <Button className="rounded-[18px] bg-[#141519] hover:bg-[#48E44B] h-12 px-6 group/btn transition-all duration-300">
                    <span className="mr-2 font-bold text-white">Get Details</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-white" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  )
}