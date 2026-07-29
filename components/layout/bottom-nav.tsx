"use client"

import { useState, useEffect } from "react"
import { Home, Package, Calculator, MessageCircle, HelpCircle } from "lucide-react"
import { NAV } from "@/lib/nav"

const TABS = NAV.map((n) => ({
  label: n.label,
  href: n.href,
  icon: [Home, Package, Calculator, HelpCircle, MessageCircle][["home", "products", "calculator", "faqs", "contact"].indexOf(n.href)],
}))

export function BottomNav() {
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => {
      const sections = TABS.map((t) => document.getElementById(t.href)).filter(Boolean) as HTMLElement[]
      let current = sections[0]
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= 200) current = el
      }
      setActive(current?.id || "home")
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe bg-surface-950/90 backdrop-blur-xl border-t border-surface-800">
      <div className="flex items-center justify-around h-14">
        {TABS.map((t) => {
          const Icon = t.icon
          const isActive = active === t.href
          return (
            <button
              key={t.href}
              onClick={() => scrollTo(t.href)}
              className="relative flex flex-col items-center justify-center gap-0.5 min-w-0 px-2 py-1 touch-target transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label={t.label}
            >
              <Icon size={20} className={`transition-all duration-200 ${isActive ? "text-gold-500 scale-110" : "text-surface-500 group-hover:text-surface-200"}`} />
              <span className={`text-[10px] font-medium leading-none transition-all duration-200 ${isActive ? "text-gold-500" : "text-surface-500"}`}>{t.label}</span>
              {isActive && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-gold-500 animate-[ping_1.5s_ease-in-out_infinite]" />}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
