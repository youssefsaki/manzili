"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-coffee-dark to-coffee-darkest"
    >
      <div className="text-center">
        {/* Animated Coffee Cup */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 mx-auto mb-8 relative"
        >
          <div className="w-full h-full bg-gradient-to-b from-coffee-medium to-coffee-dark rounded-b-full relative overflow-hidden">
            <motion.div
              animate={{ y: [20, 0, 20] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-t from-coffee-dark/50 to-transparent"
            />
            {/* Steam Animation */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-10, -30],
                    opacity: [0.8, 0],
                    scale: [0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                  className="absolute w-1 h-4 bg-coffee-light/60 rounded-full"
                  style={{ left: `${i * 4}px` }}
                />
              ))}
            </div>
          </div>
          {/* Cup Handle */}
          <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 w-4 h-6 border-2 border-coffee-medium rounded-r-full" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.5, 
            duration: 0.8,
            ease: "easeOut"
          }}
          className="text-3xl font-light text-coffee-light mb-4 tracking-wider font-cinzel"
        >
          Brewing Excellence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.8, 
            duration: 0.6,
            ease: "easeOut"
          }}
          className="text-coffee-medium mb-8 font-light"
        >
          A Sip of Art, A Touch of Home
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-coffee-darkest rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-coffee-medium to-coffee-light rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 1, 
            duration: 0.6,
            ease: "easeOut"
          }}
          className="mt-4 text-coffee-medium text-sm"
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  )
}
