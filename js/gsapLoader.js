/**
 * GSAP Loader Extension
 * Ensures GSAP and ScrollTrigger are loaded before the component initializes
 */

class GsapLoader {
  constructor() {
    this.isLoaded = false;
    this.loadPromise = null;
  }

  async load() {
    // Check if GSAP is already loaded
    if (window.gsap && window.ScrollTrigger) {
      this.isLoaded = true;
      return Promise.resolve();
    }

    // If already loading, return existing promise
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = new Promise((resolve, reject) => {
      // Try to load from CDN if not already present
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          // Check if already in document
          const existing = document.querySelector(`script[src="${src}"]`);
          if (existing) {
            resolve();
            return;
          }

          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = resolve;
          script.onerror = () => reject(new Error(`Failed to load ${src}`));
          document.head.appendChild(script);
        });
      };

      // Load GSAP first, then ScrollTrigger
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js')
        .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'))
        .then(() => {
          // Wait a bit for scripts to initialize
          setTimeout(() => {
            if (window.gsap && window.ScrollTrigger) {
              this.isLoaded = true;
              resolve();
            } else {
              reject(new Error('GSAP loaded but not available on window'));
            }
          }, 500);
        })
        .catch((error) => {
          console.error('Failed to load GSAP libraries:', error);
          reject(error);
        });
    });

    return this.loadPromise;
  }
}

export default new GsapLoader();
