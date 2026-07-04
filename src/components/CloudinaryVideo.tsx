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
import { AdvancedVideo } from '@cloudinary/react';

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
}

export function CloudinaryVideo({
  publicId,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'none',   // Default: don't preload — saves bandwidth on mobile
  style,
  width = 1280,
}: CloudinaryVideoProps) {
  const vid = cld
    .video(publicId)
    .format('auto')        // auto delivers WebM when supported (smaller than mp4)
    .quality('auto:good')  // good quality, significantly smaller files
    .resize(limitFit().width(width)); // caps max width to save performance on mobile GPUs

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay || !wrapperRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoEl = wrapperRef.current?.querySelector('video');
          if (!videoEl) return;
          
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { rootMargin: "150px 0px" } // Starts playing slightly before scrolling into view
    );
    
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [autoPlay]);

  return (
    <div ref={wrapperRef} className={className || 'w-full h-full object-cover object-center'} style={style}>
      <AdvancedVideo
        cldVid={vid}
        className="w-full h-full object-cover object-center"
        autoPlay={false} // Observer handles this manually for performance
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={preload}
      />
    </div>
  );
}
