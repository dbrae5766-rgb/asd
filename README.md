# Aether/Fern-style Scramjet - Working Proxy for jsDelivr

This is a FULL working copy of the supreme-s-alt Scramjet template (proven working) with a beautiful Aether/Fern UI, converted to Achroma's `index.svg -> app.svg` loader so it works on `cdn.jsdelivr.net/gh/.../index.svg`.

## What was fixed

Your first version used `<iframe src="/">` which breaks on jsDelivr.
Achroma uses:
```
index.svg (decoy) --fetch--> app.svg (real proxy) --load--> scramjet.js + controller + epoxy
```
All files must be SIBLINGS on same jsDelivr path. This repo includes them:

```
index.svg              <- decoy + loader (fetches app.svg)
app.svg                <- Aether UI + working Scramjet controller (Epoxy + WISP)
sw.js                  <- service worker (must be root)
scramjet/
  scramjet.js
  scramjet.wasm
controller/
  controller.api.js
  controller.sw.js
  controller.inject.js
```

`app.svg` does the correct init:
```js
const { Controller } = $scramjetController;
const { defaultConfig } = $scramjet;
const EpoxyTransport = self.EpoxyTransport.default;
const transport = new EpoxyTransport({ wisp: "wss://wisp.mercurywork.shop/" });
await transport.init();
scramjet = new Controller({ serviceworker, transport, scramjetConfig: defaultConfig });
await scramjet.wait();
frame = scramjet.createFrame(iframe);
frame.go(url);
```

## Deploy to your repo dbrae5766-rgb/asd

1. In your repo https://github.com/dbrae5766-rgb/asd
   - Click Add file -> Upload files
   - Upload EVERYTHING from this folder:
     - Overwrite `index.svg`, `app.svg`, `sw.js`
     - Add folders `scramjet/` and `controller/` (drag whole folders)
   - Commit

2. Purge jsDelivr cache:
   https://www.jsdelivr.com/tools/purge
   Paste:
   ```
   https://cdn.jsdelivr.net/gh/dbrae5766-rgb/asd@main/index.svg
   https://cdn.jsdelivr.net/gh/dbrae5766-rgb/asd@main/app.svg
   https://cdn.jsdelivr.net/gh/dbrae5766-rgb/asd@main/sw.js
   https://cdn.jsdelivr.net/gh/dbrae5766-rgb/asd@main/scramjet/scramjet.js
   https://cdn.jsdelivr.net/gh/dbrae5766-rgb/asd@main/controller/controller.api.js
   ```
   Purge each.

3. Open:
   https://cdn.jsdelivr.net/gh/dbrae5766-rgb/asd@main/index.svg

You will see Aether UI with search. Type any URL or search term (searches DuckDuckGo if not a URL). Click apps to launch.

## Features
- Scramjet with Epoxy + WISP (actually loads sites, not blank)
- Fern/Aether glass UI, Popular tiles, categories
- About:blank cloak button
- WISP setting in gear icon (change to your own wisp-server-rust)
- Back/Forward/Reload, fullscreen, URL bar
- DuckDuckGo fallback
