import ComponentView from 'core/js/views/componentView';
import a11y from 'core/js/a11y';
import gsapLoader from './gsapLoader';

class ScrollMarqueeView extends ComponentView {

  className() {
    return [
      super.className(),
      'scroll-marquee'
    ].join(' ');
  }

  render() {
    // Call preRender lifecycle
    if (this.preRender) {
      this.preRender();
    }
    
    // Manual render without template system
    const data = this.model.toJSON();
    
    // Use only body text for the marquee
    const bodyText = data.body || '';
    const singleItem = bodyText ? `<div class="scroll-marquee__item">${bodyText}</div>` : '';
    
    console.log('ScrollMarquee: Rendering with body text:', bodyText.substring(0, 50) + '...');
    
    // Get aria label from globals or use default
    const ariaLabel = data._globals && data._globals.ariaRegion 
      ? data._globals.ariaRegion 
      : 'Scrolling marquee text that moves based on your scroll speed.';
    
    const html = `
      <div class="component__inner scroll-marquee__inner-wrapper">
        <div class="component__widget scroll-marquee__widget" 
             role="region" 
             aria-label="${ariaLabel}"
             aria-live="polite">
          <div class="scroll-marquee__inner" aria-hidden="false">
            ${singleItem}
          </div>
        </div>
      </div>
    `;
    
    this.$el.html(html);
    this.$el.addClass(this.className());
    
    // Add accessible text for screen readers (non-moving version)
    if (bodyText) {
      const srOnly = `<div class="scroll-marquee__sr-only" aria-hidden="false">${bodyText}</div>`;
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

  preRender() {
    this.listenTo(this.model, 'change:_isComplete', this.onCompleteChange);
  }

  postRender() {
    console.log('ScrollMarquee: postRender called');
    
    // Set ready immediately - don't wait for GSAP
    this.setReadyStatus();
    
    if (this.model.get('_setCompletionOn') === 'inview') {
      this.setupInviewCompletion('.component__widget', this.onInview.bind(this));
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
        this.setupMarquee();
      })
      .catch((error) => {
        console.warn('ScrollMarquee: Animation disabled - GSAP failed to load', error);
        // Component still displays and works, just without scroll animation
      });
  }

  setupMarquee() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
      console.warn('ScrollMarquee: GSAP or ScrollTrigger not found. Please include GSAP library.');
      return;
    }

    // Check for manual animation disable or prefers-reduced-motion
    const manualDisable = this.model.get('_disableAnimation');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (manualDisable || prefersReducedMotion) {
      const reason = manualDisable ? 'manually disabled' : 'reduced motion preference detected';
      console.log(`ScrollMarquee: Animation ${reason} - displaying static content`);
      // Add class to indicate reduced motion mode
      this.$el.addClass('scroll-marquee--reduced-motion');
      // Make marquee content static and accessible
      this.$('.scroll-marquee__inner').attr('aria-hidden', 'false');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const marqueeInner = this.$('.scroll-marquee__inner')[0];
    if (!marqueeInner) {
      console.warn('ScrollMarquee: marquee inner element not found');
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

    // Scroll handler that updates position - always runs but checks if component is active
    const handleScroll = () => {
      // Check if ScrollTrigger is active (component in viewport)
      if (!this.scrollTrigger || !this.scrollTrigger.isActive) {
        // Update lastScrollY even when not active to prevent jumps
        lastScrollY = getScrollY();
        return;
      }
      
      const currentScrollY = getScrollY();
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      
      // Update position based on scroll delta
      xPos -= scrollDelta * speedMultiplier;

      // Reset position for seamless loop
      if (xPos <= -loopPoint) xPos = 0;
      if (xPos >= 0) xPos = -loopPoint;

      // Apply transform
      gsap.set(marqueeElement, { x: xPos });
    };

    // Use ScrollTrigger to determine when component is in viewport
    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.el,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        // This fires whenever the active state changes
        console.log('ScrollMarquee: isActive =', self.isActive);
      }
    });

    // Add global scroll listener - always active, but checks viewport inside
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Store handler reference for cleanup
    this.scrollHandler = handleScroll;
    
    // Handle window resize for responsive layouts
    const handleResize = () => {
      // Recalculate if viewport width changed significantly
      const newViewportWidth = window.innerWidth;
      const widthDiff = Math.abs(newViewportWidth - viewportWidth);
      
      // Only recalculate if width changed by more than 100px (avoid minor adjustments)
      if (widthDiff > 100) {
        console.log('ScrollMarquee: Viewport width changed significantly, refreshing');
        // Refresh ScrollTrigger to recalculate positions
        ScrollTrigger.refresh();
      }
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    this.resizeHandler = handleResize;
  }

  onInview() {
    if (this.model.get('_isComplete')) return;
    this.setCompletionStatus();
  }

  onCompleteChange(model, isComplete) {
    if (!isComplete) return;
    a11y.toggleAccessibleEnabled(this.$('.scroll-marquee__item'), true);
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
