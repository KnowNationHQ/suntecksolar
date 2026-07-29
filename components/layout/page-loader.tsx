"use client"

import { useEffect, useState } from "react"

export function PageLoader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3000)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-950 animate-[fadeOut_0.4s_ease_2.6s_forwards]">
      <div className="relative">
        <img src="/assets/suntecksolar-logo.png" alt="" className="h-10 w-auto mb-6 opacity-90" />
        <div className="absolute -inset-6 border-2 border-gold-500/30 rounded-full animate-[spin_2s_linear_infinite] border-t-gold-500" />
        <div className="absolute -inset-10 border-2 border-emerald-500/20 rounded-full animate-[spin_3s_linear_infinite_reverse] border-t-emerald-500" />
      </div>
    </div>
  )
}