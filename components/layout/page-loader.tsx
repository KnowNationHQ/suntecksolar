"use client"

import { useEffect, useState } from "react"

export function PageLoader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3200)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fdf8ee]" style={{ animation: "fadeOut 0.4s ease 2.8s forwards" }}>
      <div className="relative flex flex-col items-center px-6">
        <img src="/assets/suntecksolar-logo.png" alt="" className="w-full max-w-[300px] sm:max-w-[380px] h-auto mb-10" />
        <div className="relative">
          <div className="w-10 h-10 border-2 border-gold-500/40 rounded-full border-t-gold-600 animate-spin" />
        </div>
      </div>
    </div>
  )
}