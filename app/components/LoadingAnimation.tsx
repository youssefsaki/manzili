"use client"

import { motion } from "framer-motion"

export default function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-coffee-darkest"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear",
            repeatDelay: 0
          }}
          className="w-16 h-16 border-2 border-coffee-medium border-t-transparent rounded-full mx-auto mb-8"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.5, 
            duration: 0.8, 
            ease: "easeOut" 
          }}
          className="text-2xl font-light text-coffee-light tracking-wider font-playfair"
        >
          Brewing Excellence
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 2.5, 
            ease: "easeInOut",
            delay: 0.8
          }}
          className="h-0.5 bg-gradient-to-r from-transparent via-coffee-medium to-transparent mt-4 max-w-xs mx-auto"
        />
      </div>
    </motion.div>
  )
}
