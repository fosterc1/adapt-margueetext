# Installation Guide - Adapt Scroll Marquee

This guide will help you install and configure the Scroll Marquee component in your Adapt course.

## Quick Start

### Step 1: Install the Component

**For Adapt Authoring Tool:**

1. Upload the entire `adapt-scrollMarquee` folder to your Adapt Authoring Tool server
2. Place it in the `adapt_authoring/temp/` directory
3. Use the Plugin Manager to install it
4. Rebuild your course

**For Adapt Framework:**

1. Copy the `adapt-scrollMarquee` folder to `src/components/`
2. Run `grunt build` or `npm run build`

**Via Bower (if available):**

```bash
adapt install adapt-scrollMarquee
```

### Step 2: Install GSAP Dependencies

The component requires GSAP and ScrollTrigger. Choose one of these methods:

#### Method 1: CDN (Easiest - Already Included)

The component will automatically load GSAP from CDN if not already present. No additional setup required!

#### Method 2: Manual CDN Installation

Add these scripts to your `src/core/index.html` file before the closing `</body>` tag:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

#### Method 3: NPM Installation (For Adapt Framework v5+)

```bash
npm install gsap
```

Then create a file `src/core/js/libraries.js`:

```javascript
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

export { gsap, ScrollTrigger };
```

And import it in your `src/core/js/app.js`:

```javascript
import './libraries';
```

### Step 3: Add to Your Course

#### In Adapt Authoring Tool:

1. Navigate to your page editor
2. Add a new component
3. Select "Scroll Marquee" from the component list
4. Configure the settings (see Configuration section)
5. Add your images
6. Publish your course

#### In Adapt Framework:

Add to your component JSON file (e.g., `blocks.json` or `components.json`):

```json
{
  "_id": "c-105",
  "_parentId": "b-55",
  "_type": "component",
  "_component": "scrollMarquee",
  "_classes": "",
  "_layout": "full",
  "title": "Scroll-Based Marquee",
  "displayTitle": "Scroll-Based Marquee",
  "body": "Scroll to see the marquee in action!",
  "_speed": 0.01,
  "_setCompletionOn": "inview",
  "_items": [
    {
      "_graphic": {
        "src": "course/en/images/marquee-1.jpg"
      },
      "alt": "Image 1"
    },
    {
      "_graphic": {
        "src": "course/en/images/marquee-2.jpg"
      },
      "alt": "Image 2"
    },
    {
      "_graphic": {
        "src": "course/en/images/marquee-3.jpg"
      },
      "alt": "Image 3"
    }
  ]
}
```

## Configuration

### Basic Configuration

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `_component` | string | Yes | - | Must be "scrollMarquee" |
| `_layout` | string | No | "full" | Layout type (full, half, left, right) |
| `_speed` | number | No | 0.01 | Speed multiplier for scroll effect |
| `_setCompletionOn` | string | No | "inview" | When to mark complete ("inview" or "manual") |
| `_items` | array | Yes | - | Array of items to display |

### Item Configuration

Each item in `_items` array:

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `_graphic.src` | string | Yes | - | Path to image |
| `alt` | string | No | "" | Alternative text for accessibility |
| `attribution` | string | No | "" | Attribution text |
| `_classes` | string | No | "" | Custom CSS classes |

## Tips for Best Results

### Image Recommendations

- **Format:** JPG or PNG
- **Size:** 300-500px wide for optimal performance
- **Aspect Ratio:** Consistent aspect ratio across all images looks best
- **File Size:** Optimize images (< 200KB each) for smooth animation
- **Quantity:** 5-10 images work well for most use cases

### Speed Settings

Experiment with `_speed` values:

- **0.005** - Very subtle, elegant movement
- **0.01** - Default, balanced (recommended)
- **0.015** - More responsive, energetic
- **0.02** - Fast, dramatic
- **0.03+** - Very fast (may cause motion sickness)

### Layout Tips

1. **Full Width:** Use `"_layout": "full"` for maximum impact
2. **Spacing:** Adjust gap in CSS if images are too close/far
3. **Height:** Consider page height - taller pages = more scroll distance
4. **Mobile:** Component automatically adjusts for mobile devices

## Customization

### Custom Styling

Create `custom-scrollmarquee.less` in your theme:

```less
.scroll-marquee {
  &__inner {
    gap: 4rem; // More space between items
  }
  
  &__item-image img {
    max-width: 400px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
}
```

### Advanced Customization

Modify the component behavior by editing `js/scrollMarquee.js`:

```javascript
// Change scroll trigger points
ScrollTrigger.create({
  trigger: this.el,
  start: 'top 80%',  // Start earlier
  end: 'bottom 20%', // End later
  scrub: true,
  // ...
});
```

## Troubleshooting

### Component Not Appearing

1. Check console for errors
2. Verify GSAP is loaded: `console.log(window.gsap)`
3. Check image paths are correct
4. Rebuild your course

### Animation Not Working

1. Check browser console for GSAP errors
2. Verify ScrollTrigger is registered
3. Ensure page has sufficient height to scroll
4. Test in different browser

### Performance Issues

1. Reduce image file sizes
2. Lower `_speed` value
3. Reduce number of items
4. Optimize images (use JPG, reduce dimensions)

### Images Not Loading

1. Check file paths in configuration
2. Verify images exist in `course/en/images/`
3. Check file extensions match (case-sensitive on some servers)
4. Clear browser cache

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Chrome Mobile
- ⚠️ IE11 (requires polyfills)

## Accessibility

The component includes:

- Alt text support for all images
- Keyboard navigation support
- Screen reader compatibility
- Respects `prefers-reduced-motion`

To disable animations for users who prefer reduced motion, add to your CSS:

```css
@media (prefers-reduced-motion: reduce) {
  .scroll-marquee__inner {
    animation: none !important;
    transform: none !important;
  }
}
```

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review the [example.json](example.json) for configuration examples
- Check browser console for error messages
- Ensure all dependencies are installed correctly

## Version Compatibility

- Adapt Framework: v5.0.0+
- Adapt Authoring Tool: v0.10.0+
- GSAP: v3.0.0+
- Modern browsers with ES6 support
