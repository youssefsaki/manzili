"use client"

import { motion } from "framer-motion"
import { useRef, useState, useMemo, useCallback, memo, useEffect } from "react"
import { Instagram, Heart, MessageCircle, Play } from "lucide-react"
import Image from "next/image"

// Types for better type safety
interface InstagramPost {
  id: string
  type: "video" | "image"
  thumbnail: string
  mobileThumbnail?: string
  likes: number
  comments: number
  caption: string
  altText?: string
}

// Constants for better maintainability
const ANIMATION_CONFIG = {
  duration: 0.8,
  staggerDelay: 0.1,
  hoverScale: 1.02,
  hoverY: -10,
}

// Optimized hook for device detection
function useDeviceOptimization() {
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobileDevice = /mobile|android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent)
    const isIOSDevice = /iphone|ipad|ipod/i.test(userAgent)
    const isAndroidDevice = /android/i.test(userAgent)

    setIsMobile(isMobileDevice)
    setIsIOS(isIOSDevice)
    setIsAndroid(isAndroidDevice)
  }, [])

  return { isMobile, isIOS, isAndroid }
}

// Memoized post data
const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "1",
    type: "video",
    thumbnail: "/video1.mp4",
    mobileThumbnail: "/video1-mobile.mp4", // Optional: different video for mobile
    likes: 2847,
    comments: 156,
    caption: "The perfect pour-over technique ☕✨",
    altText: "Barista demonstrating pour-over coffee technique",
  },
  {
    id: "2",
    type: "image",
    thumbnail: "/post1.jpg",
    likes: 1923,
    comments: 89,
    caption: "Love in every cup 💕",
    altText: "Beautiful latte art with heart design",
  },
  {
    id: "3",
    type: "video",
    thumbnail: "/video2.mp4",
    mobileThumbnail: "/video2-mobile.mp4",
    likes: 3156,
    comments: 203,
    caption: "Fresh roasted to perfection 🔥",
    altText: "Coffee beans being roasted in professional roaster",
  },
  {
    id: "4",
    type: "image",
    thumbnail: "/post2.jpg",
    likes: 1654,
    comments: 67,
    caption: "Your home away from home 🏠",
    altText: "Cozy coffee shop interior with warm lighting",
  },
  {
    id: "5",
    type: "video",
    thumbnail: "/video3.mp4",
    mobileThumbnail: "/video3-mobile.mp4",
    likes: 2234,
    comments: 134,
    caption: "Craftsmanship in action ⚡",
    altText: "Barista skillfully preparing espresso",
  },
  {
    id: "6",
    type: "image",
    thumbnail: "/post3.jpg",
    likes: 1876,
    comments: 92,
    caption: "Perfect pairings 🥐",
    altText: "Coffee with freshly baked pastries",
  },
]

// Memoized animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
}

const postVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: ANIMATION_CONFIG.duration,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
}

// Optimized video component with cross-device compatibility
const OptimizedVideo = memo(({ 
  post, 
  isMobile, 
  isIOS, 
  isAndroid 
}: { 
  post: InstagramPost; 
  isMobile: boolean; 
  isIOS: boolean; 
  isAndroid: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Device-specific video attributes
  const videoAttributes = useMemo(() => {
    const baseAttrs = {
      className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
      preload: "metadata" as const,
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
    }

    // iOS-specific optimizations
    if (isIOS) {
      return {
        ...baseAttrs,
        preload: "none" as const, // iOS doesn't support preload="metadata"
        muted: true, // iOS requires muted for autoplay
      }
    }

    // Android-specific optimizations
    if (isAndroid) {
      return {
        ...baseAttrs,
        preload: "metadata" as const,
      }
    }

    return baseAttrs
  }, [isIOS, isAndroid])

  // Handle video load events
  const handleLoadedData = useCallback(() => {
    setIsLoaded(true)
    setHasError(false)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoaded(false)
  }, [])

  const handleCanPlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  // Lazy load video on intersection
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded && !hasError) {
            // Start loading video when it comes into view
            video.load()
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    observer.observe(video)
    return () => observer.unobserve(video)
  }, [isLoaded, hasError])

  // Fallback to image if video fails
  if (hasError) {
    return (
      <Image
        src={post.thumbnail.replace('.mp4', '.jpg') || "/placeholder.svg"}
        alt={post.altText || post.caption}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxIRAD8AnQAZl//Z"
      />
    )
  }

  return (
    <video
      ref={videoRef}
      src={isMobile && post.mobileThumbnail ? post.mobileThumbnail : post.thumbnail}
      {...videoAttributes}
      onLoadedData={handleLoadedData}
      onError={handleError}
      onCanPlay={handleCanPlay}
      style={{
        willChange: isPlaying ? 'transform' : 'auto',
        transform: isPlaying ? 'translateZ(0)' : 'none',
      }}
      // iOS and Android specific attributes as data attributes
      data-webkit-playsinline="true"
      data-x5-playsinline="true"
      data-x5-video-player-type="h5"
      data-x5-video-player-fullscreen="true"
    />
  )
})
OptimizedVideo.displayName = "OptimizedVideo"

