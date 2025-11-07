# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-11-07

### Changed (BREAKING CHANGES)
- **Restructured to match official Adapt conventions**
- Renamed `properties-schema/` to `schema/` (standard Adapt structure)
- Converted JSX template to Handlebars (.hbs) for better compatibility
- Created main entry file `js/adapt-scrollMarquee.js`
- Renamed `scrollMarquee.js` to `scrollMarqueeView.js`
- Updated component registration to use `components.register()` pattern
- Updated bower.json and package.json main entry points

### Why These Changes
- Ensures compatibility with official Adapt Framework conventions
- Matches structure of adapt-contrib-media and other core components
- Improves maintainability and future-proofing
- Better integration with Adapt build system

## [1.0.0] - 2024-11-07

### Added
- Initial release of Adapt Scroll Marquee component
- Scroll-velocity-based marquee animation using GSAP ScrollTrigger
- Configurable speed multiplier setting
- Support for multiple images with alt text and attribution
- Automatic GSAP library loading via CDN fallback
- Infinite seamless loop functionality
- Responsive design for mobile and desktop
- Accessibility features including alt text and keyboard support
- Complete documentation (README, INSTALLATION guide)
- Example configuration and demo HTML
- Support for Adapt Framework v5+
- Support for Adapt Authoring Tool

### Features
- Smooth scroll-based animation
- Automatic item duplication for seamless looping
- Customizable speed control
- Full-width layout support
- Custom CSS class support per item
- Attribution text support for images
- InView completion tracking
- Clean up on component removal

### Technical Details
- Built with ES6 modules
- Handlebars templates (standard Adapt)
- LESS/CSS styling
- GSAP 3.12+ compatibility
- ScrollTrigger plugin integration
- Proper cleanup and memory management

[1.1.0]: https://github.com/fosterc1/adapt-margueetext/releases/tag/v1.1.0
[1.0.0]: https://github.com/fosterc1/adapt-margueetext/releases/tag/v1.0.0
