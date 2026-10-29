# Achroma-style Scramjet 1.1.0 - works like https://cdn.jsdelivr.net/gh/achroma-ubg/svg@latest/index.svg

## Why that link works (and your `src="/"` didn't)

Achroma's `index.svg` is NOT an iframe wrapper. It's this trick:

```html
<!-- index.svg is a decoy page (school district site) -->
<!-- After 500ms it does: fetch("app.svg") -->
```

`app.svg` is a sibling file on the SAME jsDelivr path:
```
https://cdn.jsdelivr.net/gh/achroma-ubg/svg@latest/index.svg
https://cdn.jsdelivr.net/gh/achroma-ubg/svg@latest/app.svg  <- fetch("app.svg") resolves here
https://cdn.jsdelivr.net/gh/achroma-ubg/svg@latest/achroma.js
```

Then it swaps the whole document:
```js
document.replaceChild(root, svgRoot) // replace index.svg's HTML with app.svg's HTML
// re-inject every <script> from app.svg so they actually execute
```

**Key:** No `iframe src="/"`. It's a relative `fetch("app.svg")` which WORKS on jsDelivr because all files are co-hosted.

Your file used `<iframe src="/">` -> resolves to `https://cdn.jsdelivr.net/` (homepage) -> blank/blocked.

## This repo recreates that with Scramjet 1.1.0

Structure to push to GitHub:
```
index.svg  -> decoy + loader (fetches app.svg)
app.svg    -> real Scramjet proxy UI (loads scramjet.bundle.js@1.1.0 from CDN)
sw.js      -> service worker (must be next to index.svg/app.svg)
```

## Deploy (no domain needed)

1. Create GitHub repo `github.com/YOU/svg` (public)
2. Push these 3 files to `main` branch
3. Wait 2 mins, open:
```
https://cdn.jsdelivr.net/gh/YOU/svg@latest/index.svg
```
Open it DIRECTLY as a page - not as <img>. It will show the proxy.

Embed elsewhere:
```html
<iframe src="https://cdn.jsdelivr.net/gh/YOU/svg@latest/index.svg" style="width:100%;height:100vh;border:0"></iframe>
```

## Notes
- Service workers REQUIRE https or localhost - jsDelivr is https so OK
- scope is `./` relative to index.svg, so works on CDN
- WISP: Currently uses default Scramjet transport. To add custom wisp server, edit app.svg
