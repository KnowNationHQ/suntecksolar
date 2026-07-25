"use client"

import { useInView } from "@/hooks/use-in-view"

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
