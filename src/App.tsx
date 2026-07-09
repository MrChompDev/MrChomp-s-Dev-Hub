import { useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import GamesSection from '@/components/GamesSection'
import NewsSection from '@/components/NewsSection'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import IntroVideo from '@/components/IntroVideo'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [showSite, setShowSite] = useState(false)

  function handleIntroFinish() {
    setShowIntro(false)
    setShowSite(true)
  }

  return (
    <>
      {showIntro && <IntroVideo onFinish={handleIntroFinish} />}
      {showSite && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <GamesSection />
            <NewsSection />
            <AboutSection />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
