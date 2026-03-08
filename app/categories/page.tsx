"use client"

import React, { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { 
  Layout, 
  Code2, 
  Palette, 
  Layers, 
  Video, 
  Cpu, 
  ArrowRight,
  Sparkles,
  Smartphone
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'

const categories = [
  {
    id: "ui-kits",
    name: "UI Kits",
    description: "Premium design systems for Figma and Sketch.",
    count: "1,240+",
    icon: <Layout className="w-8 h-8" />,
    color: "bg-blue-500/10",
    border: "border-blue-500/20",
    textColor: "text-blue-600",
  },
  {
    id: "templates",
    name: "SaaS Templates",
    description: "Ready-to-deploy Next.js and React starters.",
    count: "850+",
    icon: <Code2 className="w-8 h-8" />,
    color: "bg-[#48E44B]/10",
    border: "border-[#48E44B]/20",
    textColor: "text-[#2d8a2f]",
  },
  {
    id: "icons",
    name: "Icon Sets",
    description: "Custom hand-crafted vector icon libraries.",
    count: "420+",
    icon: <Sparkles className="w-8 h-8" />,
    color: "bg-purple-500/10",
    border: "border-purple-500/20",
    textColor: "text-purple-600",
  },
  {
    id: "mobile",
    name: "Mobile App",
    description: "iOS & Android specialized UI components.",
    count: "610+",
    icon: <Smartphone className="w-8 h-8" />,
    color: "bg-orange-500/10",
    border: "border-orange-500/20",
    textColor: "text-orange-600",
  },
  {
    id: "animations",
    name: "Animations",
    description: "Lottie, Framer Motion, and GSAP assets.",
    count: "315+",
    icon: <Video className="w-8 h-8" />,
    color: "bg-pink-500/10",
    border: "border-pink-500/20",
    textColor: "text-pink-600",
  },
  {
    id: "3d-assets",
    name: "3D Assets",
    description: "High-quality Spline and Blender models.",
    count: "190+",
    icon: <Cpu className="w-8 h-8" />,
    color: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    textColor: "text-cyan-600",
  },
]

export default function CategoriesPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

      // Header Animation
      tl.from(".cat-header", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1
      })

      // Bento Grid Animation
      .from(".cat-card", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        clearProps: "all"
      }, "-=0.8")

      // Ambient movement for bg blobs
      gsap.to(".bg-blob", {
        x: "random(-100, 100)",
        y: "random(-50, 50)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FAFAFB] px-6 pt-32 pb-24 overflow-hidden">
      
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-blob absolute top-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full bg-[#48E44B]/10 blur-[120px]" />
        <div className="bg-blob absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1200px] ">
        {/* Page Header */}
        <div className="mb-20 text-center">
          <Badge className="cat-header mb-4 bg-white/80 backdrop-blur-md border-[#E5E5E7] text-[#767F88] px-4 py-1">
            Browse Collections
          </Badge>
          <h1 className="cat-header text-5xl md:text-7xl font-bold tracking-tight text-[#141519]">
            Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-[#48E44B]">Perfect Asset</span>
          </h1>
          <p className="cat-header mt-6 mx-auto max-w-[500px] text-lg text-[#767F88]">
            Explore high-performance digital goods categorized by technology and design style.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/marketplace?category=${cat.id}`}
              className="cat-card group relative"
            >
              <div className={`h-full p-8 rounded-[32px] border ${cat.border} bg-white transition-all duration-500 group-hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group-hover:-translate-y-2`}>
                
                {/* Icon Container */}
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] ${cat.color} ${cat.textColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {cat.icon}
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-[#141519]">{cat.name}</h3>
                  <Badge variant="outline" className="rounded-full border-[#E5E5E7] font-semibold">
                    {cat.count}
                  </Badge>
                </div>

                <p className="text-[#767F88] leading-relaxed mb-8">
                  {cat.description}
                </p>

                <div className="flex items-center gap-2 font-bold text-sm text-[#141519] group-hover:text-[#48E44B] transition-colors">
                  Explore Category 
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>

                {/* Subtle Gradient Glow on Hover */}
                <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-transparent to-black/[0.02] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="cat-header mt-24 rounded-[40px] bg-[#141519] p-12 text-center text-white relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't see what you need?</h2>
              <p className="text-gray-400 mb-8 max-w-[450px] mx-auto">Our creators are constantly uploading new assets. Subscribe to get notified on new category launches.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="text" 
                  placeholder="Enter your email" 
                  className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:border-[#48E44B] transition-colors min-w-[300px]"
                />
                <Button className="bg-[#48E44B] text-black font-bold hover:bg-[#3ec741] rounded-2xl px-8 py-6 h-auto">
                  Subscribe
                </Button>
              </div>
           </div>
           {/* Abstract Shape for CTA */}
           <div className="absolute top-[-50%] right-[-10%] h-[300px] w-[300px] rounded-full bg-[#48E44B]/20 blur-[80px]" />
        </div>
      </div>
    </div>
  )
}