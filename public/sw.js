const CACHE = "sunteck-v1";
const STATIC = ["/manifest.json", "/icon.svg", "/favicon.ico", "/assets/hero1.jpg", "/assets/hero2.jpg", "/assets/product-inverter.jpg", "/assets/product-pump.jpg", "/assets/product-freezer.jpg", "/assets/product-streetlight.jpg"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(STATIC))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.url.startsWith(self.location.origin)) {
    const ct = new Headers(e.request.headers).get("Accept") || "";
    if (ct.includes("text/html")) {
      e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
      return;
    }
    e.respondWith(
      caches.match(e.request).then((c) => c || fetch(e.request).then((r) => {
        const rct = r.headers.get("Content-Type") || "";
        if (rct.includes("image") || rct.includes("font") || rct.includes("javascript") || rct.includes("stylesheet")) {
          const re = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, re));
        }
        return r;
      }))
    );
  }
});
