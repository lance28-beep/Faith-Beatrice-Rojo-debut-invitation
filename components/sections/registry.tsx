"use client"

import { Section } from "@/components/section"
import { Heart, Sparkles, BookOpen, Palette, Shirt, Footprints } from "lucide-react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { ButterflyCluster } from "@/components/butterfly-cluster"
import { siteConfig } from "@/content/site"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

const makeupBrands = ["GRWM", "Vice Cosmetics", "BLK", "Issy and Co", "Maybelline"]

const bookTitles = [
  "Fourth Wing by Rebecca Yarros",
  "Powerless by Lauren Roberts",
  "Never Lie by Freida McFadden",
  "That's Not My Name by Megan Lally",
  "No One Will Miss Her by Kat Rosenfield",
  "Verity by Colleen Hoover",
  "The Housemaid by Freida McFadden",
  "The Housemaid is Watching by Freida McFadden",
  "If He Had Been With Me by Laura Nowlin",
  "You've Reached Sam by Dustin Thao",
  "Watch Me by Tahereh Mafi"
]

export function Registry() {
  const debutanteName = siteConfig.couple.bride

  return (
    <Section
      id="registry"
      className="relative z-[30] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 bg-transparent"
    >
      {/* Butterfly accents */}
      <ButterflyCluster
        className="pointer-events-none absolute -top-8 sm:-top-12 left-0 sm:left-8 opacity-70"
        style={{ width: "160px", height: "160px", transform: "rotate(-10deg)" }}
        ariaHidden={true}
      />
      <ButterflyCluster
        className="pointer-events-none absolute bottom-6 sm:bottom-10 right-2 sm:right-10 opacity-60"
        style={{ width: "190px", height: "190px", transform: "rotate(8deg)" }}
        ariaHidden={true}
      />

      <div className="relative z-10 text-center mb-8 sm:mb-14 lg:mb-16 px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[9px] sm:text-xs uppercase tracking-[0.42em] text-white">
          Gift Registry
        </div>
        <h2
          className={`${greatVibes.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_40px_rgba(23,40,34,0.75)] mt-3 sm:mt-4`}
        >
          Nature's Tokens of Love
        </h2>
        <p
          className={`${inter.className} text-[11px] sm:text-sm md:text-base text-[#E9D3A4]/90 max-w-2xl mx-auto mt-3 leading-relaxed`}
        >
          Your presence is the shimmer {debutanteName} cherishes most. Should you wish to leave a keepsake, these gift suggestions will help celebrate her special day.
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/25 bg-white shadow-[0_26px_70px_rgba(23,40,34,0.45)]">
          <div className="relative px-3 py-5 sm:px-8 sm:py-10 md:px-12 md:py-12 space-y-6 sm:space-y-10 text-[#172822]">
            {/* Header Note */}
            <div className="flex flex-col items-center gap-3 sm:gap-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#E6A379]/20 bg-[#E6A379]/10 px-2.5 py-1 text-[10px] sm:text-sm shadow-[0_12px_30px_rgba(23,40,34,0.18)]">
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E6A379]" />
                <span className={`${playfair.className} text-[12px] sm:text-base text-[#E6A379]`}>
                  A Nature's Note for Our Guests
                </span>
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E6A379]" />
              </div>

              <div className="max-w-2xl text-center space-y-1.5 sm:space-y-2">
                <p className={`${playfair.className} text-[15px] sm:text-2xl text-[#172822] leading-relaxed`}>
                  "As {debutanteName} turns eighteen, your presence is the keepsake she treasures most."
                </p>
                <p className={`${inter.className} text-[12px] sm:text-base text-[#172822]/80 leading-relaxed`}>
                  If you feel called to sprinkle an extra blessing, these gift suggestions will help celebrate her special day and support her dreams.
                </p>
              </div>
            </div>

            {/* Gift Suggestions */}
            <div className="space-y-6 sm:space-y-8">
              {/* Makeups */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E6A379]/20 bg-[#E6A379]/5 p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#172822] to-[#E6A379] text-white shadow-[0_8px_20px_rgba(23,40,34,0.25)]">
                    <Palette className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className={`${playfair.className} text-lg sm:text-2xl text-[#172822]`}>Makeups</h3>
                    <p className={`${inter.className} text-[10px] sm:text-xs text-[#172822]/70 uppercase tracking-[0.3em]`}>Brand Suggestions</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {makeupBrands.map((brand, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center rounded-full border border-[#E6A379]/30 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#172822] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#E6A379]/50"
                    >
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#E6A379] mr-1.5 sm:mr-2" />
                      <span className={`${inter.className} font-medium`}>{brand}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Books */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E6A379]/20 bg-[#E6A379]/5 p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#172822] to-[#E6A379] text-white shadow-[0_8px_20px_rgba(23,40,34,0.25)]">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className={`${playfair.className} text-lg sm:text-2xl text-[#172822]`}>Books</h3>
                    <p className={`${inter.className} text-[10px] sm:text-xs text-[#172822]/70 uppercase tracking-[0.3em]`}>Mika's TBR</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {bookTitles.map((book, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 rounded-lg border border-[#E6A379]/20 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-[#172822] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#E6A379]/40"
                    >
                      <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E6A379] mt-0.5 flex-shrink-0" />
                      <span className={`${inter.className} leading-relaxed`}>{book}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clothes */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E6A379]/20 bg-[#E6A379]/5 p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#172822] to-[#E6A379] text-white shadow-[0_8px_20px_rgba(23,40,34,0.25)]">
                    <Shirt className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className={`${playfair.className} text-lg sm:text-2xl text-[#172822]`}>Clothes</h3>
                    <p className={`${inter.className} text-[10px] sm:text-xs text-[#172822]/70 uppercase tracking-[0.3em]`}>Size: XS</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="inline-flex items-center rounded-full border border-[#E6A379]/30 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#172822] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#E6A379]/50">
                    <Shirt className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E6A379] mr-1.5 sm:mr-2" />
                    <span className={`${inter.className} font-medium`}>Dresses</span>
                  </div>
                  <div className="inline-flex items-center rounded-full border border-[#E6A379]/30 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#172822] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#E6A379]/50">
                    <Shirt className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E6A379] mr-1.5 sm:mr-2" />
                    <span className={`${inter.className} font-medium`}>Minimalist Tops (XS)</span>
                  </div>
                </div>
              </div>

              {/* Footwear */}
              <div className="rounded-xl sm:rounded-2xl border border-[#E6A379]/20 bg-[#E6A379]/5 p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#172822] to-[#E6A379] text-white shadow-[0_8px_20px_rgba(23,40,34,0.25)]">
                    <Footprints className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className={`${playfair.className} text-lg sm:text-2xl text-[#172822]`}>Footwear</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="inline-flex items-center rounded-full border border-[#E6A379]/30 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#172822] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#E6A379]/50">
                    <Footprints className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E6A379] mr-1.5 sm:mr-2" />
                    <span className={`${inter.className} font-medium`}>Sandals</span>
                  </div>
                </div>
              </div>
            </div>

            <p className={`${inter.className} text-[10px] sm:text-base text-[#172822]/85 text-center pt-4 sm:pt-6`}>
              With nature's gratitude, {debutanteName} & family
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
