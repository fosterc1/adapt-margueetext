# Installation Guide - Adapt ScrollMarquee Component

Complete installation and setup guide for the adapt-scrollMarquee component in the Adapt Framework and Adapt Authoring Tool.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [Method 1: Adapt Authoring Tool (Recommended)](#method-1-adapt-authoring-tool-recommended)
  - [Method 2: Adapt Framework CLI](#method-2-adapt-framework-cli)
  - [Method 3: Manual Installation](#method-3-manual-installation)
- [Verification](#verification)
- [Configuration](#configuration)
- [First Component](#first-component)
- [Troubleshooting Installation](#troubleshooting-installation)

---

## Prerequisites

### System Requirements

- **Node.js**: v14.x or higher (v16.x recommended)
- **npm**: v6.x or higher
- **Git**: v2.x or higher

### Framework Requirements

- **Adapt Framework**: v5.53.3 or higher
- **Adapt Authoring Tool**: v0.11.5 or higher (if using authoring tool)

### Browser Support

The component works in:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Modern mobile browsers (iOS Safari 12+, Chrome Mobile)

**Note:** Internet Explorer 11 is not supported (CSS Custom Properties requirement).

---

## Installation Methods

### Method 1: Adapt Authoring Tool (Recommended)

This is the easiest method for non-technical users.

#### Step 1: Access Plugin Manager

1. Log into your Adapt Authoring Tool
2. Navigate to **Plugin Manager** in the main menu
3. Click on **Browse Plugins** or **Upload Plugin**

#### Step 2: Install from Repository (if available)

If the component is published to the Adapt Plugin Registry:

```bash
# Search for "adapt-scrollMarquee" in the Plugin Manager
# Click "Install" button
```

#### Step 3: Install from ZIP

If installing from a ZIP file:

1. Download the component ZIP file
2. In Plugin Manager, click **Upload Plugin**
3. Select the ZIP file
4. Click **Upload**
5. Wait for installation to complete

#### Step 4: Verify Installation

1. Go to **Plugin Manager** > **Installed**
2. Look for **adapt-scrollMarquee** in the component list
3. Version should show as **3.10.0** or higher

#### Step 5: Restart Authoring Tool (if required)

Some installations may require a restart:

```bash
# If using PM2
pm2 restart adapt-authoring

# If using command line
# Stop the server (Ctrl+C) and restart with:
node server
```

---

### Method 2: Adapt Framework CLI

For developers working directly with the Adapt Framework.

#### Step 1: Navigate to Course Directory

```bash
cd /path/to/your/adapt-course
```

#### Step 2: Install Component

**From npm (if published):**

```bash
adapt install adapt-scrollMarquee
```

**From GitHub:**

```bash
adapt install https://github.com/yourusername/adapt-scrollMarquee.git
```

**From Local Directory:**

```bash
adapt install /path/to/adapt-scrollMarquee
```

#### Step 3: Verify Installation

```bash
# List installed plugins
adapt ls

# Should show:
# adapt-scrollMarquee@3.10.0 (component)
```

#### Step 4: Build Course

```bash
# Development build
grunt dev

# Production build
grunt build
```

---

### Method 3: Manual Installation

For advanced users or custom setups.

#### Step 1: Download Component

**Option A: Clone from Git**

```bash
cd /path/to/adapt-course/src/components
git clone https://github.com/yourusername/adapt-scrollMarquee.git
```

**Option B: Download ZIP**

1. Download ZIP from GitHub
2. Extract to `src/components/adapt-scrollMarquee`

#### Step 2: Install Dependencies

```bash
cd /path/to/adapt-course/src/components/adapt-scrollMarquee
npm install
```

#### Step 3: Verify File Structure

Ensure you have this structure:

```
adapt-scrollMarquee/
├── bower.json
├── js/
│   ├── scrollMarqueeView.js
│   └── gsapLoader.js
├── less/
│   └── scrollMarquee.less
├── properties.schema
├── example.json
└── README.md
```

#### Step 4: Register Component

The component should auto-register. Verify in:

```bash
# Check bower.json exists in component directory
cat src/components/adapt-scrollMarquee/bower.json
```

#### Step 5: Build Course

```bash
cd /path/to/adapt-course
grunt build
```

---

## Verification

### Verify Installation Success

#### 1. Check Component Registration

**Adapt Framework:**

```bash
# From course root
adapt ls components

# Should include:
# adapt-scrollMarquee
```

**Adapt Authoring Tool:**

1. Create/edit a course
2. Add a component to a block
3. Look for "Scroll Marquee" in component list

#### 2. Check File Presence

```bash
# Navigate to components directory
cd src/components/adapt-scrollMarquee

# Verify files exist
ls -la

# Should show:
# bower.json
# js/
# less/
# properties.schema
```

#### 3. Test Component Build

```bash
# Build course
grunt build

# Check for errors in output
# Look for "adapt-scrollMarquee" in build log
```

#### 4. Browser Test

1. Run local server:
   ```bash
   grunt serve
   ```

2. Open `http://localhost:9001` in browser

3. Navigate to a page with the Scroll Marquee component

4. Verify:
   - Text displays correctly
   - Scrolling triggers animation
   - No JavaScript errors in console

---

## Configuration

### Global Configuration (config.json)

The component doesn't require global configuration, but you can set defaults:

```json
{
  "_scrollMarquee": {
    "_isEnabled": true,
    "_speed": 1,
    "_disableAnimation": false
  }
}
```

### Component Schema Registration

The component automatically registers its schema. No manual configuration needed.

### GSAP Library

The component automatically loads GSAP from CDN. No additional setup required.

**Optional: Use Local GSAP**

If you want to bundle GSAP locally:

1. Install GSAP:
   ```bash
   npm install gsap
   ```

2. Include in your course's `index.html` before Adapt loads:
   ```html
   <script src="libraries/gsap.min.js"></script>
   <script src="libraries/ScrollTrigger.min.js"></script>
   ```

---

## First Component

### Adapt Authoring Tool

1. **Create/Edit Course**
   - Open your course in the editor

2. **Navigate to Content**
   - Go to Menu > Page > Article > Block

3. **Add Component**
   - Click "Add Component"
   - Select "Scroll Marquee" from list

4. **Configure Component**
   - **Body Text**: Enter your marquee text
   - **Scroll Speed**: Set 1-5 (1=slow, 5=fast)
   - **Disable Animation**: Check to disable (accessibility)

5. **Preview**
   - Click "Preview" to see component in action

### Adapt Framework (JSON)

Create a component in your content JSON:

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
  "body": "This text will scroll based on your scroll velocity!",
  "instruction": "",
  "_speed": 2,
  "_disableAnimation": false,
  "_pageLevelProgress": {
    "_isEnabled": true,
    "_isCompletionIndicatorEnabled": false
  }
}
```

Build and test:

```bash
grunt build
grunt serve
```

---

## Troubleshooting Installation

### Component Not Showing in Authoring Tool

**Problem:** Scroll Marquee not in component list

**Solutions:**

1. **Verify Installation:**
   ```bash
   # Check Plugin Manager > Installed
   # Look for adapt-scrollMarquee
   ```

2. **Clear Cache:**
   ```bash
   # Clear browser cache (Ctrl+Shift+Delete)
   # Clear Authoring Tool cache
   rm -rf /path/to/authoring-tool/temp/*
   ```

3. **Restart Server:**
   ```bash
   pm2 restart adapt-authoring
   # or
   node server
   ```

4. **Check Logs:**
   ```bash
   # View authoring tool logs
   tail -f logs/adapt-authoring.log
   ```

### Component Not Building

**Problem:** Build fails with adapt-scrollMarquee errors

**Solutions:**

1. **Check bower.json:**
   ```bash
   cat src/components/adapt-scrollMarquee/bower.json
   # Should exist and be valid JSON
   ```

2. **Reinstall Dependencies:**
   ```bash
   cd src/components/adapt-scrollMarquee
   rm -rf node_modules
   npm install
   ```

3. **Check Grunt Version:**
   ```bash
   grunt --version
   # Should be 1.x or higher
   ```

4. **Clean Build:**
   ```bash
   grunt clean
   grunt build
   ```

### GSAP Not Loading

**Problem:** Animation not working, console shows GSAP errors

**Solutions:**

1. **Check Internet Connection:**
   - Component loads GSAP from CDN
   - Ensure internet access during runtime

2. **Check Console:**
   ```javascript
   // Open browser console (F12)
   // Look for GSAP load errors
   // Check Network tab for CDN requests
   ```

3. **Use Local GSAP:**
   - See "Configuration > GSAP Library" section above

4. **Verify GSAP Version:**
   ```javascript
   // In browser console:
   console.log(window.gsap?.version);
   // Should show 3.12.5 or higher
   ```

### Animation Not Working

**Problem:** Component displays but doesn't animate

**Solutions:**

1. **Check Reduced Motion:**
   - System Settings > Accessibility > Reduce Motion
   - If enabled, animation is intentionally disabled

2. **Check Component Settings:**
   ```json
   {
     "_disableAnimation": false  // Should be false
   }
   ```

3. **Check ScrollTrigger:**
   ```javascript
   // Browser console:
   console.log(window.ScrollTrigger);
   // Should not be undefined
   ```

4. **Check Element Visibility:**
   - Ensure component has content
   - Check CSS doesn't hide element

### Permission Errors

**Problem:** Installation fails with permission errors

**Solutions:**

```bash
# Fix npm permissions (Linux/Mac)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /path/to/adapt-course

# Use npm without sudo
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

---

## Updating the Component

### Adapt Authoring Tool

1. Go to **Plugin Manager** > **Installed**
2. Find **adapt-scrollMarquee**
3. Click **Update** if available
4. Restart server if required

### Adapt Framework

```bash
# Update to latest version
adapt uninstall adapt-scrollMarquee
adapt install adapt-scrollMarquee

# Or update via npm (if published)
npm update adapt-scrollMarquee
```

### Manual Update

```bash
cd src/components/adapt-scrollMarquee
git pull origin main
npm install
cd ../../..
grunt build
```

---

## Uninstalling the Component

### Adapt Authoring Tool

1. Go to **Plugin Manager** > **Installed**
2. Find **adapt-scrollMarquee**
3. Click **Uninstall**
4. Confirm removal

### Adapt Framework

```bash
adapt uninstall adapt-scrollMarquee
```

### Manual Removal

```bash
rm -rf src/components/adapt-scrollMarquee
grunt build
```

---

## Getting Help

### Resources

- **Documentation:** See [README.md](./README.md)
- **Customization:** See [CUSTOMIZATION.md](./CUSTOMIZATION.md)
- **Troubleshooting:** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Best Practices:** See [.adapt-component-best-practices.md](./.adapt-component-best-practices.md)

### Support

- **Issues:** Report bugs on GitHub Issues
- **Community:** Adapt Community Forums
- **Discussions:** GitHub Discussions

---

## Next Steps

After installation:

1. ✅ Read the [README.md](./README.md) for component overview
2. ✅ Review [CUSTOMIZATION.md](./CUSTOMIZATION.md) for styling options
3. ✅ Check [example.json](./example.json) for configuration examples
4. ✅ Create your first Scroll Marquee component!

---

**Installation complete!** 🎉

You're now ready to create engaging scroll-based marquee components in your Adapt courses.
