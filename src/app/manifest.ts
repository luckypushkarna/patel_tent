import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Patel Tent & Event Management',
    short_name: 'Patel Tent',
    description: 'Luxury Wedding Decoration & Event Planner in Udaipur',
    start_url: '/',
    display: 'standalone',
    background_color: '#14100C',
    theme_color: '#C9A96A',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
