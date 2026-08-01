const SHELL = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png", "/maskable-192.png", "/maskable-512.png", "/apple-touch-icon.png", "/apple-touch-icon-152.png", "/apple-touch-icon-167.png", "/apple-touch-icon-120.png", "/apple-touch-icon-76.png", "/favicon.png", "/favicon-16.png", "/favicon-32.png", "/assets/suntecksolar-logo.png", "/screenshot-wide.png", "/screenshot-narrow.png"]
const CACHE = "sunteck-v1"

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (e) => {
  const { request } = e
  if (request.method !== "GET") return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put("/", copy))
          return res
        })
        .catch(() => caches.match("/"))
    )
    return
  }

  e.respondWith(
    caches.match(request).then((cached) => {
      const fetched = fetch(request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(request, copy))
          }
          return res
        })
        .catch(() => cached)
      return cached || fetched
    })
  )
})
