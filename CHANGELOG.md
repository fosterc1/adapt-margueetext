# Changelog

All notable changes to adapt-scrollMarquee will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.1.2] - 2025-11-24

### Fixed
- **Orientation Change on Touch Devices**: Fixed marquee not properly filling screen and loop point issues when rotating between landscape and portrait orientations on mobile devices
  - Added dedicated orientation change detection for both modern (`screen.orientation`) and legacy (`orientationchange`) browsers
  - Implemented `recalculateMarqueeDimensions()` method to update viewport width, item width, and loop point after orientation changes
  - Changed dimension storage from `const` to instance properties (`this.viewportWidth`, `this.itemWidth`, `this.loopPoint`) to allow updates
  - Added 300ms delay after orientation change to allow browser to complete transition
  - Enhanced `remove()` method to properly clean up orientation change listeners

### Technical Details
- Modern browsers: Uses `window.screen.orientation.addEventListener('change')`
- Legacy browsers: Falls back to `window.addEventListener('orientationchange')`
- Recalculation triggers when viewport changes by >100px OR item width changes by >10px
- Automatically refreshes ScrollTrigger positions after dimension updates
- Proper cleanup prevents memory leaks from orientation listeners

### Benefits
- Marquee consistently fills entire viewport after orientation changes
- Seamless loop maintains without visible jumps
- ScrollTrigger positions accurately updated
- Improved mobile user experience
- Aligns with orientation fixes in adapt-backgroundvideo and adapt-article-blockslider

## [4.1.1] - 2024-11-22

### Changed
- Cleaned up temporary documentation files
- Streamlined documentation to essential files only
- Updated version badges and references

## [4.1.0] - 2024-11-22

### Fixed
- **CRITICAL:** Fixed ScrollTrigger conflicts with other GSAP components
- Auto-recreation of ScrollTriggers when killed by `ScrollTrigger.refresh()` from other components
- Multiple marquee instances now work correctly regardless of page position
- Instances appearing after other GSAP horizontal scroll components now animate properly

### Added
- Component ID logging for better debugging in multi-instance scenarios
- Animation frame counters with scroll delta tracking
- ScrollTrigger recreation event listener for automatic recovery
- Unique ScrollTrigger IDs for each component instance
- Enhanced validation to detect killed ScrollTriggers

### Changed
- ScrollTrigger creation now wrapped in `createScrollTrigger()` function for reusability
- Scroll handler now validates trigger health before animating
- Improved error recovery and resilience

## [4.0.12] - 2025-11-22

### Added
- Comprehensive diagnostic logging for multi-instance debugging
- Component ID tracking in all console logs
- Animation frame counters for debugging

## [4.0.11] - 2025-11-22

### Changed
- Deferred ScrollTrigger creation using `requestAnimationFrame()`
- Added `ScrollTrigger.refresh()` after creation for position accuracy

## [4.0.10] - 2025-11-22

### Changed
- Restored v4.0.1 scroll handler logic (working baseline)
- Removed complex state tracking and debug logging
- Maintained gsapLoader functionality from v4.0.3

## [4.0.9] - 2025-11-22

### Added
- ScrollTrigger.refresh() call after trigger creation

## [4.0.8] - 2025-11-22

### Changed
- Initialize lastScrollY to 0 instead of current scroll position

## [4.0.7] - 2025-11-22

### Fixed
- Loop reset logic bug causing subsequent instances to fail
- Simplified reset conditions to one per direction (LTR/RTL)

## [4.0.6] - 2025-11-22

### Fixed
- Scroll delta accumulation for multiple instances
- wasActive state tracking to prevent jumps

## [4.0.5] - 2025-11-22

### Fixed
- Syntax error with literal `\n` in template string

## [4.0.4] - 2025-11-22

### Added
- Debug logging for GSAP loading and multi-instance setup

## [4.0.3] - 2025-11-22

### Fixed
- **CRITICAL:** Restored GSAP loading functionality
- Added gsapLoader.js back (was removed in v4.0.2)
- GSAP now loads correctly from CDN with AMD/RequireJS bypass

