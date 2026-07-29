import { Instagram, Mail, Phone, MapPin } from "lucide-react"
import { NAV } from "@/lib/nav"

export function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-surface-950">
      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src="/assets/suntecksolar-logo.png" alt="SunteckSolar" className="h-7 w-auto mb-3 opacity-80" />
            <p className="text-sm text-surface-500 leading-relaxed max-w-xs">
              Nigeria&apos;s trusted solar energy provider. Quality installations with flexible payment plans.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-surface-500 mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2.5">
              {NAV.map((item) => (
                <a key={item.href} href={`#${item.href}`} className="text-sm text-surface-400 hover:text-gold-400 transition-colors">{item.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-surface-500 mb-4">Contact</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+2347031953010" className="flex items-center gap-2 text-sm text-surface-400 hover:text-gold-400 transition-colors">
                <Phone size={14} className="shrink-0" /> <span>07031953010</span>
              </a>
              <a href="mailto:helpdesk@suntecksolars.com" className="flex items-center gap-2 text-sm text-surface-400 hover:text-gold-400 transition-colors">
                <Mail size={14} className="shrink-0" /> <span>helpdesk@suntecksolars.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-surface-400">
                <MapPin size={14} className="shrink-0 mt-0.5" />
                <span>23 Iduowina Rd, Benin City, Edo State</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-surface-800">
          <p className="text-xs text-surface-600">&copy; 2024 SunteckSolar. All rights reserved.</p>
          <a href="https://instagram.com/suntecksolars" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-surface-500 hover:text-gold-400 transition-colors">
            <Instagram size={14} /> @suntecksolars
          </a>
        </div>
      </div>
    </footer>
  )
}