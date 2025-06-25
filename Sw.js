self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("solaya-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "icon.png",
        "apple-touch-icon.png",
        "favicon-96x96.png",
        "favicon.ico",
        "site.webmanifest"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
