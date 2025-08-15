"use client"

import { motion } from "framer-motion"

export default function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen py-20 bg-coffee-cream flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-coffee-dark mb-6">
          Experience Section
        </h2>
        <p className="text-xl text-coffee-dark/80 max-w-2xl mx-auto">
          This is a placeholder for the Experience Section. Replace with your actual experience content.
        </p>
      </motion.div>
    </section>
  )
}
