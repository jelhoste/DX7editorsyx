const V='dx7-v1',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// Cache d'abord (démarrage instantané, hors-ligne), mise à jour en arrière-plan : change V pour forcer une nouvelle version.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{
  const f=fetch(e.request).then(n=>{if(n&&n.ok&&new URL(e.request.url).origin===location.origin)caches.open(V).then(c=>c.put(e.request,n.clone()));return n}).catch(()=>r);
  return r||f}))});
