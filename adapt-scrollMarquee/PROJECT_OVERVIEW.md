# Adapt Scroll Marquee - Project Overview

## 🎯 Project Summary

**Adapt Scroll Marquee** is a custom component plugin for the Adapt Learning Framework that creates an engaging scroll-velocity-based marquee effect. The component uses GSAP's ScrollTrigger plugin to create smooth, responsive animations that react to user scroll speed.

## 📁 Project Structure

```
adapt-scrollMarquee/
├── js/
│   ├── scrollMarquee.js          # Main component logic
│   └── gsapLoader.js              # GSAP library loader utility
├── less/
│   └── scrollMarquee.less         # Component styling
├── templates/
│   └── scrollMarquee.jsx          # React JSX template
├── properties-schema/
│   └── component.schema.json      # JSON schema for Authoring Tool
├── example/
│   └── demo.html                  # Standalone demo
├── bower.json                     # Bower package configuration
├── package.json                   # NPM package configuration
├── properties.schema              # Legacy schema file
├── example.json                   # Example configuration
├── README.md                      # Main documentation
├── INSTALLATION.md                # Installation guide
├── CHANGELOG.md                   # Version history
├── LICENSE                        # GPL-3.0 License
├── .gitignore                     # Git ignore rules
└── PROJECT_OVERVIEW.md            # This file
```

## 🔑 Key Features

### 1. Scroll-Velocity Animation
- Marquee speed responds to user scroll velocity
- Faster scrolling = faster marquee movement
- Creates engaging, dynamic user experience

### 2. Infinite Seamless Loop
- Items are automatically duplicated for continuous scrolling
- No visible seams or breaks in the animation
- Smooth transitions between loops

### 3. GSAP Integration
- Uses industry-standard GSAP animation library
- Leverages ScrollTrigger plugin for scroll detection
- Automatic library loading with CDN fallback

### 4. Fully Configurable
- Adjustable speed multiplier
- Custom CSS classes per item
- Attribution support for images
- Flexible completion tracking

### 5. Responsive & Accessible
- Mobile-friendly design
- Touch-optimized
- Screen reader compatible
- Alt text support for all images

## 🛠️ Technical Architecture

### Component Lifecycle

```
preRender()
  ↓
Listen for completion changes
  ↓
postRender()
  ↓
Load GSAP libraries (if needed)
  ↓
setupMarquee()
  ↓
Initialize ScrollTrigger
  ↓
User scrolls → onUpdate callback
  ↓
Calculate velocity & update position
  ↓
Loop detection & reset
  ↓
remove()
  ↓
Clean up ScrollTrigger instances
```

### Key Technologies

- **Adapt Framework**: v5.0.0+
- **GSAP**: v3.12.2+
- **ScrollTrigger**: Plugin for GSAP
- **React**: JSX templates
- **LESS/CSS**: Styling
- **ES6 Modules**: JavaScript structure

### Core Algorithm

```javascript
1. Duplicate all marquee items to create seamless loop
2. Initialize xPos = 0
3. On scroll update:
   a. Get scroll velocity from ScrollTrigger
   b. Multiply by speed setting
   c. Subtract from xPos
   d. If xPos exceeds half marquee width, reset to 0
   e. Apply transform to marquee element
```

## 📊 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `_speed` | number | 0.01 | Speed multiplier (0.001-0.1) |
| `_setCompletionOn` | string | "inview" | Completion trigger |
| `_items` | array | [] | Array of items to display |
| `_graphic.src` | string | - | Image path (required) |
| `alt` | string | "" | Alt text for accessibility |
| `attribution` | string | "" | Attribution text |
| `_classes` | string | "" | Custom CSS classes |

## 🎨 Styling Architecture

### CSS Class Structure

```
.scroll-marquee                    # Component wrapper
├── .scroll-marquee__widget        # Widget container
│   └── .scroll-marquee__block     # Scroll trigger area
│       └── .scroll-marquee__inner # Animated container
│           └── .scroll-marquee__item           # Individual item
│               └── .scroll-marquee__item-image # Image wrapper
│                   ├── img                     # Actual image
│                   └── .scroll-marquee__item-attribution # Attribution text
```

### Customization Points

