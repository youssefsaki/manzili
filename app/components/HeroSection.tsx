"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState, useCallback } from "react"
import SteamAnimation from "./SteamAnimation"

interface HeroSectionProps {
  videoLoaded?: boolean
}

export default function HeroSection({ videoLoaded = true }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [currentVideoSource, setCurrentVideoSource] = useState<string>("")
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  // Handle video source switching based on screen size
  const handleVideoSourceChange = useCallback(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768
      const source = isMobile 
        ? "/hero-coffee-video-mobile.mp4" 
        : "/hero-coffee-video-desktop.mp4"
      setCurrentVideoSource(source)
    }
  }, [])

  // Video ready handler
  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true)
  }, [])

  // Video error handler
  const handleVideoError = useCallback(() => {
    console.warn("Video failed to load, falling back to image")
    setIsVideoReady(false)
  }, [])

  useEffect(() => {
    setIsClient(true)
    handleVideoSourceChange()

    // Add resize listener for responsive video switching
    const handleResize = () => {
      handleVideoSourceChange()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleVideoSourceChange])

  return (
    <section 
      id="home" 
      ref={ref} 
      className="relative h-screen overflow-hidden bg-coffee-darkest"
      style={{ position: 'relative' }}
      aria-label="Hero section"
    >
      {/* Video Background with Parallax */}
      <motion.div 
        style={isClient ? { y, scale } : {}} 
        className="absolute inset-0 w-full h-full"
      >
        {videoLoaded && currentVideoSource ? (
          <video
            key={currentVideoSource}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleVideoReady}
            onError={handleVideoError}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
            aria-hidden="true"
          >
            <source 
              src="/hero-coffee-video-desktop.mp4" 
              type="video/mp4" 
              media="(min-width: 768px)"
            />
            <source 
              src="/hero-coffee-video-mobile.mp4" 
              type="video/mp4" 
              media="(max-width: 767px)"
            />
            <source src="/hero-coffee-video.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg')",
            }}
            aria-hidden="true"
          />
        )}

        {/* Diagonal Gradient Overlay with Blend Mode */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: "linear-gradient(135deg, #4B2E1D 0%, transparent 50%, #3C1F0F 100%)",
            mixBlendMode: "soft-light",
          }}
          aria-hidden="true"
        />

        {/* Additional Overlay for Text Readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" 
          aria-hidden="true"
        />
      </motion.div>

      {/* Steam Animation */}
      <SteamAnimation />

      {/* Hero Content */}
      <motion.div
        style={isClient ? { opacity } : {}}
        className="relative z-20 h-full flex items-center justify-center text-center px-6"
      >
        <div className="max-w-5xl">
          {/* Main Headline with Blur Reveal */}
          <motion.div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 100, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-6xl md:text-8xl font-light text-coffee-light leading-tight tracking-wide"
              style={{
                fontFamily: "var(--font-playfair)",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              Manzili
            </motion.h1>
          </motion.div>

          <motion.div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: 80, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-3xl md:text-5xl font-light text-coffee-medium tracking-wider"
              style={{
                fontFamily: "var(--font-playfair)",
                textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
              }}
            >
              Where Coffee Meets Community
            </motion.h2>
          </motion.div>

          <motion.div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-xl md:text-2xl text-coffee-light/90 font-light max-w-3xl mx-auto leading-relaxed"
              style={{
                fontFamily: "var(--font-inter)",
                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
              }}
            >
              Perched above Tamraght's coastline, where exceptional coffee meets breathtaking ocean views.
              A sanctuary for digital nomads and coffee enthusiasts alike.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 20px 40px rgba(212, 163, 115, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-4 bg-gradient-to-r from-coffee-medium to-coffee-dark text-coffee-light font-medium tracking-wider uppercase overflow-hidden transition-all duration-300 rounded-lg"
              aria-label="Experience the Roastery"
            >
              <span className="relative z-10">Experience the Roastery</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-coffee-light to-coffee-medium opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3,
                backgroundColor: "rgba(234, 224, 213, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-coffee-light text-coffee-light font-medium tracking-wider uppercase backdrop-blur-sm transition-all duration-300 hover:text-coffee-medium hover:border-coffee-medium rounded-lg"
              aria-label="Discover Our Story"
            >
              Discover Our Story
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        aria-label="Scroll indicator"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-coffee-light/60 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-coffee-medium rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
