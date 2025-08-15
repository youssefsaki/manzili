"use client"

import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen pt-20 bg-gradient-to-br from-coffee-cream to-coffee-light flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-coffee-dark mb-6">
          Hero Section
        </h1>
        <p className="text-xl text-coffee-dark/80 max-w-2xl mx-auto">
          This is a placeholder for the Hero Section. Replace with your actual hero content.
        </p>
      </motion.div>
    </section>
  )
}