// Optimized post card component
const InstagramPostCard = memo(({ 
  post, 
  index, 
  hoveredIndex, 
  setHoveredIndex,
  isMobile,
  isIOS,
  isAndroid
}: { 
  post: InstagramPost; 
  index: number; 
  hoveredIndex: number | null; 
  setHoveredIndex: (index: number | null) => void;
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
}) => {
  const handleHoverStart = useCallback(() => {
    setHoveredIndex(index)
  }, [index, setHoveredIndex])

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null)
  }, [setHoveredIndex])

  return (
    <motion.div
      variants={postVariants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: ANIMATION_CONFIG.duration, delay: index * ANIMATION_CONFIG.staggerDelay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: ANIMATION_CONFIG.hoverY, scale: ANIMATION_CONFIG.hoverScale }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="relative group cursor-pointer"
      style={{
        willChange: hoveredIndex === index ? 'transform' : 'auto',
      }}
    >
      {/* Post Container */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#D4A373]/20 to-[#4B2E1D]/20 backdrop-blur-sm border border-[#D4A373]/20">
        {post.type === "video" ? (
          <OptimizedVideo 
            post={post} 
            isMobile={isMobile} 
            isIOS={isIOS} 
            isAndroid={isAndroid} 
          />
        ) : (
          <Image
            src={post.thumbnail || "/placeholder.svg"}
            alt={post.altText || post.caption}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 3} // Prioritize first 3 images
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxIRAD8AnQAZl//Z"
          />
        )}

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        />

        {/* Post Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: hoveredIndex === index ? 1 : 0,
            y: hoveredIndex === index ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <p className="text-white text-sm mb-3 line-clamp-2">{post.caption}</p>
          <div className="flex items-center space-x-4 text-white/80">
            <div className="flex items-center space-x-1">
              <Heart size={16} />
              <span className="text-sm">{post.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={16} />
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
  )
})
InstagramPostCard.displayName = "InstagramPostCard"

// Main CTA section with Instagram Gallery
export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  
  const { isMobile, isIOS, isAndroid } = useDeviceOptimization()

  // Memoized handlers
  const setHoveredIndexCallback = useCallback((index: number | null) => {
    setHoveredIndex(index)
  }, [])

  // Memoized hashtags
  const hashtags = useMemo(() => 
    ["#ArtisanCoffee", "#CoffeeArt", "#PerfectBrew", "#CoffeeLovers"], 
    []
  )

  return (
    <section
      id="cta"
      ref={ref}
      className="py-20 bg-gradient-to-br from-[#4B2E1D] to-[#3C1F0F] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4A373] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#EAE0D5] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
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
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow @manziliworkspace
          </motion.a>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {INSTAGRAM_POSTS.map((post, index) => (
            <InstagramPostCard
              key={post.id}
              post={post}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndexCallback}
              isMobile={isMobile}
              isIOS={isIOS}
              isAndroid={isAndroid}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
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
