import { useState, useEffect } from 'react'
import type { YouTubeVideo } from '@/types/game'

const CHANNEL_ID = 'UCcOVDcxzr8VzDs6CuE5hz4A'
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

const PROXY_FALLBACKS: ((url: string) => string)[] = [
  (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
]

const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: 'KNWh3dxEcHA',
    title: 'Fight the Addiction Game Trailer | GameNam Game Jam Submission',
    url: 'https://www.youtube.com/watch?v=KNWh3dxEcHA',
    thumbnail: 'https://i4.ytimg.com/vi/KNWh3dxEcHA/hqdefault.jpg',
    published: '2026-04-09',
    description: 'Game trailer for Fight the Addiction — a GameNam Game Jam submission.',
  },
  {
    id: 'Y6r9PBs-o6U',
    title: 'Speedrunning Game Development (5 Day Game Challenge)',
    url: 'https://www.youtube.com/watch?v=Y6r9PBs-o6U',
    thumbnail: 'https://i2.ytimg.com/vi/Y6r9PBs-o6U/hqdefault.jpg',
    published: '2026-02-07',
    description: 'I made a game in 5 days — play Slicker now!',
  },
  {
    id: 'LpHJmnuIOXw',
    title: 'Speedrunning Game Development (90-Minute Challenge)',
    url: 'https://www.youtube.com/watch?v=LpHJmnuIOXw',
    thumbnail: 'https://i1.ytimg.com/vi/LpHJmnuIOXw/hqdefault.jpg',
    published: '2026-01-24',
    description: 'My friend Cj challenged me to make a game in 90 minutes.',
  },
]

export function useYouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchVideos() {
      try {
        const data = await fetchFromYouTube()
        if (!cancelled) {
          setVideos(data.length > 0 ? data : FALLBACK_VIDEOS)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError(true)
          setVideos(FALLBACK_VIDEOS)
          setLoading(false)
        }
      }
    }

    const timer = setTimeout(fetchVideos, 500)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  return { videos, loading, error, latest: videos[0] || null }
}

async function fetchFromYouTube(): Promise<YouTubeVideo[]> {
  const proxyUrl = import.meta.env.VITE_YT_PROXY_URL as string | undefined

  if (proxyUrl) {
    try {
      const res = await fetch(proxyUrl + '?url=' + encodeURIComponent(RSS_URL))
      const text = await res.text()
      const parsed = parseYouTubeRSS(text)
      if (parsed.length > 0) return parsed
    } catch { /* fall through */ }
  }

  for (const proxy of PROXY_FALLBACKS) {
    try {
      const res = await fetch(proxy(RSS_URL))
      const ct = res.headers.get('content-type') || ''
      let text: string
      if (ct.includes('json') || ct.includes('text/plain')) {
        const json = await res.json()
        text = json.contents || json.data || JSON.stringify(json)
      } else {
        text = await res.text()
      }
      const parsed = parseYouTubeRSS(text)
      if (parsed.length > 0) return parsed
    } catch { /* try next */ }
  }

  throw new Error('All YouTube fetch attempts failed')
}

export function parseYouTubeRSS(xmlText: string): YouTubeVideo[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'text/xml')
  const entries = doc.querySelectorAll('entry')
  const videos: YouTubeVideo[] = []

  entries.forEach((entry) => {
    const title = entry.querySelector('title')?.textContent?.trim()
    const videoId = entry.querySelector('yt\\:videoId')?.textContent?.trim()
    const thumbnail = entry.querySelector('media\\:thumbnail')?.getAttribute('url')
    const published = entry.querySelector('published')?.textContent?.trim()
    const description = entry.querySelector('media\\:description')?.textContent?.trim()

    if (!title || !videoId) return

    videos.push({
      id: videoId,
      title,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: thumbnail || '',
      published: published ? new Date(published).toISOString().split('T')[0] : '',
      description: description || title,
    })
  })

  return videos
}
