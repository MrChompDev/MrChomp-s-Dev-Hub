import { SocialIcons } from './SocialIcons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#020813]/80 border-t border-cyan-900/30 py-12 px-6">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-6">
        <div className="text-center">
          <a
            href="#"
            className="font-display text-[10px] text-accent no-underline uppercase tracking-[0.5px] hover:opacity-80 transition-opacity"
          >
            Mr Chomp's Dev Hub
          </a>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Made with love, pixels, and way too much coffee.
          </p>
        </div>

        <div className="flex gap-2">
          <SocialIcons size={18} />
        </div>

          <div className="w-full text-center pt-6 border-t border-cyan-900/30">
          <p className="text-[11px] sm:text-xs text-gray-500">
            &copy; {year} Mr Chomp's Dev Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
