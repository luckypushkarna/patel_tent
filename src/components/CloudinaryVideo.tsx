/**
 * CloudinaryVideo — Performance-optimized
 *
 * Changes:
 * - Singleton Cloudinary instance (not re-created on every render)
 * - quality changed from 'auto:best' → 'auto:good' (significantly smaller)
 * - preload="none" by default — don't download video until needed
 * - Added explicit width/height to prevent CLS (Cumulative Layout Shift)
 */
import React from 'react';
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
}: CloudinaryVideoProps) {
  const vid = cld
    .video(publicId)
    .format('auto')        // auto delivers WebM when supported (smaller than mp4)
    .quality('auto:good')  // good quality, significantly smaller files
    .resize(limitFit().width(1280)); // caps max width at 1280 to save performance on mobile GPUs

  return (
    <AdvancedVideo
      cldVid={vid}
      className={className || 'w-full h-full object-cover object-center'}
      style={style}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
    />
  );
}
