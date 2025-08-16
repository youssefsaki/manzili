"use client"

import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from "framer-motion"
import { useRef, useState, useEffect, useMemo, useCallback, memo } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Heart, Share2 } from "lucide-react"

// Types for better type safety and maintainability
interface Drink {
  id: string
  name: string
  description: string
  price: string
  image: string
  rating: number
  ingredients: string[]
}

// Constants extracted for better maintainability
const BREAKPOINT = 768
const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
  staggerDelay: 0.1,
}

// Optimized hook with proper cleanup and memoization
function useIsMobile(breakpoint: number = BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < breakpoint
      setIsMobile(prev => prev !== newIsMobile ? newIsMobile : prev)
    }

    // Set initial value
    handleResize()

    // Debounced resize handler for better performance
    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 100)
    }

    window.addEventListener("resize", debouncedResize, { passive: true })
    
    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [breakpoint])

  return isMobile
}

// Memoized drink data to prevent recreation on every render
const FEATURED_DRINKS: Drink[] = [
  {
    id: "espresso",
    name: "Signature Espresso",
    description: "A symphony of dark chocolate and caramel notes with a velvety crema that dances on your palate.",
    price: "$4.50",
    image: "/espresso.jpg",
    rating: 4.9,
    ingredients: ["Single Origin Ethiopian Beans", "Perfect 25-second Extraction", "Artisanal Crema"],
  },
  {
    id: "cappuccino",
    name: "Golden Cappuccino",
    description: "Silky microfoam meets rich espresso in perfect harmony, finished with a touch of golden dust.",
    price: "$5.75",
    image: "/cappuccino.jpg",
    rating: 4.8,
    ingredients: ["Premium Espresso", "Steamed Organic Milk", "24k Edible Gold Dust"],
  },
  {
    id: "coldbrew",
    name: "Artisan Cold Brew",
    description: "20-hour slow extraction creates a smooth, complex flavor profile with notes of vanilla and cocoa.",
    price: "$4.25",
    image: "/coldbrew.jpg",
    rating: 4.7,
    ingredients: ["Coarse Ground Beans", "20-Hour Cold Extraction", "Filtered Spring Water"],
  },
]

// Memoized animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: ANIMATION_CONFIG.ease,
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: ANIMATION_CONFIG.ease,
    }
  }
}

const slideVariants = {
  hidden: { opacity: 0, x: 100, scale: 0.9 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { 
      duration: ANIMATION_CONFIG.duration,
      ease: "easeInOut",
    }
  },
  exit: { 
    opacity: 0, 
    x: -100, 
    scale: 0.9,
    transition: { 
      duration: ANIMATION_CONFIG.duration * 0.5,
      ease: "easeInOut",
    }
  }
}

// Memoized components for better performance
const StarRating = memo(({ rating, size = 20, className = "" }: { rating: number; size?: number; className?: string }) => {
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i), [])
  
  return (
    <div className="flex space-x-1">
      {stars.map((i) => (
        <Star
          key={i}
          size={size}
          className={`${i < Math.floor(rating) ? "text-[#D4A373] fill-current" : "text-[#D4A373]/30"} ${className}`}
        />
      ))}
    </div>
  )
})
StarRating.displayName = "StarRating"

const IngredientTag = memo(({ ingredient, index }: { ingredient: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5 + index * ANIMATION_CONFIG.staggerDelay }}
    className="flex items-center text-[#4B2E1D]"
  >
    <div className="w-2 h-2 bg-[#D4A373] rounded-full mr-3" />
    {ingredient}
  </motion.div>
))
IngredientTag.displayName = "IngredientTag"

