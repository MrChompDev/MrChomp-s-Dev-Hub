import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IntroVideoProps {
  onFinish: () => void
}

export default function IntroVideo({ onFinish }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [show, setShow] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setFading(true)
      setTimeout(() => {
        setShow(false)
        onFinish()
      }, 800)
    }

    const handlePlay = () => {
      video.muted = false
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)

    video.play().catch(() => {
      setFading(true)
      setTimeout(() => {
        setShow(false)
        onFinish()
      }, 800)
    })

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
    }
  }, [onFinish])

  function handleSkip() {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = video.duration
    }
    setFading(true)
    setTimeout(() => {
      setShow(false)
      onFinish()
    }, 800)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            preload="auto"
          >
            <source src="/GameIntro.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/10" />

          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 px-5 py-2.5 rounded-full text-xs font-medium
              text-white/60 bg-white/5 border border-white/10 backdrop-blur-sm
              hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            Skip Intro
          </button>

          <div className="absolute bottom-8 left-8 flex items-center gap-2 text-white/30 text-[10px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Game Intro
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
