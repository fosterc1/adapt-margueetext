# Bundled Libraries

This folder contains bundled third-party libraries used by the adapt-scrollMarquee component.

## GSAP (GreenSock Animation Platform)

- **Version:** 3.12.5
- **Files:**
  - `gsap.min.js` - Core GSAP library
  - `ScrollTrigger.min.js` - ScrollTrigger plugin
- **License:** Standard GSAP license (free for most uses)
- **Source:** https://greensock.com/gsap/
- **CDN:** https://cdn.jsdelivr.net/npm/gsap@3.12.5/

## Loading Priority

The component uses a priority-based loading strategy:

1. **Theme/Framework GSAP** - If GSAP is already loaded by the Adapt theme or framework, use it
2. **Bundled Version** - Load from these bundled files (`libraries/`)
3. **CDN Fallback** - If bundled files not accessible, load from jsDelivr CDN

This ensures maximum compatibility and performance.

## Updating GSAP

To update the bundled GSAP version:

```bash
# Download latest version
curl -L -o gsap.min.js "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
curl -L -o ScrollTrigger.min.js "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
```

Update the version number in this README and in `bower.json` / `package.json`.
