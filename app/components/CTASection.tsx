"use client"

import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "framer-motion"
import { useRef, useState, useLayoutEffect, useCallback, useMemo } from "react"
import { Instagram, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"

// Types for better maintainability
interface InstagramPost {
  id: number
  type: "video" | "image"
  thumbnail: string
  likes: number
  comments: number
  caption: string
}

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [videoErrors, setVideoErrors] = useState<Set<number>>(new Set())

  // Optimized client-side detection
  useLayoutEffect(() => {
    setIsClient(true)
  }, [])

  // Memoized scroll progress with fallback
  const fallbackScrollProgress = useMotionValue(0)
  const scrollData = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false, // Prevent hydration issues
  })
  
  const scrollYProgress = isClient ? scrollData.scrollYProgress : fallbackScrollProgress
  
  // Optimized transform with better performance
  const y = useTransform(scrollYProgress, [0, 1], [50, -50], {
    clamp: false
  })

  // Memoized data to prevent unnecessary re-renders
  const instagramPosts: InstagramPost[] = useMemo(() => [
    {
      id: 1,
      type: "video",
      thumbnail: "/video1.mp4",
      likes: 2847,
      comments: 156,
      caption: "The perfect pour-over technique ☕✨",
    },
    {
      id: 2,
      type: "image",
      thumbnail: "/post1.jpg",
      likes: 1923,
      comments: 89,
      caption: "Love in every cup 💕",
    },
    {
      id: 3,
      type: "video",
      thumbnail: "/video2.mp4",
      likes: 3156,
      comments: 203,
      caption: "Fresh roasted to perfection 🔥",
    },
    {
      id: 4,
      type: "image",
      thumbnail: "/post2.jpg",
      likes: 1654,
      comments: 67,
      caption: "Your home away from home 🏠",
    },
    {
      id: 5,
      type: "video",
      thumbnail: "/video3.mp4",
      likes: 2234,
      comments: 134,
      caption: "Craftsmanship in action ⚡",
    },
    {
      id: 6,
      type: "image",
      thumbnail: "/post3.jpg",
      likes: 1876,
      comments: 92,
      caption: "Perfect pairings 🥐",
    },
  ], [])

  // Optimized event handlers with useCallback
  const handleVideoError = useCallback((event: React.SyntheticEvent<HTMLVideoElement>, postId: number) => {
    setVideoErrors(prev => new Set(prev).add(postId))
    // Could implement proper error tracking service here
  }, [])

  const handleVideoLoad = useCallback((event: React.SyntheticEvent<HTMLVideoElement>, postId: number) => {
    setVideoErrors(prev => {
      const newSet = new Set(prev)
      newSet.delete(postId)
      return newSet
    })
    // Could implement analytics tracking here
  }, [])

  const handleHoverStart = useCallback((index: number) => {
    setHoveredIndex(index)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, post: InstagramPost) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      // Implement actual functionality here - could open modal, navigate, etc.
      // For now, just log the action (remove in production)
      console.log(`Viewing post: ${post.caption}`)
    }
  }, [])

  // Memoized hashtags to prevent recreation
  const hashtags = useMemo(() => [
    "#ArtisanCoffee", 
    "#CoffeeArt", 
    "#PerfectBrew", 
    "#CoffeeLovers"
  ], [])

  return (
    <section
      id="cta"
      ref={ref}
      className="py-20 bg-gradient-to-br from-[#4B2E1D] to-[#3C1F0F] relative overflow-hidden"
    >
      {/* Background Elements */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4A373] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#EAE0D5] rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Instagram className="w-8 h-8 text-[#D4A373] mr-4" />
            <h2
              className="text-5xl md:text-7xl font-light text-[#EAE0D5] tracking-wide"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Coffee Stories
            </h2>
          </div>
          <p className="text-xl text-[#EAE0D5]/70 max-w-3xl mx-auto font-light">
            Follow our journey through the lens of our community. Every post tells a story of passion, craft, and
            connection.
          </p>
          <motion.a
            href="https://www.instagram.com/manziliworkspace/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center mt-6 px-6 py-3 bg-gradient-to-r from-[#D4A373] to-[#EAE0D5] text-[#4B2E1D] font-medium rounded-full hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
            aria-label="Follow us on Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow @manziliworkspace
          </motion.a>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => handleHoverStart(index)}
              onHoverEnd={handleHoverEnd}
              className="relative group cursor-pointer"
              tabIndex={0}
              aria-label={`View ${post.caption}`}
              onKeyDown={(e) => handleKeyDown(e, post)}
            >
              {/* Post Container */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#D4A373]/20 to-[#4B2E1D]/20 backdrop-blur-sm border border-[#D4A373]/20">
                {post.type === "video" ? (
                  <video
                    src={post.thumbnail}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                    data-webkit-playsinline="true"
                    data-x5-playsinline="true"
                    data-x5-video-player-type="h5"
                    data-x5-video-player-fullscreen="true"
                    preload="auto"
                    controls={false}
                    disablePictureInPicture={true}
                    disableRemotePlayback={true}
                    onError={(e) => handleVideoError(e, post.id)}
                    onLoadedData={(e) => handleVideoLoad(e, post.id)}
                    style={{
                      willChange: "transform",
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden"
                    }}
                    aria-label={post.caption}
                  />
                ) : (
                  <Image
                    src={post.thumbnail}
                    alt={post.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index <= 3}
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxIRAxEBPwCdABmX/9k="
                  />
                )}

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />

                {/* Post Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 20,
                  }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <p className="text-white text-sm mb-3 line-clamp-2">{post.caption}</p>
                  <div className="flex items-center space-x-4 text-white/80">
                    <div className="flex items-center space-x-1">
                      <Heart size={16} aria-label="Likes" />
                      <span className="text-sm">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={16} aria-label="Comments" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  animate={{
                    x: hoveredIndex === index ? ["-100%", "200%"] : "-100%",
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <p className="text-[#EAE0D5]/60 mb-6">Share your coffee moments with us</p>
          <div className="flex flex-wrap justify-center gap-4">
            {hashtags.map((hashtag) => (
              <span
                key={hashtag}
                className="px-4 py-2 bg-[#D4A373]/20 text-[#D4A373] rounded-full text-sm font-medium backdrop-blur-sm border border-[#D4A373]/30"
              >
                {hashtag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
