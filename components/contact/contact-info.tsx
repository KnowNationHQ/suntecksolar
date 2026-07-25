"use client"

import { Phone, Mail, Instagram, MapPin, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const CONTACT_METHODS = [
  { icon: Phone, label: "Phone", items: ["07031953010", "08168067764"], href: "tel:+234" },
  { icon: Mail, label: "Email", items: ["helpdesk@suntecksolars.com", "sunteckglobalimpactltd@gmail.com"], href: "mailto:" },
  { icon: Instagram, label: "Social", items: ["@suntecksolars"], href: "https://instagram.com/", external: true },
]

const LOCATIONS = [
  { city: "Benin City", address: "23, Iduowina Road, Off Benin Auchi Road" },
  { city: "Agbor", address: "23 Old Lagos Asaba Road" },
]

export function ContactInfo() {
  return (
    <Card className="border-surface-800/50 bg-surface-900/50 h-full overflow-hidden">
      <CardContent className="p-0">
        <div className="p-5 sm:p-6 space-y-5">
          {CONTACT_METHODS.map((group) => {
            const Icon = group.icon
            return (
              <div key={group.label} className="flex gap-3">
                <span className="size-9 rounded-lg bg-gold-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={16} className="text-gold-500" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-surface-500 mb-1.5">{group.label}</p>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const href = group.href + (group.label === "Phone" ? item.replace(/\D/g, "") : group.label === "Social" ? item.replace(/^@/, "") : item)
                      return (
                        <a
                          key={item}
                          href={href}
                          target={group.external ? "_blank" : undefined}
                          rel={group.external ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-1.5 text-sm text-surface-300 hover:text-gold-400 transition-colors w-fit group"
                        >
                          <span className="truncate">{item}</span>
                          <ChevronRight size={12} className="text-surface-600 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-t border-surface-800/50 p-5 sm:p-6 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-surface-500 flex items-center gap-2">
            <MapPin size={12} className="text-gold-500" />
            Our Locations
          </p>
          <div className="grid gap-3">
            {LOCATIONS.map((loc) => (
              <div key={loc.city} className="border-l-2 border-gold-500/30 pl-3">
                <p className="text-sm font-medium text-surface-200">{loc.city}</p>
                <p className="text-xs text-surface-400 mt-0.5 leading-relaxed">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
