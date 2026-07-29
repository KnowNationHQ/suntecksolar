"use client"

import { useInView } from "@/hooks/use-in-view"
import { Badge } from "@/components/ui/badge"

const DATA = [
  { quote: "I have been able to save thousands daily after solar installation by SunteckSolar.", author: "Chief Vincent", location: "Royal Best Hotel" },
  { quote: "For more than 2 years, uninterrupted power for both my house and business.", author: "Eguasa", location: "GRA" },
  { quote: "8 months later, power has never gone off.", author: "Mrs. Linus", location: "Agbor" },
  { quote: "18 months and my house is not connected to the grid — just solar by SunteckSolar.", author: "Mr. Sato", location: "Auchi Bypass" },
  { quote: "SunteckSolar na the Baba for solar.", author: "Mrs. Stella", location: "Ugbor" },
]

export function Testimonials() {
  const [ref, visible] = useInView(0.1)

  return (
    <section id="testimonials" className="section-wrap bg-surface-900/50">
      <div className="max-w-3xl mx-auto px-4">
        <div ref={ref} className={`mb-8 text-center transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 mb-3">Testimonials</Badge>
          <h2 className="section-title">What Our Customers Say</h2>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          {DATA.map((t, i) => (
            <div
              key={i}
              className={`relative bg-surface-900/50 border border-surface-800/50 rounded-xl p-4 sm:p-5 transition-all duration-700 ease-out hover:border-gold-500/20 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="absolute -top-2 -left-1 text-4xl leading-none text-gold-500/20 select-none">&ldquo;</span>
              <blockquote className="text-sm sm:text-[15px] text-surface-300 leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-gold-500/10 flex items-center justify-center text-xs font-bold text-gold-400 shrink-0">
                  {t.author.split(" ").map(w => w[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-200 leading-tight">{t.author}</p>
                  <p className="text-xs text-surface-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}