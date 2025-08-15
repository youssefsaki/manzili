"use client"

import { useEffect, useState, Suspense, lazy } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "./Header"
import LoadingAnimation from "./LoadingAnimation"

// Lazy load components for better performance
const HeroSection = lazy(() => import("./HeroSection"))
const StorySection = lazy(() => import("./StorySection"))
const ExperienceSection = lazy(() => import("./ExperienceSection"))
const CTASection = lazy(() => import("./CTASection"))
const Footer = lazy(() => import("./Footer"))
const ParticleAnimation = lazy(() => import("./ParticleAnimation"))

// Loading fallback component
const SectionLoader = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-coffee-medium border-t-transparent rounded-full animate-spin"></div>
  </div>
)

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate loading time for video and assets
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Small delay to ensure smooth transition
      setTimeout(() => setIsVisible(true), 100)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative min-h-screen"
        >
          <Header />
          
          <Suspense fallback={<SectionLoader />}>
            <ParticleAnimation />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <HeroSection videoLoaded={true} />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <StorySection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <ExperienceSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </motion.div>
      )}
    </>
  )
}
