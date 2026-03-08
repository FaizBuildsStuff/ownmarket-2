"use client"

import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { 
  ArrowRight, MapPin, Clock, Briefcase, 
  Coffee, Monitor, Zap, Plus, Minus, 
  Globe, Star, Sparkles 
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const openRoles = [
  { 
    id: 1, 
    title: "Senior Product Designer", 
    dept: "Design", 
    type: "Remote / Full-time", 
    location: "Global",
    description: "We're looking for a design visionary to lead our marketplace aesthetics. You'll be responsible for crafting the 'expensive' look our users love and maintaining our 2026 design standards."
  },
  { 
    id: 2, 
    title: "Lead Frontend Engineer", 
    dept: "Engineering", 
    type: "Full-time", 
    location: "Europe / Remote",
    description: "Master of React, GSAP, and Next.js? Join us to build the fastest, smoothest digital marketplace on the web. You will own the animation engine and core performance metrics."
  },
  { 
    id: 3, 
    title: "Growth Marketing Manager", 
    dept: "Marketing", 
    type: "Full-time", 
    location: "London / Hybrid",
    description: "Scale OwnMarket to the next 100k creators. You'll run high-impact campaigns across the global creative ecosystem and manage our creator-relations budget."
  }
]

export default function CareersPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeJob, setActiveJob] = useState<number | null>(null)

  useLayoutEffect(() => {
    // 1. Context ensures all animations are scoped to this component
    const ctx = gsap.context(() => {
      
      // Initial Hero Animation
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })
      
      tl.from(".career-reveal", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.1,
      })

      // Section-by-section scroll reveals
      gsap.utils.toArray<HTMLElement>('.section-reveal').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        })
      })

      // Continuous Ambient Background Motion
      gsap.to(".bg-blob", {
        x: "random(-100, 100)",
        y: "random(-50, 50)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      // Parallax for Bento Images
      gsap.to(".parallax-bento", {
        scrollTrigger: {
          trigger: ".bento-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        y: -60,
        ease: "none"
      })

      // Final Refresh to ensure ScrollTrigger knows where everything is
      ScrollTrigger.refresh()

    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Magnetic Button Function
  const handleMagnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <div ref={containerRef} className="bg-[#FAFAFB] min-h-screen selection:bg-[#48E44B]/30 overflow-hidden">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-blob absolute top-0 left-[-5%] h-[600px] w-[600px] rounded-full bg-[#48E44B]/10 blur-[140px]" />
        <div className="bg-blob absolute top-[30%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative px-6 pt-40 pb-24 text-center">
        <Badge className="career-reveal mb-8 bg-white/80 border-[#E5E5E7] text-[#141519] px-6 py-2 font-bold shadow-sm">
          <Sparkles size={14} className="mr-2 text-[#48E44B]" />
          Join the 0.1% of Global Talent
        </Badge>
        
        <h1 className="career-reveal text-6xl md:text-[110px] font-bold tracking-tighter text-[#141519] leading-[0.85] mb-12">
          Design the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-[#48E44B]">New Standard.</span>
        </h1>
        
        <p className="career-reveal mt-10 mx-auto max-w-[640px] text-xl md:text-2xl text-[#767F88] font-medium leading-relaxed">
          We don't just hire employees; we partner with masters of their craft to build the home for premium digital assets.
        </p>

        <div className="career-reveal mt-14 flex flex-col sm:flex-row justify-center items-center gap-8">
          <Button 
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="h-20 px-12 rounded-[30px] bg-black text-white text-xl font-bold shadow-2xl hover:bg-[#1a1a1a] transition-all"
          >
            See Roles Below <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="team" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERKS SECTION */}
      <section className="section-reveal px-6 py-32 bg-white rounded-[80px] shadow-sm relative z-10">
        <div className="mx-auto max-w-[1250px]">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 px-4">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-xl leading-none">The baseline <br /> for greatness.</h2>
            <p className="text-[#767F88] text-lg max-w-[320px] font-medium">Top-tier tools, remote-native culture, and the trust to lead.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Globe />, title: "Remote Native", desc: "Work from wherever you're inspired.", color: "bg-emerald-500/10 text-emerald-600" },
              { icon: <Zap />, title: "Hyper Growth", desc: "Early equity and leadership path.", color: "bg-yellow-500/10 text-yellow-600" },
              { icon: <Monitor />, title: "Modern Stack", desc: "Next.js, GSAP, and M3 MacBooks.", color: "bg-blue-500/10 text-blue-600" },
              { icon: <Coffee />, title: "Deep Work", desc: "Minimal meetings, maximum focus.", color: "bg-orange-500/10 text-orange-600" }
            ].map((perk, i) => (
              <div key={i} className="group p-10 rounded-[48px] border border-gray-100 bg-[#FAFAFB] hover:border-black/10 transition-all duration-500">
                <div className={`mb-8 h-16 w-16 rounded-2xl ${perk.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  {perk.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight text-[#141519]">{perk.title}</h4>
                <p className="text-[#767F88] font-medium">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROLES SECTION */}
      <section className="section-reveal px-6 py-32 bg-[#141519] text-white rounded-t-[80px] -mt-16 relative z-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
             <div>
               <Badge className="mb-6 bg-[#48E44B] text-black border-none font-bold px-4 py-1">Open Roles</Badge>
               <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">Your turn <br /> to build.</h2>
             </div>
             <p className="text-gray-400 max-w-[340px] text-lg">Send a general application if you don't see a fit.</p>
          </div>

          <div className="space-y-6">
            {openRoles.map((role) => (
              <div 
                key={role.id} 
                className={`group rounded-[40px] border transition-all duration-700 ${activeJob === role.id ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/30'}`}
              >
                <button 
                  onClick={() => setActiveJob(activeJob === role.id ? null : role.id)}
                  className="w-full flex flex-col md:flex-row md:items-center justify-between p-10 text-left"
                >
                  <div className="space-y-3">
                    <span className={`font-bold uppercase tracking-widest text-[11px] ${activeJob === role.id ? 'text-[#48E44B]' : 'text-[#767F88]'}`}>{role.dept}</span>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tighter">{role.title}</h3>
                    <div className="flex items-center gap-6 text-sm opacity-60">
                       <span className="flex items-center gap-1.5"><MapPin size={16}/> {role.location}</span>
                       <span className="flex items-center gap-1.5"><Clock size={16}/> {role.type}</span>
                    </div>
                  </div>
                  <div className={`mt-8 md:mt-0 h-16 w-16 rounded-full border flex items-center justify-center transition-all duration-500 ${activeJob === role.id ? 'bg-black text-white border-black rotate-180' : 'border-white/20'}`}>
                    {activeJob === role.id ? <Minus size={24}/> : <Plus size={24}/>}
                  </div>
                </button>
                
                {/* Accordion Content */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeJob === role.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-10 pb-10">
                    <p className="text-lg max-w-[700px] mb-10 leading-relaxed font-medium opacity-80">
                      {role.description}
                    </p>
                    <Button className="h-14 px-10 rounded-2xl bg-[#141519] text-white font-bold hover:scale-105 transition-transform">
                      Submit Application
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO VALUES */}
      <section className="bento-section section-reveal px-6 py-32 bg-white">
        <div className="mx-auto max-w-[1250px] grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 min-h-[750px]">
           <div className="md:col-span-2 md:row-span-2 relative p-12 bg-[#141519] rounded-[56px] text-white flex flex-col justify-end overflow-hidden">
              <div className="absolute inset-0 opacity-40">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978" className="parallax-bento w-full h-full object-cover" alt="culture" />
              </div>
              <div className="relative z-10">
                <h3 className="text-5xl font-bold mb-6 tracking-tighter">Detail Obsessed.</h3>
                <p className="text-gray-300 max-w-[360px] text-lg">The final 1% is the only thing that matters.</p>
              </div>
           </div>

           <div className="md:col-span-2 p-12 bg-[#48E44B] rounded-[56px] text-[#141519] flex flex-col justify-between">
              <Zap size={48} />
              <h3 className="text-4xl font-bold tracking-tighter">Speed over <br /> meetings.</h3>
           </div>

           <div className="p-10 bg-[#FAFAFB] border border-gray-100 rounded-[56px] flex flex-col justify-between hover:bg-[#48E44B]/10 transition-colors group">
              <Star size={32} className="text-[#48E44B] group-hover:fill-[#48E44B] transition-all" />
              <h3 className="text-2xl font-bold">Ownership</h3>
           </div>

           <div className="p-10 bg-[#FAFAFB] border border-gray-100 rounded-[56px] flex flex-col justify-between hover:bg-blue-500/10 transition-colors group">
              <Sparkles size={32} className="text-blue-500 group-hover:fill-blue-500 transition-all" />
              <h3 className="text-2xl font-bold">Radical Truth</h3>
           </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-reveal py-40 px-6 text-center">
         <div className="mx-auto max-w-[1000px]">
            <h2 className="text-6xl md:text-[100px] font-bold tracking-tighter leading-[0.85] mb-12">
              The future is <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-[#48E44B]">waiting for you.</span>
            </h2>
            <Button 
              onMouseMove={handleMagnetic}
              onMouseLeave={resetMagnetic}
              className="h-24 px-16 rounded-[40px] bg-black text-white text-2xl font-bold shadow-2xl hover:bg-[#1a1a1a]"
            >
              General Application
            </Button>
         </div>
      </section>

    </div>
  )
}