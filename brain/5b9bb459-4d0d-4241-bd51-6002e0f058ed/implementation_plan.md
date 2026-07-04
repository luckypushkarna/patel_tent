# Make Preloader Wait for Assets (Images/Video)

To guarantee the website drops no frames and shows no blank spaces when the preloader vanishes, we need to transform the current "fixed timer" preloader into a "smart" preloader.

## Open Questions
None. This will give you the exact "real" preloader experience you're looking for, keeping the site hidden until the heavy assets (like the Hero video) are actually ready by the browser.

## Proposed Changes

### `src/components/Preloader.tsx`
#### [MODIFY] Preloader.tsx
We will update the logic so that:
- The progress bar naturally fills up to **90%**.
- It **pauses** at 90% if the browser is still downloading the hero video and images.
- It listens for the `window.onload` event (which waits for all initial images, stylesheets, and the hero video since it has `preload="auto"`).
- Once the assets are fully downloaded, it shoots up to **100%** and gracefully fades out.

### `src/components/Hero/HeroBackground.tsx`
#### [MODIFY] HeroBackground.tsx
- We will add `fetchPriority="high"` to the Cloudinary video to tell mobile and PC browsers to download this video immediately in the background while the preloader is running, preventing it from being delayed by other network requests.

## Verification Plan
- I will run the dev server and ensure the preloader properly waits and fades smoothly.
- The hero video should play instantly upon the preloader fading without any buffering stutters.
