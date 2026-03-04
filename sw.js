const CACHE_NAME = "elite-garage-v2";

const urlsToCache = [
"./",
"./index.html",
"./manifest.json",
"https://cdn.jsdelivr.net/npm/chart.js"
];

self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
);
});

self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request)
.then(response => {
return response || fetch(event.request)
.then(fetchResponse => {
return caches.open(CACHE_NAME).then(cache => {
cache.put(event.request, fetchResponse.clone());
return fetchResponse;
});
});
})
);
});

self.addEventListener("activate", event => {
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cache => {
if (cache !== CACHE_NAME) {
return caches.delete(cache);
}
})
);
})
);
});