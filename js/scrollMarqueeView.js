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
    
    // Use body if available, fallback to displayTitle for marquee text
    const textContent = data.body || data.displayTitle || '';
    const singleItem = textContent ? `<div class="scroll-marquee__item">${textContent}</div>` : '';
    
    console.log('ScrollMarquee: Rendering with text:', textContent);
    
    // Only show title in header if we have separate body text for the marquee
    const showTitleInHeader = data.body && data.displayTitle;
    
    const html = `
      <div class="component__inner scroll-marquee__inner-wrapper">
        <div class="component__header">
          ${showTitleInHeader ? `<div class="component__title">${data.displayTitle}</div>` : ''}
          ${data.instruction ? `<div class="component__instruction">${data.instruction}</div>` : ''}
        </div>
        <div class="component__widget scroll-marquee__widget">
          <div class="scroll-marquee__inner">
            ${singleItem}
          </div>
        </div>
      </div>
    `;
    
    this.$el.html(html);
    this.$el.addClass(this.className());
    
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
    // Convert user-friendly speed (1-5) to actual multiplier
    const userSpeed = this.model.get('_speed') || 1;
    const speedMultiplier = userSpeed * 0.01; // 1=0.01, 2=0.02, 3=0.03, etc.

    ScrollTrigger.create({
      trigger: this.el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        // Adjust speed based on scroll velocity
        const scrollSpeed = self.getVelocity() * speedMultiplier;

        xPos -= scrollSpeed;

        // Reset to prevent large numbers / looping seamlessly
        if (xPos <= -marqueeInner.offsetWidth / 2) xPos = 0;
        if (xPos >= 0) xPos = -marqueeInner.offsetWidth / 2;

        gsap.set(marqueeInner, {
          x: xPos
        });
      }
    });

    this.scrollTrigger = ScrollTrigger.getAll().find(st => st.trigger === this.el);
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
    super.remove();
  }

}

export default ScrollMarqueeView;
