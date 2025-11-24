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
      // Store as instance properties so they can be recalculated on orientation change
      this.viewportWidth = window.innerWidth;
      this.itemWidth = firstItem.offsetWidth;
      
        
      if (this.itemWidth === 0) {
        console.warn('ScrollMarquee: Item has no width, cannot calculate repetitions');
        return;
      }
      
      // Calculate copies needed: viewport width * 3 (to ensure coverage during scroll)
      const copiesNeeded = Math.ceil((this.viewportWidth * 3) / this.itemWidth);
      
      console.log(`ScrollMarquee: Viewport ${this.viewportWidth}px, Item ${this.itemWidth}px, Creating ${copiesNeeded} copies`);
      
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

      // Store reference to the marqueeInner and loop point as instance properties
      const marqueeElement = marqueeInner;
      this.marqueeInner = marqueeInner;
      this.loopPoint = marqueeInner.offsetWidth / 2;
      
      // Get unique component ID for debugging
      const componentId = this.model.get('_id');
      console.log(`ScrollMarquee [${componentId}]: Setting up scroll handler`);
      
      // Track animation frames for debugging
      let animationFrameCount = 0;

      // Scroll handler that updates position - always runs but checks if component is active
      const handleScroll = () => {
        try {
          // Check if ScrollTrigger exists and is still valid
          // It might get killed by ScrollTrigger.refresh() from other components
          if (!this.scrollTrigger || this.scrollTrigger.isActive === undefined) {
            // ScrollTrigger was killed or doesn't exist, update lastScrollY and skip
            lastScrollY = getScrollY();
            return;
          }
          
          // Check if ScrollTrigger is active (component in viewport)
          if (!this.scrollTrigger.isActive) {
            // Update lastScrollY even when not active to prevent jumps
            lastScrollY = getScrollY();
            return;
          }
          
          const currentScrollY = getScrollY();
          const scrollDelta = currentScrollY - lastScrollY;
          lastScrollY = currentScrollY;
          
          // Log first few frames for debugging
          animationFrameCount++;
          if (animationFrameCount <= 3) {
            console.log(`ScrollMarquee [${componentId}]: Animating frame ${animationFrameCount}, delta: ${scrollDelta}`);
          }
          
          // Update position based on scroll delta (with RTL direction support)
          xPos += directionMultiplier * scrollDelta * speedMultiplier;

          // Reset position for seamless loop (adjusted for RTL)
          // Use instance property which can be updated on orientation change
          if (isRTL) {
            if (xPos >= this.loopPoint) xPos = 0;
            if (xPos <= 0) xPos = this.loopPoint;
          } else {
            if (xPos <= -this.loopPoint) xPos = 0;
            if (xPos >= 0) xPos = -this.loopPoint;
          }

          // Apply transform
          gsap.set(marqueeElement, { x: xPos });
        } catch (error) {
          console.error('ScrollMarquee: Error in scroll handler:', error);
        }
      };

      // Add global scroll listener - always active, but checks viewport inside
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Function to create/recreate ScrollTrigger (in case it gets killed by other components)
      const createScrollTrigger = () => {
        // Kill existing trigger if it exists
        if (this.scrollTrigger) {
          this.scrollTrigger.kill();
        }
        
        this.scrollTrigger = ScrollTrigger.create({
          trigger: this.el,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            // This fires whenever the active state changes
            console.log(`ScrollMarquee [${componentId}]: isActive =`, self.isActive);
          },
          // Mark this trigger so we can identify it
          id: `scrollmarquee-${componentId}`
        });
        
        console.log(`ScrollMarquee [${componentId}]: ScrollTrigger created/recreated`);
      };
      
      // Defer ScrollTrigger creation to next frame to ensure DOM is fully laid out
      // This prevents issues when multiple components create ScrollTriggers simultaneously
      requestAnimationFrame(() => {
        createScrollTrigger();
        
        // Listen for ScrollTrigger refresh events from other components
        // If our trigger gets killed, recreate it
        ScrollTrigger.addEventListener('refresh', () => {
          // Check if our trigger still exists and is valid
          if (!this.scrollTrigger || this.scrollTrigger.isActive === undefined) {
            console.log(`ScrollMarquee [${componentId}]: ScrollTrigger was killed by refresh, recreating...`);
            createScrollTrigger();
          }
        });
        
        // Initial refresh to ensure accurate positions
        ScrollTrigger.refresh();
      });
      
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
      
      // REMOVED: Native orientation change handler (now handled by Adapt's device:changed event)
      // this.setupOrientationHandler();
      
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

  // REMOVED: Native orientation change handler - now relying on Adapt's device:changed event
  // setupOrientationHandler() { ... }

  /**
   * Recalculate marquee dimensions after orientation change
   * Updates viewport width, item width, and loop point
   */
  recalculateMarqueeDimensions() {
    if (!this.marqueeInner) {
      console.log('ScrollMarquee: Cannot recalculate - marqueeInner not available');
      return;
    }
    
    const firstItem = this.marqueeInner.children[0];
    if (!firstItem) {
      console.log('ScrollMarquee: Cannot recalculate - no first item');
      return;
    }
    
    // Get new dimensions
    const newViewportWidth = window.innerWidth;
    const newItemWidth = firstItem.offsetWidth;
    
    // Calculate dimension changes
    const viewportChange = Math.abs(newViewportWidth - this.viewportWidth);
    const itemWidthChange = Math.abs(newItemWidth - this.itemWidth);
    
    console.log(`ScrollMarquee: Dimension changes - Viewport: ${viewportChange}px, ItemWidth: ${itemWidthChange}px`);
    
    // Only recalculate if dimensions changed significantly
    // Viewport must change by more than 100px OR item width by more than 10px
    if (viewportChange > 100 || itemWidthChange > 10) {
      console.log('ScrollMarquee: Significant dimension change detected, updating...');
      console.log(`  Old: viewport=${this.viewportWidth}px, item=${this.itemWidth}px`);
      console.log(`  New: viewport=${newViewportWidth}px, item=${newItemWidth}px`);
      
      // Update stored dimensions
      this.viewportWidth = newViewportWidth;
      this.itemWidth = newItemWidth;
      
      // Recalculate loop point based on new marquee width
      const oldLoopPoint = this.loopPoint;
      this.loopPoint = this.marqueeInner.offsetWidth / 2;
      console.log(`  Loop point: ${oldLoopPoint}px → ${this.loopPoint}px`);
      
      // Refresh ScrollTrigger to recalculate viewport positions
      if (window.ScrollTrigger) {
        console.log('ScrollMarquee: Refreshing ScrollTrigger...');
        window.ScrollTrigger.refresh();
      }
      
      console.log('ScrollMarquee: Dimension recalculation complete');
    } else {
      console.log('ScrollMarquee: Dimension changes too small, skipping recalculation');
    }
  }

  remove() {
    // Clean up ScrollTrigger
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }
    
    // Clean up scroll handler
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    
    // Clean up resize handler
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    
    // REMOVED: Orientation change handler cleanup (no longer needed)
    
    super.remove();
  }

}

export default ScrollMarqueeView;
