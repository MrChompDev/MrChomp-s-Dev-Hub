import { useMemo, useState, useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos'
import { useGitHubRepos } from '@/hooks/useGitHubRepos'
import { useItchGames } from '@/hooks/useItchGames'
import type { NewsItem } from '@/types/game'

const YT_CHANNEL_URL = 'https://www.youtube.com/@Mr.ChompDEV'
const NEWSPAPER_HEADLINES = [
  'CHOMP DEV SHIPS BANGER AFTER BANGER',
  'UNDERWATER CODING REACHES NEW DEPTHS',
  'LOCAL DEV REFUSES TO TOUCH GRASS AGAIN',
  'PYTHON ENJOYER DROPS ANOTHER GAME',
  'WEB DEV GOES HORIZONTAL, REFUSES TO QUIT',
  'GODOT ENGINE CAN\'T CONTAIN THIS POWER',
  'BREAKING: CODE COMPILES ON FIRST TRY',
  'DEV COFFEE INTAKE HITS CRITICAL MASS',
  'PIXEL ARTIST RAGES, SHIPS ANYWAY',
  'CHOMP EMPIRE EXPANDS BEYOND EXPECTATIONS',
]
const WEATHER_CONDITIONS = [
  { icon: '🌧️', condition: 'Rain', detail: 'Cloudy with a chance of bugs' },
  { icon: '🌊', condition: 'Tsunami', detail: 'Feature flood incoming' },
  { icon: '☀️', condition: 'Clear', detail: 'Zero merge conflicts spotted' },
  { icon: '🌪️', condition: 'Tornado', detail: 'Spaghetti code vortex forming' },
  { icon: '⛈️', condition: 'Storm', detail: 'Crunch mode thunderstorm' },
  { icon: '🌫️', condition: 'Fog', detail: 'Requirements unclear as usual' },
  { icon: '🔥', condition: 'Heat Wave', detail: 'Shipping at record speeds' },
]

function useTypewriter(text: string, speed = 50) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return { displayed, done }
}

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const increment = Math.ceil(target / (duration / 16))
    const interval = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(interval)
  }, [inView, target, duration])

  return { count, ref }
}

function RotatingHeadline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % NEWSPAPER_HEADLINES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -10, rotateX: 10 }}
      transition={{ duration: 0.4 }}
      className="text-[10px] md:text-xs text-accent/80 font-display text-center tracking-[0.2em]"
    >
      &ldquo;{NEWSPAPER_HEADLINES[index]}&rdquo;
    </motion.div>
  )
}

