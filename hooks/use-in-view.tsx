"use client"

import { useEffect, useRef, useState } from "react"

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible] as const
}

export function AnimateSection({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  const [ref, visible] = useInView(0.1)
  return (
    <section id={id} className={className} ref={ref}>
      <div className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {children}
      </div>
    </section>
  )
}
