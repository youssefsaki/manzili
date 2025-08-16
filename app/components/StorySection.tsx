"use client"

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useRef, useEffect, useState, useMemo, useCallback, useLayoutEffect } from "react"
import Image from "next/image"

// Types for better maintainability
interface TimelineStep {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  color: string
  stepNumber: number
}

// Constants for better maintainability
const TIMELINE_STEPS: Omit<TimelineStep, 'id' | 'stepNumber'>[] = [
  {
    title: "Origin",
    subtitle: "Premium Coffee Selection",
    description: "Discover our carefully curated selection of premium coffee beans, sourced from the world's finest regions for exceptional quality and flavor.",
    image: "/1.jpg",
    color: "#8B4513",
  },
  {
    title: "Roasting",
    subtitle: "Green Bean Transformation",
    description: "Watch as our expert roasters transform raw green coffee beans into perfectly roasted, aromatic coffee using traditional techniques.",
    image: "/2.jpg",
    color: "#D2691E",
  },
  {
    title: "Crafting",
    subtitle: "Artistic Preparation",
    description: "Experience the art of coffee crafting as our baristas skillfully pour milk, creating beautiful latte art and perfect coffee creations.",
    image: "/3.jpg",
    color: "#CD853F",
  },
  {
    title: "Coworking",
    subtitle: "Productive Environment",
    description: "Enjoy your coffee in our inspiring coworking space, where productivity meets comfort with a perfect cup by your side.",
    image: "/4.jpg",
    color: "#D4A373",
  },
  {
    title: "Refreshment",
    subtitle: "Fresh Juice Selection",
    description: "Complement your coffee experience with our selection of fresh, natural juices for a complete and refreshing beverage offering.",
    image: "/5.jpg",
    color: "#EAE0D5",
  },
]

