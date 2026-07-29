"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

type Theme = "dark" | "light"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
  }, [])

  useEffect(() => {
    const root = document.documentElement
    localStorage.setItem("sunteck-theme", theme)
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-12 h-6 rounded-full p-0.5 transition-colors duration-300 shrink-0 bg-gold-500/10 dark:bg-surface-800 ring-1 ring-gold-500/20 dark:ring-gold-500/20 hover:ring-gold-500/40"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span
        className={`size-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
          isDark
            ? "translate-x-6 bg-surface-700 shadow-gold-500/10"
            : "translate-x-0 bg-white shadow-gold-500/20"
        }`}
      >
        <Sun
          size={11}
          className={`absolute transition-all duration-300 ${
            isDark ? "opacity-0 scale-0" : "opacity-100 scale-100 text-gold-500"
          }`}
        />
        <Moon
          size={11}
          className={`absolute transition-all duration-300 ${
            isDark ? "opacity-100 scale-100 text-gold-300" : "opacity-0 scale-0"
          }`}
        />
      </span>
    </button>
  )
}