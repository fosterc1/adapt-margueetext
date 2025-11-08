/**
 * GSAP Loader
 * Priority loading strategy:
 * 1. Check if GSAP already exists (theme/framework includes it)
 * 2. Try loading bundled version from plugin
 * 3. Fall back to CDN as last resort
 */

class GsapLoader {
  constructor() {
    this.isLoaded = false;
    this.loadPromise = null;
  }

  async load() {
    // Priority 1: Check if GSAP is already loaded (from theme/framework)
    if (window.gsap && window.ScrollTrigger) {
      console.log('ScrollMarquee: Using GSAP from theme/framework');
      this.isLoaded = true;
      return Promise.resolve();
    }

    // If already loading, return existing promise
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = new Promise((resolve, reject) => {
      const loadScript = (src, description) => {
        return new Promise((resolve, reject) => {
          // Check if already in document
          const existing = document.querySelector(`script[src*="${src.split('/').pop()}"]`);
          if (existing) {
            resolve();
            return;
          }

          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = () => {
            console.log(`ScrollMarquee: Loaded ${description} from ${src}`);
            resolve();
          };
          script.onerror = () => reject(new Error(`Failed to load ${description} from ${src}`));
          document.head.appendChild(script);
        });
      };

      const waitForGlobal = (globalName, maxAttempts = 20) => {
        return new Promise((resolve, reject) => {
          if (window[globalName]) {
            resolve();
            return;
          }
          let attempts = 0;
          const checkInterval = setInterval(() => {
            attempts++;
            if (window[globalName]) {
              clearInterval(checkInterval);
              resolve();
            } else if (attempts >= maxAttempts) {
              clearInterval(checkInterval);
              reject(new Error(`${globalName} not available after loading`));
            }
          }, 100);
        });
      };

      // Try loading sequence: bundled first, then CDN
      const tryLoadGsap = () => {
        // Priority 2: Try bundled version from plugin
        console.log('ScrollMarquee: Trying bundled GSAP...');
        return loadScript('components/adapt-scrollMarquee/libraries/gsap.min.js', 'GSAP (bundled)')
          .catch(() => {
            // Priority 3: Fall back to CDN
            console.log('ScrollMarquee: Bundled GSAP not found, using CDN...');
            return loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', 'GSAP (CDN)');
          });
      };

      const tryLoadScrollTrigger = () => {
        // Priority 2: Try bundled version from plugin
        console.log('ScrollMarquee: Trying bundled ScrollTrigger...');
        return loadScript('components/adapt-scrollMarquee/libraries/ScrollTrigger.min.js', 'ScrollTrigger (bundled)')
          .catch(() => {
            // Priority 3: Fall back to CDN
            console.log('ScrollMarquee: Bundled ScrollTrigger not found, using CDN...');
            return loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', 'ScrollTrigger (CDN)');
          });
      };

      // Load GSAP first, then ScrollTrigger
      tryLoadGsap()
        .then(() => waitForGlobal('gsap'))
        .then(() => tryLoadScrollTrigger())
        .then(() => waitForGlobal('ScrollTrigger'))
        .then(() => {
          this.isLoaded = true;
          console.log('ScrollMarquee: GSAP and ScrollTrigger ready');
          resolve();
        })
        .catch((error) => {
          console.error('ScrollMarquee: Failed to load GSAP libraries:', error);
          reject(error);
        });
    });

    return this.loadPromise;
  }
}

export default new GsapLoader();
