import ComponentView from 'core/js/views/componentView';
import a11y from 'core/js/a11y';
import gsapLoader from './gsapLoader';

class ScrollMarquee extends ComponentView {

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
    this.setReadyStatus();
    
    if (this.model.get('_setCompletionOn') === 'inview') {
      this.setupInviewCompletion('.component__widget', this.onInview.bind(this));
    }

    // Wait for GSAP and ScrollTrigger to be available
    gsapLoader.load()
      .then(() => {
        this.setupMarquee();
      })
      .catch((error) => {
        console.error('ScrollMarquee: Failed to load GSAP', error);
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
    const speed = this.model.get('_speed') || 0.01;

    ScrollTrigger.create({
      trigger: this.el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        // Adjust speed based on scroll velocity
        const scrollSpeed = self.getVelocity() * speed;

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

ScrollMarquee.template = 'scrollMarquee.jsx';

export default ScrollMarquee;