### Documentation
- Added HOTFIX-V4.0.3.md
- Added UPLOAD-V4.0.3-INSTRUCTIONS.md

## [4.0.2] - 2025-11-22

### Changed
- Version bump for AAT testing
- Updated documentation

### Documentation
- Added RELEASE-NOTES-V4.0.2.md

## [4.0.1] - 2025-11-22

### Changed
- **BREAKING:** CSS class naming changed from `.scroll-marquee` to `.scrollmarquee`
- Architecture simplification and cleanup
- Removed gsapLoader.js (this caused issues, restored in v4.0.3)
- Streamlined templates

### Removed
- js/gsapLoader.js (later restored in v4.0.3)
- js/scrollMarquee.jsx
- templates/scrollMarquee-simple.jsx
- templates/scrollMarquee.hbs
- AUDIT-REPORT*.md files

### Documentation
- Updated README.md with new class naming convention

## [3.13.0] - 2025-01-08

### Added
- RTL (Right-to-Left) language support for Arabic, Hebrew, and Farsi
- Auto-detection of text direction based on Unicode ranges
- Enhanced accessibility improvements
- Comprehensive error handling

### Changed
- Improved scroll listener with better viewport detection
- Enhanced performance optimizations

### Documentation
- Updated README with RTL support documentation
- Added accessibility feature documentation

## [3.12.0] - 2024-12-XX

### Added
- Comprehensive CSS customization with CSS variables
- 14 customizable CSS variables for styling control

### Documentation
- Added CSS customization guide to README

## [3.10.0] - 2024-11-XX

### Added
- Comprehensive accessibility improvements
- WCAG 2.1 AA compliance
- Enhanced screen reader support
- Cross-device and responsive compatibility

### Documentation
- Added Adapt component development best practices guide
- Documented accessibility features in README

## [3.9.4] - 2024-11-XX

### Fixed
- Simplified to always-active scroll listener with direct isActive check

## [3.9.3] - 2024-11-XX

### Added
- Multiple activation checks for already-visible components

## [3.9.2] - 2024-11-XX

### Changed
- Improved component activation logic

---

## Migration Guides

### Migrating from v3.x to v4.x

#### CSS Class Name Changes (v4.0.1+)
The CSS class naming convention changed in v4.0.1:

**Before (v3.x):**
```css
.scroll-marquee__widget { }
.scroll-marquee__inner { }
.scroll-marquee__item { }
```

**After (v4.x):**
```css
.scrollmarquee__widget { }
.scrollmarquee__inner { }
.scrollmarquee__item { }
```

**Migration Steps:**
1. Find and replace `.scroll-marquee` with `.scrollmarquee` in your custom CSS
2. Test all custom styling in preview mode
3. No changes needed to course content or component configuration

#### Content and Configuration
- ✅ No changes needed to component JSON configuration
- ✅ No changes needed to body text or settings
- ✅ Existing courses remain compatible

---

## Links

- **GitHub Repository:** https://github.com/fosterc1/adapt-margueetext
- **Issues:** https://github.com/fosterc1/adapt-margueetext/issues
- **Pull Requests:** https://github.com/fosterc1/adapt-margueetext/pulls

---

## Version Support

| Version | Status | Support Level |
|---------|--------|---------------|
| 4.1.0 | ✅ Current | Full support |
| 4.0.x | ⚠️ Deprecated | Critical fixes only |
| 3.13.0 | 📦 Legacy | No support |
| < 3.13.0 | ❌ End of Life | No support |

---

*For detailed technical information about specific fixes, see:*
- *SUCCESS-V4.1.0.md - Complete v4.1.0 solution documentation*
- *CRITICAL-FIX-V4.0.7.md - Loop reset logic fix*
- *HOTFIX-V4.0.3.md - GSAP loading restoration*
- *RELEASE-NOTES-V4.0.2.md - v4.0.2 release details*
