import { motion } from 'framer-motion'
import type { Game } from '@/types/game'

interface GameCardProps {
  game: Game
  index: number
}

export default function GameCard({ game, index }: GameCardProps) {
  const dateFormatted = game.date
    ? new Date(game.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : ''

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="glass-card border border-cyan-900/30 rounded-xl overflow-hidden flex flex-col
        hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(6,182,212,0.08)] hover:border-accent-dim transition-all duration-300"
    >
      {game.image ? (
        <img
          src={game.image}
          alt={game.title}
          loading="lazy"
          className="w-full aspect-video object-cover bg-gray-800"
        />
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-cyan-950/50 to-gray-900 flex items-center justify-center text-3xl text-cyan-700">
          🌊
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-100 mb-2 leading-tight">
          {game.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">
          {game.description}
        </p>
        {dateFormatted && (
          <span className="text-[11px] text-gray-500 mb-3">{dateFormatted}</span>
        )}
        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold
            bg-accent-dim text-accent-light no-underline border border-transparent
            hover:bg-accent hover:text-gray-950 hover:border-accent transition-all duration-250 self-start"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View on Itch.io
        </a>
      </div>
    </motion.article>
  )
}
