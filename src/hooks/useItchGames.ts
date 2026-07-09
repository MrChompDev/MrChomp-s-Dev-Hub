import { useState, useEffect, useCallback } from 'react'
import type { Game } from '@/types/game'
import { parseItchRSS } from '@/utils/itchParser'
import { FALLBACK_GAMES } from '@/constants/fallbackGames'

const ITCH_USERNAME = 'nottherealmrchomp'
const FEED_URL = `https://itch.io/user/${ITCH_USERNAME}/feed.xml`

const PROXY_FALLBACKS: ((url: string) => string)[] = [
  (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
]

export function useItchGames() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchGames = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      const fetched = await fetchFromItch()
      setGames(fetched)
    } catch {
      setError(true)
      setGames(FALLBACK_GAMES)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => { fetchGames() }, 600)
    return () => clearTimeout(timer)
  }, [fetchGames])

  return { games, loading, error, retry: fetchGames }
}

async function fetchFromItch(): Promise<Game[]> {
  const proxyUrl = import.meta.env.VITE_ITCH_PROXY_URL as string | undefined

  if (proxyUrl) {
    try {
      const res = await fetch(proxyUrl + '?url=' + encodeURIComponent(FEED_URL))
      const text = await res.text()
      const games = parseItchRSS(text)
      if (games.length > 0) return games
    } catch { /* fall through */ }
  }

  for (const proxy of PROXY_FALLBACKS) {
    try {
      const res = await fetch(proxy(FEED_URL))
      const ct = res.headers.get('content-type') || ''
      let text: string
      if (ct.includes('json') || ct.includes('text/plain')) {
        const json = await res.json()
        text = json.contents || json.data || JSON.stringify(json)
      } else {
        text = await res.text()
      }
      const games = parseItchRSS(text)
      if (games.length > 0) return games
    } catch { /* try next */ }
  }

  throw new Error('All proxy attempts failed')
}
