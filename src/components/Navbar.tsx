import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { SocialIcons } from './SocialIcons'

export default function Navbar() {
  const scrolled = useScrollPosition()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#games', label: 'Projects' },
    { href: '#news', label: 'News' },
    { href: '#about', label: 'About' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'h-14 bg-[#020813]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(6,182,212,0.06)]'
          : 'h-16 bg-[#020813]/80 backdrop-blur-md'
      }`}
      style={{ borderBottom: '1px solid rgba(6,182,212,0.08)' }}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-full flex items-center gap-8">
        <a
          href="#"
          className="font-display text-[11px] text-accent no-underline uppercase tracking-[0.5px] whitespace-nowrap hover:opacity-80 transition-opacity"
        >
          Mr Chomp's Dev Hub
        </a>

        <div className="hidden md:flex items-center gap-6 ml-auto">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-gray-100 no-underline text-sm font-medium relative py-1 transition-colors
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-1">
          <SocialIcons size={18} />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px] bg-none border-none cursor-pointer p-1 ml-auto"
          aria-label="Toggle navigation menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-[22px] h-[2px] bg-gray-100 rounded"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-[22px] h-[2px] bg-gray-100 rounded"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-[22px] h-[2px] bg-gray-100 rounded"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#020813]/98 backdrop-blur-md border-b border-gray-800"
          >
            <div className="flex flex-col items-center gap-5 py-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-accent no-underline text-base font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-4 mt-2">
                <SocialIcons size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
