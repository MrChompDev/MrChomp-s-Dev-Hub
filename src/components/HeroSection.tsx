import { motion } from 'framer-motion'
import ThreeBackground from './ThreeBackground'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28">
      <div className="absolute inset-0 ocean-gradient pointer-events-none" />
      <div className="absolute inset-0 ocean-gradient-deep pointer-events-none" />
      <ThreeBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center max-w-[700px] relative z-10"
      >
        <span className="block text-base sm:text-lg text-gray-500 font-medium mb-2">
          Hi, I'm
        </span>
        <h1
          className="font-display text-[clamp(32px,7vw,56px)] leading-tight text-accent mb-5"
          style={{ textShadow: '0 0 60px rgba(6,182,212,0.25)' }}
        >
          Mr Chomp
        </h1>
        <p className="text-base sm:text-lg text-gray-400 mb-3">
          Game Dev &bull; Web Dev &bull; App Dev &bull; Python Enjoyer
        </p>
        <p className="text-sm sm:text-base text-gray-500 max-w-[480px] mx-auto mb-9">
          I build games, apps, websites, and tools. Welcome to my dev hub.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="#games" className="btn btn-primary">
            See My Work
          </a>
          <a href="#about" className="btn btn-secondary">
            About Me
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-14 flex flex-col items-center gap-2 text-cyan-400/50 text-[11px]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce-down">
          <path d="M12 2v16M8 14l4 4 4-4" />
        </svg>
      </motion.div>
    </section>
  )
}