// Performance-optimized animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Performance-optimized hover variants
const hoverVariants = {
  hover: { 
    y: -8,
    transition: { 
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Optimized image loading strategy
const IMAGE_LOADING_STRATEGY = {
  PRIORITY_IMAGES: 2, // First 2 images load eagerly
  LAZY_LOAD_DELAY: 100, // ms delay for lazy loading
  VIEWPORT_MARGIN: "-50px", // Trigger animation earlier
}

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set([0, 1, 2]))
  
  // Performance-optimized scroll tracking with throttling
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Optimized transform with better performance
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", "-25%"]
  )

  // Memoized timeline steps with IDs and step numbers
  const timelineSteps = useMemo((): TimelineStep[] => 
    TIMELINE_STEPS.map((step, index) => ({
      ...step,
      id: `step-${index + 1}`,
      stepNumber: index + 1
    })), []
  )

  // Performance-optimized client-side detection
  useLayoutEffect(() => {
    setIsClient(true)
  }, [])

  // Optimized scroll performance monitoring
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Throttle scroll state updates for better performance
    if (!isScrolling) {
      setIsScrolling(true)
      setTimeout(() => setIsScrolling(false), 16) // ~60fps
    }
  })

  // Advanced memoization for card rendering with performance optimization
  const renderTimelineCard = useCallback((step: TimelineStep, index: number, isMobile: boolean = false) => {
    const isPriority = index < IMAGE_LOADING_STRATEGY.PRIORITY_IMAGES
    const isVisible = visibleCards.has(index)
    
    return (
      <motion.div
        key={step.id}
        variants={isMobile ? itemVariants : cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: true, 
          margin: IMAGE_LOADING_STRATEGY.VIEWPORT_MARGIN,
          amount: 0.3 // Trigger when 30% visible
        }}
        className={`flex-shrink-0 relative group cursor-pointer ${
          isMobile 
            ? 'h-[550px] w-[330px]' 
            : 'w-[400px] h-full'
        }`}
        role="button"
        tabIndex={0}
        aria-label={`Learn more about ${step.title} - ${step.subtitle}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            // Add your click handler here
          }
        }}
        // Performance optimization: Reduce motion during scroll
        style={{ 
          willChange: isScrolling ? 'transform' : 'auto',
          transform: isScrolling ? 'translateZ(0)' : 'none'
        }}
      >
        {/* Card Container */}
        <div className="relative h-full bg-gradient-to-b from-black/20 to-black/60 rounded-[20px] md:rounded-2xl overflow-hidden backdrop-blur-sm border border-[#D4A373]/20 transition-all duration-300 hover:border-[#D4A373]/40">
          {/* Background Image with advanced optimization */}
          <div className="absolute inset-0">
            {isVisible && (
              <Image
                src={step.image || "/placeholder.svg"}
                alt={`${step.title} - ${step.subtitle}`}
                fill
                sizes={isMobile ? "330px" : "400px"}
                className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-[20px] md:rounded-2xl"
                priority={isPriority}
                loading={isPriority ? "eager" : "lazy"}
                quality={85} // Optimize quality vs performance
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                 onLoad={() => {
                   // Add card to visible set for performance tracking
                   setVisibleCards(prev => new Set(Array.from(prev).concat(index)))
                 }}
              />
            )}
            <div
              className="absolute inset-0 opacity-60 rounded-[20px] md:rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${step.color}20 0%, transparent 50%, #000000aa 100%)`,
              }}
              aria-hidden="true"
            />
          </div>

          {/* Content with performance-optimized animations */}
          <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
            <motion.div 
              variants={hoverVariants}
              whileHover="hover"
              className="h-full flex flex-col justify-end"
            >
              <div className="mb-3 md:px-4">
                <span 
                  className="text-xs md:text-sm font-medium tracking-widest uppercase" 
                  style={{ color: step.color }}
                  aria-label={`Category: ${step.subtitle}`}
                >
                  {step.subtitle}
                </span>
              </div>

              <h3
                className="text-2xl md:text-3xl font-light text-[#EAE0D5] mb-3 md:mb-4 tracking-wide px-4"
                style={{ fontFamily: "var(--font-cinzel), Cinzel, serif" }}
              >
                {step.title}
              </h3>

              <p className="text-[#EAE0D5]/80 font-light leading-relaxed text-sm md:text-base px-4 mb-4">
                {step.description}
              </p>

              {/* Step Number */}
              <div className={`absolute top-6 right-6 md:top-8 md:right-8`}>
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center text-sm md:text-lg font-light"
                  style={{
                    borderColor: step.color,
                    color: step.color,
                  }}
                  aria-label={`Step ${step.stepNumber}`}
                >
                  {step.stepNumber}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hover Overlay with performance optimization */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#D4A373]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[20px] md:rounded-2xl" 
            aria-hidden="true"
          />
        </div>
      </motion.div>
    )
  }, [visibleCards, isScrolling])

  // Memoized mobile and desktop sections for better performance
  const mobileSection = useMemo(() => (
    <div className="md:hidden" role="region" aria-label="Timeline steps on mobile">
      <div className="px-2 overflow-x-auto w-full mt-[2.5rem] scrollbar-hide">
        <div className="flex gap-4 w-[1200px]">
          {timelineSteps.map((step, index) => renderTimelineCard(step, index, true))}
        </div>
      </div>
    </div>
  ), [timelineSteps, renderTimelineCard])

  const desktopSection = useMemo(() => (
    isClient && (
      <div className="hidden md:block relative h-[600px] overflow-hidden" role="region" aria-label="Timeline steps on desktop">
        <motion.div 
          style={{ x }} 
          className="flex space-x-8 h-full"
          aria-label="Scrollable timeline"
        >
          {timelineSteps.map((step, index) => renderTimelineCard(step, index, false))}
        </motion.div>
      </div>
    )
  ), [isClient, timelineSteps, renderTimelineCard, x])

  return (
    <section 
      id="story" 
      ref={ref} 
      className="py-20 bg-gradient-to-br from-[#3C1F0F] to-[#4B2E1D] overflow-hidden"
      aria-labelledby="story-heading"
      role="region"
    >
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <h2
            id="story-heading"
            className="text-5xl md:text-7xl font-light text-[#EAE0D5] mb-6 tracking-wide"
            style={{ fontFamily: "var(--font-cinzel), Cinzel, serif" }}
          >
            From Bean to Cup
          </h2>
          <p className="text-xl text-[#D4A373] max-w-3xl mx-auto font-light leading-relaxed">
            Witness the meticulous journey that transforms humble coffee beans into extraordinary experiences
          </p>
        </motion.div>
      </div>

      {/* Mobile: Horizontal Scroll */}
      {mobileSection}

      {/* Desktop: Horizontal Scrolling Timeline */}
      {desktopSection}

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
        aria-label="Scroll instruction"
      >
        <p className="text-[#D4A373]/60 text-sm tracking-wide">
          <span className="hidden sm:inline">←</span> Scroll to explore the journey <span className="hidden sm:inline">→</span>
        </p>
      </motion.div>
    </section>
  )
}
