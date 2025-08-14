import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ShowOnAI - AI 검색 최적화 솔루션',
    short_name: 'ShowOnAI',
    description: '국내 시장의 AI 검색 최적화를 위한 단 하나의 솔루션',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2353DF',
    icons: [
      {
        src: '/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}