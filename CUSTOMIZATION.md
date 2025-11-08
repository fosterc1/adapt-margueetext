# Scroll Marquee - CSS Customization Guide

This component uses **CSS Custom Properties (variables)** for easy styling customization. You can override any of these variables in your theme's custom CSS.

## Available CSS Variables

### Typography

```css
.scroll-marquee {
  --marquee-font-size: 1.5rem;           /* Base font size */
  --marquee-font-weight: 600;            /* Font weight (100-900) */
  --marquee-font-family: inherit;        /* Font family */
  --marquee-text-color: inherit;         /* Text color */
  --marquee-text-transform: none;        /* uppercase, lowercase, capitalize */
  --marquee-letter-spacing: normal;      /* Letter spacing */
  --marquee-line-height: 1.5;           /* Line height */
  --marquee-text-shadow: none;          /* Text shadow effect */
}
```

### Layout & Spacing

```css
.scroll-marquee {
  --marquee-gap: 2rem;                  /* Space between duplicated items */
  --marquee-padding: 2rem;              /* Padding after each item */
  --marquee-background: transparent;     /* Background color */
}
```

## Customization Examples

### Example 1: Bold Uppercase Text

```css
.scroll-marquee {
  --marquee-font-size: 2rem;
  --marquee-font-weight: 700;
  --marquee-text-transform: uppercase;
  --marquee-letter-spacing: 0.1em;
}
```

### Example 2: Elegant Serif Font

```css
.scroll-marquee {
  --marquee-font-family: 'Georgia', serif;
  --marquee-font-size: 1.8rem;
  --marquee-font-weight: 400;
  --marquee-line-height: 1.6;
  --marquee-text-color: #2c3e50;
}
```

### Example 3: Modern Sans with Shadow

```css
.scroll-marquee {
  --marquee-font-family: 'Helvetica Neue', Arial, sans-serif;
  --marquee-font-size: 2.5rem;
  --marquee-font-weight: 300;
  --marquee-text-color: #ffffff;
  --marquee-text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  --marquee-background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}
```

### Example 4: Tight Spacing for Long Text

```css
.scroll-marquee {
  --marquee-font-size: 1.2rem;
  --marquee-gap: 1rem;
  --marquee-padding: 1rem;
  --marquee-letter-spacing: -0.02em;
}
```

### Example 5: Brand Colors

```css
.scroll-marquee {
  --marquee-font-size: 1.6rem;
  --marquee-font-weight: 500;
  --marquee-text-color: #ff6b6b;
  --marquee-background: #f8f9fa;
  --marquee-letter-spacing: 0.05em;
}
```

### Example 6: Neon Effect

```css
.scroll-marquee {
  --marquee-font-family: 'Courier New', monospace;
  --marquee-font-size: 2rem;
  --marquee-font-weight: 700;
  --marquee-text-color: #00ff00;
  --marquee-text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
  --marquee-background: #000000;
}
```

## Advanced Customization with Classes

You can also target specific elements directly:

### Custom Item Styling

```css
/* Style the marquee items directly */
.scroll-marquee__item {
  padding: 1rem 2rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Custom Widget Container

```css
/* Style the widget container */
.scroll-marquee__widget {
  padding: 2rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
```

### Custom Inner Container

```css
/* Style the inner scrolling container */
.scroll-marquee__inner {
  padding: 1rem 0;
}
```

## Responsive Customization

Override variables at different breakpoints:

```css
/* Desktop */
.scroll-marquee {
  --marquee-font-size: 2rem;
  --marquee-gap: 3rem;
}

/* Tablet */
@media (max-width: 900px) {
  .scroll-marquee {
    --marquee-font-size: 1.5rem;
    --marquee-gap: 2rem;
  }
}

/* Mobile */
@media (max-width: 520px) {
  .scroll-marquee {
    --marquee-font-size: 1.2rem;
    --marquee-gap: 1rem;
  }
}
```

## Component-Specific Styling

Target specific instances using the component ID or custom classes:

```css
/* Style a specific component by ID */
#c-105.scroll-marquee {
  --marquee-font-size: 3rem;
  --marquee-text-color: blue;
}

/* Style using custom classes (add via _classes property) */
.scroll-marquee.my-custom-marquee {
  --marquee-font-family: 'Comic Sans MS', cursive;
  --marquee-text-color: purple;
}
```

## HTML Content Styling

Since the body field supports HTML, you can also style inline:

```html
<strong style="color: red;">Bold Red</strong> • 
<em style="font-style: italic;">Italic</em> • 
<span style="text-decoration: underline;">Underlined</span>
```

Or use CSS classes:

```html
<span class="highlight">Important Text</span> • 
<span class="accent">Accented Text</span>
```

Then define in your theme CSS:

```css
.scroll-marquee .highlight {
  background: yellow;
  padding: 0.2em 0.5em;
  border-radius: 4px;
}

.scroll-marquee .accent {
  color: #e74c3c;
  font-weight: 700;
}
```

## Dark Mode Support

```css
/* Light mode (default) */
.scroll-marquee {
  --marquee-text-color: #333333;
  --marquee-background: #ffffff;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .scroll-marquee {
    --marquee-text-color: #f0f0f0;
    --marquee-background: #1a1a1a;
  }
}

/* Or use a class-based approach */
.dark-theme .scroll-marquee {
  --marquee-text-color: #f0f0f0;
  --marquee-background: #1a1a1a;
}
```

## Where to Add Custom CSS

### In Adapt Framework:

1. **Theme LESS file**: Add to `src/theme/[your-theme]/less/theme.less`
2. **Custom CSS file**: Create `src/theme/[your-theme]/less/custom.less`
3. **Component override**: Create `src/theme/[your-theme]/less/scrollMarquee.less`

### In Adapt Authoring Tool:

1. Navigate to **Project Settings**
2. Go to **Theme Settings**
3. Find **Custom CSS/LESS** section
4. Add your custom variables/styles

### Direct CSS Override:

Add to your course's `index.html` or main stylesheet:

```html
<style>
  .scroll-marquee {
    --marquee-font-size: 2rem;
    --marquee-text-color: #ff6b6b;
    /* Your custom variables */
  }
</style>
```

## Browser Support

CSS Custom Properties are supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+
- iOS Safari 9.3+
- Android Chrome 49+

For older browsers, the fallback values in the CSS will be used.

## Tips

1. **Use relative units** (`rem`, `em`) for better scalability
2. **Test on mobile** devices to ensure readability
3. **Consider contrast** for accessibility (WCAG AA: 4.5:1 ratio minimum)
4. **Avoid too many fonts** - keep it consistent with your theme
5. **Use CSS variables** for easy global changes across multiple marquees
6. **Preview before publishing** to ensure animation works smoothly

## Need Help?

If you need assistance with customization, check:
- The component's `less/scrollMarquee.less` file for default styles
- Your theme's documentation for CSS override locations
- Adapt Framework documentation for theme customization

---

**Version:** 3.11.0  
**Last Updated:** 2025-11-08
