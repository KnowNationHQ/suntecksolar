"use client"

import { useState } from "react"
import { Search, Zap, Shield, Battery, Cable, Cog } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useInView } from "@/hooks/use-in-view"

interface SpecRow { component: string; material: string; cert: string; warranty: string; icon: any; color: string }

const DATA: SpecRow[] = [
  { component: "Solar Panels", material: "High-grade silicon, tempered glass, aluminum frame", cert: "SON, IEC 61215", warranty: "25 years", icon: Zap, color: "emerald" },
  { component: "Inverters", material: "Pure sine wave, MPPT charge controller", cert: "SON, IEC 62109", warranty: "5 years", icon: Shield, color: "gold" },
  { component: "Batteries", material: "Lithium-ion LiFePO4, deep-cycle", cert: "SON, UN38.3", warranty: "10 years", icon: Battery, color: "emerald" },
  { component: "Wiring", material: "UV-resistant XLPE, oxygen-free copper", cert: "SON, NIS", warranty: "2 years", icon: Cable, color: "amber" },
  { component: "Mounting", material: "Galvanized steel, corrosion-resistant", cert: "ISO 9001", warranty: "10 years", icon: Cog, color: "emerald" },
]

const COLOR_MAP: Record<string, { border: string; dot: string; bg: string; text: string; badge: string }> = {
  emerald: { border: "border-l-emerald-500", dot: "bg-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-400", badge: "border-emerald-500/20 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10" },
  gold: { border: "border-l-gold-500", dot: "bg-gold-500", bg: "bg-gold-500/10", text: "text-gold-400", badge: "border-gold-500/20 text-amber-700 dark:text-gold-400 bg-gold-500/10" },
  amber: { border: "border-l-amber-500", dot: "bg-amber-500", bg: "bg-amber-500/10", text: "text-amber-400", badge: "border-amber-500/20 text-amber-700 dark:text-amber-400 bg-amber-500/10" },
}

const LABELS: Record<string, string> = { material: "Material", cert: "Certification", warranty: "Warranty" }

export function SpecTable() {
  const [filter, setFilter] = useState("")
  const [ref, visible] = useInView(0.1)
  const rows = DATA.filter((r) =>
    [r.component, r.material, r.cert, r.warranty].some((v) => v.toLowerCase().includes(filter.toLowerCase()))
  )

  return (
    <section id="specs" className="section-wrap">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`mb-8 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 mb-3">Technical Data</Badge>
          <h2 className="section-title">Component Specifications</h2>
        </div>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <Input id="spec-search" value={filter} onChange={(e) => setFilter(e.target.value.replace(/[^a-zA-Z0-9 ]/g, ""))} placeholder="Find your solar component..." className="pl-10 h-12 bg-surface-900 border-surface-750 text-surface-300 placeholder:text-surface-500" />
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {rows.map((row, i) => {
            const c = COLOR_MAP[row.color]
            const Icon = row.icon
            return (
              <AccordionItem
                key={i}
                value={row.component}
                className={`border border-surface-800/50 bg-surface-900/50 rounded-lg overflow-hidden border-l-4 ${c.border} data-[state=open]:border-gold-500/30 transition-colors`}
              >
                <AccordionTrigger className="px-4 py-4 text-sm sm:text-base text-surface-200 hover:text-surface-100 font-medium hover:no-underline gap-3">
                  <span className="flex items-center gap-3">
                    <span className={`size-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                      <Icon size={16} className={c.text} />
                    </span>
                    {row.component}
                  </span>
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${c.badge}`}>
                    {row.warranty}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-2.5">
                  {(["material", "cert", "warranty"] as const).map((key) => (
                    <div key={key} className="flex items-baseline gap-2 text-sm">
                      <span className="text-surface-500 font-medium shrink-0 w-24">{LABELS[key]}</span>
                      <span className="text-surface-400">{row[key]}</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
