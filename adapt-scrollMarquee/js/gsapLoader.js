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
    if (this.isLoaded) return Promise.resolve();
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = new Promise((resolve, reject) => {
      // Check if GSAP is already loaded
      if (window.gsap && window.ScrollTrigger) {
        this.isLoaded = true;
        resolve();
        return;
      }

      // Try to load from CDN if not already present
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      };

      // Load GSAP and ScrollTrigger
      Promise.all([
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'),
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js')
      ])
        .then(() => {
          this.isLoaded = true;
          resolve();
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
