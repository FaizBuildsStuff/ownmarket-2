"use client"

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { 
  ArrowRight, Mail, Lock, Github, 
  Chrome, Fingerprint, Sparkles, Zap, 
  Command, ShieldCheck
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignInPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" })
        if (res.ok) {
          const data = await res.json()
          if (data.user) {
            router.replace("/dashboard")
          }
        }
      } catch {
        // ignore
      }
    }
    checkAuth()
  }, [router])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: "expo.out" } 
      })

      // 1. Entrance Sequence - Optimized for "stuck" elements
      tl.from(".form-reveal", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        // Clears inline styles so Tailwind can take back control of positioning
        clearProps: "all" 
      })
      .from(".doodle-item", {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.8")

      // 2. Floating Motion
      gsap.to(".doodle-item", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-10, 10)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      // 3. Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 40
        const yPos = (clientY / window.innerHeight - 0.5) * 40
        gsap.to(".doodle-canvas", { x: xPos, y: yPos, duration: 1.5, ease: "power2.out" })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async () => {
    if (!email || !password) return
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("om_logged_in", "true")
        }
        router.push("/dashboard")
      } else {
        const data = await res.json()
        alert(data.message || "Invalid credentials")
      }
    } catch {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex bg-[#FAFAFB] overflow-x-hidden selection:bg-[#48E44B]/30">
      
      {/* LEFT SIDE: THE FORM CONTENT */}
      <div className="flex-1 lg:flex-none lg:w-[48%] relative flex flex-col bg-white border-r border-gray-100 z-20">
        
        {/* Scrollable container to ensure button is never stuck off-screen */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-12 overflow-y-auto no-scrollbar">
          
          <div className="max-w-[440px] w-full mx-auto space-y-10">
            
            {/* Header / Logo */}
            <div className="space-y-6">
              <Link href="/" className="form-reveal inline-flex items-center gap-3 text-2xl font-black tracking-tighter text-[#141519]">
                <div className="h-10 w-10 bg-[#141519] rounded-xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                  <Command size={22} />
                </div>
                OwnMarket
              </Link>
              <div>
                <h1 className="form-reveal text-5xl font-bold tracking-tighter text-[#141519] leading-tight">
                  Welcome <br /> back.
                </h1>
                <p className="form-reveal mt-4 text-lg text-[#767F88] font-medium">
                  Enter your credentials to manage your digital empire.
                </p>
              </div>
            </div>

            {/* Social Logins */}
            <div className="form-reveal flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="h-14 flex-1 rounded-2xl border-[#E5E5E7] font-bold hover:bg-gray-50 gap-3 shadow-sm active:scale-95 transition-all">
                <Chrome size={20} className="text-red-500" /> Google
              </Button>
              <Button variant="outline" className="h-14 flex-1 rounded-2xl border-[#E5E5E7] font-bold hover:bg-gray-50 gap-3 shadow-sm active:scale-95 transition-all">
                <Github size={20} /> GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="form-reveal flex items-center gap-4 text-[#767F88] text-[11px] font-black uppercase tracking-[0.2em] opacity-40">
              <div className="h-px w-full bg-gray-200" />
              secure portal
              <div className="h-px w-full bg-gray-200" />
            </div>

            {/* Main Form Fields */}
            <div className="space-y-6">
              <div className="form-reveal space-y-2">
                <label className="text-[12px] font-black uppercase tracking-widest text-[#141519] ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#48E44B] transition-colors" size={20} />
                  <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@ownmarket.com" 
                    className="h-15 pl-12 rounded-[20px] border-[#E5E5E7] bg-white text-[16px] font-medium focus-visible:ring-4 focus-visible:ring-[#48E44B]/10 transition-all" 
                  />
                </div>
              </div>

              <div className="form-reveal space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[12px] font-black uppercase tracking-widest text-[#141519]">Password</label>
                  <Link href="#" className="text-[12px] font-bold text-[#48E44B] hover:underline">Forgot Access?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#48E44B] transition-colors" size={20} />
                  <Input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="h-15 pl-12 rounded-[20px] border-[#E5E5E7] bg-white text-[16px] focus-visible:ring-4 focus-visible:ring-[#48E44B]/10 transition-all" 
                  />
                </div>
              </div>

              {/* ACTION BUTTON - Fixed positioning by clearing props */}
              <div className="form-reveal pt-2">
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full h-16 rounded-[24px] bg-[#141519] text-white font-bold text-lg hover:bg-black shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transition-all active:scale-[0.97] group flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In to Dashboard"}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            <p className="form-reveal text-center text-[15px] font-medium text-[#767F88]">
              New creator? <Link href="/signup" className="text-[#141519] font-bold border-b-2 border-[#48E44B] pb-0.5 ml-1">Apply for Account</Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: THE DOODLE UNIVERSE */}
      <div className="hidden lg:flex flex-1 relative bg-[#FAFAFB] items-center justify-center overflow-hidden">
        {/* Gradients */}
        <div className="absolute top-[-10%] right-[-10%] h-[700px] w-[700px] rounded-full bg-[#48E44B]/15 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[5%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[130px]" />

        <div className="doodle-canvas relative w-full h-full flex items-center justify-center">
          {/* Main Glass Card */}
          <div className="doodle-item relative z-10 w-[420px] p-10 rounded-[50px] bg-white/40 border border-white/60 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rotate-[-4deg]">
             <div className="flex items-center gap-5 mb-8">
                <div className="h-14 w-14 rounded-2xl bg-[#141519] text-white flex items-center justify-center">
                  <Fingerprint size={32} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#141519]/40">Secured Node</p>
                  <p className="text-xl font-bold text-[#141519]">Biometric Vault</p>
                </div>
             </div>
             <div className="space-y-4">
                <div className="h-3 w-full bg-[#141519]/5 rounded-full" />
                <div className="h-3 w-3/4 bg-[#141519]/5 rounded-full" />
             </div>
             <div className="mt-8 flex justify-end">
                <ShieldCheck className="text-[#48E44B]" size={28} />
             </div>
          </div>

          {/* Doodles */}
          <div className="doodle-item absolute top-[15%] right-[15%] h-24 w-24 rounded-[32px] bg-[#48E44B] text-[#141519] shadow-2xl flex items-center justify-center rotate-[15deg]"><Sparkles size={40} /></div>
          <div className="doodle-item absolute bottom-[15%] left-[20%] h-20 w-20 rounded-[24px] bg-white shadow-xl flex items-center justify-center rotate-[-12deg] border border-gray-100"><Zap className="text-blue-500" size={32} /></div>
          <div className="doodle-item absolute top-[25%] left-[10%] p-8 rounded-full bg-white shadow-2xl flex items-center justify-center text-4xl">💎</div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 800">
            <path d="M100,200 Q400,100 700,200" stroke="#141519" strokeWidth="2" strokeDasharray="10 10" className="doodle-item" fill="none" />
            <circle cx="650" cy="650" r="50" stroke="#48E44B" strokeWidth="2" className="doodle-item" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  )
}