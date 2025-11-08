# adapt-scrollMarquee

**Scrolling Marquee Text** is a _presentation component_ which displays a horizontal scrolling marquee of text with continuous animation that responds to scroll velocity.

The marquee continuously scrolls at a base speed, and dynamically adjusts its speed based on the user's scroll velocity - the faster you scroll, the faster the text moves. The component creates an infinite seamless loop using GSAP ScrollTrigger.

[**View the demo**](example/demo.html)

## GSAP Library

This component uses **GSAP (GreenSock Animation Platform)** v3.12.5 for smooth scroll-based animations. The component uses a smart loading strategy:

1. **Theme/Framework GSAP** - If your Adapt theme or framework already includes GSAP, it will use that version
2. **Bundled Version** - GSAP libraries are bundled with this plugin (in `libraries/` folder)
3. **CDN Fallback** - If bundled files aren't accessible, loads from jsDelivr CDN

This ensures the component works reliably in any Adapt installation without manual GSAP configuration.

## Settings Overview

The attributes listed below are used in _components.json_ to configure **Scrolling Marquee Text**, and are properly formatted as JSON in [_example.json_](https://github.com/fosterc1/adapt-margueetext/blob/main/example.json).

## Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

### \_component (string):
This must be set to: `"scrollMarquee"`.

### \_classes (string):
CSS class name(s) to be applied to this component's containing `div`. The class(es) must be predefined in one of the Less files. Separate multiple classes with a space.

### \_layout (string):
Defines the horizontal position of the component in the block. Acceptable values are `"full"`, `"left"` or `"right"`. For best visual effect, `"full"` is recommended.

### body (string):
The text to display in the scrolling marquee. This is the standard body field from Adapt's core component model. The text will be repeated multiple times to create a seamless infinite loop effect.

**Tips for body text:**
- Keep text concise and readable at a glance
- Use bullet separators (•) if you want to display multiple phrases: `"Welcome • Explore • Discover"`
- HTML is supported: `"<strong>Bold text</strong> • <em>Italic text</em>"`
- Text will automatically duplicate to fill the viewport width

### \_setCompletionOn (string):
Determines when Adapt will register this component as having been completed by the learner. Acceptable values are `"inview"` and `"manual"`. The default is `"inview"`.

### \_speed (number):
Controls the base speed of the continuous marquee animation. Higher values result in faster base movement. The default is `1`. Acceptable range is `1` to `5`.

**Base Animation Durations:**
- `1` - Slow (30 seconds per cycle - recommended starting point)
- `2` - Medium (15 seconds per cycle)
- `3` - Fast (10 seconds per cycle)
- `4` - Very fast (7.5 seconds per cycle)
- `5` - Maximum speed (6 seconds per cycle)

The marquee continuously animates at this base speed and dynamically speeds up or slows down when the user scrolls.

## How It Works

The component uses a **two-layer animation approach**:

1. **Base Continuous Animation** - The marquee continuously scrolls at a steady base speed (controlled by `_speed`), even when the page is not being scrolled. This ensures the marquee is always visually engaging.

2. **Scroll-Responsive Speed** - When the user scrolls, ScrollTrigger detects the scroll velocity and dynamically adjusts the animation's `timeScale`:
   - **Scrolling faster** → Marquee speeds up proportionally
   - **Scrolling slower** → Marquee slows down smoothly
   - **Not scrolling** → Marquee returns to base speed

This approach ensures the marquee works correctly whether it's visible at page load or scrolled into view later.

## Dependencies

This component requires:
- **GSAP (GreenSock Animation Platform)** v3.0+
- **ScrollTrigger Plugin** (included with GSAP)

The component will automatically load GSAP from CDN if not already present in your course.

### Manual GSAP Installation (Optional)

If you prefer to include GSAP manually, add to your course's `src/core/index.html`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

## Accessibility

**Scroll Marquee** includes the following accessibility features:
- Keyboard navigation compatible
- Screen reader friendly
- ARIA labels properly configured
- Text-based content is fully accessible

## Limitations

- Continuously animating text may be difficult to read for some users
- The component automatically handles text duplication for seamless looping
- Not recommended for critical instructional content due to continuous animation
- Animation runs continuously while component is in the DOM (pauses when removed)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome Mobile

## Tips

- **Text Length**: Keep it concise - 3-6 short phrases works best
- **Separators**: Use bullet points (•) to separate phrases for visual clarity
- **Speed**: Start with `1` (slow) and increase as needed
- **Layout**: Use `"_layout": "full"` for maximum visual impact
- **HTML Support**: You can use HTML tags like `<strong>`, `<em>`, etc. for text styling
- **Readability**: Consider font size and contrast for moving text

---

**Author / maintainer:** fosterc1<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, Safari for macOS/iOS/iPadOS, Opera<br>
**Version:** 3.8.0
