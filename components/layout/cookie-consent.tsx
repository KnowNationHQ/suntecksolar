"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("sunteck-consent")) setVisible(true)
  }, [])

  const accept = () => { localStorage.setItem("sunteck-consent", "accepted"); setVisible(false) }
  const dismiss = () => setVisible(false)

  if (!visible) return null

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50 max-w-md mx-auto md:mx-0 md:left-4">
      <Card className="border-surface-800/50 bg-surface-900/95 backdrop-blur-xl shadow-xl">
        <CardContent className="p-4 flex flex-col gap-3">
          <p className="text-xs sm:text-sm text-surface-500">
            This website uses minimal cookies for functionality. We do not track or sell your data.
            By continuing, you accept our{" "}
            <a href="/privacy" className="text-gold-500 underline">Privacy Policy</a>.
          </p>
          <div className="flex gap-2">
            <Button onClick={accept} size="sm" className="bg-gold-500 text-black hover:bg-gold-400 font-medium">Accept</Button>
            <Button onClick={dismiss} variant="outline" size="sm" className="border-surface-700 text-surface-400 hover:text-surface-300 hover:bg-surface-800/50">Dismiss</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
