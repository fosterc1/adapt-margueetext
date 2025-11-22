import ComponentView from 'core/js/views/componentView';
import a11y from 'core/js/a11y';
import gsapLoader from './gsapLoader';


class ScrollMarqueeView extends ComponentView {

  render() {
    // Call preRender lifecycle
    if (this.preRender) {
      this.preRender();
    }
    
    // Manual render without template system
    const data = this.model.toJSON();
    
    // Use only body text for the marquee
    const bodyText = data.body || '';
    const singleItem = bodyText ? `<div class="scrollmarquee__item">${bodyText}</div>` : '';
    
    console.log('ScrollMarquee: Rendering with body text:', bodyText.substring(0, 50) + '...');
    
    // Get aria label from globals or use default
    const ariaLabel = data._globals && data._globals.ariaRegion 
      ? data._globals.ariaRegion 
      : 'Scrolling marquee text that moves based on your scroll speed.';
    
    // Detect text direction for RTL support
    const textDirection = this.detectTextDirection(bodyText);
    const dirAttribute = textDirection === 'rtl' ? ' dir="rtl"' : ' dir="ltr"';
    
    // FIX: Moving content should be aria-hidden="true" to prevent duplicate announcements
    const html = `
      <div class="component__inner scrollmarquee__inner-wrapper">
        <div class="component__widget scrollmarquee__widget" 
             role="region" 
             aria-label="${ariaLabel}"
             aria-live="polite"${dirAttribute}>
          <div class="scrollmarquee__inner" aria-hidden="true">
            ${singleItem}
          </div>
        </div>
      </div>
    `;
    
    this.$el.html(html);
    this.$el.addClass(this.className());
    
    // Store text direction for animation
    this.$el.attr('data-text-direction', textDirection);
    
    // Add accessible text for screen readers (non-moving version)
    if (bodyText) {
      const srOnly = `<div class="scrollmarquee__sr-only" aria-hidden="false">${bodyText}</div>`;
      this.$('.component__widget').append(srOnly);
    }
    
    // Call postRender in nextTick to avoid blocking
    setTimeout(() => {
      if (this.postRender) {
        this.postRender();
      }
    }, 0);
    
    return this;
  }

