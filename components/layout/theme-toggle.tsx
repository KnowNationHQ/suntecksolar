"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

type Theme = "dark" | "light"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const stored = localStorage.getItem("sunteck-theme") as Theme | null
    if (stored === "dark" || stored === "light") setTheme(stored)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    localStorage.setItem("sunteck-theme", theme)
    root.classList.remove("dark", "light")
    root.classList.add(theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"))
  const Icon = theme === "dark" ? Sun : Moon

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center p-2 rounded-lg text-surface-500 hover:text-amber-600 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors touch-target"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Icon size={18} />
    </button>
  )
}
