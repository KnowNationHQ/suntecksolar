"use client"

import Image from "next/image"
import { Radio } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"

export function RadioPromo() {
  const [ref, visible] = useInView(0.15)

  return (
    <section className="section-wrap bg-gradient-to-b from-surface-950 to-surface-900">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <Card className={`border-surface-800/50 bg-surface-900/50 overflow-hidden transition-all duration-700 ease-out hover:shadow-lg hover:shadow-gold-500/5 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-2/5 h-48 sm:h-auto">
              <Image src="/assets/radio-show.jpeg" alt="Solar Yan radio show" fill className="object-cover" sizes="(max-width: 640px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-900/80" />
            </div>
            <CardContent className="p-6 sm:p-8 sm:w-3/5 flex flex-col justify-center">
              <div className="size-10 rounded-full bg-gold-500/10 flex items-center justify-center mb-3">
                <Radio size={20} className="text-gold-500" />
              </div>
              <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 mb-3 w-fit">Weekly Radio Show</Badge>
              <h2 className="section-title mb-2">Solar Yan with the Celebritysolarman</h2>
              <p className="text-sm sm:text-base text-surface-400 mb-5 max-w-lg">Nigeria&apos;s first solar radio program. Every Friday 3:30–4:00 PM on Speed FM 96.9.</p>
              <Button asChild size="lg" className="bg-gradient-to-r from-gold-500 to-gold-400 text-black hover:from-gold-400 hover:to-gold-300 shadow-lg shadow-gold-500/25 font-semibold w-fit">
                <a href="https://www.speedfm969.com" target="_blank" rel="noopener noreferrer">Stream Live</a>
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
