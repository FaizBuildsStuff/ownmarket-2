"use client"

import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { 
  Check, Zap, Crown, Rocket, Plus, Minus, 
  HelpCircle, ShieldCheck, Globe, ZapIcon, ArrowRight 
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from 'next/link'

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const plans = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for new creators exploring the market.",
    features: ["5 Product Uploads", "Standard Dashboard", "Community Support", "Basic Analytics"],
    icon: <Rocket className="w-6 h-6 text-blue-500" />,
    cta: "Start for free",
    featured: false,
  },
  {
    name: "Pro Creator",
    price: { monthly: 29, yearly: 240 },
    description: "Best for professional sellers and agencies.",
    features: ["Unlimited Uploads", "Priority Support", "Advanced SEO Tools", "Custom Branding", "0% Transaction Fee"],
    icon: <Zap className="w-6 h-6 text-[#48E44B]" />,
    cta: "Get Started Pro",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: { monthly: 99, yearly: 950 },
    description: "Custom solutions for large-scale operations.",
    features: ["White-label Marketplace", "API Access", "Dedicated Manager", "Bulk Import Tools", "Multi-user Access"],
    icon: <Crown className="w-6 h-6 text-purple-500" />,
    cta: "Contact Sales",
    featured: false,
  },
]

const faqs = [
  { q: "Can I change plans later?", a: "Absolutely. You can upgrade or downgrade your plan at any time from your dashboard settings. If you upgrade, the price will be prorated." },
  { q: "What counts as a 'Product Upload'?", a: "Any unique digital asset (UI Kit, Template, etc.) you list for sale on the marketplace counts as one product upload." },
  { q: "How do payouts work?", a: "Payouts are processed every Friday via Stripe or PayPal. Pro and Enterprise members get instant payout options." },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Sequence
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      
      tl.from(".reveal-hero", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
      })
      .from(".pricing-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        clearProps: "all" 
      }, "-=0.8")

      // 2. Scroll-based reveals for sections
      const sections = gsap.utils.toArray<HTMLElement>('.section-reveal')
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        })
      })

      // 3. Constant Glimmer Loop for Pro Card
      gsap.to(".featured-glimmer", {
        x: "200%",
        duration: 3,
        repeat: -1,
        ease: "power2.inOut",
        repeatDelay: 2
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-[#FAFAFB] min-h-screen font-sans selection:bg-[#48E44B]/30">
      
      {/* SECTION 1: HERO & PRICING */}
      <section className="relative px-6 pt-32 pb-24 overflow-hidden">
        {/* Aesthetic Background Blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[5%] left-[10%] h-[700px] w-[700px] rounded-full bg-[#48E44B]/10 blur-[140px]" />
          <div className="absolute top-[15%] right-[5%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-[1250px]">
          <div className="mb-20 text-center">
            <Badge className="reveal-hero mb-6 bg-white/80 border-[#E5E5E7] text-[#767F88] px-5 py-1.5 font-bold shadow-sm">
              Pricing Plans
            </Badge>
            <h1 className="reveal-hero text-6xl md:text-[92px] font-bold tracking-tighter text-[#141519] leading-[0.9] mb-8">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-[#48E44B]">level up?</span>
            </h1>
            <p className="reveal-hero mt-8 mx-auto max-w-[580px] text-xl text-[#767F88] font-medium leading-relaxed">
              Transparent, creator-first pricing. No hidden fees, no complexity. Choose the path that scales with your ambition.
            </p>

            <div className="reveal-hero mt-12 flex items-center justify-center gap-5">
              <span className={`text-sm font-bold transition-colors ${!isYearly ? 'text-black' : 'text-[#767F88]'}`}>Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-[#48E44B]" />
              <span className={`text-sm font-bold transition-colors ${isYearly ? 'text-black' : 'text-[#767F88]'}`}>
                Yearly <Badge className="ml-2 bg-[#48E44B]/10 text-[#2d8a2f] border-none font-bold">Save 20%</Badge>
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className={`pricing-card group relative flex flex-col rounded-[48px] border p-10 transition-all duration-500 hover:-translate-y-4 ${
                  plan.featured 
                  ? 'border-black bg-black text-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)]' 
                  : 'border-[#E5E5E7] bg-white text-[#141519] hover:border-black/10'
                }`}
              >
                {plan.featured && <div className="featured-glimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg]" />}
                
                <div className="mb-10 flex items-center justify-between">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-[24px] ${plan.featured ? 'bg-white/10 text-white' : 'bg-[#FAFAFB]'}`}>
                    {plan.icon}
                  </div>
                  {plan.badge && <Badge className="bg-[#48E44B] text-black border-none font-bold px-4 py-1 rounded-full">{plan.badge}</Badge>}
                </div>

                <h3 className="text-3xl font-bold tracking-tight">{plan.name}</h3>
                <p className={`mt-3 text-[16px] leading-relaxed ${plan.featured ? 'text-gray-400' : 'text-[#767F88]'}`}>
                  {plan.description}
                </p>

                <div className="my-10 flex items-baseline gap-2">
                  <span className="text-7xl font-bold tracking-tighter">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className={`text-lg font-medium ${plan.featured ? 'text-gray-400' : 'text-[#767F88]'}`}>
                    /{isYearly ? 'year' : 'mo'}
                  </span>
                </div>

                <div className="mb-12 space-y-5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-4">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 ${plan.featured ? 'bg-[#48E44B]/20' : 'bg-[#48E44B]/10'}`}>
                        <Check size={14} className="text-[#48E44B] stroke-[3px]" />
                      </div>
                      <span className="text-[16px] font-semibold tracking-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className={`mt-auto h-16 rounded-[24px] text-lg font-bold transition-all active:scale-95 ${
                  plan.featured ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'
                }`}>
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPARISON (Modern Bento Style) */}
      <section className="section-reveal py-32 px-6">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#141519]">Full feature comparison</h2>
            <p className="mt-4 text-[#767F88] text-lg">Compare plans to find the right fit for your workflow.</p>
          </div>
          
          <div className="overflow-hidden rounded-[40px] border border-[#E5E5E7] bg-white shadow-xl shadow-black/[0.02]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFAFB]">
                  <th className="p-8 text-xs font-black uppercase tracking-[0.2em] text-[#767F88]">The Details</th>
                  <th className="p-8 text-lg font-bold text-center">Starter</th>
                  <th className="p-8 text-lg font-bold text-center bg-black/5">Pro</th>
                  <th className="p-8 text-lg font-bold text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E7]/50">
                {[
                  { f: "Custom Shop Branding", s: false, p: true, e: true },
                  { f: "Transaction Fees", s: "5.0%", p: "0.0%", e: "0.0%" },
                  { f: "API & Webhooks", s: false, p: false, e: true },
                  { f: "Instant Payouts", s: false, p: true, e: true },
                  { f: "Advanced Analytics", s: "Basic", p: "Full", e: "Custom" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#FAFAFB]/50 transition-colors">
                    <td className="p-8 font-bold text-[#141519] text-[17px]">{row.f}</td>
                    <td className="p-8 text-center">{typeof row.s === 'boolean' ? (row.s ? <Check size={22} className="mx-auto text-[#48E44B]" /> : <span className="text-gray-300">—</span>) : row.s}</td>
                    <td className="p-8 text-center bg-black/[0.02] font-black text-black">{typeof row.p === 'boolean' ? (row.p ? <Check size={22} className="mx-auto text-[#48E44B]" /> : <span className="text-gray-300">—</span>) : row.p}</td>
                    <td className="p-8 text-center">{typeof row.e === 'boolean' ? (row.e ? <Check size={22} className="mx-auto text-[#48E44B]" /> : <span className="text-gray-300">—</span>) : row.e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 3: DARK FAQ SECTION */}
      <section className="section-reveal py-32 px-6 bg-[#141519] text-white overflow-hidden relative rounded-t-[60px]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#48E44B]/5 blur-[140px] rounded-full" />
        <div className="mx-auto max-w-[900px] relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <Badge className="mb-4 bg-[#48E44B]/20 text-[#48E44B] border-none font-bold">Support</Badge>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Got questions? <br /> We've got answers.</h2>
            </div>
            <Link href="/contact" className="text-[#48E44B] font-bold text-lg flex items-center group">
              Contact Support <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-[32px] transition-all duration-300 border ${activeFaq === i ? 'bg-white/5 border-white/10' : 'border-transparent'}`}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)} 
                  className="flex w-full items-center justify-between p-8 text-left group"
                >
                  <span className="text-xl md:text-2xl font-bold tracking-tight">{faq.q}</span>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${activeFaq === i ? 'bg-[#48E44B] text-black rotate-180' : 'bg-white/5 text-white'}`}>
                    {activeFaq === i ? <Minus size={20}/> : <Plus size={20}/>}
                  </div>
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-8 text-gray-400 text-lg leading-relaxed animate-in fade-in duration-500">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: MASSIVE FINALE CTA */}
      <section className="section-reveal py-32 px-6">
        <div className="mx-auto max-w-[1250px] rounded-[80px] bg-white border border-[#E5E5E7] p-20 md:p-32 text-center relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#48E44B]/5 blur-[100px] rounded-full" />
          
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-[#141519] mb-10 relative z-10 leading-[0.9]">
            Start building your <br /> digital empire today.
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
            <Button className="h-20 px-14 rounded-[32px] bg-black text-xl font-bold hover:bg-[#1a1a1a] shadow-2xl shadow-black/20 group transition-all active:scale-95">
              Get Started for Free <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button variant="ghost" className="h-20 px-14 rounded-[32px] text-xl font-bold hover:bg-gray-50 border border-transparent hover:border-gray-200">
              Talk to an Expert
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-gray-100 pt-16 relative z-10">
             <div className="flex flex-col items-center gap-3">
               <ShieldCheck size={32} className="text-[#48E44B]" />
               <p className="font-bold text-[#141519]">Secure Global Payouts</p>
             </div>
             <div className="flex flex-col items-center gap-3">
               <Globe size={32} className="text-[#48E44B]" />
               <p className="font-bold text-[#141519]">120+ Supported Countries</p>
             </div>
             <div className="flex flex-col items-center gap-3">
               <ZapIcon size={32} className="text-[#48E44B]" />
               <p className="font-bold text-[#141519]">Instant Access to Assets</p>
             </div>
          </div>
        </div>
      </section>

    </div>
  )
}