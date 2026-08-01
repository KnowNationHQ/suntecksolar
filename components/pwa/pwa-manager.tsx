"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

const isIOS = typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent)
const inStandalone =
  typeof window !== "undefined" &&
  (window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone === true)

export function PwaManager() {
  const [deferred, setDeferred] = useState<{ prompt: () => void } | null>(null)
  const [showA2hs, setShowA2hs] = useState(false)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {})
    }
    if (navigator.storage?.persist) {
      navigator.storage.persist().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (inStandalone) return
    const onInstall = (e: Event) => {
      e.preventDefault()
      setDeferred(e as unknown as { prompt: () => void })
    }
    window.addEventListener("beforeinstallprompt", onInstall)
    if (isIOS) {
      const t = setTimeout(() => setShowA2hs(true), 4000)
      return () => {
        window.removeEventListener("beforeinstallprompt", onInstall)
        clearTimeout(t)
      }
    }
    return () => window.removeEventListener("beforeinstallprompt", onInstall)
  }, [])

  if (deferred) {
    return (
      <div className="fixed bottom-20 left-4 right-4 z-[100] max-w-md mx-auto">
        <div className="bg-surface-900 border border-surface-700 rounded-xl p-4 shadow-2xl flex items-center gap-3">
          <img src="/icon-192.png" alt="" className="size-10 rounded-lg" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-surface-100">Install SunteckSolar</p>
            <p className="text-xs text-surface-500">Get instant access from your home screen.</p>
          </div>
          <button
            onClick={() => deferred.prompt()}
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-gold-500 text-black hover:bg-gold-400 transition-colors"
          >
            Install
          </button>
          <button
            onClick={() => setDeferred(null)}
            aria-label="Dismiss"
            className="text-surface-500 hover:text-surface-300"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    )
  }

  if (showA2hs) {
    return (
      <div className="fixed bottom-20 left-4 right-4 z-[100] max-w-md mx-auto">
        <div className="bg-surface-900 border border-surface-700 rounded-xl p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <img src="/icon-192.png" alt="" className="size-10 rounded-lg" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-surface-100">Add to Home Screen</p>
              <p className="text-xs text-surface-500 leading-relaxed mt-1">
                Tap the Share button in Safari, then <span className="text-gold-400">Add to Home Screen</span> for the full app experience.
              </p>
            </div>
            <button onClick={() => setShowA2hs(false)} aria-label="Dismiss" className="text-surface-500 hover:text-surface-300">
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
