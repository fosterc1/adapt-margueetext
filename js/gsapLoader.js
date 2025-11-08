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
          console.log(`ScrollMarquee: Attempting to load ${description} from ${src}`);
          
          // Check if already in document
          const filename = src.split('/').pop().split('?')[0];
          const existing = document.querySelector(`script[src*="${filename}"]`);
          if (existing) {
            console.log(`ScrollMarquee: ${description} already in document`);
            resolve();
            return;
          }

          const script = document.createElement('script');
          script.src = src;
          script.async = false; // Load synchronously for proper sequencing
          script.onload = () => {
            console.log(`ScrollMarquee: Successfully loaded ${description}`);
            resolve();
          };
          script.onerror = (error) => {
            console.log(`ScrollMarquee: Failed to load ${description} - ${error}`);
            reject(new Error(`Failed to load ${description} from ${src}`));
          };
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

      // For now, just use CDN directly since bundled paths are complex
      // We can add bundled support later once we know the correct path structure
      const tryLoadGsap = () => {
        console.log('ScrollMarquee: Loading GSAP from CDN...');
        return loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 'GSAP (CDN)');
      };

      const tryLoadScrollTrigger = () => {
        console.log('ScrollMarquee: Loading ScrollTrigger from CDN...');
        return loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', 'ScrollTrigger (CDN)');
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
