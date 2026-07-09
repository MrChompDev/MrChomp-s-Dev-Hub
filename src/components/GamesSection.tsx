import { useItchGames } from '@/hooks/useItchGames'
import GameCard from './GameCard'

export default function GamesSection() {
  const { games, loading, error, retry } = useItchGames()

  return (
    <section id="games" className="relative bg-[#020813]/60 py-20 px-6">
      <div className="absolute inset-0 ocean-gradient pointer-events-none" />
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">My Projects</h2>
          <p className="section-desc">
            Games I've built &mdash; powered by{' '}
            <a href="https://itch.io" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-gray-100 transition-colors">
              Itch.io
            </a>
          </p>
        </div>

        {error && (
          <div className="text-center mb-8 p-4 rounded-lg bg-cyan-950/20 border border-cyan-900/30 backdrop-blur-sm">
            <p className="text-gray-400 text-sm mb-3">
              Couldn't load games from Itch.io right now. Showing sample projects.
            </p>
            <button onClick={retry} className="btn btn-secondary text-xs py-2 px-4">
              Try Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card border border-cyan-900/20 rounded-xl overflow-hidden animate-pulse">
                  <div className="w-full aspect-video bg-gray-800" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-800 rounded w-3/4" />
                    <div className="h-3 bg-gray-800 rounded w-full" />
                    <div className="h-3 bg-gray-800 rounded w-2/3" />
                    <div className="h-8 bg-gray-800 rounded w-1/2 mt-4" />
                  </div>
                </div>
              ))}
            </>
          ) : games.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-500">
              No games found yet. Check back soon!
            </div>
          ) : (
            games.map((game, i) => <GameCard key={game.title + i} game={game} index={i} />)
          )}
        </div>
      </div>
    </section>
  )
}
