"use client"

import { useEffect, useMemo, useState } from "react"
import { Great_Vibes, Cormorant_Garamond, WindSong } from "next/font/google"
import { siteConfig } from "@/content/site"
import { ButterflyCluster } from "@/components/butterfly-cluster"

const desktopImages = [
  "/desktop-background/debut (16).jpg",
  "/desktop-background/debut (28).jpg",
  "/desktop-background/debut 1.jpg",
  "/desktop-background/debut 2.jpg",
  "/desktop-background/debut 3.jpg",
]

const mobileImages = [
  "/mobile-background/debut (14).jpg",
  "/mobile-background/debut (34).jpg",
  "/mobile-background/debut (20).jpg",
  "/mobile-background/debut (23).jpg",
  "/mobile-background/debut (22).jpg",
  "/mobile-background/debut 1.jpg",
  "/mobile-background/debut 2.jpg",
  "/mobile-background/debut 3.jpg",
]

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const windSong = WindSong({
  subsets: ["latin"],
  weight: "400",
})

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const backgroundImages = useMemo(() => {
    return isMobile ? mobileImages : desktopImages
  }, [isMobile])

  useEffect(() => {
    setImagesLoaded(false)
    setCurrentImageIndex(0)

    const firstImg = new Image()
    firstImg.src = backgroundImages[0]
    firstImg.onload = () => {
      setImagesLoaded(true)
    }

    const preloadTimeout = setTimeout(() => {
      if (typeof navigator !== "undefined" && (navigator as any).connection?.saveData) return
      backgroundImages.slice(1, 3).forEach((src) => {
        const img = new Image()
        img.decoding = "async"
        img.loading = "lazy" as any
        img.src = src
      })
    }, 200)

    return () => clearTimeout(preloadTimeout)
  }, [backgroundImages])

  useEffect(() => {
    if (!imagesLoaded) return

    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)

    return () => clearInterval(imageTimer)
  }, [imagesLoaded, backgroundImages])

  useEffect(() => {
    if (imagesLoaded) {
      setIsVisible(true)
    }
  }, [imagesLoaded])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#172822]">
      <div className="absolute inset-0 w-full h-full">
        {imagesLoaded &&
          backgroundImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                willChange: "opacity",
              }}
            />
          ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#172822]/95 via-[#3B553C]/70 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#172822]/70 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(126,138,88,0.18),transparent_55%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(230,163,121,0.12),transparent_35%)] opacity-70 animate-[pulse_9s_ease-in-out_infinite]" />
      </div>
      <ButterflyCluster />

      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-center min-h-screen pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-12 md:pb-16">
        <div
          className={`w-full max-w-3xl text-center space-y-3 sm:space-y-4 md:space-y-5 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Main Invitation Text - Smaller */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <p 
              className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm lg:text-base uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#E9D3A4]/95 font-normal leading-relaxed px-4`}
              style={{
                textShadow: "0 2px 14px rgba(23, 40, 34, 0.7)",
              }}
            >
              An Enchanted Evening Awaits You!
            </p>

            {/* Name - Hero */}
            <h1
              className="fleur-de-leah-regular text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] text-white leading-tight"
              style={{
                letterSpacing: "0.08em",
                textShadow: "0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(230, 163, 121, 0.8), 0 0 80px rgba(230, 163, 121, 0.6), 0 0 100px rgba(230, 163, 121, 0.4), 0 4px 20px rgba(0, 0, 0, 0.5)",
                filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 50px rgba(230, 163, 121, 0.6))",
              }}
            >
              Mikaella Arkean
            </h1>

            {/* Subtitle Text */}
            <p
              className="imperial-script-regular text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] text-[#E9D3A4] drop-shadow-[0_12px_28px_rgba(23,40,34,0.6)]"
              style={{
                marginTop: "-0.25rem",
              }}
            >
              Join Us in Celebrating Her 18th Birthday Debut
            </p>
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 pt-1">
              <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#E6A379]/80 to-[#E6A379]/40" />
              <div className="w-1 h-1 rounded-full bg-[#E6A379]/80 shadow-[0_0_8px_rgba(230,163,121,0.6)]" />
              <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#E6A379]/80 to-[#E6A379]/40" />
            </div>
          </div>

          {/* Date & Time Section - Refined */}
          <div className="w-full max-w-2xl mx-auto">
            <div 
              className={`${cormorant.className} flex flex-col items-center gap-1.5 sm:gap-2.5 md:gap-3 text-[#E9D3A4]/95`}
              style={{ textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}
            >
              {/* Month */}
              <span className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em] font-light">
                January
              </span>
              
              {/* Date Line */}
              <div className="flex w-full items-center gap-2 sm:gap-4 md:gap-5">
                {/* Day */}
                <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2.5">
                  <span className="h-[0.5px] flex-1 bg-[#E9D3A4]/50" />
                  <span className="text-[0.6rem] sm:text-[0.7rem] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light">
                    Sun
                  </span>
                  <span className="h-[0.5px] w-6 sm:w-8 md:w-10 bg-[#E9D3A4]/50" />
                </div>

                {/* Date Number - Elegant */}
                <div className="relative flex items-center justify-center px-3 sm:px-4 md:px-5">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 mx-auto h-[70%] max-h-[180px] w-[100px] sm:w-[140px] md:w-[170px] rounded-full bg-gradient-to-b from-[#E6A379]/30 via-[#7E8A58]/30 to-transparent blur-[28px] opacity-70"
                  />
                  <span
                    className={`${cormorant.className} relative text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-light leading-none tracking-wider text-white`}
                    style={{
                      textShadow:
                        "0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(230, 163, 121, 0.8), 0 0 80px rgba(230, 163, 121, 0.6), 0 0 100px rgba(230, 163, 121, 0.4), 0 4px 20px rgba(0, 0, 0, 0.5)",
                      filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 50px rgba(230, 163, 121, 0.6))",
                    }}
                  >
                    18
                  </span>
                </div>

                {/* Time */}
                <div className="flex flex-1 items-center gap-1.5 sm:gap-2.5">
                  <span className="h-[0.5px] w-6 sm:w-8 md:w-10 bg-[#E9D3A4]/50" />
                  <span className="text-[0.6rem] sm:text-[0.7rem] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light">
                    4:00 PM
                  </span>
                  <span className="h-[0.5px] flex-1 bg-[#E9D3A4]/50" />
                </div>
              </div>

              {/* Year */}
              <span className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em] font-light">
                2026
              </span>
            </div>
          </div>

          {/* Venue */}
          <div className="space-y-1 sm:space-y-1.5 pt-1 sm:pt-2">
            <p
              className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.22em] sm:tracking-[0.26em] md:tracking-[0.3em] text-[#E6A379] font-medium`}
              style={{
                textShadow: "0 2px 18px rgba(126, 138, 88, 0.8)",
              }}
            >
              {siteConfig.wedding.venue}
            </p>
            <p
              className={`${cormorant.className} text-[0.6rem] sm:text-[0.7rem] md:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.18em] text-[#E9D3A4]/90 font-light px-4 sm:px-8 md:px-12`}
              style={{
                textShadow: "0 2px 12px rgba(23, 40, 34, 0.6)",
              }}
            >
              {siteConfig.wedding.address}
            </p>
          </div>

          {/* Call to Action Buttons - Enhanced */}
          <div className="pt-4 sm:pt-5 md:pt-6 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-stretch max-w-2xl mx-auto w-full px-4">
             <a
               href="#narrative"
               className={`${cormorant.className} group relative flex-1 sm:min-w-[220px] md:min-w-[240px] rounded-xl overflow-hidden transition-all duration-700 ease-out hover:scale-[1.05] hover:-translate-y-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A379]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#172822]`}
             >
               {/* Gradient Background */}
               <span 
                 className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E6A379] via-[#E9D3A4] to-[#7E8A58] transition-all duration-700 group-hover:from-[#7E8A58] group-hover:via-[#E6A379] group-hover:to-[#E9D3A4] group-hover:shadow-[0_20px_60px_rgba(230,163,121,0.5),0_0_30px_rgba(126,138,88,0.4)]" 
                 aria-hidden 
               />
               {/* Shimmer Effect */}
               <span 
                 className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" 
                 aria-hidden 
               />
               {/* Glow Effect */}
               <span 
                 className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3),transparent_70%)]" 
                 aria-hidden 
               />
               <span className="relative z-10 inline-flex h-full min-h-[3.5rem] sm:min-h-[3.75rem] md:min-h-[4rem] w-full items-center justify-center px-8 sm:px-10 text-[0.7rem] sm:text-[0.75rem] md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#172822] font-bold transition-all duration-500 group-hover:text-[#172822] group-hover:drop-shadow-[0_2px_8px_rgba(23,40,34,0.3)]">
                 Journey to Eighteen
               </span>
             </a>
             <a
               href="#guest-list"
               className={`${cormorant.className} group relative flex-1 sm:min-w-[220px] md:min-w-[240px] rounded-xl overflow-hidden transition-all duration-700 ease-out hover:scale-[1.05] hover:-translate-y-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A379]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#172822]`}
             >
               {/* Border Gradient */}
               <span 
                 className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E6A379] via-[#E9D3A4] to-[#7E8A58] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" 
                 aria-hidden 
               />
               {/* Main Border */}
               <span 
                 className="absolute inset-0 rounded-xl border-2 border-[#E6A379] transition-all duration-700 group-hover:border-[#E9D3A4] group-hover:shadow-[0_0_30px_rgba(230,163,121,0.6),inset_0_0_30px_rgba(230,163,121,0.1)]" 
                 aria-hidden 
               />
               {/* Background Glow */}
               <span 
                 className="absolute inset-[2px] rounded-[10px] bg-[#172822]/95 backdrop-blur-sm transition-all duration-700 group-hover:bg-[#172822]/90 group-hover:shadow-[inset_0_0_40px_rgba(230,163,121,0.15)]" 
                 aria-hidden 
               />
               {/* Shimmer Effect */}
               <span 
                 className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[#E6A379]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" 
                 aria-hidden 
               />
               <span className="relative z-10 inline-flex h-full min-h-[3.5rem] sm:min-h-[3.75rem] md:min-h-[4rem] w-full items-center justify-center px-8 sm:px-10 text-[0.7rem] sm:text-[0.75rem] md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#E6A379] font-bold transition-all duration-500 group-hover:text-[#E9D3A4] group-hover:drop-shadow-[0_0_20px_rgba(230,163,121,0.8)]">
                 RSVP & Guestbook
               </span>
             </a>
          </div>
        </div>
      </div>
    </section>
  )
}
