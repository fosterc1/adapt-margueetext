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

  preRender() {
    this.listenTo(this.model, 'change:_isComplete', this.onCompleteChange);
  }

  postRender() {
    console.log('ScrollMarquee: postRender called');
    this.setReadyStatus();
    
    if (this.model.get('_setCompletionOn') === 'inview') {
      this.setupInviewCompletion('.component__widget', this.onInview.bind(this));
    }

    // Load GSAP asynchronously - component still displays without it
    console.log('ScrollMarquee: Loading GSAP...');
    gsapLoader.load()
      .then(() => {
        console.log('ScrollMarquee: GSAP loaded, setting up marquee');
        this.setupMarquee();
      })
      .catch((error) => {
        console.warn('ScrollMarquee: Animation disabled - GSAP failed to load', error);
        // Component still displays, just without scroll animation
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

    const items = Array.from(marqueeInner.children);
    
    // Only setup marquee if there are items
    if (items.length === 0) {
      console.warn('ScrollMarquee: No items to display');
      return;
    }
    
    // Duplicate items for infinite seamless loop
    items.forEach(el => marqueeInner.appendChild(el.cloneNode(true)));

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

ScrollMarqueeView.template = 'scrollMarquee.jsx';

export default ScrollMarqueeView;
