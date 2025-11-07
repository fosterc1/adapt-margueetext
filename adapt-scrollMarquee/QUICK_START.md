# 🚀 Quick Start Guide - Adapt Scroll Marquee

Get up and running with the Scroll Marquee component in 5 minutes!

## Step 1: Copy Component (30 seconds)

Copy the entire `adapt-scrollMarquee` folder to your Adapt course:

```bash
# For Adapt Framework
cp -r adapt-scrollMarquee /path/to/your/course/src/components/

# For Adapt Authoring Tool
# Upload via the Plugin Manager interface
```

## Step 2: Add GSAP (1 minute)

The component needs GSAP. Choose the easiest method:

### ✨ Automatic (Recommended)
The component will automatically load GSAP from CDN. **No setup required!**

### 🔧 Manual (Optional)
Add to `src/core/index.html` before `</body>`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

## Step 3: Add to Your Course (2 minutes)

### Option A: Adapt Authoring Tool

1. Open your course editor
2. Navigate to the page where you want the marquee
3. Click "Add Component"
4. Select "Scroll Marquee"
5. Upload 5-10 images
6. Set speed to `0.01` (default)
7. Publish!

### Option B: Adapt Framework

Add to your `components.json`:

```json
{
  "_id": "c-105",
  "_parentId": "b-55",
  "_type": "component",
  "_component": "scrollMarquee",
  "_layout": "full",
  "title": "My Scroll Marquee",
  "displayTitle": "My Scroll Marquee",
  "body": "Scroll to see the effect!",
  "_speed": 0.01,
  "_items": [
    {
      "_graphic": { "src": "course/en/images/img1.jpg" },
      "alt": "Image 1"
    },
    {
      "_graphic": { "src": "course/en/images/img2.jpg" },
      "alt": "Image 2"
    },
    {
      "_graphic": { "src": "course/en/images/img3.jpg" },
      "alt": "Image 3"
    }
  ]
}
```

## Step 4: Build & Test (1 minute)

```bash
# Build your course
grunt build
# or
npm run build

# Test in browser
grunt dev
# or
npm run dev
```

Visit your course and scroll to see the marquee in action!

## Step 5: Customize (Optional)

### Adjust Speed

```json
"_speed": 0.005  // Very slow
"_speed": 0.01   // Default (recommended)
"_speed": 0.02   // Fast
"_speed": 0.05   // Very fast
```

### Style It

Create `custom.less` in your theme:

```less
.scroll-marquee__item-image img {
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
```

## 🎉 That's It!

You now have a working scroll marquee! 

## 📚 Learn More

- [README.md](README.md) - Full documentation
- [INSTALLATION.md](INSTALLATION.md) - Detailed installation guide
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Technical details
- [example/demo.html](example/demo.html) - Standalone demo

## ❓ Troubleshooting

**Not animating?**
- Check browser console for errors
- Verify GSAP loaded: `console.log(window.gsap)`
- Ensure page has enough height to scroll

**Images not showing?**
- Check image paths in configuration
- Verify images exist in assets folder
- Check file permissions

**Performance issues?**
- Reduce image file sizes (< 200KB each)
- Lower the `_speed` value
- Use fewer items (5-7 optimal)

## 💡 Tips

1. **Image Size**: 300px wide works best
2. **Image Format**: JPG for photos, PNG for graphics
3. **Quantity**: 5-10 images is optimal
4. **Speed**: Start with 0.01 and adjust from there
5. **Layout**: Use `"_layout": "full"` for best effect

---

**Need Help?** Check the full [README.md](README.md) or [INSTALLATION.md](INSTALLATION.md)
