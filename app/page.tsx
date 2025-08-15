'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingAnimation from './components/LoadingAnimation'
import LoadingScreen from './components/LoadingScreen'
import Hero from './components/Hero'

export default function HomePage() {
  const [loadingState, setLoadingState] = useState<'initial' | 'progress' | 'complete'>('initial')

  useEffect(() => {
    // Show initial loading animation for 2 seconds
    const initialTimer = setTimeout(() => {
      setLoadingState('progress')
    }, 2000)

    // Show progress loading for 3 seconds
    const progressTimer = setTimeout(() => {
      setLoadingState('complete')
    }, 5000)

    return () => {
      clearTimeout(initialTimer)
      clearTimeout(progressTimer)
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loadingState === 'initial' && (
          <LoadingAnimation key="initial" />
        )}
        
        {loadingState === 'progress' && (
          <LoadingScreen key="progress" />
        )}
      </AnimatePresence>

      {loadingState === 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Hero />
        </motion.div>
      )}
    </>
  )
}
