"use client"

import { useState, useEffect } from "react"
import { Section } from "@/components/section"
import { ButterflyCluster } from "@/components/butterfly-cluster"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const galleryItems = [
  { image: "/mobile-background/debut (1).jpg", text: `${siteConfig.couple.brideNickname} • Nature's Moments` },
  { image: "/mobile-background/debut (2).jpg", text: `${siteConfig.couple.brideNickname} • Garden Elegance` },
  { image: "/mobile-background/debut (3).jpg", text: `${siteConfig.couple.brideNickname} • Garden Elegance` },
  { image: "/mobile-background/debut (4).jpg", text: `${siteConfig.couple.brideNickname} • Timeless Beauty` },
  { image: "/mobile-background/debut (5).jpg", text: `${siteConfig.couple.brideNickname} • Nature's Moments` },
  { image: "/mobile-background/debut (6).jpg", text: `${siteConfig.couple.brideNickname} • Nature's Moments` },
]

const tileLayouts = [
  "md:col-span-3 md:row-span-3 md:col-start-1 md:row-start-1",
  "md:col-span-2 md:row-span-3 md:col-start-4 md:row-start-1",
  "md:col-span-1 md:row-span-3 md:col-start-6 md:row-start-1",
  "md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-4",
  "md:col-span-2 md:row-span-2 md:col-start-4 md:row-start-4",
  "md:col-span-1 md:row-span-2 md:col-start-6 md:row-start-4",
]

export function Gallery() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Section
      id="gallery"
      className="relative bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822] py-14 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <ButterflyCluster
        className="pointer-events-none absolute z-0 opacity-60"
        style={{
          left: "-60px",
          bottom: "12%",
          transform: "scale(1.2)",
          width: "200px",
          height: "210px",
        }}
        ariaHidden={true}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(230,163,121,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(126,138,88,0.38),transparent_45%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_85%,rgba(23,40,34,0.45),transparent_50%)]" />
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

      <div className="relative z-10 text-center px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs sm:text-sm tracking-[0.45em] uppercase text-[#E9D3A4]/75 mb-3">{siteConfig.couple.bride}'s Nature's Keepsakes</p>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-[0_8px_24px_rgba(23,40,34,0.6)]`}
          >
            {siteConfig.couple.bride}'s Nature's Gallery
          </h2>
          <p className={`${inter.className} text-sm sm:text-base md:text-lg text-[#E9D3A4]/90 mt-4 leading-relaxed`}>
            Moments captured in golden light, warm elegance, and nature's beauty—every frame tells the story of {siteConfig.couple.bride}'s natural debut celebration.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 sm:mt-14 lg:mt-16 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
              <div className="w-14 h-14 border-[3px] border-[#172822]/30 border-t-[#E6A379] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="mx-auto max-w-5xl w-full px-1">
              <div className="grid w-full min-h-[420px] sm:min-h-[460px] md:min-h-0 md:aspect-square grid-cols-2 sm:grid-cols-3 md:grid-cols-6 md:grid-rows-6 gap-2 sm:gap-3 md:gap-4">
                {galleryItems.map((item, index) => (
                  <div
                    key={item.image + index}
                    className={`group relative min-h-[190px] sm:min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E6A379]/20 bg-[#172822]/70 backdrop-blur-sm shadow-[0_18px_35px_rgba(23,40,34,0.45)] transition-all duration-500 hover:shadow-[0_26px_50px_rgba(23,40,34,0.65)] hover:border-[#E6A379]/40 cursor-default ${tileLayouts[index] ?? ""}`}
                    aria-label={`Gallery image ${index + 1}`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute -inset-5 sm:-inset-6 bg-gradient-to-br from-[#E6A379]/25 via-transparent to-[#172822]/30 blur-2xl sm:blur-3xl" />
                    </div>

                    <div className="relative h-full w-full overflow-hidden flex items-center justify-center bg-[#172822]/50">
                      <img
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-[1200ms] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#172822]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white">
                      <span className={`${playfair.className} text-[9px] sm:text-xs tracking-[0.25em] uppercase`}>{item.text}</span>
                      <span className="text-[8px] sm:text-[10px] tracking-[0.38em] uppercase text-white/70">{index + 1}/{galleryItems.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </Section>
  )
}
