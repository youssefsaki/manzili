"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer id="contact" className="min-h-screen py-20 bg-coffee-darkest flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-coffee-light mb-6">
          Footer Section
        </h2>
        <p className="text-xl text-coffee-light/80 max-w-2xl mx-auto">
          This is a placeholder for the Footer Section. Replace with your actual footer content.
        </p>
      </motion.div>
    </footer>
  )
}
