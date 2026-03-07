"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const products = [
  {
    id: 1,
    title: "SaaS Dashboard UI Kit",
    price: "$29",
    category: "UI Kit",
    rating: 4.8,
    author: "AR",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
  },
  {
    id: 2,
    title: "Next.js SaaS Starter",
    price: "$49",
    category: "Template",
    rating: 4.9,
    author: "NK",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: 3,
    title: "Modern Landing Pages Pack",
    price: "$19",
    category: "Design",
    rating: 4.7,
    author: "DL",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: 4,
    title: "Tailwind Components Library",
    price: "$39",
    category: "Components",
    rating: 4.9,
    author: "TS",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: 5,
    title: "Mobile App UI Kit",
    price: "$24",
    category: "UI Kit",
    rating: 4.6,
    author: "MX",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
  },
  {
    id: 6,
    title: "Framer Motion Animations Pack",
    price: "$32",
    category: "Animation",
    rating: 4.8,
    author: "FM",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e",
  },
]

export default function Marketplace() {
  return (
    <section className="mx-auto max-w-[1250px] px-6 py-28">

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-14">

        <h2 className="text-[34px] md:text-[40px] tracking-tight text-[#141519]">
          Discover digital products
        </h2>

        <p className="mt-3 max-w-[520px] text-[15px] text-[#767F88]">
          High-quality templates, UI kits, tools and digital resources from creators worldwide.
        </p>

      </div>

      {/* Category Filters */}
      <Tabs defaultValue="all" className="mb-12 flex justify-center">
        <TabsList className="bg-[#F7F7F8] border border-[#E5E5E7]">

          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ui">UI Kits</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="animation">Animation</TabsTrigger>

        </TabsList>
      </Tabs>

      {/* Products */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

        {products.map((product) => (
          <Card
          key={product.id}
          className="group relative overflow-hidden rounded-2xl border border-[#E5E5E7] bg-white transition-all duration-300 hover:-translate-y-[6px] hover:shadow-2xl"
        >
        
          {/* subtle gradient glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#48E44B]/10 via-transparent to-[#9EFF3E]/10" />
        
          {/* Image */}
          <div className="relative h-[210px] w-full overflow-hidden">
        
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
        
            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
        
            {/* category badge */}
            <Badge className="absolute top-3 left-3 rounded-md bg-white/90 backdrop-blur border text-xs">
              {product.category}
            </Badge>
        
            {/* floating action button */}
            <div className="absolute bottom-3 right-3 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        
              <Button
                size="sm"
                className="h-8 rounded-md bg-[#141519] px-3 text-xs text-white shadow-md"
              >
                View
              </Button>
        
            </div>
        
          </div>
        
          <CardContent className="relative p-5">
        
            {/* Title */}
            <h3 className="text-[16px] font-medium text-[#141519]">
              {product.title}
            </h3>
        
            {/* rating */}
            <div className="mt-2 flex items-center gap-2 text-sm text-[#767F88]">
        
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-[#141519]" />
                <span>{product.rating}</span>
              </div>
        
              <span className="h-3 w-px bg-[#E5E5E7]" />
        
              <span className="text-xs">124 sales</span>
        
            </div>
        
            {/* footer */}
            <div className="mt-5 flex items-center justify-between">
        
              {/* creator */}
              <div className="flex items-center gap-2">
        
                <Avatar className="h-7 w-7 border">
                  <AvatarFallback>{product.author}</AvatarFallback>
                </Avatar>
        
                <span className="text-xs text-[#767F88]">
                  by Creator
                </span>
        
              </div>
        
              {/* price */}
              <span className="text-[15px] font-semibold text-[#141519]">
                {product.price}
              </span>
        
            </div>
        
          </CardContent>
        
        </Card>
        ))}

      </div>

      {/* CTA */}
      <div className="mt-16 flex justify-center">
        <Button
          size="lg"
          className="rounded-xl bg-[#141519] px-7 text-white hover:bg-black"
        >
          Explore Full Marketplace
        </Button>
      </div>

    </section>
  )
}