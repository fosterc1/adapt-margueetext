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

      const waitForGlobal = (globalName, maxAttempts = 30) => {
        return new Promise((resolve, reject) => {
          // Give script time to execute before first check
          setTimeout(() => {
            // Debug: Check what's actually available
            console.log(`ScrollMarquee: Checking for ${globalName}...`);
            console.log(`ScrollMarquee: window.gsap type:`, typeof window.gsap);
            console.log(`ScrollMarquee: window.ScrollTrigger type:`, typeof window.ScrollTrigger);
            console.log(`ScrollMarquee: window.GreenSockGlobals:`, typeof window.GreenSockGlobals);
            
            if (window[globalName]) {
              console.log(`ScrollMarquee: ${globalName} found on window immediately`);
              resolve();
              return;
            }
            
            console.log(`ScrollMarquee: ${globalName} not found, polling...`);
            let attempts = 0;
            const checkInterval = setInterval(() => {
              attempts++;
              
              // Debug every 5 attempts
              if (attempts % 5 === 0) {
                console.log(`ScrollMarquee: Attempt ${attempts}, window.${globalName}:`, typeof window[globalName]);
              }
              
              if (window[globalName]) {
                clearInterval(checkInterval);
                console.log(`ScrollMarquee: ${globalName} found after ${attempts} attempts`);
                resolve();
              } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.error(`ScrollMarquee: ${globalName} not found after ${attempts} attempts`);
                console.error(`ScrollMarquee: Final window check - gsap:`, typeof window.gsap, 'ScrollTrigger:', typeof window.ScrollTrigger);
                reject(new Error(`${globalName} not available after loading`));
              }
            }, 100);
          }, 200); // Initial delay to let script execute
        });
      };

      // Skip RequireJS for now - just use script tags which are more reliable
      // (RequireJS in Adapt build might not support external URLs)
      
      // Since GSAP won't attach to window in AMD environment, 
      // we'll use a different approach: fetch and eval the code
      const fetchAndEval = (url, globalName) => {
        return fetch(url)
          .then(response => response.text())
          .then(code => {
            console.log(`ScrollMarquee: Fetched ${globalName}, evaluating...`);
            // Wrap in IIFE and force global export
            const wrappedCode = `
              (function(window) {
                var define = undefined; // Disable AMD
                var exports = undefined; // Disable CommonJS
                var module = undefined;
                ${code}
                if (typeof gsap !== 'undefined') window.gsap = gsap;
                if (typeof ScrollTrigger !== 'undefined') window.ScrollTrigger = ScrollTrigger;
              })(window);
            `;
            eval(wrappedCode);
            console.log(`ScrollMarquee: Evaluated ${globalName}`);
          });
      };
      
      console.log('ScrollMarquee: Loading GSAP via fetch+eval to bypass AMD...');
      
      fetchAndEval('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 'GSAP')
        .then(() => waitForGlobal('gsap'))
        .then(() => fetchAndEval('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', 'ScrollTrigger'))
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
