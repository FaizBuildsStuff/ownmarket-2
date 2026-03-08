"use client"

import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import {
    Users,
    Globe,
    Trophy,
    Heart,
    ArrowUpRight,
    Github,
    Twitter,
    Linkedin,
    ShieldCheck
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const team = [
    { name: "FaizuRrehman (CRYPTO)", role: "Founder & Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
    { name: "Skull (Ali)", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
    { name: "Marcus Thorne", role: "CTO", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
    { name: "Elena Frost", role: "Operations", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb" },
]

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Text Split Reveal
            gsap.from(".about-reveal", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out"
            })

            // Parallax Image
            gsap.to(".parallax-img", {
                scrollTrigger: {
                    trigger: ".parallax-img",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: -80,
                ease: "none"
            })

            // Section Fade-ins
            const fadeItems = gsap.utils.toArray<HTMLElement>('.fade-section')
            fadeItems.forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "expo.out"
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="bg-[#FAFAFB] min-h-screen selection:bg-[#48E44B]/30">

            {/* SECTION 1: EXPENSIVE HERO */}
            <section className="relative px-6 pt-40 pb-24 overflow-hidden">
                <div className="mx-auto max-w-[1250px] text-center">
                    <Badge className="about-reveal mb-8 bg-white/80 border-[#E5E5E7] text-[#141519] px-5 py-1.5 font-bold shadow-sm">
                        Our Story
                    </Badge>
                    <h1 className="about-reveal text-6xl md:text-[100px] font-bold tracking-tighter text-[#141519] leading-[0.9] mb-10">
                        Empowering the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#141519] via-gray-600 to-[#48E44B]">Next Generation</span>
                    </h1>
                    <p className="about-reveal mt-10 mx-auto max-w-[640px] text-xl md:text-2xl text-[#767F88] font-medium leading-relaxed">
                        OwnMarket was founded with a simple mission: to build the world's most trusted home for premium digital assets.
                    </p>
                </div>
            </section>

            {/* SECTION 2: THE "BENTO" MISSION */}
            <section className="px-6 py-20">
                <div className="mx-auto max-w-[1250px] grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="fade-section md:col-span-2 relative h-[400px] rounded-[48px] overflow-hidden group">
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                            alt="Office" fill className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-12 flex flex-col justify-end">
                            <h3 className="text-white text-3xl font-bold">Born in 2026</h3>
                            <p className="text-gray-300 max-w-[400px] mt-2">Started by three designers who were tired of low-quality marketplaces. We built what we wanted to use.</p>
                        </div>
                    </div>
                    <div className="fade-section bg-[#48E44B] rounded-[48px] p-12 flex flex-col justify-between text-black">
                        <Trophy size={48} className="stroke-[1.5px]" />
                        <div>
                            <h3 className="text-4xl font-bold tracking-tight">#1</h3>
                            <p className="font-bold opacity-80 uppercase tracking-widest text-sm mt-1">Marketplace Choice 2026</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: COMPANY DETAILS (Text & Image Split) */}
            <section className="px-6 py-32 overflow-hidden">
                <div className="mx-auto max-w-[1250px] grid lg:grid-cols-2 gap-20 items-center">
                    <div className="fade-section space-y-8">
                        <h2 className="text-5xl font-bold tracking-tighter">Why we do it.</h2>
                        <p className="text-lg text-[#767F88] leading-relaxed">
                            We believe that the barrier between a great idea and a great product shouldn't be high-quality code and design. By providing the building blocks, we allow creators to focus on innovation.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-8">
                            {[
                                { icon: <Globe />, label: "Global Reach", desc: "Creators from 140+ countries." },
                                { icon: <ShieldCheck />, label: "Secure", desc: "Blockchain-verified ownership." },
                            ].map((item, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="text-[#48E44B]">{item.icon}</div>
                                    <h4 className="font-bold text-lg">{item.label}</h4>
                                    <p className="text-sm text-[#767F88]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="fade-section relative h-[600px] rounded-[60px] overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                            alt="Culture" fill className="parallax-img object-cover scale-125"
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 4: THE TEAM (Professional Modern Cards) */}
            <section className="px-6 py-32 bg-white rounded-t-[80px] shadow-[0_-20px_80px_rgba(0,0,0,0.02)]">
                <div className="mx-auto max-w-[1250px]">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                        <div className="fade-section">
                            <Badge className="mb-4 bg-[#48E44B]/10 text-[#2d8a2f] border-none font-bold">The Team</Badge>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Meet the minds.</h2>
                        </div>
                        <p className="fade-section max-w-[400px] text-[#767F88] text-lg">
                            A distributed team of 40+ designers, developers, and visionaries working to change the digital economy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => (
                            <div key={i} className="fade-section group relative flex flex-col">
                                <div className="relative h-[400px] w-full rounded-[40px] overflow-hidden mb-6">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <Button size="icon" className="rounded-full bg-white text-black hover:bg-[#48E44B]"><Twitter size={18} /></Button>
                                        <Button size="icon" className="rounded-full bg-white text-black hover:bg-[#48E44B]"><Linkedin size={18} /></Button>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-[#141519]">{member.name}</h3>
                                <p className="text-[#767F88] font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5: JOIN US CTA */}
            <section className="fade-section py-40 px-6 text-center">
                <div className="mx-auto max-w-[1000px]">
                    <div className="relative inline-block mb-10">
                        <div className="absolute -inset-4 bg-[#48E44B]/20 blur-2xl rounded-full animate-pulse" />
                        <Heart size={64} className="relative text-[#141519] fill-[#48E44B] stroke-none" />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                        We're just <br /> getting started.
                    </h2>
                    <p className="text-[#767F88] text-xl md:text-2xl mb-12 font-medium max-w-[600px] mx-auto">
                        Want to be part of the future? We're always looking for brilliant creators to join our mission.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/careers">
                        <Button className="h-20 px-14 rounded-[30px] bg-black text-xl font-bold group">
                            Open Positions <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button></Link>
                        <Button variant="ghost" className="h-20 px-14 rounded-[30px] text-xl font-bold border border-transparent hover:border-[#E5E5E7]">
                            Read our Values
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    )
}