"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-coffee-cream via-coffee-light to-coffee-medium flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-coffee-medium/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -bottom-20 -left-20 w-32 h-32 bg-coffee-dark/10 rounded-full blur-xl"
        />
      </div>

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-coffee-dark mb-6 leading-tight"
          >
            Welcome to
            <span className="block text-coffee-medium">Coffee Haven</span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-xl md:text-2xl text-coffee-dark/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the perfect blend of tradition and innovation. 
          Every cup tells a story, every sip brings comfort.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-coffee-dark text-coffee-light rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-coffee-darkest"
          >
            Explore Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-coffee-dark text-coffee-dark rounded-full font-semibold text-lg hover:bg-coffee-dark hover:text-coffee-light transition-all duration-300"
          >
            Our Story
          </motion.button>
        </motion.div>

        {/* Floating coffee beans */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              className="absolute w-3 h-3 bg-coffee-medium/40 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
