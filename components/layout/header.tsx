"use client"

import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { useScroll } from "@/hooks/use-scroll"

const NAV = [
  { label: "Home", href: "home" },
  { label: "Products", href: "products" },
  { label: "Calculator", href: "calculator" },
  { label: "FAQs", href: "faqs" },
  { label: "Contact", href: "contact" },
]

export function Header() {
  const { scrollTo } = useScroll()
  const go = (id: string) => scrollTo(id)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="flex items-center justify-between h-14 px-4 max-w-5xl mx-auto">
        <button onClick={() => go("home")} className="flex items-center shrink-0">
          <img src="/assets/suntecksolar-logo.png" alt="SunteckSolar" className="h-7 sm:h-8 w-auto" />
        </button>
        <nav className="hidden md:flex items-center justify-center gap-0.5">
          {NAV.map((item) => (
            <Button key={item.href} onClick={() => go(item.href)} variant="ghost" size="sm" className="text-surface-500 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800">
              {item.label}
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
