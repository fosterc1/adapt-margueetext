# adapt-scrollMarquee

**Scrolling Marquee Text** is a _presentation component_ which displays a horizontal scrolling marquee of images that responds to scroll velocity.

The marquee speed is controlled by the user's scroll speed - the faster you scroll, the faster the images move. The component creates an infinite seamless loop using GSAP ScrollTrigger.

[**View the demo**](example/demo.html)

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

### instruction (string):
This optional text appears above the component. It is frequently used to guide the learner's interaction with the component.

### \_setCompletionOn (string):
Determines when Adapt will register this component as having been completed by the learner. Acceptable values are `"inview"` and `"manual"`. The default is `"inview"`.

### \_speed (number):
Controls the speed multiplier for the marquee animation relative to scroll velocity. Higher values result in faster movement. The default is `0.01`. Acceptable range is `0.001` to `0.1`.
- `0.005` - Very slow, subtle movement
- `0.01` - Default, balanced (recommended)
- `0.02` - Fast, dramatic effect
- `0.05` - Very fast movement

### \_items (array):
The items array contains the list of all the images to display in the marquee. Each entry in the array should be an object, containing the following settings:

#### \_graphic (object):
The graphic object defines the image that displays in the marquee and contains the following settings:

##### src (string):
File name (including path) of the image. Path should be relative to the `src` folder (e.g., `"course/en/images/marquee-1.jpg"`).

#### alt (string):
The alternative text for the image. Assign [alt text](https://github.com/adaptlearning/adapt_framework/wiki/Providing-good-alt-text) to images that convey course content only.

#### attribution (string):
Optional text to be displayed as an [attribution](https://wiki.creativecommons.org/Best_practices_for_attribution). By default it is displayed below the image. Text can contain HTML tags.

#### \_classes (string):
CSS class name(s) to be applied to this specific marquee item. Separate multiple classes with a space.

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

## Accessibility

**Scroll Marquee** includes the following accessibility features:
- Alt text support for all images
- Keyboard navigation compatible
- Screen reader friendly
- ARIA labels properly configured

## Limitations

- Requires sufficient page height for scrolling to trigger the effect
- Performance depends on image file sizes - optimize images (< 200KB recommended)
- Best visual effect achieved with 5-10 images
- The component automatically handles item duplication for seamless looping

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome Mobile

## Tips

- **Image Size**: 300-500px wide works best
- **Image Format**: JPG for photos, PNG for graphics with transparency
- **Quantity**: 5-10 images provides optimal balance
- **Speed**: Start with default `0.01` and adjust to taste
- **Layout**: Use `"_layout": "full"` for maximum visual impact
- **File Size**: Optimize images to < 200KB each for smooth performance

---

**Author / maintainer:** fosterc1<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, Safari for macOS/iOS/iPadOS, Opera<br>
**Version:** 2.0.0
