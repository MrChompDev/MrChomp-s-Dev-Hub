import { motion } from 'framer-motion'

const stack = ['Godot', 'Python', 'PyGame', 'Panda3D', 'Web Dev', 'App Dev']

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-[#020813] py-20 px-6">
      <div className="ocean-divider absolute top-0 left-0 right-0" />
      <div className="ocean-divider ocean-divider--flip absolute bottom-0 left-0 right-0" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Mr Chomp</h2>
          <div className="max-w-[600px] space-y-4">
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              I'm MrChomp — an indie developer from Australia who codes in{' '}
              <strong className="text-gray-200">Godot</strong>,{' '}
              <strong className="text-gray-200">Python</strong>, and{' '}
              <strong className="text-gray-200">PyGame</strong>. I build games,
              websites, apps, and tools — from jam games like{' '}
              <a href="https://nottherealmrchomp.itch.io/surfers-paradise" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-gray-100 transition-colors">Surfers Paradise</a>{' '}
              to interactive Twitch tools like{' '}
              <a href="https://github.com/MrChompDev/ChompBot" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-gray-100 transition-colors">ChompBot</a>.
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              I'm not just a game developer — I'm also a <strong className="text-gray-200">web developer</strong> and{' '}
              <strong className="text-gray-200">app developer</strong>, working across multiple platforms and
              languages to ship real projects. Check out my work on{' '}
              <a href="https://github.com/MrChompDev" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-gray-100 transition-colors">GitHub</a>{' '}
              or{' '}
              <a href="https://nottherealmrchomp.itch.io/" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-gray-100 transition-colors">Itch.io</a>{' '}
              and follow along on{' '}
              <a href="https://www.youtube.com/@Mr.ChompDEV" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-gray-100 transition-colors">YouTube</a>.
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              When I'm not shipping builds, you'll find me experimenting with new
              tech, contributing to open source, or hanging out on{' '}
              <a
                href="https://discord.gg/k5NXn4Yw53"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-light hover:text-gray-100 transition-colors"
              >
                Discord
              </a>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {stack.map((tag) => (
              <span key={tag} className="stack-tag">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