const MobileDrinkCard = memo(({ 
  drink, 
  index, 
  isLiked, 
  onToggleLike 
}: { 
  drink: Drink; 
  index: number; 
  isLiked: boolean; 
  onToggleLike: () => void;
}) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    transition={{ duration: 0.5, delay: index * ANIMATION_CONFIG.staggerDelay }}
    viewport={{ once: true, margin: "-50px" }}
    className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100 flex-shrink-0 w-80"
  >
    {/* Image with overlay */}
    <div className="relative h-80">
      <Image 
        src={drink.image || "/placeholder.svg"} 
        alt={drink.name} 
        fill 
        className="object-cover"
        sizes="320px"
        priority={index === 0}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxIRAD8AnQAZl//Z"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Social Actions */}
      <div className="absolute top-4 right-4 flex flex-col space-y-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggleLike}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label={`${isLiked ? 'Unlike' : 'Like'} ${drink.name}`}
        >
          <Heart
            size={20}
            className={`${isLiked ? "text-red-500 fill-current" : "text-white"}`}
          />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label={`Share ${drink.name}`}
        >
          <Share2 size={18} className="text-white" />
        </motion.button>
      </div>

      {/* Price Badge */}
      <div className="absolute top-4 left-4 bg-[#D4A373] text-[#EAE0D5] px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        {drink.price}
      </div>

      {/* Bottom overlay content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center mb-2">
          <StarRating rating={drink.rating} size={14} className="mr-3" />
          <span className="text-sm font-medium">{drink.rating}</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">{drink.name}</h3>
      </div>
    </div>

    {/* Card Content */}
    <div className="p-6">
      <p className="text-slate-700 text-sm leading-relaxed mb-4">{drink.description}</p>

      {/* Ingredients as tags */}
      <div className="flex flex-wrap gap-2">
        {drink.ingredients.map((ingredient) => (
          <span
            key={ingredient}
            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
          >
            {ingredient}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
))
MobileDrinkCard.displayName = "MobileDrinkCard"

const DesktopDrinkSlide = memo(({ 
  drink, 
  index, 
  currentSlide 
}: { 
  drink: Drink; 
  index: number; 
  currentSlide: number;
}) => (
  <motion.div
    key={drink.id}
    variants={slideVariants}
    initial="hidden"
    animate={index === currentSlide ? "visible" : "exit"}
    exit="exit"
    className="absolute inset-0 flex items-center"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 w-full">
      {/* Image Side */}
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        className="relative"
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={drink.image || "/placeholder.svg"}
            alt={drink.name}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxIRAD8AnQAZl//Z"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Price Tag */}
          <div className="absolute top-4 right-4 bg-[#D4A373] text-[#EAE0D5] px-4 py-2 rounded-full font-medium shadow-lg">
            {drink.price}
          </div>
        </div>
      </motion.div>

      {/* Content Side */}
      <div className="flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3
            className="text-4xl font-light text-[#4B2E1D] mb-4 tracking-wide"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            {drink.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <StarRating rating={drink.rating} size={20} />
            <span className="ml-3 text-[#4B2E1D]/70 font-medium">{drink.rating}</span>
          </div>

          <p className="text-lg text-[#4B2E1D]/80 mb-8 leading-relaxed font-light">{drink.description}</p>

          {/* Ingredients */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-[#4B2E1D] mb-3 tracking-widest uppercase">
              Crafted With
            </h4>
            <div className="space-y-2">
              {drink.ingredients.map((ingredient, i) => (
                <IngredientTag key={ingredient} ingredient={ingredient} index={i} />
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-[#4B2E1D] to-[#D4A373] text-[#EAE0D5] font-medium tracking-wider uppercase rounded-full hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 cursor-pointer"
            aria-label={`Order ${drink.name}`}
          >
            Order Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  </motion.div>
))
DesktopDrinkSlide.displayName = "DesktopDrinkSlide"

// Main ExperienceSection component with FeaturedDrinks integrated
export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [likedDrinks, setLikedDrinks] = useState<Set<string>>(new Set())
  const [isScrolling, setIsScrolling] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  const isMobile = useIsMobile(BREAKPOINT)

  // Set client-side flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Create fallback MotionValue for SSR
  const fallbackScrollProgress = useMotionValue(0)

  // Optimized scroll tracking with throttling
  const scrollData = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false, // Prevent hydration issues
  })
  
  // Only use scroll data when client is ready
  const scrollYProgress = isClient ? scrollData.scrollYProgress : fallbackScrollProgress

  // Memoized transform for better performance
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  // Throttled scroll state management
  useMotionValueEvent(scrollYProgress, "change", () => {
    if (!isScrolling) {
      setIsScrolling(true)
      const timer = setTimeout(() => setIsScrolling(false), 16) // ~60fps
      return () => clearTimeout(timer)
    }
  })

  // Memoized handlers to prevent recreation
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % FEATURED_DRINKS.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + FEATURED_DRINKS.length) % FEATURED_DRINKS.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const toggleLike = useCallback((drinkId: string) => {
    setLikedDrinks(prev => {
      const newSet = new Set(prev)
      if (newSet.has(drinkId)) {
        newSet.delete(drinkId)
      } else {
        newSet.add(drinkId)
      }
      return newSet
    })
  }, [])

  // Memoized mobile section to prevent unnecessary re-renders
  const mobileSection = useMemo(() => (
    <section id="experience" className="py-8 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Featured Drinks</h2>
          <p className="text-slate-600 text-sm">Swipe through our favorites</p>
        </motion.div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-4" style={{ width: `${FEATURED_DRINKS.length * 320}px` }}>
            {FEATURED_DRINKS.map((drink, index) => (
              <MobileDrinkCard
                key={drink.id}
                drink={drink}
                index={index}
                isLiked={likedDrinks.has(drink.id)}
                onToggleLike={() => toggleLike(drink.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {FEATURED_DRINKS.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-slate-300" />
          ))}
        </div>
      </div>
    </section>
  ), [likedDrinks, toggleLike])

  // Memoized desktop section
  const desktopSection = useMemo(() => (
    <section
      id="experience"
      className="py-20 bg-gradient-to-b from-[#EAE0D5] to-[#FFF4E6] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 opacity-5"
        transition={{ duration: 0.1 }}
      >
        <div className="absolute inset-0 bg-[url('/placeholder-jgwiu.jpg')] bg-repeat" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-7xl font-light text-[#4B2E1D] mb-6 tracking-wide"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Signature Creations
          </h2>
          <p className="text-xl text-[#4B2E1D]/70 max-w-3xl mx-auto font-light">
            Each drink is a masterpiece, crafted with precision and passion to deliver an unforgettable experience
          </p>
        </motion.div>

        {/* Glassmorphism Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[600px] rounded-3xl overflow-hidden">
            {/* Glassmorphism Background - Extended to left for navigation */}
            <div className="absolute -left-16 inset-y-0 right-0 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl" />

            {FEATURED_DRINKS.map((drink, index) => (
              <DesktopDrinkSlide
                key={drink.id}
                drink={drink}
                index={index}
                currentSlide={currentSlide}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-[#4B2E1D] hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous drink"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-[#4B2E1D] hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next drink"
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {FEATURED_DRINKS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 ${
                  index === currentSlide ? "bg-[#D4A373] scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  ), [currentSlide, y, nextSlide, prevSlide, goToSlide])

  // Conditional rendering based on screen size
  return isMobile ? mobileSection : desktopSection
}

// Global styles for scrollbar hiding
const GlobalStyles = () => (
  <style jsx global>{`
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  `}</style>
)

// Export with global styles
ExperienceSection.GlobalStyles = GlobalStyles