1. **Gap between items**: `.scroll-marquee__inner { gap: 2rem; }`
2. **Image size**: `.scroll-marquee__item-image img { max-width: 300px; }`
3. **Hover effects**: `.scroll-marquee__item:hover { transform: ... }`
4. **Mobile breakpoints**: `@media` queries included

## 🚀 Performance Considerations

### Optimizations Implemented

1. **Will-change property**: Applied to animated elements
2. **Transform-based animation**: Uses GPU acceleration
3. **Loop reset**: Prevents large transform values
4. **Efficient duplication**: Only duplicates once on init
5. **Cleanup on removal**: Kills ScrollTrigger instances

### Best Practices

- Keep image file sizes under 200KB
- Use 5-10 images for optimal balance
- Optimize images before upload
- Test on target devices
- Consider reduced-motion preferences

## 🔧 Development Workflow

### Local Development

1. Clone or copy to Adapt course
2. Place in `src/components/adapt-scrollMarquee/`
3. Run `grunt dev` or `npm run dev`
4. Test in browser

### Testing Checklist

- [ ] Images load correctly
- [ ] Marquee animates on scroll
- [ ] Speed setting works as expected
- [ ] Infinite loop is seamless
- [ ] Mobile responsive
- [ ] Accessibility (keyboard, screen reader)
- [ ] Performance (smooth 60fps)
- [ ] Cross-browser compatibility

### Build Process

1. Component is processed by Adapt build system
2. LESS compiled to CSS
3. JSX compiled to JavaScript
4. Assets bundled and optimized
5. Output to `build/` directory

## 🔌 Integration Points

### With Adapt Framework

- Extends `ComponentView` base class
- Uses Adapt's model/view architecture
- Integrates with completion tracking
- Respects layout system
- Follows accessibility guidelines

### With GSAP

- Registers ScrollTrigger plugin
- Creates scroll-based timeline
- Uses GSAP's `set()` for transforms
- Implements proper cleanup

### With Adapt Authoring Tool

- JSON schema for configuration UI
- Asset picker for images
- Visual editor support
- Live preview capability

## 📱 Browser & Device Support

### Desktop
- ✅ Chrome 60+ (Full support)
- ✅ Firefox 55+ (Full support)
- ✅ Safari 12+ (Full support)
- ✅ Edge 79+ (Full support)
- ⚠️ IE11 (Limited support, requires polyfills)

### Mobile
- ✅ iOS Safari 12+ (Full support)
- ✅ Chrome Mobile (Full support)
- ✅ Samsung Internet (Full support)
- ✅ Firefox Mobile (Full support)

### Screen Sizes
- Desktop: 1920px+
- Tablet: 768px - 1919px
- Mobile: 320px - 767px

## 🎓 Learning Outcomes

### For Developers

- Understanding scroll-based animations
- GSAP/ScrollTrigger implementation
- Adapt component development
- React template patterns
- Performance optimization techniques

### For Content Creators

- Configuring interactive components
- Selecting appropriate images
- Balancing aesthetics and performance
- Creating engaging scroll experiences

## 🔮 Future Enhancements

### Potential Features

1. **Direction Control**: Left-to-right or right-to-left
2. **Multiple Rows**: Stacked marquees with different speeds
3. **Pause on Hover**: Stop animation when hovering
4. **Click Interactions**: Expand/lightbox on click
5. **Video Support**: Include video items in marquee
6. **Auto-scroll**: Optional auto-scroll without user interaction
7. **Easing Options**: Different easing functions
8. **Mobile Gestures**: Swipe to control speed

### Roadmap

- v1.1: Direction control and pause on hover
- v1.2: Click interactions and lightbox
- v1.3: Video support
- v2.0: Complete redesign with new features

## 📞 Support & Contributing

### Getting Help

1. Check README.md and INSTALLATION.md
2. Review example.json configuration
3. Test with demo.html
4. Check browser console for errors
5. Verify GSAP is loaded

### Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Reporting Issues

When reporting issues, please include:

- Adapt Framework version
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
- Configuration JSON

## 📄 License

This project is licensed under GPL-3.0. See LICENSE file for details.

## 🙏 Credits

- Original CodePen effect by ahoyhoy
- GSAP by GreenSock
- Adapt Learning community
- All contributors

---

**Version**: 1.0.0  
**Last Updated**: November 7, 2024  
**Maintainer**: Your Name  
**Repository**: https://github.com/yourusername/adapt-scrollMarquee
