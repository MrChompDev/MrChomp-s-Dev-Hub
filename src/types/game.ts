export interface Game {
  title: string
  description: string
  url: string
  image: string
  date: string
}

export interface ItchRSSItem {
  title: string
  link: string
  description: string
  pubDate: string
}

export interface YouTubeVideo {
  id: string
  title: string
  url: string
  thumbnail: string
  published: string
  description: string
}

export interface GitHubRepo {
  name: string
  description: string
  url: string
  language: string
  updated: string
}

export interface NewsItem {
  id: string
  type: 'video' | 'project' | 'game'
  title: string
  description: string
  url: string
  image: string
  date: string
  source: string
}
