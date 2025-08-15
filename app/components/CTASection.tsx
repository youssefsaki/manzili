"use client"

import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <section id="cta" className="min-h-screen py-20 bg-coffee-medium flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-coffee-light mb-6">
          CTA Section
        </h2>
        <p className="text-xl text-coffee-light/90 max-w-2xl mx-auto">
          This is a placeholder for the Call-to-Action Section. Replace with your actual CTA content.
        </p>
      </motion.div>
    </section>
  )
}
