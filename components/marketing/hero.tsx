"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { Zap, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useScroll } from "@/hooks/use-scroll"

const SLIDES = [
  { src: "/assets/hero1.jpg" },
  { src: "/assets/hero2.jpg" },
]

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const { scrollTo } = useScroll()

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (!paused) timerRef.current = setInterval(next, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next, paused])

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; setPaused(true) }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) dx > 0 ? prev() : next()
    setPaused(false)
  }

  return (
    <section
      id="home"
      className="relative min-h-[70svh] flex items-end overflow-hidden pt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/70 to-surface-950/20" />
        <div className="sunburst" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-16 animate-[fade-up_0.8s_ease-out_0.3s_both]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 font-medium gap-1.5 px-3 py-1">
              <Zap size={12} /> Nigeria&apos;s Trusted Solar Brand
            </Badge>
          </div>
          <h1 className="text-[1.65rem] sm:text-5xl lg:text-6xl font-bold text-surface-100 leading-[1.05] tracking-tight mb-2 sm:mb-3 font-display">
            Never Pay for<br />
            <span className="text-gold-400">Generator Fuel Again</span>
          </h1>
          <p className="text-sm sm:text-base text-surface-400 max-w-xl mb-6 leading-relaxed">
            Premium solar installations tailored for Nigerian homes and businesses. Zero upfront cost with flexible payment plans up to 18 months.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => scrollTo("calculator")} size="lg" className="bg-gradient-to-r from-gold-500 to-gold-400 text-black hover:from-gold-400 hover:to-gold-300 shadow-lg shadow-gold-500/25 font-semibold">
              <Zap size={18} /> Get Your Free Quote <ArrowRight size={16} />
            </Button>
            <Button onClick={() => scrollTo("products")} variant="outline" size="lg" className="border-surface-700 text-surface-300 hover:border-gold-500/40 hover:text-gold-400 hover:bg-gold-500/5">
              See Our Products
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="touch-target flex items-center justify-center w-10 h-10"
            aria-label={`Slide ${i + 1}`}
          >
            <span className={`rounded-full transition-all duration-300 ${i === current ? "bg-gold-500 w-6 h-2" : "bg-surface-600 w-2 h-2"}`} />
          </button>
        ))}
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-surface-300 hover:bg-black/60 hover:text-surface-100 transition-all hidden sm:block" aria-label="Previous slide">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-surface-300 hover:bg-black/60 hover:text-surface-100 transition-all hidden sm:block" aria-label="Next slide">
        <ChevronRight size={20} />
      </button>
    </section>
  )
}
