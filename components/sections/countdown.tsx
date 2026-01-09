"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import Counter from "@/components/counter"
import { WindSong, Playfair_Display, Great_Vibes } from "next/font/google"
import { siteConfig } from "@/content/site"
import { ButterflyCluster } from "@/components/butterfly-cluster"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const windSong = WindSong({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const celebrantName = siteConfig.couple.bride

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Parse date from siteConfig: "February 14, 2026"
      const dateStr = siteConfig.wedding.date
      const timeStr = siteConfig.wedding.time // "3:00 PM"
      const dateMatch = dateStr.match(/(\w+)\s+(\d+),\s+(\d+)/)
      
      if (!dateMatch) return
      
      const [, monthName, day, year] = dateMatch
      const monthMap: Record<string, number> = {
        January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
        July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
      }
      
      // Parse time: "3:00 PM" -> 15:00
      const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
      let hours = 0
      let minutes = 0
      if (timeMatch) {
        hours = parseInt(timeMatch[1])
        minutes = parseInt(timeMatch[2])
        if (timeMatch[3].toUpperCase() === 'PM' && hours !== 12) hours += 12
        if (timeMatch[3].toUpperCase() === 'AM' && hours === 12) hours = 0
      }
      
      // Convert to UTC (assuming GMT+8, subtract 8 hours)
      const targetDate = Date.UTC(
        parseInt(year),
        monthMap[monthName] || 0,
        parseInt(day),
        hours - 8,
        minutes,
        0
      )
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Wedding has passed or is happening now
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const labelTaglines: Record<string, string> = {
    Days: "Days Until Her Debut",
    Hours: "Hours of Anticipation",
    Minutes: "Moments of Wonder",
    Seconds: "Heartbeats Away",
  }

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      {/* Simple, elegant card */}
      <div className="relative group">
        {/* Main card */}
        <div className="relative bg-[#172822]/80 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 border border-[#E6A379]/20 shadow-[0_12px_30px_rgba(23,40,34,0.35)] hover:shadow-[0_16px_38px_rgba(23,40,34,0.45)] transition-all duration-300 hover:border-[#E6A379]/30 min-w-[65px] sm:min-w-[75px] md:min-w-[90px] lg:min-w-[100px]">
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={36}
              padding={6}
              gap={3}
              textColor="#FFFFFF"
              fontWeight={500}
              borderRadius={8}
              horizontalPadding={4}
              gradientHeight={10}
              gradientFrom="rgba(230,163,121,0.1)"
              gradientTo="transparent"
            />
          </div>
        </div>
      </div>

      {/* Enhanced label */}
      <div className="flex flex-col items-center text-center gap-1">
        <span className={`${playfair.className} text-base sm:text-lg text-white tracking-[0.25em] uppercase`}>
          {label}
        </span>
        <span className="text-[10px] sm:text-xs tracking-[0.45em] uppercase text-white/70">
          {labelTaglines[label] ?? "Until the Celebration"}
        </span>
      </div>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
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
            <pattern id="scrollPattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#scrollPattern)" />
        </svg>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#172822]/80 via-transparent to-[#172822]/80" />
      </div>

      {/* Top-right corner decoration */}
      <div className="absolute top-0 right-0 z-0 pointer-events-none">
        <img
          src="/decoration/top-right-corner-decoration.png"
          alt=""
          className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 opacity-60"
          aria-hidden="true"
        />
      </div>

      {/* Top-left corner decoration */}
      <div className="absolute top-0 left-0 z-0 pointer-events-none">
        <img
          src="/decoration/top-right-corner-decoration.png"
          alt=""
          className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 opacity-60 scale-x-[-1]"
          aria-hidden="true"
        />
      </div>

      {/* Bottom-right corner decoration */}
      <div className="absolute bottom-0 right-0 z-0 pointer-events-none">
        <img
          src="/decoration/top-right-corner-decoration.png"
          alt=""
          className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 opacity-60 scale-y-[-1]"
          aria-hidden="true"
        />
      </div>

      {/* Bottom-left corner decoration */}
      <div className="absolute bottom-0 left-0 z-0 pointer-events-none">
        <img
          src="/decoration/top-right-corner-decoration.png"
          alt=""
          className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 opacity-60 scale-x-[-1] scale-y-[-1]"
          aria-hidden="true"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <p className="text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase text-[#E9D3A4]/80 mb-3">
          A Nature's Countdown for {celebrantName}
        </p>
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] text-white mb-3 sm:mb-4 drop-shadow-[0_18px_40px_rgba(23,40,34,0.65)]`}
        >
          Countdown to {celebrantName}'s Debut
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[#E9D3A4]/90 font-light max-w-2xl mx-auto leading-relaxed">
          Every moment brings us closer to {celebrantName}'s natural entrance into eighteen—a nature's evening filled with wonder and celebration.
        </p>
      </div>

      {/* Main countdown container */}
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-8 sm:mb-10 md:mb-12 flex-wrap px-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Debut date presentation - Keepsake Card Style */}
        <div className="flex justify-center px-4">
          <div className="max-w-2xl w-full relative">
            {/* Butterfly positioned to the left of Save The Date - Background element */}
            <ButterflyCluster
              className="absolute z-0 pointer-events-none opacity-50 sm:opacity-60 md:opacity-70"
              style={{
                left: "-20px",
                top: "2%",
                transform: "scale(0.7) translate(0, 0)",
                width: "268px",
                height: "282px",
              }}
              ariaHidden={true}
            />
            {/* Save The Date Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12 relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 bg-[#E6A379]/70 rounded-full" />
                <div className="w-1 h-1 bg-[#E6A379]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#E6A379]/70 rounded-full" />
              </div>

              <p className="text-xs sm:text-sm md:text-base font-medium text-[#E9D3A4] uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-3 sm:mb-4">
                Save {celebrantName}'s Debut Night
              </p>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#E6A379]/70 rounded-full" />
                <div className="w-1 h-1 bg-[#E6A379]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#E6A379]/70 rounded-full" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Month - Elegant script style */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p
                  className={`${windSong.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-none drop-shadow-[0_10px_35px_rgba(23,40,34,0.65)]`}
                >
                  {new Date(siteConfig.wedding.date).toLocaleDateString('en-US', { month: 'long' })}
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {/* Day - Large and bold focal point */}
                <p
                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-semibold text-white leading-none drop-shadow-[0_18px_35px_rgba(23,40,34,0.45)]"
                >
                  {new Date(siteConfig.wedding.date).toLocaleDateString('en-US', { day: 'numeric' })}
                </p>
                
                {/* Vertical divider */}
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-gradient-to-b from-transparent via-[#E6A379]/60 to-transparent" />
                
                {/* Year - Elegant and refined */}
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-none tracking-[0.2em] uppercase">
                  {new Date(siteConfig.wedding.date).toLocaleDateString('en-US', { year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 bg-[#E6A379]/70 rounded-full" />
                <div className="w-1 h-1 bg-[#E6A379]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#E6A379]/70 rounded-full" />
              </div>
              
              {/* Time */}
              <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-[#E9D3A4] tracking-[0.4em] uppercase mb-3 sm:mb-4">
                <span className="block sm:inline">{siteConfig.wedding.time} • {siteConfig.ceremony.venue}</span>
                <span className="block sm:inline sm:before:content-['•'] sm:before:mx-2">
                  {siteConfig.ceremony.location.includes(',') 
                    ? siteConfig.ceremony.location.split(',').slice(-2).join(',').trim()
                    : siteConfig.ceremony.location}
                </span>
              </div>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#E6A379]/70 rounded-full" />
                <div className="w-1 h-1 bg-[#E6A379]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#E6A379]/70 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
