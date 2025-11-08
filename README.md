# adapt-scrollMarquee

**Scrolling Marquee Text** is a _presentation component_ which displays a horizontal scrolling marquee of text that animates in response to page scroll velocity.

The marquee moves only when the user scrolls the page - the faster you scroll, the faster the text moves. The component creates an infinite seamless loop using GSAP ScrollTrigger.

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
Controls the sensitivity/multiplier for scroll-based movement. Higher values make the marquee more responsive to scroll velocity. The default is `1`. Acceptable range is `1` to `5`.

**Speed Multipliers:**
- `1` - Low sensitivity (subtle movement - recommended starting point)
- `2` - Medium sensitivity (balanced response)
- `3` - High sensitivity (noticeable movement)
- `4` - Very high sensitivity (dramatic movement)
- `5` - Maximum sensitivity (extreme response to scroll)

The marquee only moves when the user scrolls the page. Higher `_speed` values amplify the scroll-velocity effect.

### \_disableAnimation (boolean):
Manually disable the scrolling animation for accessibility purposes. When set to `true`, the text will be displayed statically without any movement. This is useful for:
- Users who are sensitive to motion
- Courses that need to meet strict accessibility requirements
- Content that must be readable without animation
- Testing purposes

The default is `false`. When enabled, or when the user's system has `prefers-reduced-motion` enabled, the marquee will display only the first text item in a centered, static position.

## How It Works

The component uses **scroll-velocity-based animation**:

- **Scroll Detection** - GSAP ScrollTrigger continuously monitors page scroll velocity
- **Responsive Movement** - The marquee position updates based on scroll speed:
  - **Scrolling down** → Marquee moves left
  - **Scrolling up** → Marquee moves right  
  - **Faster scroll** → Marquee moves faster
  - **Not scrolling** → Marquee remains stationary
- **Seamless Loop** - Text automatically duplicates to create infinite scrolling effect
- **Speed Control** - The `_speed` setting (1-5) acts as a multiplier for the scroll velocity

The marquee only animates when the user is actively scrolling the page.

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

**Scroll Marquee** includes comprehensive accessibility features following WCAG 2.1 AA guidelines:

### Screen Reader Support
- **ARIA Labels**: Proper `role="region"` and `aria-label` attributes
- **Live Regions**: `aria-live="polite"` for dynamic content announcements
- **Static Text Version**: Hidden non-moving text version for screen readers
- **Semantic HTML**: Proper markup structure for assistive technologies

### Motion & Animation
- **Reduced Motion Support**: Automatically detects `prefers-reduced-motion` system setting
- **Manual Disable Option**: `_disableAnimation` property to disable animation
- **Static Fallback**: Text displays statically when animation is disabled
- **No Flashing**: Smooth, non-jarring animations that don't trigger seizures

### User Control
- **`_disableAnimation` (boolean)**: Manually disable scrolling animation for accessibility
  - Set to `true` to display text statically
  - Respects user preference for reduced motion
  - Ensures content is readable without movement

### Keyboard & Focus
- **Keyboard navigation compatible**: Standard tab navigation works
- **Focus management**: Proper focus handling for interactive elements
- **No keyboard traps**: Users can navigate away easily

### Visual Accessibility
- **High contrast compatible**: Works with high contrast modes
- **Responsive text sizing**: Adapts to user's font size preferences
- **Clear visual hierarchy**: Proper spacing and layout

### Compatibility
- **JAWS**: Fully compatible
- **NVDA**: Fully compatible  
- **VoiceOver**: iOS and macOS compatible
- **TalkBack**: Android compatible

## Limitations

- Requires user to scroll the page to see the marquee animation
- Moving text during scroll may be distracting for some users
- The component automatically handles text duplication for seamless looping
- Not recommended for critical instructional content that must be read carefully
- Effect works best on pages with scrollable content

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome Mobile

## Styling & Customization

The component uses **CSS Custom Properties** for easy styling customization. All text styling can be changed via CSS without modifying the component code.

### Quick CSS Variables

```css
.scroll-marquee {
  --marquee-font-size: 1.5rem;
  --marquee-font-weight: 600;
  --marquee-font-family: inherit;
  --marquee-text-color: inherit;
  --marquee-text-transform: none;
  --marquee-letter-spacing: normal;
  --marquee-gap: 2rem;
  --marquee-background: transparent;
  /* ...and more */
}
```

**📖 See [CUSTOMIZATION.md](CUSTOMIZATION.md) for complete styling guide with examples**

### What You Can Customize

✅ Font size, weight, and family  
✅ Text color and background  
✅ Text transform (uppercase, lowercase)  
✅ Letter spacing and line height  
✅ Text shadows and effects  
✅ Spacing and padding  
✅ Responsive breakpoints  
✅ Dark mode support  

## Tips

- **Text Length**: Keep it concise - 3-6 short phrases works best
- **Separators**: Use bullet points (•) to separate phrases for visual clarity
- **Speed**: Start with `1` (slow) and increase as needed
- **Layout**: Use `"_layout": "full"` for maximum visual impact
- **HTML Support**: You can use HTML tags like `<strong>`, `<em>`, etc. for text styling
- **Readability**: Consider font size and contrast for moving text
- **Customization**: Use CSS variables for easy styling - see CUSTOMIZATION.md

---

**Author / maintainer:** fosterc1<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, Safari for macOS/iOS/iPadOS, Opera<br>
**Version:** 3.12.0
