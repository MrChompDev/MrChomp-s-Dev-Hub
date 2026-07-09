# MrChomp's Dev Hub

An immersive ocean-themed developer portfolio built with React, Three.js, and Tailwind CSS — featuring a full underwater 3D scene with fish, kelp, bubbles, light rays, and floating wireframe meshes.

## Features

- **Intro Video** — Fullscreen `GameIntro.mp4` plays on load with skip-to-site option
- **Underwater 3D Background** — Procedural Three.js scene with a school of swimming fish, rising bubbles, swaying kelp stalks, animated light rays, drifting caustics, and ambient deep-sea particles
- **Floating Wireframe Meshes** — Rotating torus knots, icosahedrons, dodecahedrons, and octahedrons in cyan/teal
- **Game Showcase** — Fetch live game data from Itch.io RSS, with fallback cards
- **The Daily Chomp** — Newspaper-style news hub aggregating latest YouTube videos, GitHub repos, and Itch.io game releases with a Discord webhook subscription form
- **About Section** — Bio spanning game dev (Godot, Panda3D), Python/PyGame, web dev, and app dev
- **Animated Ocean Dividers** — Smooth wavy SVG transitions between sections
- **Glass Cards** — Backdrop-blur card effects with cyan glow accents
- **Responsive Design** — Full mobile support with Tailwind's responsive utilities

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| 3D Rendering | Three.js + @react-three/fiber + @react-three/drei |
| Animation | Framer Motion 12 |
| Styling | Tailwind CSS 3 |
| Build | Vite 6 |
| Fonts | Press Start 2P (display) + Inter (body) |
| Icons | Pure SVG inline |

## Getting Started

```bash
npm install
npm run dev        # start dev server (http://localhost:5173)
npm run build      # typecheck + production build
npm run preview    # preview production build
```

## Project Structure

```
src/
├── App.tsx                   # Root: intro video → navbar + main sections + footer
├── main.tsx                  # ReactDOM entry
├── index.css                 # Tailwind + ocean utilities + wavy dividers
├── components/
│   ├── ThreeBackground.tsx   # Full underwater Three.js scene
│   ├── IntroVideo.tsx        # Fullscreen intro video overlay
│   ├── Navbar.tsx            # Sticky top navigation
│   ├── HeroSection.tsx       # Hero with tagline and scroll indicator
│   ├── GamesSection.tsx      # Itch.io game grid
│   ├── GameCard.tsx          # Individual game card
│   ├── NewsSection.tsx       # "The Daily Chomp" newspaper hub
│   ├── AboutSection.tsx      # Bio + tech stack
│   ├── SocialIcons.tsx       # Social link icons
│   └── Footer.tsx            # Site footer
├── hooks/
│   ├── useItchGames.ts       # Itch.io RSS fetcher
│   ├── useYouTubeVideos.ts   # YouTube RSS fetcher
│   └── useGitHubRepos.ts     # GitHub API fetcher
├── types/
│   └── game.ts               # TypeScript interfaces
├── constants/
│   └── fallbackGames.ts      # Offline game data
└── utils/
    ├── cn.ts                 # Classname utility
    └── itchParser.ts         # Itch.io RSS parser
```

## Live Data Sources

| Source | Feed |
|--------|------|
| YouTube | `https://www.youtube.com/feeds/videos.xml?channel_id=UCcOVDcxzr8VzDs6CuE5hz4A` |
| GitHub | `https://api.github.com/users/MrChompDev/repos` |
| Itch.io | `https://nottherealmrchomp.itch.io/` (RSS-scraped) |

## Discord

Join the Chomp Crew: [https://discord.gg/k5NXn4Yw53](https://discord.gg/k5NXn4Yw53)

The Daily Chomp supports Discord webhook subscriptions — paste your webhook URL into the Classifieds section to get updates pushed to your server.

## License

MIT
