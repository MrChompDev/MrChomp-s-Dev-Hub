import { useState, useEffect } from 'react'
import type { GitHubRepo } from '@/types/game'

const GITHUB_API = 'https://api.github.com/users/MrChompDev/repos?sort=updated&per_page=5'

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    name: 'NautilsOS',
    description: 'A web-based OS simulation built with TypeScript.',
    url: 'https://github.com/MrChompDev/NautilsOS',
    language: 'TypeScript',
    updated: '2026-07-01',
  },
  {
    name: 'Focus-Dash-Web',
    description: 'Focus dashboard web app.',
    url: 'https://github.com/MrChompDev/Focus-Dash-Web',
    language: 'TypeScript',
    updated: '2026-06-30',
  },
  {
    name: 'Focus-Dash',
    description: 'Focus dashboard built with Python.',
    url: 'https://github.com/MrChompDev/Focus-Dash',
    language: 'Python',
    updated: '2026-06-30',
  },
  {
    name: 'Dino_Diner',
    description: 'A chaotic prehistoric food truck game built with Python/PyGame.',
    url: 'https://github.com/MrChompDev/Dino_Diner',
    language: 'Python',
    updated: '2026-05-25',
  },
  {
    name: 'Wands-Wagers',
    description: 'Fighting game jam submission on Itch.io.',
    url: 'https://github.com/MrChompDev/Wands-Wagers',
    language: 'Python',
    updated: '2026-04-23',
  },
]

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchRepos() {
      try {
        const res = await fetch(GITHUB_API)
        if (!res.ok) throw new Error('GitHub API failed')
        const data = await res.json()
        if (!cancelled) {
          const mapped: GitHubRepo[] = data.map((repo: any) => ({
            name: repo.name,
            description: repo.description || repo.name,
            url: repo.html_url,
            language: repo.language || 'Unknown',
            updated: repo.updated_at ? repo.updated_at.split('T')[0] : '',
          }))
          setRepos(mapped.length > 0 ? mapped : FALLBACK_REPOS)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError(true)
          setRepos(FALLBACK_REPOS)
          setLoading(false)
        }
      }
    }

    const timer = setTimeout(fetchRepos, 400)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  return { repos, loading, error }
}
