"use client"

import { Section } from "@/components/section"
import { Heart, ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

export function Registry() {
  const [showQRCode, setShowQRCode] = useState(false)

  return (
    <Section
      id="registry"
      className="relative z-[30] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 bg-transparent"
    >

      <div className="relative z-10 text-center mb-10 sm:mb-14 lg:mb-16 px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FCE1B6]/20 bg-[#2E041A]/40 px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.48em] text-[#FCE1B6]">
          Gift Registry
        </div>
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FCE1B6] drop-shadow-[0_18px_40px_rgba(46,4,26,0.68)] mt-4`}
        >
          Your Thoughtful Gifts
        </h2>
        <p
          className={`${inter.className} text-xs sm:text-sm md:text-base text-[#FCE1B6]/85 max-w-2xl mx-auto mt-4 leading-relaxed`}
        >
          Your presence is the most precious gift for Kath's debut celebration. If you wish to share a token of love,
          we welcome your thoughtful contributions to help her pursue her dreams.
        </p>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] border-2 border-[#FCE1B6]/20 bg-[#FCE1B6] shadow-[0_26px_70px_rgba(46,4,26,0.4)]">
          <div className="relative px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 space-y-8 sm:space-y-10">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="inline-flex items-center gap-3 rounded-full border-2 border-[#2E041A]/20 bg-[#2E041A]/10 px-6 py-2 shadow-[0_12px_30px_rgba(46,4,26,0.25)]">
                <Heart className="h-5 w-5 text-[#2E041A]" />
                <span className={`${playfair.className} text-sm sm:text-base text-[#2E041A]`}>
                  A Gentle Note for Our Guests
                </span>
                <Heart className="h-5 w-5 text-[#2E041A]" />
              </div>

              <div className="max-w-2xl text-center space-y-3">
                <p className={`${playfair.className} text-lg sm:text-xl md:text-2xl text-[#2E041A] leading-relaxed`}>
                  "As Kath celebrates her debut, your presence is the greatest gift she treasures."
                </p>
                <p className={`${inter.className} text-sm sm:text-base text-[#2E041A]/80 leading-relaxed`}>
                  Should you wish to share a token of love, we welcome monetary gifts that will help her pursue her
                  dreams and aspirations. Thank you for being part of this special milestone in her life.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowQRCode((prev) => !prev)}
                className="group relative inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#2E041A] bg-[#2E041A] px-6 py-3 text-sm sm:text-base font-semibold text-[#FCE1B6] shadow-[0_12px_30px_rgba(46,4,26,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(46,4,26,0.45)]"
                aria-label={showQRCode ? "Hide GCash QR code" : "Reveal GCash QR code"}
              >
                {showQRCode ? "Hide" : "Reveal"} GCash QR
                {showQRCode ? (
                  <ChevronUp className="h-4 w-4 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                )}
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                showQRCode ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col items-center gap-6 pt-6 sm:pt-8">
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#2E041A]/20 bg-[#2E041A]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.38em] text-[#2E041A]">
                  <Sparkles className="h-4 w-4 text-[#2E041A]" />
                  <span>GCash details</span>
                  <Sparkles className="h-4 w-4 text-[#2E041A]" />
                </div>

                <div className="text-center space-y-1">
                  <h3 className={`${playfair.className} text-2xl sm:text-3xl text-[#2E041A]`}>GCash</h3>
                  <p className={`${inter.className} text-sm sm:text-base text-[#2E041A]/70`}>
                    Scan to send your thoughtful gift
                  </p>
                </div>

                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl border-2 border-[#2E041A]/30 bg-white p-5 shadow-[0_16px_40px_rgba(46,4,26,0.3)]">
                  <Image
                    src="/QR/GCASH.png"
                    alt="GCash QR code for Kath's debut gift fund"
                    fill
                    className="rounded-2xl object-contain"
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                    priority
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#2E041A]/20" />
                </div>

                <div className="text-center space-y-3">
                  <p className={`${inter.className} text-xs sm:text-sm text-[#2E041A]/70`}>
                    Open your GCash app → Tap "Scan" → Enter any amount that feels right.
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#2E041A]/20 bg-[#2E041A]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-[#2E041A]">
                    <Heart className="h-4 w-4 text-[#2E041A]" />
                    <span>Thank you for making her debut celebration unforgettable</span>
                    <Heart className="h-4 w-4 text-[#2E041A]" />
                  </div>
                </div>
              </div>
            </div>

            <p className={`${inter.className} text-sm sm:text-base text-[#2E041A]/80 text-center`}>
              With heartfelt gratitude, Kath and family
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