function Masthead() {
  const today = useMemo(() => {
    const d = new Date()
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10"
    >
      <div className="border-t-2 border-b-2 border-cyan-900/20 py-5 relative">
        <div className="absolute -top-[5px] left-0 right-0 flex justify-center gap-2">
          {['⬡', '⬢', '⬡'].map((s, i) => (
            <span key={i} className="text-[6px] text-accent/30">{s}</span>
          ))}
        </div>

        <span className="text-[8px] text-accent/40 uppercase tracking-[0.4em] font-body block mb-2">
          Est. 2024 &middot; The Internet&rsquo;s Finest Dev Rag
        </span>

        <h2 className="font-display text-xl md:text-3xl text-accent tracking-[0.15em] mb-2">
          THE DAILY CHOMP
        </h2>

        <div className="flex items-center justify-center gap-3 text-[9px] text-accent/50 font-body uppercase tracking-[0.2em]">
          <span>{today}</span>
          <span className="w-1 h-1 rounded-full bg-accent/20" />
          <span>Vol. MMXXIV</span>
          <span className="w-1 h-1 rounded-full bg-accent/20" />
          <span>Issue #{Math.floor(Math.random() * 999) + 1}</span>
          <span className="w-1 h-1 rounded-full bg-accent/20" />
          <span>Price: 1 Chomp Coin &bull; FREE</span>
        </div>

        <div className="absolute -bottom-[5px] left-0 right-0 flex justify-center gap-2">
          {['⬢', '⬡', '⬢'].map((s, i) => (
            <span key={i} className="text-[6px] text-accent/30">{s}</span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <RotatingHeadline />
      </div>
    </motion.div>
  )
}

function StatBar() {
  const stats = [
    { label: 'Videos Unleashed', value: 12, suffix: '' },
    { label: 'Projects Shipped', value: 8, suffix: '' },
    { label: 'Games Published', value: 6, suffix: '' },
    { label: 'Coffees Consumed', value: 999, suffix: '+' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cyan-900/10 rounded-xl overflow-hidden mb-8 border border-cyan-900/20"
    >
      {stats.map((s) => {
        const { count, ref } = useCounter(s.value)
        return (
          <div
            key={s.label}
            className="bg-surface/30 backdrop-blur-sm p-4 text-center"
          >
            <span
              ref={ref}
              className="block font-display text-xl md:text-2xl text-accent-light mb-1"
            >
              {count}{s.suffix}
            </span>
            <span className="text-[9px] text-gray-500 uppercase tracking-[0.15em] font-body">
              {s.label}
            </span>
          </div>
        )
      })}
    </motion.div>
  )
}

function DevWeather() {
  const weather = useMemo(
    () => WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)],
    []
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="border border-cyan-900/20 rounded-xl p-4 bg-surface/20 backdrop-blur-sm mb-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{weather.icon}</span>
          <div>
            <span className="text-xs font-display text-accent/80">{weather.condition}</span>
            <p className="text-[10px] text-gray-500 mt-0.5">{weather.detail}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 font-body uppercase tracking-wider">Dev Weather</span>
          <p className="text-[9px] text-gray-600 mt-0.5">Forecast by Chomp Labs</p>
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedHeadline({ video }: { video: NonNullable<ReturnType<typeof useYouTubeVideos>['latest']> }) {
  const { displayed, done } = useTypewriter(video.title, 30)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className="md:col-span-3">
          <span className="text-[9px] text-red-400/80 font-display uppercase tracking-[0.2em]">
            &#9679; BREAKING NEWS
          </span>
          <h3 className="font-display text-sm md:text-base text-gray-100 mt-2 leading-relaxed min-h-[3em]">
            {displayed}
            {!done && <span className="text-accent animate-pulse">|</span>}
          </h3>
          <p className="news-article-text mt-3 line-clamp-4">
            {video.description}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg
                text-[10px] font-display text-accent tracking-wider hover:bg-accent/20 hover:border-accent/40
                transition-all duration-200 group"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              WATCH FULL STORY
            </a>
            <span className="text-[9px] text-gray-600">
              Published {video.published}
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="relative aspect-video md:aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 border border-cyan-900/20 group">
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center
                group-hover:scale-110 group-hover:bg-accent transition-all duration-200 shadow-lg shadow-accent/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-950 ml-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ArticleCard({ item, index }: { item: NewsItem; index: number }) {
  const icon = item.type === 'video' ? '🎬' : item.type === 'project' ? '📦' : '🎮'
  const tag = item.type === 'video' ? 'Watch' : item.type === 'project' ? 'Explore' : 'Play'

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group block"
    >
      <article className="border-b border-cyan-900/10 py-3.5 last:border-0">
        <div className="flex items-start gap-3">
          <span className="text-xs mt-0.5 flex-shrink-0">{icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-[8px] font-display uppercase tracking-[0.2em] ${
                item.type === 'video' ? 'text-red-400/60' :
                item.type === 'project' ? 'text-accent/60' :
                'text-emerald-400/60'
              }`}>
                {item.source}
              </span>
              <span className="text-[8px] text-gray-600">{item.date}</span>
            </div>
            <h4 className="text-xs font-display text-gray-200 group-hover:text-accent-light transition-colors leading-snug">
              {item.title}
            </h4>
            {item.description && (
              <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
            <span className="inline-block mt-1.5 text-[8px] text-accent/50 uppercase tracking-[0.15em] group-hover:text-accent transition-colors">
              {tag} story &rarr;
            </span>
          </div>
        </div>
      </article>
    </motion.a>
  )
}

function MoreVideos({ videos }: { videos: ReturnType<typeof useYouTubeVideos>['videos'] }) {
  const rest = videos.slice(0, 4)
  if (rest.length === 0) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-3 bg-red-500/60 rounded-full" />
        <h4 className="text-[9px] font-display text-gray-400 uppercase tracking-[0.2em]">Latest Videos</h4>
      </div>
      <div className="space-y-2">
        {rest.map((v) => (
          <a
            key={v.id}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-950/10 transition-colors group"
          >
            <div className="w-16 h-9 rounded flex-shrink-0 bg-gray-800 overflow-hidden relative">
              <img src={v.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-300 truncate group-hover:text-accent-light transition-colors">
                {v.title}
              </p>
              <span className="text-[8px] text-gray-600">{v.published}</span>
            </div>
          </a>
        ))}
      </div>
      <a
        href={YT_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2.5 text-[8px] text-accent/50 uppercase tracking-[0.15em] hover:text-accent transition-colors"
      >
        View channel &rarr;
      </a>
    </div>
  )
}

function GitHubProjects({ repos }: { repos: ReturnType<typeof useGitHubRepos>['repos'] }) {
  if (repos.length === 0) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-3 bg-accent/60 rounded-full" />
        <h4 className="text-[9px] font-display text-gray-400 uppercase tracking-[0.2em]">Open Source</h4>
      </div>
      <div className="space-y-2">
        {repos.slice(0, 4).map((r) => (
          <a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-950/10 transition-colors group"
          >
            <div className="w-7 h-7 rounded bg-gray-800 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-300 truncate group-hover:text-accent-light transition-colors font-medium">
                {r.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-gray-600">{r.language}</span>
                {r.updated && (
                  <>
                    <span className="text-[8px] text-gray-600">&middot;</span>
                    <span className="text-[8px] text-gray-600">{r.updated}</span>
                  </>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
      <a
        href="https://github.com/MrChompDev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2.5 text-[8px] text-accent/50 uppercase tracking-[0.15em] hover:text-accent transition-colors"
      >
        View repos &rarr;
      </a>
    </div>
  )
}

function ItchGames({ games }: { games: ReturnType<typeof useItchGames>['games'] }) {
  if (games.length === 0) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-3 bg-emerald-500/60 rounded-full" />
        <h4 className="text-[9px] font-display text-gray-400 uppercase tracking-[0.2em]">Game Releases</h4>
      </div>
      <div className="space-y-2">
        {games.slice(0, 4).map((g, i) => (
          <a
            key={g.title + i}
            href={g.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-950/10 transition-colors group"
          >
            {g.image ? (
              <div className="w-16 h-9 rounded flex-shrink-0 bg-gray-800 overflow-hidden">
                <img src={g.image} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ) : (
              <div className="w-16 h-9 rounded flex-shrink-0 bg-gray-800 flex items-center justify-center text-xs text-gray-600">
                🎮
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-300 truncate group-hover:text-accent-light transition-colors font-medium">
                {g.title}
              </p>
              <span className="text-[8px] text-gray-600">{g.date}</span>
            </div>
          </a>
        ))}
      </div>
      <a
        href="https://nottherealmrchomp.itch.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2.5 text-[8px] text-accent/50 uppercase tracking-[0.15em] hover:text-accent transition-colors"
      >
        Browse games &rarr;
      </a>
    </div>
  )
}

function Classifieds() {
  const [webhook, setWebhook] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!webhook.startsWith('https://discord.com/api/webhooks/')) return
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '',
          embeds: [{
            title: '📬 New Subscriber!',
            description: 'Someone subscribed to The Daily Chomp via webhook!',
            color: 0x06b6d4,
          }],
        }),
      })
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    } catch { /* silent */ }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t-2 border-b-2 border-cyan-900/15 py-5 mt-6"
    >
      <div className="text-center mb-4">
        <span className="text-[8px] text-accent/40 uppercase tracking-[0.3em] font-body">
          &sect; Classifieds &sect;
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-cyan-900/10 rounded-lg p-4 bg-surface/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">📬</span>
            <span className="text-[9px] font-display text-accent/70 uppercase tracking-[0.15em]">
              Webhook Delivery
            </span>
          </div>
          <p className="text-[10px] text-gray-500 mb-3">
            Get The Daily Chomp delivered straight to your Discord.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="url"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
              placeholder="Paste webhook URL..."
              className="flex-1 px-2.5 py-1.5 text-[10px] bg-[#020813] border border-cyan-900/20 rounded-lg
                text-gray-300 placeholder-gray-600 outline-none focus:border-accent/40 transition-colors"
            />
            <button
              type="submit"
              disabled={!webhook.startsWith('https://discord.com/api/webhooks/')}
              className="px-3 py-1.5 text-[9px] font-display uppercase tracking-wider bg-accent/10 border border-accent/20
                text-accent rounded-lg hover:bg-accent/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {sent ? '✓ Sent' : 'Subscribe'}
            </button>
          </form>
        </div>

        <div className="border border-cyan-900/10 rounded-lg p-4 bg-surface/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🎮</span>
            <span className="text-[9px] font-display text-accent/70 uppercase tracking-[0.15em]">
              Join the Crew
            </span>
          </div>
          <p className="text-[10px] text-gray-500 mb-3">
            Hang out with fellow Chompers in the official Discord.
          </p>
          <a
            href="https://discord.gg/k5NXn4Yw53"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1.5 text-[9px] font-display uppercase tracking-wider
              bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg
              hover:bg-indigo-500/20 transition-colors"
          >
            Join Server &rarr;
          </a>
        </div>

        <div className="border border-cyan-900/10 rounded-lg p-4 bg-surface/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">📡</span>
            <span className="text-[9px] font-display text-accent/70 uppercase tracking-[0.15em]">
              Stay Connected
            </span>
          </div>
          <p className="text-[10px] text-gray-500 mb-2">
            Follow the journey across the web.
          </p>
          <div className="flex gap-2">
            {[
              { href: 'https://www.youtube.com/@Mr.ChompDEV', label: 'YT' },
              { href: 'https://github.com/MrChompDev', label: 'GH' },
              { href: 'https://nottherealmrchomp.itch.io/', label: 'Itch' },
              { href: 'https://www.instagram.com/mr.chompdev/', label: 'IG' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 text-[8px] font-display uppercase tracking-wider
                  bg-cyan-950/20 border border-cyan-900/20 text-accent/60 rounded
                  hover:bg-cyan-950/40 hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function NewspaperFooter() {
  return (
    <div className="mt-10 text-center">
      <div className="border-t-2 border-cyan-900/10 pt-5">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[8px] text-gray-600 uppercase tracking-[0.15em] font-body">
          <span>&copy; 2024 The Daily Chomp</span>
          <span className="w-px h-3 bg-cyan-900/20" />
          <span>Printed with ocean ink</span>
          <span className="w-px h-3 bg-cyan-900/20" />
          <span>All rights reserved &middot; Chomp Media LLC</span>
          <span className="w-px h-3 bg-cyan-900/20" />
          <span>Not affiliated with any fish</span>
        </div>
        <p className="text-[7px] text-gray-700 mt-2 tracking-[0.1em]">
          THE DAILY CHOMP IS A SATIRICAL DEVELOPMENT PUBLICATION. ALL HEADLINES ARE 100% REAL IN MY HEART.
        </p>
      </div>
    </div>
  )
}

export default function NewsSection() {
  const { videos, loading: ytLoading } = useYouTubeVideos()
  const { repos, loading: ghLoading } = useGitHubRepos()
  const { games, loading: itchLoading } = useItchGames()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  })
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  const progressOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1])

  const newsItems = useMemo(() => {
    const items: NewsItem[] = []

    videos.slice(0, 3).forEach((v) => {
      items.push({
        id: 'yt-' + v.id,
        type: 'video',
        title: v.title,
        description: v.description,
        url: v.url,
        image: v.thumbnail,
        date: v.published,
        source: 'YouTube',
      })
    })

    repos.slice(0, 3).forEach((r) => {
      items.push({
        id: 'gh-' + r.name,
        type: 'project',
        title: r.name,
        description: r.description,
        url: r.url,
        image: '',
        date: r.updated,
        source: 'GitHub',
      })
    })

    games.slice(0, 3).forEach((g, i) => {
      items.push({
        id: 'itch-' + g.title + i,
        type: 'game',
        title: g.title,
        description: g.description,
        url: g.url,
        image: g.image,
        date: g.date,
        source: 'Itch.io',
      })
    })

    items.sort((a, b) => b.date.localeCompare(a.date))
    return items
  }, [videos, repos, games])

  const loading = ytLoading || ghLoading || itchLoading

  return (
    <section id="news" className="relative bg-[#020813] py-20 px-6 overflow-hidden">
      <div className="ocean-divider absolute top-0 left-0 right-0" />

      <motion.div
        ref={sectionRef}
        style={{ scale: progressScale, opacity: progressOpacity }}
        className="max-w-[1100px] mx-auto relative z-10"
      >
        <Masthead />

        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              <div className="md:col-span-3 space-y-3">
                <div className="h-3 bg-gray-800 rounded w-1/4 animate-pulse" />
                <div className="h-5 bg-gray-800 rounded w-full animate-pulse" />
                <div className="h-5 bg-gray-800 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-800 rounded w-full animate-pulse" />
                <div className="h-3 bg-gray-800 rounded w-2/3 animate-pulse" />
              </div>
              <div className="md:col-span-2">
                <div className="aspect-[4/3] bg-gray-800 rounded-xl animate-pulse" />
              </div>
            </div>
            <div className="h-20 bg-gray-800/50 rounded-xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-800/30 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {videos[0] && <FeaturedHeadline video={videos[0]} />}

            <StatBar />

            <DevWeather />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-4 bg-accent/60 rounded-full" />
                  <h3 className="text-[9px] font-display text-gray-400 uppercase tracking-[0.2em]">
                    Today&rsquo;s Stories
                  </h3>
                  <span className="text-[9px] text-gray-600">
                    &middot; {newsItems.length} articles
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-surface/20 backdrop-blur-sm border border-cyan-900/10 rounded-xl p-4"
                >
                  {newsItems.length > 0 ? (
                    <div className="divide-y divide-cyan-900/10">
                      {newsItems.slice(0, 8).map((item, i) => (
                        <ArticleCard key={item.id} item={item} index={i} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-500 text-center py-4">
                      No stories yet. Check back when Chomp ships something.
                    </p>
                  )}
                </motion.div>

                <Classifieds />
              </div>

              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-surface/20 backdrop-blur-sm border border-cyan-900/10 rounded-xl p-4"
                >
                  <MoreVideos videos={videos.slice(1)} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-surface/20 backdrop-blur-sm border border-cyan-900/10 rounded-xl p-4"
                >
                  <GitHubProjects repos={repos} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-surface/20 backdrop-blur-sm border border-cyan-900/10 rounded-xl p-4"
                >
                  <ItchGames games={games} />
                </motion.div>

                {videos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="bg-accent/5 border border-accent/10 rounded-xl p-4 text-center"
                  >
                    <span className="text-lg block mb-1">🐟</span>
                    <p className="text-[9px] text-accent/60 font-display tracking-wider">
                      This newspaper was printed using 100% recycled pixels.
                    </p>
                    <p className="text-[8px] text-gray-600 mt-1">
                      Please recycle after reading.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            <NewspaperFooter />
          </>
        )}
      </motion.div>
    </section>
  )
}
