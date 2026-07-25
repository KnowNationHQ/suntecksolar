"use client"

"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useScroll } from "@/hooks/use-scroll"
import { useInView } from "@/hooks/use-in-view"

const PRODUCTS = [
  {
    id: "inverters", label: "Inverters",
    items: [{ title: "Hybrid Solar Inverter", desc: "Intelligent energy management for seamless switching between solar, battery, and grid.", img: "/assets/product-inverter.jpg", alt: "Hybrid solar inverter for home" }],
  },
  {
    id: "pumps", label: "Water Pumps",
    items: [{ title: "Solar Water Pump", desc: "Reliable DC/AC pumping for agriculture and boreholes with low running costs.", img: "/assets/product-pump.jpg", alt: "Solar water pump for agriculture" }],
  },
  {
    id: "freezers", label: "Freezers",
    items: [{ title: "Solar Freezer", desc: "Efficient off-grid cooling engineered for Nigerian ambient temperatures.", img: "/assets/product-freezer.jpg", alt: "Solar-powered freezer for off-grid cooling" }],
  },
  {
    id: "lights", label: "Street Lights",
    items: [{ title: "All-in-One Solar Street Light", desc: "Durable outdoor lighting for streets, estates, and public spaces.", img: "/assets/product-streetlight.jpg", alt: "Solar street light for outdoor lighting" }],
  },
]

export function ProductTabs() {
  const [active, setActive] = useState(PRODUCTS[0].id)
  const { scrollTo } = useScroll()
  const current = PRODUCTS.find((p) => p.id === active)!
  const [ref, visible] = useInView(0.1)

  return (
    <section id="products" className="section-wrap">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`mb-8 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 mb-3">Products</Badge>
          <h2 className="section-title">Solar Solutions</h2>
        </div>
        <div className={`scroll-x -mx-4 px-4 mb-5 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "100ms" }}>
          <div className="inline-flex gap-1 p-1 bg-surface-900 border border-surface-800 rounded-xl">
            {PRODUCTS.map((p) => (
              <button key={p.id} onClick={() => setActive(p.id)} className={`touch-target min-w-[80px] px-3 sm:px-4 h-10 text-xs sm:text-sm rounded-lg transition-all whitespace-nowrap font-medium ${active === p.id ? "bg-surface-800 text-surface-100 shadow-sm" : "text-surface-500 hover:text-surface-300"}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        {current.items.map((item, i) => (
          <Card key={i} className={`overflow-hidden border-surface-800/50 bg-surface-900/50 sm:flex transition-all duration-700 ease-out hover:shadow-lg hover:shadow-gold-500/5 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "200ms" }}>
            <div className="relative aspect-video sm:w-80 sm:aspect-square sm:flex-shrink-0">
              <Image src={item.img} alt={item.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 320px" />
            </div>
            <CardContent className="p-5 sm:p-6 sm:flex sm:flex-col sm:justify-center sm:flex-1">
              <h3 className="text-lg font-semibold text-surface-100 mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base text-surface-400 mb-4 leading-relaxed">{item.desc}</p>
              <Button onClick={() => scrollTo("contact")} variant="outline" className="w-fit border-surface-700 text-surface-300 hover:border-gold-500/40 hover:text-gold-400 hover:bg-gold-500/5">
                <ArrowRight size={14} /> Get a Quote
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
