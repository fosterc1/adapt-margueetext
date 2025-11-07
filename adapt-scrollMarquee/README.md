# Adapt Scroll Marquee

**Scroll Marquee** is an *[Adapt authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki)* component that creates a scroll-velocity-based marquee effect using GSAP ScrollTrigger.

## Description

This component displays a horizontal scrolling marquee of images that responds to the user's scroll velocity. The faster the user scrolls, the faster the marquee moves. The effect creates an engaging, dynamic visual element that reacts to user interaction.

## Features

- Scroll-velocity-based animation
- Infinite seamless loop
- Configurable speed multiplier
- Responsive design
- Accessibility support
- Support for multiple images with attribution

## Installation

### Manual Installation

1. Download the component from this repository
2. Extract to your Adapt course `src/components/` directory
3. Run `adapt install` or build your course

### Bower Installation

```bash
adapt install adapt-scrollMarquee
```

## Dependencies

This component requires:
- **GSAP (GreenSock Animation Platform)** - v3.0+
- **ScrollTrigger Plugin** - Included with GSAP

### Adding GSAP to Your Adapt Course

Add GSAP to your course by including it in your `config.json` or by adding the script tags:

**Option 1: Via CDN (in index.html)**

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

**Option 2: Via NPM (recommended for Adapt Framework v5+)**

```bash
npm install gsap
```

Then import in your course's main JavaScript file or create a custom plugin to load GSAP.

## Settings

### Attributes

**_component** (string): This must be set to `scrollMarquee`.

**_classes** (string): Custom CSS classes to apply to the component.

**_layout** (string): Defines the layout of the component. Typically set to `full` for full-width display.

**displayTitle** (string): The title to display for this component.

**title** (string): Internal component title.

**body** (string): Body text to display above the marquee.

**instruction** (string): Instruction text for the user.

**_speed** (number): Speed multiplier for the marquee animation. Default is `0.01`. Higher values result in faster movement.

**_setCompletionOn** (string): When to mark the component as complete. Options: `inview`, `manual`. Default: `inview`.

**_items** (array): Array of items to display in the marquee. Each item contains:
- **_graphic** (object): Contains `src` (string) - path to the image
- **alt** (string): Alternative text for accessibility
- **attribution** (string): Attribution text to display below the image
- **_classes** (string): Custom CSS classes for this specific item

## Example Configuration

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
  "body": "Scroll down to see the marquee move based on your scroll speed.",
  "instruction": "",
  "_speed": 0.01,
  "_setCompletionOn": "inview",
  "_items": [
    {
      "_graphic": {
        "src": "course/en/images/marquee-image-1.jpg"
      },
      "alt": "Image 1",
      "attribution": "Photo by Example Artist"
    },
    {
      "_graphic": {
        "src": "course/en/images/marquee-image-2.jpg"
      },
      "alt": "Image 2",
      "attribution": ""
    }
  ]
}
```

## Customization

### CSS Customization

You can customize the appearance by:

1. Adding custom classes via `_classes` attribute
2. Overriding LESS/CSS variables in your theme
3. Targeting specific selectors:

```less
.scroll-marquee {
  &__inner {
    gap: 3rem; // Adjust spacing between items
  }
  
  &__item-image img {
    max-width: 400px; // Adjust image size
    border-radius: 10px; // Add styling
  }
}
```

### Speed Adjustment

Adjust the `_speed` value to control responsiveness:
- `0.005` - Very slow, subtle movement
- `0.01` - Default, balanced movement
- `0.02` - Fast, dramatic movement
- `0.05+` - Very fast, intense movement

## Browser Support

- Modern browsers with CSS transforms support
- IE11+ (with appropriate polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Images include alt text for screen readers
- Component supports keyboard navigation
- Respects `prefers-reduced-motion` user preference
- Can be marked as complete on inview for course progression

## Troubleshooting

**Marquee not animating:**
- Ensure GSAP and ScrollTrigger are properly loaded
- Check browser console for JavaScript errors
- Verify images are loading correctly

**Jerky or stuttering animation:**
- Reduce `_speed` value
- Optimize image file sizes
- Check for other heavy JavaScript operations

**Images not displaying:**
- Verify image paths are correct
- Check image file formats (JPG, PNG, SVG supported)
- Ensure images are in the course assets folder

## Version History

**v1.0.0** - Initial release
- Scroll-velocity-based marquee
- GSAP ScrollTrigger integration
- Configurable speed
- Responsive design

## License

GPLv3

## Credits

Based on the CodePen effect by ahoyhoy using GSAP ScrollTrigger.
