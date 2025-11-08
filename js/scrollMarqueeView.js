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
    
    const html = `
      <div class="component__inner scroll-marquee__inner-wrapper">
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

    // Get the total width to animate (half of total width for seamless loop)
    const totalWidth = marqueeInner.offsetWidth;
    const animationDistance = totalWidth / 2;
    
    // Convert user-friendly speed (1-5) to base duration
    const userSpeed = this.model.get('_speed') || 1;
    const baseDuration = 30 / userSpeed; // Lower speed = longer duration
    
    // Create a continuous base animation and store reference
    this.baseAnimation = gsap.to(marqueeInner, {
      x: -animationDistance,
      duration: baseDuration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % animationDistance)
      }
    });

    // Create ScrollTrigger to modify animation speed based on scroll velocity
    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.el,
      start: 'top bottom',
      end: 'bottom top',
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Get scroll velocity (negative = scrolling down)
        const velocity = self.getVelocity();
        
        // Convert velocity to time scale factor
        // Faster scroll = faster animation
        const velocityFactor = velocity / 1000;
        const timeScale = 1 + Math.abs(velocityFactor) * (userSpeed * 0.5);
        
        // Apply the time scale to the base animation
        gsap.to(this.baseAnimation, {
          timeScale: timeScale,
          duration: 0.3,
          overwrite: true
        });
      },
      onLeave: () => {
        // Reset to normal speed when leaving viewport
        gsap.to(this.baseAnimation, { timeScale: 1, duration: 0.5 });
      },
      onEnterBack: () => {
        // Reset to normal speed when entering from bottom
        gsap.to(this.baseAnimation, { timeScale: 1, duration: 0.5 });
      }
    });
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
    if (this.baseAnimation) {
      this.baseAnimation.kill();
    }
    super.remove();
  }

}

export default ScrollMarqueeView;
