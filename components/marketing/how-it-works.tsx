"use client"

import Image from "next/image"
import { ClipboardCheck, Zap, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useInView } from "@/hooks/use-in-view"

const STEPS = [
  {
    icon: ClipboardCheck,
    img: "/assets/hiw-audit-1.jpeg",
    title: "1. Free Energy Audit",
    desc: "We assess your power needs and design a system built for your home or business — no guesswork, no oversizing.",
  },
  {
    icon: Zap,
    img: "/assets/hiw-install.png",
    title: "2. Zero-Upfront Installation",
    desc: "Our certified team installs your system. You pay nothing until it&apos;s running and powering your property.",
  },
  {
    icon: TrendingDown,
    img: "/assets/hiw-savings.png",
    title: "3. Start Saving Immediately",
    desc: "Switch off your generator. Your monthly plan costs less than what you were spending on fuel alone.",
  },
]

export function HowItWorks() {
  const [ref, visible] = useInView(0.1)

  return (
    <section id="how-it-works" className="section-wrap">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`text-center mb-10 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 mb-3">Simple Process</Badge>
          <h2 className="section-title">How It Works</h2>
          <p className="text-sm sm:text-base text-surface-500 mt-3 max-w-lg mx-auto">From assessment to savings in three straightforward steps.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
          <div className="hidden sm:block absolute top-6 left-[calc(100%/6)] right-[calc(100%/6)] h-px bg-gradient-to-r from-transparent via-surface-700 to-transparent" />
          {STEPS.map((s, i) => (
            <Card key={s.title} className={`border-surface-800/50 bg-surface-900/50 overflow-hidden hover:border-gold-500/20 transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-gold-500/5 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="relative h-36 sm:h-32 bg-surface-900">
                <Image src={s.img} alt={s.title.replace(/^\d+\.\s*/, '')} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-12 rounded-full bg-gold-500/20 backdrop-blur-sm flex items-center justify-center">
                    <s.icon className="size-6 text-gold-400" />
                  </div>
                </div>
              </div>
              <CardContent className="p-5 text-center">
                <h3 className="font-semibold text-surface-200 text-sm mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
