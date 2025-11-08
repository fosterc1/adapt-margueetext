# Troubleshooting Guide - Adapt ScrollMarquee Component

Comprehensive troubleshooting guide for common issues with the adapt-scrollMarquee component.

## Table of Contents

- [Quick Diagnostics](#quick-diagnostics)
- [Installation Issues](#installation-issues)
- [Animation Issues](#animation-issues)
- [Display Issues](#display-issues)
- [Performance Issues](#performance-issues)
- [Accessibility Issues](#accessibility-issues)
- [RTL/Internationalization Issues](#rtlinternationalization-issues)
- [Browser-Specific Issues](#browser-specific-issues)
- [Error Messages](#error-messages)
- [Advanced Debugging](#advanced-debugging)

---

## Quick Diagnostics

### Running Basic Checks

Open browser console (F12) and run:

```javascript
// Check GSAP availability
console.log('GSAP:', window.gsap?.version);
console.log('ScrollTrigger:', window.ScrollTrigger ? 'loaded' : 'not loaded');

// Check component presence
console.log('Marquee elements:', document.querySelectorAll('.scroll-marquee').length);

// Check for errors
console.log('Check console for red errors above');
```

### Quick Fix Checklist

Try these in order:

1. ✅ **Hard refresh:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. ✅ **Clear cache:** Browser settings > Clear browsing data
3. ✅ **Check console:** Look for red errors in F12 console
4. ✅ **Verify content:** Ensure body text is not empty
5. ✅ **Test different browser:** Try Chrome if using Safari, etc.

---

## Installation Issues

### Component Not Appearing in Authoring Tool

**Symptoms:**
- "Scroll Marquee" not in component list
- Cannot add component to blocks

**Diagnosis:**

```bash
# Check if component is installed
# In Authoring Tool: Plugin Manager > Installed > Search "scrollMarquee"

# In Framework:
cd /path/to/adapt-course
adapt ls components | grep scrollMarquee
```

**Solutions:**

1. **Reinstall Component:**

   ```bash
   # Adapt Framework
   adapt uninstall adapt-scrollMarquee
   adapt install adapt-scrollMarquee
   
   # Authoring Tool
   # Plugin Manager > Upload Plugin > Select ZIP
   ```

2. **Verify bower.json:**

   ```bash
   cat src/components/adapt-scrollMarquee/bower.json
   # Should contain valid JSON with component name
   ```

3. **Clear Authoring Tool Cache:**

   ```bash
   # Delete temp files
   rm -rf /path/to/authoring-tool/temp/*
   
   # Restart server
   pm2 restart adapt-authoring
   ```

4. **Check Permissions:**

   ```bash
   # Ensure write permissions
   ls -la src/components/
   # adapt-scrollMarquee should be readable
   ```

### Build Errors

**Symptoms:**
- `grunt build` fails
- Errors mentioning "scrollMarquee"

**Diagnosis:**

```bash
# Run build with verbose output
grunt build --verbose

# Look for lines containing:
# - "adapt-scrollMarquee"
# - "GSAP"
# - "bower.json"
```

**Solutions:**

1. **Clean Build:**

   ```bash
   grunt clean
   rm -rf build/
   grunt build
   ```

2. **Fix Dependencies:**

   ```bash
   cd src/components/adapt-scrollMarquee
   rm -rf node_modules
   npm install
   cd ../../..
   grunt build
   ```

3. **Check Node/npm Versions:**

   ```bash
   node --version  # Should be v14+ (v16+ recommended)
   npm --version   # Should be v6+
   ```

4. **Validate JSON:**

   ```bash
   # Check bower.json is valid
   cat src/components/adapt-scrollMarquee/bower.json | python -m json.tool
   
   # If error, fix the JSON syntax
   ```

---

## Animation Issues

### Marquee Not Scrolling

**Symptoms:**
- Text is visible but doesn't move
- No animation when scrolling page

**Diagnosis:**

```javascript
// Browser console (F12):
console.log('GSAP loaded:', !!window.gsap);
console.log('ScrollTrigger loaded:', !!window.ScrollTrigger);
console.log('Reduced motion:', window.matchMedia('(prefers-reduced-motion: reduce)').matches);
```

**Solutions:**

1. **Check Reduced Motion Setting:**

   **Windows:**
   - Settings > Ease of Access > Display > Show animations = ON

   **Mac:**
   - System Preferences > Accessibility > Display > Reduce motion = OFF

   **Linux:**
   - Check desktop environment accessibility settings

2. **Verify Component Settings:**

   ```json
   {
     "_disableAnimation": false  // Must be false
   }
   ```

3. **Check GSAP Loading:**

   ```javascript
   // If GSAP not loaded, check Network tab (F12)
   // Look for failed CDN requests to:
   // cdnjs.cloudflare.com/ajax/libs/gsap/
   ```

   **Solution if CDN blocked:**
   - Install GSAP locally (see INSTALLATION.md)
   - Or whitelist CDN in firewall/ad blocker

4. **Verify ScrollTrigger Active:**

   ```javascript
   // Check if component is in viewport
   const marquee = document.querySelector('.scroll-marquee');
   const rect = marquee.getBoundingClientRect();
   console.log('In viewport:', rect.top < window.innerHeight && rect.bottom > 0);
   ```

### Animation Too Fast/Slow

**Symptoms:**
- Marquee scrolls too quickly or too slowly

**Solutions:**

1. **Adjust Speed Setting:**

   ```json
   {
     "_speed": 1  // Values: 1 (slow) to 5 (fast)
   }
   ```

   - **Too fast?** Reduce number (try 1 or 2)
   - **Too slow?** Increase number (try 3 or 4)

2. **Custom Speed via CSS:**

   ```css
   .scroll-marquee {
     /* Adjust animation multiplier in JS console */
   }
   ```

   ```javascript
   // Override speed in console for testing:
   const view = Adapt.findViewByModelId('c-05'); // Replace with your component ID
   // Note: Requires code modification for permanent custom speeds
   ```

### Animation Jumpy/Stuttering

**Symptoms:**
- Marquee stutters during scroll
- Animation is not smooth

**Diagnosis:**

```javascript
// Check browser performance
console.log('Hardware acceleration:', 
  document.querySelector('.scroll-marquee__inner')
    .style.transform.includes('translate3d') ? 'Yes' : 'No'
);
```

**Solutions:**

1. **Enable Hardware Acceleration:**

   Already enabled by default via `will-change: transform`
   
   If still choppy, try:
   ```css
   .scroll-marquee__inner {
     transform: translateZ(0); /* Force GPU acceleration */
   }
   ```

2. **Close Other Tabs:**
   - Too many browser tabs can cause performance issues
   - Close unnecessary tabs and test again

3. **Update Graphics Drivers:**
   - Outdated GPU drivers can cause rendering issues
   - Update to latest drivers for your system

4. **Try Different Browser:**
   - Chrome/Edge (Chromium) often has best performance
   - Firefox is also good
   - Safari may have issues on older Macs

---

## Display Issues

### Text Not Visible

**Symptoms:**
- Component area is blank
- No text appears

**Diagnosis:**

```javascript
// Check if content exists
const body = document.querySelector('.scroll-marquee__item');
console.log('Content:', body?.textContent || 'NO CONTENT');

// Check if hidden by CSS
const widget = document.querySelector('.scroll-marquee__widget');
console.log('Opacity:', getComputedStyle(widget).opacity);
console.log('Display:', getComputedStyle(widget).display);
console.log('Visibility:', getComputedStyle(widget).visibility);
```

**Solutions:**

1. **Verify Body Text is Set:**

   ```json
   {
     "body": "Your marquee text here"  // Must not be empty
   }
   ```

2. **Check CSS Conflicts:**

   ```css
   /* Look for CSS that might hide content */
   .scroll-marquee__item {
     /* Ensure these are NOT set: */
     /* display: none; */
     /* opacity: 0; */
     /* visibility: hidden; */
   }
   ```

3. **Check Text Color:**

   ```css
   .scroll-marquee {
     --marquee-text-color: #000; /* Ensure contrast with background */
   }
   ```

   If text is white on white background, it won't be visible!

4. **Inspect Element:**
   - Right-click component area
   - Select "Inspect Element"
   - Check if `.scroll-marquee__item` has text content
   - Check computed styles for color, opacity, display

### Text Cut Off/Clipped

**Symptoms:**
- Top or bottom of text is cut off
- Text appears truncated

**Solutions:**

1. **Adjust Line Height:**

   ```css
   .scroll-marquee {
     --marquee-line-height: 1.6; /* Increase from 1.5 */
   }
   ```

2. **Add Padding:**

   ```css
   .scroll-marquee__widget {
     padding: 1rem 0; /* Add vertical padding */
   }
   ```

3. **Check Parent Container:**
   - Parent block may have `overflow: hidden`
   - Inspect parent elements for clipping

### Spacing Issues

**Symptoms:**
- Too much/little space between repeated text
- Uneven gaps

**Solutions:**

1. **Adjust Gap Variable:**

   ```css
   .scroll-marquee {
     --marquee-gap: 3rem; /* Default is 2rem */
   }
   ```

2. **Adjust Padding:**

   ```css
   .scroll-marquee {
     --marquee-padding: 3rem; /* Default is 2rem */
   }
   ```

---

## Performance Issues

### Slow Page Load

**Symptoms:**
- Page takes long time to load
- Delay before content appears

**Diagnosis:**

```javascript
// Check GSAP load time
performance.getEntriesByName('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js')
  .forEach(e => console.log('GSAP load time:', e.duration + 'ms'));
```

**Solutions:**

1. **Use Local GSAP:**

   ```bash
   # Install GSAP locally
   npm install gsap
   ```

   Add to index.html:
   ```html
   <script src="libraries/gsap.min.js"></script>
   <script src="libraries/ScrollTrigger.min.js"></script>
   ```

2. **Lazy Load Component:**
   - Place component lower on page
   - GSAP loads asynchronously, component displays immediately

3. **Optimize Content:**
   - Shorter body text = faster rendering
   - Remove unnecessary HTML tags from text

### High CPU Usage

**Symptoms:**
- Fan spins up when scrolling
- Browser becomes sluggish
- High CPU in Task Manager

**Diagnosis:**

```javascript
// Check scroll event frequency
let scrollCount = 0;
window.addEventListener('scroll', () => scrollCount++);
setTimeout(() => console.log('Scroll events in 5s:', scrollCount), 5000);
// Should be < 500 in 5 seconds
```

**Solutions:**

1. **Already Optimized:**
   - Component uses passive event listeners
   - Resize handler is debounced
   - ScrollTrigger optimized for performance

2. **Reduce Animation Instances:**
   - Limit to 2-3 scroll marquees per page
   - Too many can cause performance issues

3. **Disable on Low-End Devices:**

   ```javascript
   // Detect low-end device and disable animation
   const isLowEnd = navigator.hardwareConcurrency < 4 || 
                    /Android|webOS|BlackBerry/i.test(navigator.userAgent);
   
   // Set _disableAnimation: true for these devices
   ```

### Memory Leaks

**Symptoms:**
- Browser memory usage increases over time
- Page becomes slow after navigating between pages

**Diagnosis:**

```javascript
// Check if event listeners are cleaned up
// Use browser Memory Profiler (F12 > Memory tab)
// Take heap snapshot before and after navigation
```

**Solutions:**

1. **Verify Cleanup:**

   Component already cleans up properly in `remove()` method:
   - Kills ScrollTrigger instances
   - Removes event listeners
   - No memory leaks expected

2. **Force Cleanup (Debug):**

   ```javascript
   // If you suspect memory leak, manually cleanup:
   Adapt.trigger('device:resize'); // Forces re-init
   ```

---

## Accessibility Issues

### Screen Reader Not Announcing Content

**Symptoms:**
- JAWS/NVDA doesn't read marquee text
- VoiceOver silent on component

**Diagnosis:**

```javascript
// Check ARIA attributes
const widget = document.querySelector('.scroll-marquee__widget');
console.log('Role:', widget.getAttribute('role'));
console.log('Label:', widget.getAttribute('aria-label'));

const srOnly = document.querySelector('.scroll-marquee__sr-only');
console.log('SR-only content:', srOnly?.textContent || 'MISSING');
console.log('SR-only aria-hidden:', srOnly?.getAttribute('aria-hidden'));
```

**Solutions:**

1. **Verify SR-Only Content Exists:**

   Should have hidden div with aria-hidden="false":
   ```html
   <div class="scroll-marquee__sr-only" aria-hidden="false">
     Your text content here
   </div>
   ```

2. **Check ARIA Label:**

   ```json
   {
     "_globals": {
       "ariaRegion": "Scrolling marquee text that moves based on your scroll speed."
     }
   }
   ```

3. **Test with Multiple Screen Readers:**
   - JAWS (Windows)
   - NVDA (Windows)
   - VoiceOver (Mac)
   - TalkBack (Android)

4. **Verify Moving Content is Hidden:**

   ```html
   <!-- Moving content should be aria-hidden="true" -->
   <div class="scroll-marquee__inner" aria-hidden="true">
     <!-- content -->
   </div>
   ```

### Keyboard Navigation Issues

**Symptoms:**
- Cannot tab to component
- Focus not visible

**Solutions:**

1. **Component is Not Interactive:**
   - This is intentional - marquee is non-interactive
   - Screen readers access via SR-only content
   - No keyboard navigation needed

2. **If Focus Required:**

   Add tabindex manually (not recommended):
   ```html
   <div class="scroll-marquee__widget" tabindex="0">
     <!-- content -->
   </div>
   ```

### Reduced Motion Not Working

**Symptoms:**
- Animation plays despite "Reduce Motion" setting
- User reports motion sickness

**Diagnosis:**

```javascript
// Check if reduced motion is detected
console.log('Prefers reduced motion:', 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

// Check if class is applied
console.log('Has class:', 
  document.querySelector('.scroll-marquee--reduced-motion') ? 'Yes' : 'No'
);
```

**Solutions:**

1. **Verify System Setting:**

   User must enable reduced motion in OS:
   - Windows: Settings > Ease of Access > Display > Show animations = OFF
   - Mac: System Preferences > Accessibility > Display > Reduce motion = ON

2. **Manual Override:**

   ```json
   {
     "_disableAnimation": true  // Force disable animation
   }
   ```

3. **Check CSS:**

   ```css
   @media (prefers-reduced-motion: reduce) {
     .scroll-marquee__inner {
       animation: none !important;
       transform: none !important;
     }
   }
   ```

---

## RTL/Internationalization Issues

### RTL Text Not Displaying Correctly

**Symptoms:**
- Arabic/Hebrew text appears in wrong direction
- Marquee scrolls in wrong direction for RTL

**Diagnosis:**

```javascript
// Check text direction detection
const widget = document.querySelector('.scroll-marquee__widget');
console.log('Dir attribute:', widget.getAttribute('dir'));

const el = document.querySelector('.scroll-marquee');
console.log('Data direction:', el.getAttribute('data-text-direction'));

// Check for RTL characters
const body = 'مرحبا بك'; // Example Arabic text
console.log('Has RTL chars:', /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(body));
```

**Solutions:**

1. **Verify RTL Characters:**

   Component auto-detects RTL from Unicode characters:
   - Arabic: U+0600 to U+06FF
   - Hebrew: U+0590 to U+05FF
   - Farsi: Same as Arabic range

2. **Force RTL Direction:**

   Add explicit dir attribute:
   ```html
   <div dir="rtl">
     Your RTL text here
   </div>
   ```

   Or in JSON (if using HTML in body):
   ```json
   {
     "body": "<span dir='rtl'>مرحبا بك</span>"
   }
   ```

3. **Check Document Direction:**

   ```javascript
   // Ensure document has correct direction
   console.log('Document dir:', document.documentElement.dir);
   // Set to 'rtl' if needed
   document.documentElement.dir = 'rtl';
   ```

4. **CSS Logical Properties:**

   Component uses CSS logical properties for RTL support:
   ```css
   .scroll-marquee__item {
     padding-inline-end: var(--marquee-padding); /* Adapts to RTL */
   }
   ```

### Mixed LTR/RTL Content

**Symptoms:**
- English and Arabic mixed incorrectly
- Bi-directional text issues

**Solutions:**

1. **Use Unicode Control Characters:**

   ```javascript
   // Left-to-Right Embedding
   const LRE = '\u202A';
   const RLE = '\u202B';
   const PDF = '\u202C'; // Pop Directional Formatting
   
   const mixed = `${LRE}English${PDF} ${RLE}العربية${PDF}`;
   ```

2. **Use HTML dir Attribute:**

   ```html
   <span dir="ltr">English</span> <span dir="rtl">العربية</span>
   ```

3. **Separate Components:**
   - Use one marquee for LTR content
   - Use another for RTL content
   - Easier to manage than mixed content

---

## Browser-Specific Issues

### Safari Issues

**Problem:** Animation not smooth on Safari

**Solutions:**

1. **Force GPU Acceleration:**

   ```css
   .scroll-marquee__inner {
     -webkit-transform: translateZ(0);
     transform: translateZ(0);
   }
   ```

2. **Check Safari Version:**
   - Requires Safari 12+
   - Update to latest Safari if possible

3. **Disable Hardware Acceleration (Paradoxically):**
   - Sometimes Safari hardware acceleration causes issues
   - Safari > Preferences > Advanced > Show Develop menu
   - Develop > Experimental Features > Toggle features

### Firefox Issues

**Problem:** Text rendering blurry

**Solutions:**

1. **Disable Subpixel Rendering:**

   ```css
   .scroll-marquee__item {
     -moz-osx-font-smoothing: grayscale;
   }
   ```

2. **Check Firefox Version:**
   - Requires Firefox 55+
   - Update to latest Firefox

### Mobile Browser Issues

**Problem:** Animation choppy on mobile

**Solutions:**

1. **Reduce Speed:**

   ```json
   {
     "_speed": 1  // Use slower speed on mobile
   }
   ```

2. **Optimize for Touch:**

   Component already uses passive event listeners for touch performance

3. **Test on Actual Device:**
   - Desktop emulation doesn't reflect real performance
   - Test on physical phones/tablets

---

## Error Messages

### "GSAP_LOAD_FAILED"

**Message:** "Failed to load animation library"

**Meaning:** GSAP couldn't load from CDN

**Solutions:**

1. **Check Internet Connection:**
   - Ensure internet access
   - Check firewall/proxy settings

2. **Use Local GSAP:**
   - See INSTALLATION.md for local GSAP setup

3. **Whitelist CDN:**
   - Add to firewall whitelist:
     - `cdnjs.cloudflare.com`

### "GSAP_NOT_FOUND"

**Message:** "Animation library not available"

**Meaning:** GSAP/ScrollTrigger not found in window object

**Solutions:**

1. **Wait for Load:**
   - GSAP loads asynchronously
   - Component shows static content until loaded

2. **Check CDN Access:**
   ```javascript
   // Test CDN access
   fetch('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js')
     .then(() => console.log('CDN accessible'))
     .catch(e => console.error('CDN blocked:', e));
   ```

3. **Include GSAP Manually:**
   - Add to index.html (see INSTALLATION.md)

### "ELEMENT_NOT_FOUND"

**Message:** "Marquee element not found"

**Meaning:** DOM structure is incorrect

**Solutions:**

1. **Check HTML Structure:**

   Should have:
   ```html
   <div class="scroll-marquee">
     <div class="scroll-marquee__inner-wrapper">
       <div class="scroll-marquee__widget">
         <div class="scroll-marquee__inner">
           <div class="scroll-marquee__item">Text</div>
         </div>
       </div>
     </div>
   </div>
   ```

2. **Rebuild Component:**
   ```bash
   grunt clean
   grunt build
   ```

3. **Check for CSS Conflicts:**
   - Another stylesheet may be removing elements
   - Inspect with F12 Developer Tools

### "SETUP_FAILED"

**Message:** "Failed to initialize marquee animation"

**Meaning:** Critical error during setup

**Solutions:**

1. **Check Console for Details:**
   - Error details logged to console
   - Look for specific error message

2. **Common Causes:**
   - Invalid content
   - CSS preventing measurement
   - JavaScript errors from other components

3. **Debug Mode:**

   ```javascript
   // Enable verbose logging
   localStorage.setItem('adapt-debug', 'true');
   location.reload();
   ```

---

## Advanced Debugging

### Enable Verbose Logging

```javascript
// In browser console:
localStorage.setItem('adapt-debug', 'true');
location.reload();

// Now check console for detailed ScrollMarquee logs
```

### Inspect Component State

```javascript
// Get component view
const componentId = 'c-05'; // Replace with your component ID
const model = Adapt.findById(componentId);
const view = Adapt.findViewByModelId(componentId);

console.log('Model:', model.toJSON());
console.log('View:', view);
console.log('ScrollTrigger:', view.scrollTrigger);
console.log('Handlers:', {
  scroll: !!view.scrollHandler,
  resize: !!view.resizeHandler
});
```

### Test GSAP Directly

```javascript
// Test GSAP in console
const testEl = document.querySelector('.scroll-marquee__inner');
gsap.to(testEl, {
  x: -100,
  duration: 2,
  onComplete: () => console.log('GSAP works!')
});
```

### Monitor ScrollTrigger Events

```javascript
// Log all ScrollTrigger events
ScrollTrigger.addEventListener('toggle', (instance) => {
  console.log('ScrollTrigger toggled:', instance.trigger, 'isActive:', instance.isActive);
});

ScrollTrigger.addEventListener('refresh', () => {
  console.log('ScrollTrigger refreshed');
});
```

### Performance Profiling

```javascript
// Profile animation performance
console.profile('ScrollMarquee');

// Scroll page up and down

setTimeout(() => {
  console.profileEnd('ScrollMarquee');
  // Check Performance tab in DevTools
}, 5000);
```

### Memory Leak Detection

1. **Open DevTools** (F12)
2. **Go to Memory tab**
3. **Take heap snapshot** ("Take snapshot" button)
4. **Navigate between pages** with marquee component
5. **Take another snapshot**
6. **Compare snapshots** - look for increasing objects

### Check Event Listeners

```javascript
// Check active event listeners
getEventListeners(window).scroll.forEach(listener => {
  console.log('Scroll listener:', listener);
});

getEventListeners(window).resize.forEach(listener => {
  console.log('Resize listener:', listener);
});
```

---

## Still Having Issues?

### Before Reporting a Bug

1. ✅ **Check this troubleshooting guide**
2. ✅ **Check browser console** for errors (F12)
3. ✅ **Test in different browser**
4. ✅ **Test with default configuration**
5. ✅ **Check Adapt Framework version** (v5.53.3+)
6. ✅ **Update component** to latest version

### Reporting a Bug

Include this information:

```
**Environment:**
- Adapt Framework version: [e.g., v5.53.3]
- Authoring Tool version: [e.g., v0.11.5]
- Component version: [e.g., v3.10.0]
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]

**Configuration:**
[Paste your component JSON]

**Console Errors:**
[Paste any red errors from F12 console]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Expected vs Actual behavior]

**Screenshots:**
[Attach screenshots if applicable]
```

### Getting Help

- **GitHub Issues:** Report bugs and request features
- **Adapt Community:** Ask questions in forums
- **Documentation:** Review [README.md](./README.md) and [AUDIT-REPORT.md](./AUDIT-REPORT.md)

---

**Happy troubleshooting!** 🔧

Most issues can be resolved with the solutions in this guide. If you discover a new issue or solution, please contribute to this document!
