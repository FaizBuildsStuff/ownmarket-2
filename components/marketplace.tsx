"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

type ProductCard = {
  id: string
  title: string
  price: number
  category: string
  image: string
  seller?: {
    id: string
    name: string | null
    email: string | null
  } | null
}

export default function Marketplace() {
  const [products, setProducts] = useState<ProductCard[]>([])
  const [loading, setLoading] = useState(true)

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

        {(!loading && products.length === 0) && (
          <p className="text-sm text-[#767F88] col-span-full text-center">
            No products available yet.
          </p>
        )}

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
              <Link href={`/product/${product.id}`}>
                <Button
                  size="sm"
                  className="h-8 rounded-md bg-[#141519] px-3 text-xs text-white shadow-md"
                >
                  View
                </Button>
              </Link>
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
                  <AvatarFallback>
                    {product.seller?.name?.[0]?.toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>

                <span className="text-xs text-[#767F88]">
                  {product.seller?.name ?? "Creator"}
                </span>

              </div>

              {/* price */}
              <span className="text-[15px] font-semibold text-[#141519]">
                ${product.price.toFixed(2)}
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