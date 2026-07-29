"use client"

import { useState } from "react"
import Image from "next/image"
import { Zap, ArrowRight, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const SLIDES = [
  { src: "/assets/hero1.jpg" },
  { src: "/assets/hero2.jpg" },
]

export function Hero() {
  const [current, setCurrent] = useState(0)
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length)
  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)

  return (
    <section id="home" className="relative min-h-dvh flex items-end overflow-hidden pt-14">
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== current}
          >
            <Image src={slide.src} alt="Solar installation for Nigerian home" fill className="object-cover" priority={i === 0} sizes="100vw" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />
        <div className="sunburst" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-16 animate-[fade-up_0.8s_ease-out_0.3s_both]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 font-medium gap-1.5 px-3 py-1">
              <Zap size={12} /> Nigeria&apos;s Trusted Solar Brand
            </Badge>
          </div>
          <h1 className="text-[1.65rem] sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-2 sm:mb-3 font-display">
            Never Pay for<br />
            <span className="text-gold-400">Generator Fuel Again</span>
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mb-6 leading-relaxed">
            Premium solar panels, inverters, and battery installations for Nigerian homes and businesses. Zero upfront cost with flexible payment plans up to 18 months.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => scrollTo("calculator")} size="lg" className="bg-gradient-to-r from-gold-500 to-gold-400 text-black hover:from-gold-400 hover:to-gold-300 shadow-lg shadow-gold-500/25 font-semibold">
              <Zap size={18} /> Get Your Free Quote <ArrowRight size={16} />
            </Button>
            <a href="https://instagram.com/suntecksolars" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="bg-transparent border-neutral-700 text-neutral-300 hover:border-gold-500/40 hover:text-gold-400 hover:bg-gold-500/5">
                <Instagram size={16} /> Follow Us on Instagram
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? "bg-gold-500 w-8 h-2" : "bg-neutral-600 w-2 h-2"}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}
