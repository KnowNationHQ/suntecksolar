import { Instagram } from "lucide-react"
import { NAV } from "@/lib/nav"

export function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-surface-925">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
          <div>
            <img src="/assets/suntecksolar-logo.png" alt="SunteckSolar" className="h-8 w-auto mb-4 opacity-80 logo-dark" />
            <p className="text-sm text-surface-500 leading-relaxed">Nigeria&apos;s trusted solar energy provider. Quality installations with flexible payment plans.</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-500 mb-4">Links</h3>
            <div className="flex flex-col gap-2">
              {NAV.map((item) => (
                <a key={item.href} href={`#${item.href}`} className="text-sm text-surface-400 hover:text-surface-200 transition-colors touch-target flex items-center">{item.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-500 mb-4">Follow</h3>
            <a href="https://instagram.com/suntecksolars" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 transition-colors touch-target"><Instagram size={16} /> @suntecksolars</a>
          </div>
        </div>
        <hr className="my-8 border-surface-800" />
        <p className="text-center text-xs text-surface-600">&copy; 2024 SunteckSolar. All rights reserved.</p>
      </div>
    </footer>
  )
}