  /**
   * Detect text direction (LTR or RTL) based on content
   * @param {string} text - The text to analyze
   * @returns {string} - 'rtl' or 'ltr'
   */
  detectTextDirection(text) {
    if (!text) return 'ltr';
    
    // Check for explicit HTML dir attribute
    const dirMatch = text.match(/dir=["']?(rtl|ltr)["']?/i);
    if (dirMatch) {
      return dirMatch[1].toLowerCase();
    }
    
    // Check for RTL Unicode characters (Arabic, Hebrew, Farsi, etc.)
    const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    if (rtlChars.test(text)) {
      return 'rtl';
    }
    
    // Check document or element direction
    const docDir = document.documentElement.dir || document.body.dir;
    if (docDir === 'rtl') {
      return 'rtl';
    }
    
    return 'ltr';
  }

  preRender() {
    this.listenTo(this.model, 'change:_isComplete', this.onCompleteChange);
  }

  postRender() {
    console.log('ScrollMarquee: postRender called');
    
    // Set ready immediately - don't wait for GSAP
    this.setReadyStatus();
    
    if (this.model.get('_setCompletionOn') === 'inview') {
      this.setupInviewCompletion('.scrollmarquee__widget', this.onInview.bind(this));
    }

    // Check if GSAP is already available (user might have included it)
    if (window.gsap && window.ScrollTrigger) {
      console.log('ScrollMarquee: GSAP already available, setting up marquee');
      this.setupMarquee();
      return;
    }

    // Load GSAP asynchronously - component already ready
    console.log('ScrollMarquee: Loading GSAP from CDN...');
    gsapLoader.load()
      .then(() => {
        console.log('ScrollMarquee: GSAP loaded, setting up marquee');
        // Double-check GSAP is actually available
        if (window.gsap && window.ScrollTrigger) {
          this.setupMarquee();
        } else {
          console.error('ScrollMarquee: GSAP Promise resolved but window.gsap not available!');
          this.handleError('GSAP_NOT_FOUND', 'Animation library loaded but not accessible');
        }
      })
      .catch((error) => {
        console.error('ScrollMarquee: Animation disabled - GSAP failed to load', error);
        this.handleError('GSAP_LOAD_FAILED', 'Failed to load animation library', error);
      });
  }

  /**
   * Handle and display errors gracefully
   * @param {string} errorCode - Error identifier
   * @param {string} message - User-friendly error message
   * @param {Error} error - Original error object (optional)
   */
  handleError(errorCode, message, error = null) {
    console.error(`ScrollMarquee Error [${errorCode}]: ${message}`, error);
    
    // Add error state CSS class
    this.$el.addClass('scrollmarquee--error');
    this.$el.attr('data-error-code', errorCode);
    
    // Display user-friendly error message
    const errorHtml = `
      <div class="scrollmarquee__error" role="alert">
        <p class="scrollmarquee__error-message">
          ${message}
        </p>
      </div>
    `;
    
    this.$('.component__widget').append(errorHtml);
    
    // Log to console for debugging
    if (error) {
      console.error('ScrollMarquee: Error details:', error);
    }
  }

  setupMarquee() {
    try {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      if (!gsap || !ScrollTrigger) {
        this.handleError('GSAP_NOT_FOUND', 'Animation library not available. Displaying static content.');
        return;
      }

      // Generate unique ID for debugging
      const componentId = this.model.get('_id');
      console.log(`ScrollMarquee [${componentId}]: Setting up animation`);

      // Check for manual animation disable or prefers-reduced-motion
      const manualDisable = this.model.get('_disableAnimation');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (manualDisable || prefersReducedMotion) {
        const reason = manualDisable ? 'manually disabled' : 'reduced motion preference detected';
        console.log(`ScrollMarquee: Animation ${reason} - displaying static content`);
        // Add class to indicate reduced motion mode
        this.$el.addClass('scrollmarquee--reduced-motion');
        // Make marquee content static and accessible
        this.$('.scrollmarquee__inner').attr('aria-hidden', 'false');
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const marqueeInner = this.$('.scrollmarquee__inner')[0];
      if (!marqueeInner) {
        this.handleError('ELEMENT_NOT_FOUND', 'Marquee element not found');
        return;
      }

      console.log('ScrollMarquee: marqueeInner children count:', marqueeInner.children.length);
      console.log('ScrollMarquee: marqueeInner innerHTML:', marqueeInner.innerHTML);

      const firstItem = marqueeInner.children[0];
      
      // Only setup marquee if there is content
      if (!firstItem) {
        console.warn('ScrollMarquee: No items to display - marqueeInner has no children');
        console.warn('ScrollMarquee: Body content was:', this.model.get('body'));
        return;
      }
      
      // Calculate how many copies we need to fill viewport width + extra for seamless loop
      const viewportWidth = window.innerWidth;
      const itemWidth = firstItem.offsetWidth;
      
        
      if (itemWidth === 0) {
        console.warn('ScrollMarquee: Item has no width, cannot calculate repetitions');
        return;
      }
      
      // Calculate copies needed: viewport width * 3 (to ensure coverage during scroll)
      const copiesNeeded = Math.ceil((viewportWidth * 3) / itemWidth);
      
      console.log(`ScrollMarquee: Viewport ${viewportWidth}px, Item ${itemWidth}px, Creating ${copiesNeeded} copies`);
      
      // Create the needed copies
      for (let i = 0; i < copiesNeeded; i++) {
        marqueeInner.appendChild(firstItem.cloneNode(true));
      }

      // Detect text direction for RTL support
      const textDirection = this.$el.attr('data-text-direction') || 'ltr';
      const isRTL = textDirection === 'rtl';
      
      // Adjust scroll direction for RTL languages
      const directionMultiplier = isRTL ? 1 : -1;
      
      console.log(`ScrollMarquee: Text direction: ${textDirection}, RTL: ${isRTL}`);

      let xPos = 0;
      // Support multiple scroll position methods for cross-browser compatibility
      const getScrollY = () => window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
      let lastScrollY = getScrollY();
      
      // Convert user-friendly speed (1-5) to actual multiplier
      const userSpeed = this.model.get('_speed') || 1;
      const speedMultiplier = userSpeed * 0.5;

      // Store reference to the marqueeInner
      const marqueeElement = marqueeInner;
      const loopPoint = marqueeInner.offsetWidth / 2;

      // Store reference to this component's scrollTrigger for closure
      const scrollTriggerRef = () => this.scrollTrigger;
      let animationFrameCount = 0;
      
      // Scroll handler that updates position - always runs but checks if component is active
      const handleScroll = () => {
        try {
          // Check if ScrollTrigger is active (component in viewport)
          const trigger = scrollTriggerRef();
          if (!trigger || !trigger.isActive) {
            // Update lastScrollY even when not active to prevent jumps
            lastScrollY = getScrollY();
            return;
          }
          
          const currentScrollY = getScrollY();
          const scrollDelta = currentScrollY - lastScrollY;
          lastScrollY = currentScrollY;
          
          // Log first few animation frames for debugging
          animationFrameCount++;
          if (animationFrameCount <= 3) {
            console.log(`ScrollMarquee [${componentId}]: Animating frame ${animationFrameCount}, scrollDelta: ${scrollDelta}`);
          }
          
          // Update position based on scroll delta (with RTL direction support)
          xPos += directionMultiplier * scrollDelta * speedMultiplier;

          // Reset position for seamless loop (adjusted for RTL)
          if (isRTL) {
            if (xPos >= loopPoint) xPos = 0;
            if (xPos <= 0) xPos = loopPoint;
          } else {
            if (xPos <= -loopPoint) xPos = 0;
            if (xPos >= 0) xPos = -loopPoint;
          }

          // Apply transform
          gsap.set(marqueeElement, { x: xPos });
        } catch (error) {
          console.error('ScrollMarquee: Error in scroll handler:', error);
        }
      };

      // Use ScrollTrigger to determine when component is in viewport
      this.scrollTrigger = ScrollTrigger.create({
        trigger: this.el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          // This fires whenever the active state changes
          console.log(`ScrollMarquee [${componentId}]: isActive =`, self.isActive);
        }
      });
      
      console.log(`ScrollMarquee [${componentId}]: ScrollTrigger created, trigger element:`, this.el);

      // Add global scroll listener - always active, but checks viewport inside
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Store handler reference for cleanup
      this.scrollHandler = handleScroll;
      
      // Debounced resize handler for performance
      let resizeTimeout;
      const handleResize = () => {
        try {
          // Clear previous timeout
          if (resizeTimeout) {
            clearTimeout(resizeTimeout);
          }
          
          // Debounce resize handler (wait 150ms after resize stops)
          resizeTimeout = setTimeout(() => {
            // Recalculate if viewport width changed significantly
            const newViewportWidth = window.innerWidth;
            const widthDiff = Math.abs(newViewportWidth - viewportWidth);
            
            // Only recalculate if width changed by more than 100px (avoid minor adjustments)
            if (widthDiff > 100) {
              console.log('ScrollMarquee: Viewport width changed significantly, refreshing');
              // Refresh ScrollTrigger to recalculate positions
              ScrollTrigger.refresh();
            }
          }, 150);
        } catch (error) {
          console.error('ScrollMarquee: Error in resize handler:', error);
        }
      };
      
      window.addEventListener('resize', handleResize, { passive: true });
      this.resizeHandler = handleResize;
      
    } catch (error) {
      console.error('ScrollMarquee: Critical error in setupMarquee:', error);
      this.handleError('SETUP_FAILED', 'Failed to initialize marquee animation', error);
    }
  }

  onInview() {
    if (this.model.get('_isComplete')) return;
    this.setCompletionStatus();
  }

  onCompleteChange(model, isComplete) {
    if (!isComplete) return;
    a11y.toggleAccessibleEnabled(this.$('.scrollmarquee__item'), true);
  }

  remove() {
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    super.remove();
  }

}

export default ScrollMarqueeView;
