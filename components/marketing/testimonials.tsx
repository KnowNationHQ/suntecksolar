"use client"

import { Star } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useInView } from "@/hooks/use-in-view"

const DATA = [
  { quote: "I have been able to save thousands daily after solar installation by SunteckSolar.", author: "Chief Vincent", location: "Royal Best Hotel", img: "/assets/testimonial-chief.png" },
  { quote: "For more than 2 years, uninterrupted power for both my house and business.", author: "Eguasa", location: "GRA", img: "/assets/testimonial-eguasa.png" },
  { quote: "8 months later, power has never gone off.", author: "Mrs. Linus", location: "Agbor", img: "/assets/testimonial-linus.png" },
  { quote: "18 months and my house is not connected to the grid — just solar by SunteckSolar.", author: "Mr. Sato", location: "Auchi Bypass", img: "/assets/testimonial-sato.png" },
  { quote: "SunteckSolar na the Baba for solar.", author: "Mrs. Stella", location: "Ugbor", img: "/assets/testimonial-stella.png" },
]

export function Testimonials() {
  const [ref, visible] = useInView(0.1)

  return (
    <section id="testimonials" className="section-wrap bg-surface-900/50">
      <div className="max-w-3xl mx-auto">
        <div ref={ref} className={`mb-8 text-center transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 mb-3">Testimonials</Badge>
          <h2 className="section-title">What Our Customers Say</h2>
        </div>
        <div className="flex flex-col gap-4">
          {DATA.map((t, i) => (
            <Card key={i} className={`border-surface-800/50 bg-surface-900/50 transition-all duration-700 ease-out hover:scale-[1.01] hover:border-gold-500/20 hover:shadow-lg hover:shadow-gold-500/5 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <CardContent className="p-4 sm:p-5 flex gap-4 items-start">
                <Image
                  src={t.img}
                  alt={t.author}
                  width={64}
                  height={64}
                  className="size-14 sm:size-16 rounded-full flex-shrink-0 mt-0.5 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={13} className="fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <blockquote className="text-sm sm:text-[15px] text-surface-300 leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className="mt-2.5">
                    <p className="text-sm font-medium text-surface-200">{t.author}</p>
                    <p className="text-xs text-surface-500">{t.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
