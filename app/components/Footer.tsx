"use client"

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { useRef, useState, useLayoutEffect, useCallback, useMemo } from "react"
import { MapPin, Phone, Clock, Instagram, Facebook, Twitter, Mail, LucideIcon } from "lucide-react"

// Types for better maintainability and performance
interface ContactItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  info: string
  link: string | null
}

interface SocialLink {
  icon: LucideIcon
  href: string
  label: string
}

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Client-side protection for useScroll
  useLayoutEffect(() => {
    setIsClient(true)
  }, [])

  // Memoized scroll progress with fallback
  const fallbackScrollProgress = useMotionValue(0)
  const scrollData = useScroll({
    target: ref,
    offset: ["start end", "end end"],
    layoutEffect: false, // Prevent hydration issues
  })
  
  const scrollYProgress = isClient ? scrollData.scrollYProgress : fallbackScrollProgress
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])

  // Memoized contact data to prevent re-creation
  const contactItems: ContactItem[] = useMemo(() => [
    {
      icon: MapPin,
      title: "Location",
      info: "📍Tamraght, Morocco 🇲🇦",
      link: "https://www.google.com/maps/place/Manzili+Coffee+%26+Workspace/@30.5075663,-9.6758947,15z/data=!4m6!3m5!1s0xdb3b347b3cd2add:0x651188e27c98693e!8m2!3d30.5075663!4d-9.6758947!16s%2Fg%2F11stxq0jvv?entry=ttu&g_ep=EgoyMDI1MDgwMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+212XXXXXXX",
      link: "tel:+212XXXXXXX",
    },
    {
      icon: Clock,
      title: "Hours",
      info: "Mon-Sun: 6:00 AM - 10:00 PM",
      link: null,
    },
    {
      icon: Mail,
      title: "Email",
      info: "contact@manzilicoffee.com",
      link: "mailto:contact@manzilicoffee.com",
    },
  ], [])

  // Memoized social links
  const socialLinks: SocialLink[] = useMemo(() => [
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/manziliworkspace/", 
      label: "Instagram" 
    },
    { 
      icon: Facebook, 
      href: "https://www.facebook.com/manziliworkspace/", 
      label: "Facebook" 
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com/manziliworkspace/", 
      label: "Twitter" 
    },
  ], [])

  // Optimized event handlers
  const handleReserveClick = useCallback(() => {
    // TODO: Implement reservation functionality
    console.log("Reserve experience clicked")
  }, [])

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription")
  }, [])

  // Animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const leftSideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1 }
    }
  }

  const rightSideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1, delay: 0.3 }
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer id="visit" ref={ref} className="relative py-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden"
          }}
        >
          <source src="/hero-coffee-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-[#4B2E1D] to-[#3C1F0F]" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Contact Info */}
          <motion.div
            variants={leftSideVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2
              className="text-5xl md:text-6xl font-light text-[#EAE0D5] mb-8 tracking-wide"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Visit Our
              <br />
              <span className="text-[#D4A373]">Roastery</span>
            </h2>

            <p className="text-xl text-[#EAE0D5]/80 mb-12 font-light leading-relaxed">
              Step into our world where every cup is a masterpiece and every visit is a journey of discovery.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-12 h-12 bg-[#D4A373]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#D4A373]/30 group-hover:bg-[#D4A373]/30 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-[#D4A373]" />
                  </div>
                  <div>
                    <h3 className="text-[#EAE0D5] font-medium mb-1">{item.title}</h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-[#EAE0D5]/70 hover:text-[#D4A373] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
                        aria-label={`${item.title}: ${item.info}`}
                        {...(item.link.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.info}
                      </a>
                    ) : (
                      <p className="text-[#EAE0D5]/70">{item.info}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - CTA and Social */}
          <motion.div
            variants={rightSideVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Main CTA */}
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }} 
              className="mb-12"
            >
              <motion.button
                onClick={handleReserveClick}
                whileHover={{
                  boxShadow: "0 20px 40px rgba(212, 163, 115, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 md:px-12 md:py-6 bg-gradient-to-r from-[#D4A373] to-[#4B2E1D] text-[#EAE0D5] font-medium tracking-wider uppercase text-sm md:text-lg overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Reserve your coffee experience"
              >
                <span className="relative z-10">Reserve Your Experience</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#EAE0D5] to-[#D4A373] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
              </motion.button>
            </motion.div>

            {/* Social Media */}
            <div className="mb-8">
              <h3 className="text-[#EAE0D5] text-lg font-medium mb-6 tracking-wide">Follow Our Journey</h3>
              <div className="flex justify-center lg:justify-start space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{
                      scale: 1.2,
                      y: -3,
                      backgroundColor: "rgba(212, 163, 115, 0.3)",
                    }}
                    className="w-14 h-14 bg-[#D4A373]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#D4A373]/30 text-[#D4A373] hover:text-[#EAE0D5] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <social.icon size={24} aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <h4 className="text-[#EAE0D5] font-medium mb-3">Stay Connected</h4>
              <p className="text-[#EAE0D5]/70 text-sm mb-4">Get exclusive updates on new blends and events</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-[#EAE0D5] placeholder-[#EAE0D5]/50 backdrop-blur-sm focus:outline-none focus:border-[#D4A373] focus:ring-2 focus:ring-[#D4A373] focus:ring-opacity-50 transition-colors"
                  aria-label="Email address for newsletter"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#D4A373] text-[#EAE0D5] rounded-lg font-medium hover:bg-[#4B2E1D] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="border-t border-[#D4A373]/20 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3
                className="text-2xl font-bold text-[#EAE0D5] tracking-wider mb-2"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Manzili
              </h3>
              <p className="text-[#EAE0D5]/60 text-sm">A Sip of Art, A Touch of Home</p>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-[#EAE0D5]/60 text-sm">
              <p>&copy; {currentYear} Manzili Coffee. All rights reserved.</p>
              <div className="flex space-x-4">
                <a 
                  href="/privacy-policy" 
                  className="hover:text-[#D4A373] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded px-1"
                  aria-label="Read our privacy policy"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/terms-of-service" 
                  className="hover:text-[#D4A373] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded px-1"
                  aria-label="Read our terms of service"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
