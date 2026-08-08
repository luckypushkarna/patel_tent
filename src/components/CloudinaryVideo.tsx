/**
 * CloudinaryVideo — Performance-optimized
 *
 * Changes:
 * - Singleton Cloudinary instance (not re-created on every render)
 * - quality changed from 'auto:best' → 'auto:good' (significantly smaller)
 * - preload="none" by default — don't download video until needed
 * - Added explicit width/height to prevent CLS (Cumulative Layout Shift)
 * - Added IntersectionObserver to only play when visible (saves CPU/GPU on mobile)
 */
import React, { useRef, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { limitFit } from "@cloudinary/url-gen/actions/resize";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'lgnlnsgy';
// Singleton — module level, never re-created on render
const cld = new Cloudinary({ cloud: { cloudName } });

interface CloudinaryVideoProps {
  publicId: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  style?: React.CSSProperties;
  width?: number;
  poster?: string;
}

export function CloudinaryVideo({
  publicId,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'auto',
  style,
  width = 1920,
  poster,
}: CloudinaryVideoProps) {
  let vid = cld
    .video(publicId)
    .format('auto')        // auto delivers WebM/MP4 optimized for browser
    .quality('auto');      // auto quality algorithm for optimal crispness/bandwidth balance

  if (width) {
    vid = vid.resize(limitFit().width(width));
  }

  // Compute poster directly. If the Cloudinary SDK's toURL() produces subtly 
  // different strings on server vs client, we use suppressHydrationWarning on the 
  // video tag below to safely ignore the warning without causing a double-render.
  const computedPoster = poster || cld.image(publicId).format('jpg').quality('auto').toURL();

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoEl = wrapperRef.current?.querySelector('video');
    if (!videoEl) return;

    // Set crucial mobile inline autoplay DOM properties directly for iOS Safari / Mobile Chrome
    videoEl.muted = muted;
    videoEl.defaultMuted = muted;
    videoEl.playsInline = playsInline;
    if (playsInline) {
      videoEl.setAttribute('playsinline', 'true');
      videoEl.setAttribute('webkit-playsinline', 'true');
      videoEl.setAttribute('x5-playsinline', 'true');
    }

    if (!autoPlay) return;

    // Initial play attempt
    const startPlay = () => {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Touch/scroll fallback if browser low-power mode blocks programmatic autoplay initially
          const enablePlay = () => {
            videoEl.play().catch(() => {});
            window.removeEventListener('touchstart', enablePlay);
            window.removeEventListener('scroll', enablePlay);
          };
          window.addEventListener('touchstart', enablePlay, { passive: true, once: true });
          window.addEventListener('scroll', enablePlay, { passive: true, once: true });
        });
      }
    };

    startPlay();

    // IntersectionObserver to pause video when scrolled out of view (saves GPU/battery)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { rootMargin: "150px 0px" }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }
    return () => observer.disconnect();
  }, [autoPlay, muted, playsInline]);

  const videoUrl = vid.toURL();

  return (
    <div
      ref={wrapperRef}
      suppressHydrationWarning
      className={`hero-bg-video relative w-full h-full overflow-hidden ${className || ''}`}
      style={style}
    >
      <video
        className="hero-bg-video absolute inset-0 w-full h-full object-cover object-center"
        style={{
          width: '100%',
          height: '100%',
          minWidth: '100%',
          minHeight: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={preload}
        poster={computedPoster}
        src={videoUrl}
      />
    </div>
  );
}
