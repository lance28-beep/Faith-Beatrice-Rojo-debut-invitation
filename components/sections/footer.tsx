"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Sparkles, Music2 } from "lucide-react"
import { Playfair_Display, Inter, WindSong, Great_Vibes } from "next/font/google"
import { siteConfig } from "@/content/site"
import { ButterflyCluster } from "@/components/butterfly-cluster"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })
const windSong = WindSong({ subsets: ["latin"], weight: ["400", "500"] })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

export function Footer() {
  const year = new Date().getFullYear()

  const quotes = [
    "Come and Be Part of the Magic!",
    "We can't wait to celebrate this nature's moment with you.",
    "Your presence will make this night even more special as we step into a world of wonder and create memories that will last a lifetime."
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
      }, 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      } else {
        setIsDeleting(false)
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex]
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
      } else {
        setIsPaused(true)
        setIsDeleting(true)
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const nav = [
    { label: "Home", href: "#home" },
    { label: "My Journey", href: "#narrative" },
    { label: "Gallery", href: "#gallery" },
    { label: "Snap & Share", href: "#snap-share" },
    { label: "RSVP", href: "#guest-list" },
    { label: "FAQ", href: "#faq" },
  ] as const

  return (
    <footer 
      className="relative z-20 mt-16 text-white overflow-hidden bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822]"
    >
      <ButterflyCluster
        className="pointer-events-none absolute top-4 sm:top-6 md:top-10 right-2 sm:right-4 md:right-8 opacity-70"
        style={{ width: "120px", height: "120px", transform: "rotate(10deg)" }}
        ariaHidden={true}
      />
      <ButterflyCluster
        className="pointer-events-none absolute bottom-4 sm:bottom-6 md:bottom-10 left-1 sm:left-2 md:left-6 opacity-60"
        style={{ width: "140px", height: "140px", transform: "rotate(-12deg)" }}
        ariaHidden={true}
      />
      {/* Ornate pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Base pattern - diagonal lines forming diamonds */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(230,163,121,0.1) 70px, rgba(230,163,121,0.1) 71px),
              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(230,163,121,0.1) 70px, rgba(230,163,121,0.1) 71px),
              repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(230,163,121,0.08) 35px, rgba(230,163,121,0.08) 36px),
              repeating-linear-gradient(225deg, transparent, transparent 35px, rgba(230,163,121,0.08) 35px, rgba(230,163,121,0.08) 36px)
            `,
            backgroundSize: '70px 70px, 70px 70px, 35px 35px, 35px 35px',
          }}
        />
        
        {/* Decorative scroll motifs - using SVG pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <pattern id="scrollPatternFooter" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
              {/* Scroll motifs at intersections */}
              <g fill="none" stroke="#E6A379" strokeWidth="0.5">
                {/* Top scroll */}
                <path d="M 70 0 Q 65 15 70 30 Q 75 15 70 0" />
                {/* Bottom scroll */}
                <path d="M 70 140 Q 65 125 70 110 Q 75 125 70 140" />
                {/* Left scroll */}
                <path d="M 0 70 Q 15 65 30 70 Q 15 75 0 70" />
                {/* Right scroll */}
                <path d="M 140 70 Q 125 65 110 70 Q 125 75 140 70" />
                {/* Center decorative element */}
                <path d="M 70 30 Q 60 50 70 70 Q 80 50 70 30" />
                <path d="M 70 110 Q 60 90 70 70 Q 80 90 70 110" />
                <path d="M 30 70 Q 50 60 70 70 Q 50 80 30 70" />
                <path d="M 110 70 Q 90 60 70 70 Q 90 80 110 70" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scrollPatternFooter)" />
        </svg>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#172822]/80 via-transparent to-[#172822]/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-8 sm:py-12 md:py-16">
        {/* Debut date presentation */}
        <motion.div className="flex justify-center px-2 sm:px-4 mb-8 sm:mb-12 md:mb-16" variants={fadeInUp}>
          <div className="max-w-2xl w-full">
            {/* Save The Debut Night Header */}
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/50 rounded-full" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
              </div>

              <p className="text-[10px] sm:text-xs md:text-sm font-medium text-white uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.35em] mb-2 sm:mb-3">
                Save The Debut Date
              </p>

              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/50 rounded-full" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              {/* Month - Elegant script style */}
              <div className="mb-2 sm:mb-3 md:mb-4">
                <p
                  className={`${windSong.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none drop-shadow-[0_10px_35px_rgba(46,4,26,0.65)]`}
                >
                  {new Date(siteConfig.wedding.date).toLocaleDateString('en-US', { month: 'long' })}
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-3 sm:mb-4 md:mb-6">
                {/* Day - Large and bold focal point */}
                <p
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-semibold text-white leading-none drop-shadow-[0_18px_35px_rgba(46,4,26,0.45)]"
                >
                  {new Date(siteConfig.wedding.date).toLocaleDateString('en-US', { day: 'numeric' })}
                </p>
                
                {/* Vertical divider */}
                <div className="h-10 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent" />
                
                {/* Year - Elegant and refined */}
                <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-none tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  {new Date(siteConfig.wedding.date).toLocaleDateString('en-US', { year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/50 rounded-full" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
              </div>
              
              {/* Time */}
              <div className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-white/85 tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-2 sm:mb-3">
                <span className="block sm:inline">{siteConfig.wedding.time} • {siteConfig.ceremony.venue}</span>
                <span className="block sm:inline sm:before:content-['•'] sm:before:mx-2">
                  {siteConfig.ceremony.location.includes(',') 
                    ? siteConfig.ceremony.location.split(',').slice(-2).join(',').trim()
                    : siteConfig.ceremony.location}
                </span>
              </div>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/50 rounded-full" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6 sm:mb-8 md:mb-12" variants={staggerChildren} initial="initial" animate="animate">
          {/* Debutante Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3
                  className="fleur-de-leah-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-[0_6px_18px_rgba(23,40,34,0.65)]"
                  style={{ letterSpacing: "0.08em" }}
                >
                  {siteConfig.couple.bride} 18
                </h3>
              </div>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className={`flex items-center gap-2 sm:gap-3 ${inter.className} text-white/95`}>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg">{siteConfig.wedding.date}</span>
                </div>
                <div className={`flex items-center gap-2 sm:gap-3 ${inter.className} text-white/90`}>
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{siteConfig.wedding.venue}</span>
                </div>
              </div>
            </div>

            <motion.div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-white/20" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <blockquote className={`${inter.className} text-[#172822] italic text-sm sm:text-base md:text-lg leading-relaxed min-h-[60px] sm:min-h-[70px] md:min-h-[80px]`}>
                "{displayedText}
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-[#172822] ml-1 animate-pulse">|</span>"
              </blockquote>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#172822]/70 rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#172822]/50 rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#172822]/70 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles */}
          <motion.div className="space-y-3 sm:space-y-4 md:space-y-6" variants={fadeInUp}>
            <motion.div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-white/20 hover:border-white/40 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#172822]/10 rounded-full flex items-center justify-center border-2 border-[#172822]/20 flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#172822]" />
                </div>
                <h4 className={`${playfair.className} font-bold text-base sm:text-lg md:text-xl text-[#172822]`}>Debut Celebration</h4>
              </div>
              <div className={`space-y-2 sm:space-y-2.5 md:space-y-3 ${inter.className} text-[#172822]/80 text-xs sm:text-sm`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#172822]/70 flex-shrink-0" />
                  <span className="break-words">{siteConfig.wedding.venue}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#172822]/70 flex-shrink-0" />
                  <span>{siteConfig.wedding.time} – 9:00 PM</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-white/20 hover:border-white/40 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#172822]/10 rounded-full flex items-center justify-center border-2 border-[#172822]/20 flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#172822]" />
                </div>
                <h4 className={`${playfair.className} font-bold text-base sm:text-lg md:text-xl text-[#172822]`}>Nature's Evening</h4>
              </div>
              <div className={`space-y-2 sm:space-y-2.5 md:space-y-3 ${inter.className} text-[#172822]/80 text-xs sm:text-sm`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#172822]/70 flex-shrink-0" />
                  <span className="break-words">{siteConfig.wedding.venue}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#172822]/70 flex-shrink-0" />
                  <span>4:00 PM – 9:00 PM</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-4 sm:space-y-6 md:space-y-8" variants={fadeInUp}>
            <div>
              <h4 className={`${playfair.className} font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 text-white`}>
                <div className="w-1.5 sm:w-2 h-6 sm:h-7 md:h-8 bg-white/50 rounded-full" /> Follow Her Journey
              </h4>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <a 
                  href="https://www.facebook.com/mehai.germono" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>
                <a 
                  href="https://www.instagram.com/kluv3rly/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>
                <a 
                  href="https://www.tiktok.com/@kluvmeya?" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-110"
                  aria-label="TikTok"
                >
                  <Music2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>

              </div>
            </div>

            <div>
              <h5 className={`${playfair.className} font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4 text-white`}>Quick Links</h5>
              <div className="space-y-1.5 sm:space-y-2">
                {nav.map((item) => (
                  <a key={item.href} href={item.href} className={`block text-white/80 hover:text-white transition-colors duration-200 ${inter.className} text-xs sm:text-sm`}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div className="border-t border-white/20 pt-4 sm:pt-6 md:pt-8" variants={fadeInUp}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6">
            <div className="text-center md:text-left">
              <p className={`text-white/85 ${inter.className} text-[10px] sm:text-xs md:text-sm`}>© {year} {siteConfig.couple.bride}. Crafted with love for her debut story.</p>
              <p className={`text-white/90 ${inter.className} text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1`}>
                Made with love for her special celebration
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-0.5 sm:space-y-1">
              <p className={`text-white/80 ${inter.className} text-[9px] sm:text-[10px] md:text-xs`}>
                Developed by{" "}
                <a 
                  href="https://lance28-beep.github.io/portfolio-website/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/70"
                >
                  Lance Valle
                </a>
              </p>
              <p className={`text-white/80 ${inter.className} text-[9px] sm:text-[10px] md:text-xs`}>
                Want a website like this? Visit{" "}
                <a 
                  href="https://www.facebook.com/WeddingInvitationNaga" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/70"
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}


