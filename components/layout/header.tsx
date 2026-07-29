"use client"

import { ArrowUp, Cookie, X } from "lucide-react"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { NAV } from "@/lib/nav"
import { useState, useEffect } from "react"

export function Header() {
  const [showTop, setShowTop] = useState(false)
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    if (!localStorage.getItem("sunteck-consent")) setShowConsent(true)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="flex items-center justify-between h-14 px-4 max-w-5xl mx-auto">
          <button onClick={() => scrollTo("home")} className="flex items-center shrink-0">
            <img src="/assets/suntecksolar-logo.png" alt="SunteckSolar" className="h-7 sm:h-8 w-auto" />
          </button>
          <nav className="hidden md:flex items-center justify-center gap-0.5">
            {NAV.map((item) => (
              <Button key={item.href} onClick={() => scrollTo(item.href)} variant="ghost" size="sm" className="text-surface-500 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800">
                {item.label}
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-20 md:bottom-6 right-6 z-[60] p-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-black shadow-lg shadow-gold-500/25 transition-all duration-300 hover:scale-110 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
      {showConsent && (
        <div className="fixed bottom-24 lg:bottom-4 left-4 right-4 z-[100] max-w-md mx-auto lg:mx-0">
          <div className="bg-surface-900 border border-surface-700 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <span className="size-8 rounded-lg bg-gold-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie size={16} className="text-gold-500" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-surface-300 leading-relaxed">
                  This site stores your theme preference locally. No tracking or analytics cookies are used.{" "}
                  <a href="/privacy" className="text-gold-400 underline hover:text-gold-300">Privacy Policy</a>.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => { localStorage.setItem("sunteck-consent", "true"); setShowConsent(false) }}
                    className="text-xs font-semibold px-4 py-2 rounded-lg bg-gold-500 text-black hover:bg-gold-400 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setShowConsent(false)}
                    className="text-xs px-2 py-2 rounded-lg text-surface-500 hover:text-surface-300 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
