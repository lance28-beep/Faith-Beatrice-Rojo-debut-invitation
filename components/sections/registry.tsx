"use client"

import { Section } from "@/components/section"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function Registry() {
  const [showQRCode, setShowQRCode] = useState(false)
  
  return (
    <Section id="registry" className="relative bg-transparent py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#FFFFFF] mb-3 sm:mb-4 text-balance">
          Gift Registry
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#FFFFFF]/90 font-sans font-light max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
          Your presence is the greatest gift we could ask for
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Single unified card */}
        <div className="relative bg-white/95 backdrop-blur-sm border border-[#C3A161]/30 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Inner gold border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#C3A161] rounded-lg sm:rounded-xl pointer-events-none" />
          
          {/* Card content */}
          <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="flex flex-col items-center space-y-6 sm:space-y-8">
              {/* Header with hearts */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#BB8A3D]" />
                <h3 className="anton-regular text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase text-[#BB8A3D] text-center tracking-[0.15em]">
                  Your Presence Is the Gift
                </h3>
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#BB8A3D]" />
              </div>
              
              {/* Main message - Poetic verse */}
              <div className="text-center space-y-2 sm:space-y-3 max-w-2xl px-2 sm:px-4">
                <div className="relative py-4 sm:py-6">
                  {/* Decorative top border */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/50 to-transparent"></div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <p className="anton-regular text-base sm:text-lg md:text-xl lg:text-2xl text-[#0A3428] leading-relaxed">
                      With all that we have, we are truly blessed.
                    </p>
                    <p className="anton-regular text-base sm:text-lg md:text-xl lg:text-2xl text-[#0A3428] leading-relaxed">
                      Your presence and prayers are what we request.
                    </p>
                    <p className="anton-regular text-base sm:text-lg md:text-xl lg:text-2xl text-[#0A3428] leading-relaxed pt-1 sm:pt-2">
                      But if you desire to give nonetheless,
                    </p>
                    <p className="anton-regular text-base sm:text-lg md:text-xl lg:text-2xl text-[#0A3428] leading-relaxed">
                      monetary gift is the one we suggest.
                    </p>
                  </div>
                  
                  {/* Decorative bottom border */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/50 to-transparent"></div>
                </div>
              </div>
              
              {/* Toggle Button */}
              <button
                onClick={() => setShowQRCode(!showQRCode)}
                className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-[#0A3428] to-[#106552] hover:from-[#106552] hover:to-[#0A3428] text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group mt-2"
                aria-label={showQRCode ? "Hide QR Code" : "Show QR Code"}
              >
                <span>{showQRCode ? "Hide" : "Show"} GCash QR Code</span>
                {showQRCode ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />
                )}
              </button>
              
              {/* QR Code Section - Animated */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  showQRCode
                    ? "max-h-[900px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col items-center space-y-5 sm:space-y-6 pt-6 sm:pt-8">
                  {/* Decorative divider */}
                  <div className="w-20 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/40 to-transparent"></div>
                  
                  {/* GCash Label */}
                  <div className="text-center space-y-1">
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A3428] mb-1">
                      GCash
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-[#0A3428]/70 font-sans">
                      Scan to send your gift
                    </p>
                  </div>
                  
                  {/* QR Code Image */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl border-2 border-[#C3A161]/40 hover:border-[#C3A161]/60 transition-all duration-500 hover:shadow-2xl group">
                    <Image
                      src="/QR/GCASH.png"
                      alt="GCash QR Code - Scan to send monetary gift"
                      fill
                      className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                      priority
                    />
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#C3A161]/0 via-[#C3A161]/5 to-[#C3A161]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  {/* Instructions */}
                  <div className="text-center space-y-3 pt-1">
                    <p className="text-xs sm:text-sm md:text-base text-[#0A3428]/70 font-sans font-medium">
                      Open GCash app → Scan QR → Enter amount
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base text-[#C3A161] font-medium">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      <span className="font-serif">Thank you for your generosity</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Closing message */}
              <p className="text-sm sm:text-base md:text-lg text-[#106552] font-semibold text-center pt-2">
                We look forward to celebrating with you soon. ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
