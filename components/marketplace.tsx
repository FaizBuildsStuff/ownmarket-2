"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useLayoutEffect, useRef } from "react"
import { Star, Search, ArrowRight, Zap, Filter, Command, ShoppingBag, Sparkles } from "lucide-react"
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

type ProductCard = {
  id: string
  title: string
  price: number
  category: string
  rating: number
  image: string
}

export default function MarketplacePage() {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<ProductCard[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" })
        if (res.ok) {
          const data = await res.json()
          setProducts(data.products ?? [])
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: "expo.out" },
        delay: 0.1 
      })

      tl.from(".hero-text", {
        y: 80,
        opacity: 0,
        rotateX: -20,
        duration: 1.5,
        stagger: 0.1,
      })
      .from(".search-bar-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
      }, "-=1")

      tl.from(".product-card", {
        y: 100,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        stagger: 0.08,
        clearProps: "all"
      }, "-=0.8")

      // Parallax Mouse Movement for Blobs
      const moveBlobs = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 60
        const yPos = (clientY / window.innerHeight - 0.5) * 60
        gsap.to(".gradient-blob", { x: xPos, y: yPos, duration: 3, ease: "power2.out" })
      }
      window.addEventListener("mousemove", moveBlobs)
      return () => window.removeEventListener("mousemove", moveBlobs)
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#FAFAFB] px-6 md:px-12 pb-32 overflow-hidden selection:bg-[#48E44B]/30">
      
      {/* --- BACKGROUND ENGINE --- */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="gradient-blob absolute -top-40 -left-[10%] h-[1000px] w-[1000px] rounded-full bg-[#48E44B]/10 blur-[140px] opacity-70" />
        <div className="gradient-blob absolute bottom-0 -right-[10%] h-[800px] w-[800px] rounded-full bg-blue-400/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100" />
      </div>

      <div className="mx-auto max-w-[1400px]">
        
        {/* --- DYNAMIC HERO SECTION --- */}
        <section className="pt-24 pb-20 md:pt-40 md:pb-28 text-center relative z-10">
          <div className="hero-text inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm">
            <Sparkles size={16} className="text-[#48E44B]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#141519]">The 2026 Collection</span>
          </div>

          <h1 className="hero-text text-[48px] md:text-[110px] font-black leading-[0.85] tracking-[-0.06em] text-[#141519] perspective-1000">
            Build with <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#141519] via-[#48E44B] to-blue-600">Pure Intent.</span>
          </h1>

          <p className="hero-text mt-10 max-w-[620px] mx-auto text-lg md:text-2xl text-[#767F88] font-medium leading-relaxed">
            Curated high-performance assets for creators who demand the standard of tomorrow.
          </p>

          {/* SEARCH COMPONENT: THE SPOTLIGHT */}
          <div className="search-bar-reveal mt-16 flex justify-center">
            <div className="relative w-full max-w-[720px] group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#48E44B] to-blue-500 rounded-[32px] blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
              <div className="relative flex items-center bg-white rounded-[28px] border border-gray-100 overflow-hidden shadow-2xl">
                <Search size={24} className="ml-8 text-[#767F88]" />
                <Input
                  placeholder="What are you building today?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-20 border-none bg-transparent text-xl font-medium focus-visible:ring-0 placeholder:text-gray-300"
                />
                <div className="mr-4 hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
                  <Command size={14} className="text-gray-400" />
                  <span className="text-[10px] font-black text-gray-400">K</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- TACTILE FILTER BAR --- */}
        <div className="hero-text flex flex-col md:flex-row items-center justify-between gap-8 mb-16 px-2">
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
            <Button className="rounded-2xl h-12 px-8 bg-black text-white font-bold text-sm shadow-xl shadow-black/20">Explore All</Button>
            {["UI Kits", "Templates", "3D Assets", "Icons"].map((cat) => (
              <Button key={cat} variant="outline" className="rounded-2xl h-12 px-8 border-gray-100 bg-white font-bold text-sm hover:border-black transition-all">{cat}</Button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select>
              <SelectTrigger className="h-12 w-full md:w-[200px] rounded-2xl border-gray-100 bg-white font-bold text-sm">
                <SelectValue placeholder="Sort: Featured" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-gray-100">
                <SelectItem value="price-low">Lowest Price</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* --- GRID: THE VISUAL LIBRARY --- */}
        <section className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <Card
              key={product.id}
              className="product-card group relative flex flex-col justify-between overflow-hidden border-none rounded-[40px] bg-white transition-all duration-700 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.12)]"
            >
              <div className="relative aspect-[4/3] w-full p-4">
                <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Glass Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <Link href={`/product/${product.id}`}>
                      <Button className="h-16 w-16 rounded-full bg-white text-black scale-50 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                        <ArrowRight size={28} />
                      </Button>
                    </Link>
                  </div>

                  <Badge className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-black border-none font-black text-[10px] px-4 py-1.5 rounded-full shadow-lg">
                    {product.category.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <CardContent className="px-8 pb-10 pt-2">
                <div className="flex justify-between items-end mb-8">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold tracking-tight text-[#141519]">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="fill-[#48E44B] text-[#48E44B]" />
                      <span className="text-xs font-black text-[#141519]">{product.rating.toFixed(1)}</span>
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest ml-2">Verified</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-0.5">Investment</p>
                    <p className="text-2xl font-black text-[#141519] tracking-tighter">${product.price}</p>
                  </div>
                </div>

                <Link href={`/product/${product.id}`}>
                  <Button className="w-full h-14 rounded-2xl bg-[#FAFAFB] border border-gray-100 text-[#141519] font-black text-sm hover:bg-black hover:text-white hover:border-black transition-all group/btn flex items-center justify-between px-6">
                    View Product
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* --- EMPTY STATE --- */}
        {(!loading && filtered.length === 0) && (
          <div className="py-40 flex flex-col items-center justify-center space-y-6 opacity-30">
            <ShoppingBag size={80} strokeWidth={1} />
            <p className="text-2xl font-bold tracking-tight">Nothing found in the archives.</p>
          </div>
        )}

      </div>
    </div>
  )
}