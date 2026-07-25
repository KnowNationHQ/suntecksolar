"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

type Theme = "dark" | "light"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const stored = localStorage.getItem("sunteck-theme") as Theme | null
    if (stored === "dark" || stored === "light") setTheme(stored)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    localStorage.setItem("sunteck-theme", theme)
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"))
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center p-2 rounded-lg transition-colors touch-target text-surface-500 hover:text-gold-500 bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:text-brand-400 dark:hover:bg-surface-750"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
