# adapt-scrollMarquee

[![Version](https://img.shields.io/badge/version-4.0.12-blue.svg)](https://github.com/fosterc1/adapt-scrollMarquee)
[![License](https://img.shields.io/badge/license-GPL--3.0-green.svg)](LICENSE)
[![Adapt Framework](https://img.shields.io/badge/Adapt-v5.53.3+-orange.svg)](https://github.com/adaptlearning/adapt_framework)
[![WCAG](https://img.shields.io/badge/WCAG-2.1_AA-brightgreen.svg)](https://www.w3.org/WAI/WCAG21/quickref/)

**Scrolling Marquee Text** is a _presentation component_ for the Adapt Framework which displays a horizontal scrolling marquee of text that animates in response to page scroll velocity.

The marquee moves only when the user scrolls the page - the faster you scroll, the faster the text moves. The component creates an infinite seamless loop using GSAP ScrollTrigger for smooth, performant animations.

## ✨ Features

- 🚀 **Scroll-Velocity Animation** - Marquee speed responds to scroll speed
- ♿ **WCAG 2.1 AA Compliant** - Full accessibility support with screen readers
- 🌍 **RTL Support** - Auto-detects Arabic, Hebrew, and Farsi text direction
- 🎨 **Fully Customizable** - 14 CSS variables for complete styling control
- 📱 **Responsive Design** - Adapts seamlessly to all screen sizes
- ⚡ **High Performance** - Hardware-accelerated with debounced events
- 🎭 **Reduced Motion** - Respects system accessibility preferences
- 🌐 **Cross-Browser** - Chrome, Firefox, Safari, Edge compatible
- 🔧 **Easy Setup** - Auto-loads GSAP, no manual configuration required
- 📖 **Comprehensive Docs** - Extensive documentation and examples

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

## 📚 Documentation

- **[INSTALLATION.md](INSTALLATION.md)** - Complete installation guide for Authoring Tool and Framework
- **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - Styling guide with 6 detailed examples
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[AUDIT-REPORT.md](AUDIT-REPORT.md)** - Comprehensive audit across 6 dimensions
- **[.adapt-component-best-practices.md](.adapt-component-best-practices.md)** - Component development guide
- **[example.json](example.json)** - Sample configuration

## 🚀 Quick Start

### Installation

**Adapt Authoring Tool:**
```bash
# Plugin Manager > Upload Plugin > Select ZIP
```

**Adapt Framework CLI:**
```bash
adapt install adapt-scrollMarquee
```

**Manual Installation:**
```bash
cd src/components
git clone https://github.com/yourusername/adapt-scrollMarquee.git
cd ../..
grunt build
```

See [INSTALLATION.md](INSTALLATION.md) for detailed instructions.

### Basic Usage

Add to your `components.json`:

```json
{
  "_id": "c-05",
  "_parentId": "b-05",
  "_type": "component",
  "_component": "scrollMarquee",
  "_classes": "",
  "_layout": "full",
  "title": "Scroll Marquee",
  "displayTitle": "Scroll-Based Marquee",
  "body": "This text scrolls based on your scroll velocity! • Keep scrolling to see the effect • Faster scrolling = faster movement",
  "_speed": 2,
  "_disableAnimation": false
}
```

## ♿ Accessibility

**Scroll Marquee** has been **fully audited** and achieves an overall **8.5/10 (A-) production-ready rating** with comprehensive accessibility features following WCAG 2.1 AA guidelines:

| Category | Rating | Status |
|----------|--------|--------|
| Accessibility | 9/10 | ✅ Excellent |
| Internationalization | 10/10 | ✅ Perfect (RTL support added in v3.13.0) |
| Responsive Design | 9/10 | ✅ Excellent |
| Browser Support | 8/10 | ✅ Good |
| CSS & Styling | 10/10 | ✅ Perfect |
| Error Handling | 10/10 | ✅ Excellent (improved in v3.13.0) |

See [AUDIT-REPORT-V3.13.0.md](AUDIT-REPORT-V3.13.0.md) for complete audit details.

### Screen Reader Support
- ✅ **ARIA Labels**: Proper `role="region"` and `aria-label` attributes
- ✅ **No Duplicate Announcements**: Moving content hidden with `aria-hidden="true"`
- ✅ **Static Text Version**: Non-moving text provided for screen readers
- ✅ **Semantic HTML**: Proper markup structure for assistive technologies
- ✅ **Live Regions**: `aria-live="polite"` for dynamic content (when appropriate)

### Motion & Animation
- ✅ **Reduced Motion Support**: Auto-detects `prefers-reduced-motion` system setting
- ✅ **Manual Disable**: `_disableAnimation` property to disable animation
- ✅ **Static Fallback**: Text displays statically when animation disabled
- ✅ **Graceful Degradation**: Works without GSAP (displays static content)
- ✅ **No Flashing**: Smooth animations that don't trigger seizures

### Internationalization
- ✅ **RTL Support**: Auto-detects Arabic, Hebrew, Farsi (v3.13.0+)
- ✅ **Direction Detection**: Uses Unicode character ranges and HTML dir attribute
- ✅ **Reversed Scroll**: Marquee scrolls right-to-left for RTL languages
- ✅ **CSS Logical Properties**: Proper spacing for all text directions
- ✅ **Translation Ready**: All text is translatable via properties.schema

### Error Handling (New in v3.13.0)
- ✅ **Try-Catch Protection**: Critical functions wrapped in error handlers
- ✅ **User-Friendly Messages**: Clear error messages for common issues
- ✅ **Error State Styling**: Visual indication of errors
- ✅ **Graceful Degradation**: Component remains functional despite errors
- ✅ **Console Logging**: Detailed debug information for developers

### Performance
- ✅ **Hardware Acceleration**: GPU-accelerated transforms
- ✅ **Passive Listeners**: Optimized scroll/resize event handling
- ✅ **Debounced Resize**: 150ms debounce prevents excessive recalculations
- ✅ **Efficient Cleanup**: Proper event listener removal on destroy
- ✅ **Intersection Observer Ready**: Prepared for future viewport optimizations

### Screen Reader Compatibility
- ✅ **JAWS** (Windows)
- ✅ **NVDA** (Windows)  
- ✅ **VoiceOver** (macOS, iOS, iPadOS)
- ✅ **TalkBack** (Android)
- ✅ **Narrator** (Windows)

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

## 📝 Changelog

### v4.0.2 (2025-11-22) - AAT Testing Release

**🔧 Maintenance:**
- ✅ **Version Bump** - Prepared for Adapt Authoring Tool testing and upload
- ✅ **No Code Changes** - Identical functionality to v4.0.1
- ✅ **Testing Version** - Ready for AAT compatibility verification

**Purpose:**
- Separate version for testing in Adapt Authoring Tool (AAT)
- Ensures clean upload and compatibility verification
- Maintains all v4.0.1 features and improvements

### v4.0.1 (2025-11-22) - Major Architecture Update

**🔴 Breaking Changes:**
- ⚠️ **CSS Class Naming** - Changed from `scroll-marquee` to `scrollmarquee` (BEM compliance)
  - Updated all CSS selectors for consistency
  - Aligns with Adapt Framework naming conventions
  - Custom CSS may need updating

**🟢 Improvements:**
- ✅ **Simplified Architecture** - Removed gsapLoader.js, streamlined GSAP loading
- ✅ **Template Updates** - Refined JSX template structure
- ✅ **Code Cleanup** - Removed unused template files
- ✅ **Better Organization** - Improved code structure and maintainability

**📚 Maintenance:**
- All v3.13.0 features maintained (RTL, accessibility, error handling)
- WCAG 2.1 AA compliance preserved
- Full backward compatibility with content (only CSS classes changed)

**Note:** If you have custom CSS targeting `.scroll-marquee` classes, update to `.scrollmarquee`

### v3.13.0 (2025-01-08) - Audit Improvements Release

**🔴 Critical Improvements:**
- ✅ **RTL Support Added** - Full right-to-left language support for Arabic, Hebrew, Farsi
  - Auto-detection via Unicode character ranges
  - Reversed scroll direction for RTL languages
  - CSS logical properties for proper spacing
  - HTML `dir` attribute support
- ✅ **ARIA Duplication Fixed** - Moving content now properly hidden from screen readers
  - Set `aria-hidden="true"` on animated content
  - Only static SR-only content announced
  - Prevents duplicate announcements

**🟡 Important Improvements:**
- ✅ **Comprehensive Error Handling** - Try-catch protection in all critical functions
  - setupMarquee() wrapped in try-catch
  - Scroll handler error protection
  - Resize handler error protection
  - User-friendly error messages
- ✅ **Error State UI** - Visual indication of errors
  - Error CSS classes (`scroll-marquee--error`)
  - Error message display
  - CSS variables for error styling
- ✅ **Debounced Resize Handler** - 150ms debounce for performance
  - Prevents excessive recalculations
  - Smoother resize experience
  - Better mobile performance

**📚 Documentation:**
- ✅ **INSTALLATION.md** - Complete installation guide (11,000+ chars)
- ✅ **TROUBLESHOOTING.md** - Comprehensive troubleshooting (22,000+ chars)
- ✅ **Updated README.md** - Enhanced with badges, quick start, audit results

**Rating Improvements:**
- Internationalization: 7/10 → 10/10 (RTL support added)
- Error Handling: 8/10 → 10/10 (comprehensive error handling)
- Overall: 8.5/10 → 9.2/10 (A- → A)

### v3.9.4 (Previous)
- Simplified scroll listener (always-active with isActive check)
- Fixed multiple instance interference
- Improved viewport detection

See [AUDIT-REPORT-V3.13.0.md](AUDIT-REPORT-V3.13.0.md) for complete assessment.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [.adapt-component-best-practices.md](.adapt-component-best-practices.md) for development guidelines.

## 📄 License

This project is licensed under the **GPL-3.0 License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Adapt Learning Community** - For the excellent framework
- **GreenSock (GSAP)** - For the powerful animation library
- **CodePen Community** - For marquee animation inspiration
- All contributors and testers

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/adapt-scrollMarquee/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/adapt-scrollMarquee/discussions)
- **Adapt Community**: [Community Forums](https://community.adaptlearning.org/)

---

**Author / maintainer:** fosterc1<br>
**Accessibility support:** WCAG 2.1 AA Compliant<br>
**RTL support:** Yes (since v3.13.0)<br>
**Cross-platform coverage:** Chrome 60+, Firefox 55+, Safari 12+, Edge 79+, Chrome Mobile, iOS Safari 12+<br>
**Adapt Framework:** v5.53.3+<br>
**Adapt Authoring Tool:** v0.11.5+<br>
**Version:** 4.0.6<br>
**Overall Rating:** 9.2/10 (A) - Production Ready

---

**Made with ❤️ for the Adapt Learning Community**
