"use client"

import { useState } from "react"
import { Zap, Calculator, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { APPLIANCES, PRICING } from "@/lib/pricing"
import { computePlan, getApplianceLines } from "@/hooks/use-solar-calculator"
import { useInView } from "@/hooks/use-in-view"

type Step = "loads" | "terms" | "review"

export function SolarCalc() {
  const [step, setStep] = useState<Step>("loads")
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [months, setMonths] = useState<3 | 6 | 12 | 18>(12)

  const updateQty = (id: string, val: number) => setQuantities((p) => ({ ...p, [id]: Math.max(0, Math.min(10, val)) }))
  const totalWatts = Object.entries(quantities).reduce((s, [id, qty]) => { const a = APPLIANCES.find((x) => x.id === id); return s + (a ? a.watts * qty : 0); }, 0)
  const plan = totalWatts > 0 ? computePlan({ quantities, months }) : null
  const lines = getApplianceLines(quantities)
  const [ref, visible] = useInView(0.1)

  return (
    <section id="calculator" className="section-wrap bg-surface-900/50">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`mb-8 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Badge variant="outline" className="border-gold-500/20 text-gold-400 bg-gold-500/10 mb-3">
            <Calculator size={12} className="inline mr-1" /> Financing Calculator
          </Badge>
          <h2 className="section-title">Calculate Your Solar Plan</h2>
          <p className="text-sm sm:text-base text-surface-500 mt-3 max-w-xl">Estimate system size, costs, and savings with our flexible payment plans.</p>
        </div>

        <Card className="border-surface-800/50 bg-surface-900/50">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-center gap-3 mb-8">
              {(["loads", "terms", "review"] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`size-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step === s ? "bg-gold-500 text-black scale-110 shadow-lg shadow-gold-500/20" 
                      : i < ["loads", "terms", "review"].indexOf(step) ? "bg-brand-600 text-white" 
                      : "bg-surface-800 text-surface-500"
                  }`}>{i + 1}</div>
                  {i < 2 && <div className="w-8 h-px bg-surface-700" />}
                </div>
              ))}
            </div>

            {step === "loads" && (
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-surface-100 mb-5">What do you want to power?</h3>
                <div className="flex flex-col gap-1 mb-5">
                  {APPLIANCES.map((a) => (
                    <div key={a.id} className="flex items-center justify-between py-3 border-b border-surface-800 last:border-0">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-surface-200 truncate">{a.name}</p>
                        <p className="text-xs text-surface-500">{a.watts}W &mdash; {a.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <button onClick={() => updateQty(a.id, (quantities[a.id] || 0) - 1)} className="size-12 rounded-lg bg-surface-800 text-surface-400 hover:text-surface-100 flex items-center justify-center text-sm transition-colors touch-target">&minus;</button>
                        <span className="w-6 text-center text-sm font-medium text-surface-200">{quantities[a.id] || 0}</span>
                        <button onClick={() => updateQty(a.id, (quantities[a.id] || 0) + 1)} className="size-12 rounded-lg bg-surface-800 text-surface-400 hover:text-surface-100 flex items-center justify-center text-sm transition-colors touch-target">+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-surface-800">
                  <p className="text-sm text-surface-400">Total: <span className="font-semibold text-surface-200">{totalWatts}W</span></p>
                  <Button onClick={() => setStep("terms")} disabled={totalWatts === 0} className="bg-gold-500 text-black hover:bg-gold-400 font-medium shadow-lg shadow-gold-500/20">
                    Next <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
            )}

            {step === "terms" && (
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-surface-100 mb-5">Choose payment plan</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  {PRICING.paymentTerms.map((m) => (
                    <button key={m} onClick={() => setMonths(m)} className={`touch-target p-3 sm:p-4 rounded-xl border text-center transition-all ${months === m ? "border-gold-500 bg-gold-500/10 text-gold-400 shadow-sm" : "border-surface-800 bg-surface-800/50 text-surface-400 hover:border-surface-700"}`}>
                      <span className="text-lg font-bold block">{m}</span>
                      <span className="text-xs">months</span>
                    </button>
                  ))}
                </div>
                {plan && (
                  <div className="bg-surface-800/50 rounded-xl p-4 sm:p-5 space-y-2 mb-5">
                    {[
                      { label: "System Cost", val: `₦${plan.systemCost.toLocaleString()}`, cls: "text-surface-200" },
                      { label: "Deposit (20%)", val: `₦${plan.deposit.toLocaleString()}`, cls: "text-gold-400" },
                      { label: "Monthly Payment", val: `₦${plan.monthlyPayment.toLocaleString()}`, cls: "text-brand-400" },
                      { label: "vs. Generator Fuel", val: `₦${plan.generatorMonthlyCost.toLocaleString()}/mo`, cls: "text-destructive" },
                    ].map((r) => (
                      <div key={r.label} className="flex justify-between text-sm"><span className="text-surface-500">{r.label}</span><span className={`font-medium ${r.cls}`}>{r.val}</span></div>
                    ))}
                    {plan.monthlySavings > 0 && <div className="bg-brand-600/20 rounded-lg p-3 text-center mt-3"><p className="text-brand-400 text-sm font-semibold">Save ₦{plan.monthlySavings.toLocaleString()}/mo vs. generator!</p></div>}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button onClick={() => setStep("loads")} variant="outline" size="sm" className="border-surface-700 text-surface-400 hover:text-surface-300"><ChevronLeft size={14} /> Back</Button>
                  <Button onClick={() => setStep("review")} size="sm" className="bg-gold-500 text-black hover:bg-gold-400 font-medium ml-auto">Review <ChevronRight size={14} /></Button>
                </div>
              </div>
            )}

            {step === "review" && plan && (
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-surface-100 mb-5">Your Solar Plan</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                  {[
                    { label: "System Size", val: `${plan.systemKw} kW` },
                    { label: "Total Load", val: `${plan.totalWatts} W` },
                    { label: "Deposit", val: `₦${plan.deposit.toLocaleString()}` },
                    { label: "Monthly", val: `₦${plan.monthlyPayment.toLocaleString()}` },
                  ].map((s) => (
                    <div key={s.label} className="bg-surface-800/50 rounded-xl p-3 sm:p-4 text-center">
                      <p className="text-xs text-surface-500 mb-0.5">{s.label}</p>
                      <p className="text-base font-bold text-surface-100">{s.val}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-surface-800/50 rounded-xl p-4 space-y-1.5 mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-surface-500 mb-3">Appliances</p>
                  {lines.map((l) => (
                    <div key={l.id} className="flex justify-between text-sm"><span className="text-surface-400">{l.name} &times; {l.quantity}</span><span className="text-surface-300">{l.subtotal}W</span></div>
                  ))}
                </div>
                <div className="bg-brand-900/50 border border-brand-800 rounded-xl p-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm"><span className="text-surface-400">Total Financed</span><span className="text-surface-100 font-semibold">₦{plan.totalFinanced.toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-surface-400">Duration</span><span className="text-surface-100">{months} months</span></div>
                  {plan.monthlySavings > 0 && <div className="bg-gold-500/10 rounded-lg p-3 text-center mt-3"><p className="text-gold-400 text-sm font-semibold">Save ₦{plan.monthlySavings.toLocaleString()}/mo vs generator!</p></div>}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setStep("terms")} variant="outline" size="sm" className="border-surface-700 text-surface-400 hover:text-surface-300"><ChevronLeft size={14} /> Back</Button>
                  <Button onClick={() => setStep("loads")} size="sm" className="bg-gold-500 text-black hover:bg-gold-400 font-medium ml-auto"><RotateCcw size={14} /> Adjust Appliances</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
