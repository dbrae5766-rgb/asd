// Must live next to index.svg + app.svg on same CDN origin
importScripts("https://cdn.jsdelivr.net/npm/@mercuryworkshop/scramjet@1.1.0/dist/scramjet.all.js");
const scramjet = new $scramjetLoadWorker({ prefix: "/scramjet/" });
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(clients.claim()));
self.addEventListener("fetch", e => { if (scramjet.route(e)) return; });
