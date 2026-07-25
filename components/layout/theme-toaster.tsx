"use client"

import { Toaster } from "sonner"
import { useEffect, useState } from "react"

export function ThemeToaster() {
  const [theme, setTheme] = useState<"dark" | "light">("light")

  useEffect(() => {
    const el = document.documentElement
    const update = () => setTheme(el.classList.contains("dark") ? "dark" : "light")
    update()
    const observer = new MutationObserver(update)
    observer.observe(el, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return <Toaster position="top-right" theme={theme} />
}
