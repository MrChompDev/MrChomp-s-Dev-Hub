import type { Game } from '@/types/game'

export function parseItchRSS(xmlText: string): Game[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'text/xml')
  const items = doc.querySelectorAll('item')
  const games: Game[] = []

  items.forEach((item) => {
    const title = item.querySelector('title')?.textContent?.trim()
    const link = item.querySelector('link')?.textContent?.trim()
    const descHtml = item.querySelector('description')?.textContent?.trim() || ''
    const pubDate = item.querySelector('pubDate')?.textContent?.trim()

    if (!title || !link) return

    const imgMatch = descHtml.match(/<img[^>]+src=["']([^"']+)["']/)
    const image = imgMatch ? imgMatch[1] : ''

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = descHtml
    const description = tempDiv.textContent?.trim() || title

    const date = pubDate
      ? new Date(pubDate).toISOString().split('T')[0]
      : ''

    games.push({ title, description, url: link, image, date })
  })

  return games
}
