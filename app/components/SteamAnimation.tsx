"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SteamParticle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export default function SteamAnimation() {
  const [particles, setParticles] = useState<SteamParticle[]>([])

  useEffect(() => {
    // Generate steam particles
    const generateParticles = () => {
      const newParticles: SteamParticle[] = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.6 + 0.2,
      }))
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-coffee-light/40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
            opacity: [particle.opacity, particle.opacity * 0.8, 0],
            scale: [1, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
            repeatDelay: Math.random() * 3 + 1,
          }}
        />
      ))}
    </div>
  )
}
