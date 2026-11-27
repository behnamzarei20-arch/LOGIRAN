const CACHE_NAME = "logiran-shell-v3";
const APP_PREFIX = "/LOGIRAN/";
const LEGACY_CACHE_PREFIXES = ["berah-", "bbberah-"];
const CORE_ASSETS = [APP_PREFIX, APP_PREFIX + "index.html", APP_PREFIX + "manifest.webmanifest", APP_PREFIX + "icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key !== CACHE_NAME && (key.startsWith("logiran-shell-") || LEGACY_CACHE_PREFIXES.some((prefix) => key.startsWith(prefix))))
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith(APP_PREFIX)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(new Request(request, { cache: "no-store" })).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(APP_PREFIX + "index.html", copy));
        }
        return response;
      }).catch(() => caches.match(APP_PREFIX + "index.html"))
    );
    return;
  }

  // Prefer the deployed hashed asset over an older cached response. Keep cache only as offline fallback.
  event.respondWith(
    fetch(new Request(request, { cache: "no-store" })).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    }).catch(() => caches.match(request))
  );
});
