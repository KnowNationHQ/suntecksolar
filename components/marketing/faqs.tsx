"use client"

"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useInView } from "@/hooks/use-in-view"

const FAQS = [
  { q: "What is the main challenge for Nigerians switching to solar?", challenge: "High upfront cost of a complete system.", solution: "Flexible payment plans of up to 18 months, breaking costs into manageable installments." },
  { q: "How do you ensure product quality?", challenge: "Market flooded with low-quality counterfeit components.", solution: "We source from certified manufacturers with rigorous quality standards." },
  { q: "What if my system isn't sized correctly?", challenge: "Poor design leads to frequent outages.", solution: "Professional energy audit to assess needs and custom-design your system." },
  { q: "How does Harmattan affect solar panels?", challenge: "Dust accumulation reduces panel efficiency.", solution: "We offer maintenance packages including scheduled cleanings and inspections." },
  { q: "What happens at night or on cloudy days?", challenge: "Without storage, no power when sun isn't shining.", solution: "Advanced battery storage for consistent 24/7 power supply." },
  { q: "How long does a solar system last?", challenge: "Poor maintenance shortens component lifespan.", solution: "Long-term warranty (panels: 25yr, batteries: 10yr) plus regular maintenance." },
]

export function FAQs() {
  const [ref, visible] = useInView(0.1)

  return (
    <section id="faqs" className="section-wrap">
      <div className="max-w-3xl mx-auto">
        <div ref={ref} className={`text-center mb-8 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 mb-3">FAQs</Badge>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className={`border border-surface-800/50 bg-surface-900/50 rounded-lg px-1 data-[state=open]:border-gold-500/20 transition-all duration-500 ease-out hover:border-gold-500/10 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${i * 80}ms` }}>
              <AccordionTrigger className="px-3 text-sm sm:text-base text-surface-200 hover:text-surface-100 hover:no-underline font-medium text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-4">
                <div className="space-y-3">
                  <div className="border-l-2 border-surface-700 pl-3">
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Challenge</p>
                    <p className="text-sm text-surface-400">{faq.challenge}</p>
                  </div>
                  <div className="border-l-2 border-gold-500/40 pl-3">
                    <p className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-sm text-surface-300">{faq.solution}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
