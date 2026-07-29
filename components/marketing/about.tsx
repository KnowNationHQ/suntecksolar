"use client"

import { Sun, Shield, Users, CheckCircle, Zap, BarChart3, Building2, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useInView } from "@/hooks/use-in-view"

const FEATURES = [
  { icon: Sun, title: "Clean Energy, Zero Emissions", desc: "Solar power cuts your electricity bills while reducing your carbon footprint. Pair with battery storage for 24/7 coverage.", color: "gold" },
  { icon: Shield, title: "Certified Installation", desc: "Every system is installed by SON-certified professionals and backed by a full warranty. We don't cut corners.", color: "emerald" },
  { icon: Users, title: "Flexible Financing", desc: "Own your power with pay-in-3 or pay-in-6 plans. Stop paying for diesel or frustrating grid outages.", color: "teal" },
]

const STATS = [
  { value: "5,000+", label: "Installations", icon: Zap, color: "gold" },
  { value: "2 MW+", label: "Capacity Deployed", icon: BarChart3, color: "emerald" },
  { value: "12+", label: "Years in Business", icon: Building2, color: "teal" },
  { value: "98%", label: "Satisfaction", icon: Award, color: "gold" },
]

const COLOR_MAP: Record<string, { border: string; glow: string; from: string; via: string; text: string; iconBg: string; iconText: string; line: string }> = {
  gold: { border: "border-gold-500/30", glow: "shadow-gold-500/15", from: "from-gold-500/10", via: "via-gold-500/5", text: "text-gold-500", iconBg: "bg-gold-500/15", iconText: "text-gold-500", line: "bg-gold-500" },
  emerald: { border: "border-emerald-500/30", glow: "shadow-emerald-500/15", from: "from-emerald-500/10", via: "via-emerald-500/5", text: "text-emerald-500", iconBg: "bg-emerald-500/15", iconText: "text-emerald-500", line: "bg-emerald-500" },
  teal: { border: "border-teal-500/30", glow: "shadow-teal-500/15", from: "from-teal-500/10", via: "via-teal-500/5", text: "text-teal-500", iconBg: "bg-teal-500/15", iconText: "text-teal-500", line: "bg-teal-500" },
}

export function About() {
  const [ref, visible] = useInView(0.15)

  return (
    <section id="about" className="section-wrap relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <div className="flex flex-col gap-8 lg:gap-12 lg:grid lg:grid-cols-5 lg:items-start">
          <div className="flex flex-col gap-5 lg:col-span-2 lg:sticky lg:top-20">
            <div className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 mb-4">Why Solar</Badge>
              <h2 className="section-title text-2xl leading-tight sm:text-3xl lg:text-4xl mb-4">Nigeria&apos;s Trusted Solar Partner</h2>
              <p className="text-sm sm:text-base text-surface-400 leading-relaxed">Servicing Benin City, Agbor, and nationwide — we deliver premium solar installations with certified hardware, professional setup, and payment plans that make clean energy accessible to every Nigerian home and business.</p>
            </div>
            <ul className={`flex flex-col gap-2.5 transition-all duration-700 ease-out delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {[
                "Premium tier-1 panels & inverters",
                "SON-certified professional installers",
                "Pay-in-3 or pay-in-6 financing",
                "Full warranty & post-install support",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-surface-400">
                  <span className="size-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-emerald-500" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div ref={ref} className="flex flex-col gap-3 lg:col-span-3">
            {FEATURES.map((f, i) => {
              const c = COLOR_MAP[f.color]
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className={`relative rounded-xl border ${c.border} bg-gradient-to-br ${c.from} ${c.via} to-transparent p-4 sm:p-5 shadow-lg ${c.glow} overflow-hidden`}>
                    <div className={`absolute -top-4 -right-4 size-20 rounded-full ${c.iconBg} blur-xl opacity-60`} />
                    <div className="flex gap-3 sm:gap-4 items-start">
                      <span className={`size-10 sm:size-11 rounded-xl ${c.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon size={18} className={c.iconText} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-surface-200 text-sm sm:text-base mb-1">{f.title}</h3>
                        <p className="text-xs sm:text-sm text-surface-400 leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className={`grid grid-cols-2 gap-3 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "400ms" }}>
              {STATS.map((s) => {
                const c = COLOR_MAP[s.color]
                const Icon = s.icon
                return (
                  <div key={s.label}>
                    <div className={`relative rounded-xl border ${c.border} bg-gradient-to-br ${c.from} ${c.via} to-transparent p-4 sm:p-5 shadow-lg ${c.glow} overflow-hidden`}>
                      <div className={`absolute -top-4 -right-4 size-16 rounded-full ${c.iconBg} blur-xl opacity-60`} />
                      <span className={`size-8 rounded-lg ${c.iconBg} flex items-center justify-center mb-3`}>
                        <Icon size={15} className={c.iconText} />
                      </span>
                      <div className={`${c.text} text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-none mb-1`}>
                        {visible ? s.value : "0"}
                      </div>
                      <div className="text-xs text-surface-500">{s.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
