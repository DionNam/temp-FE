import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ShowOnAI - AI Search Optimization for Maximum Brand Visibility',
    short_name: 'ShowOnAI',
    description: 'Maximize your brand exposure in generative AI platforms like ChatGPT, Gemini, and Perplexity with advanced GEO strategies.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#2353DF',
    lang: 'en',
    categories: ['business', 'productivity', 'marketing'],
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}