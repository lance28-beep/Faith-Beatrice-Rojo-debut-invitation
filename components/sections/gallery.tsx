"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Section } from "@/components/section"
import { ButterflyCluster } from "@/components/butterfly-cluster"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

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
  { image: "/mobile-background/debut (4).jpg", text: "Mikaella • Enchanted Moments" },
  { image: "/mobile-background/debut (9).jpg", text: "Mikaella • Magical Elegance" },
  { image: "/mobile-background/debut (15).jpg", text: "Mikaella • Timeless Beauty" },
  { image: "/mobile-background/debut (18).jpg", text: "Mikaella • Enchanted Beauty" },
  { image: "/mobile-background/debut (21).jpg", text: "Mikaella • Enchanted Beauty" },
  { image: "/mobile-background/debut (22).jpg", text: "Mikaella • Enchanted Beauty" },
  { image: "/mobile-background/debut (25).jpg", text: "Mikaella • Enchanted Beauty" },
  { image: "/mobile-background/debut (26).jpg", text: "Mikaella • Enchanted Beauty" },
  { image: "/mobile-background/debut (29).jpg", text: "Mikaella • Enchanted Beauty" },
  { image: "/mobile-background/debut (31).jpg", text: "Mikaella • Enchanted Beauty" },
]

const tileLayouts = [
  "md:col-span-3 md:row-span-3 md:col-start-1 md:row-start-1",
  "md:col-span-2 md:row-span-3 md:col-start-4 md:row-start-1",
  "md:col-span-1 md:row-span-3 md:col-start-6 md:row-start-1",
  "md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-4",
  "md:col-span-3 md:row-span-2 md:col-start-4 md:row-start-4",
  "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-6",
  "md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-6",
  "md:col-span-2 md:row-span-1 md:col-start-5 md:row-start-6",
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
          <p className="text-xs sm:text-sm tracking-[0.45em] uppercase text-[#E9D3A4]/75 mb-3">Mikaella Arkean's Enchanted Keepsakes</p>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-[0_8px_24px_rgba(23,40,34,0.6)]`}
          >
            Mikaella Arkean's Enchanted Gallery
          </h2>
          <p className={`${inter.className} text-sm sm:text-base md:text-lg text-[#E9D3A4]/90 mt-4 leading-relaxed`}>
            Moments captured in golden light, warm elegance, and enchanted beauty—every frame tells the story of Mikaella Arkean's magical debut celebration.
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
                  <Link
                    key={item.image + index}
                    href="/gallery"
                    className={`group relative min-h-[190px] sm:min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E6A379]/20 bg-[#172822]/70 backdrop-blur-sm shadow-[0_18px_35px_rgba(23,40,34,0.45)] transition-all duration-500 hover:shadow-[0_26px_50px_rgba(23,40,34,0.65)] hover:border-[#E6A379]/40 ${tileLayouts[index] ?? ""}`}
                    aria-label={`View gallery image ${index + 1}`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute -inset-5 sm:-inset-6 bg-gradient-to-br from-[#E6A379]/25 via-transparent to-[#172822]/30 blur-2xl sm:blur-3xl" />
                    </div>

                    <div className="relative h-full w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#172822]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white">
                      <span className={`${playfair.className} text-[9px] sm:text-xs tracking-[0.25em] uppercase`}>{item.text}</span>
                      <span className="text-[8px] sm:text-[10px] tracking-[0.38em] uppercase text-white/70">{index + 1}/{galleryItems.length}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-12 sm:mt-14 md:mt-16 flex flex-col items-center gap-3 px-4 text-center">
        <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#E9D3A4]/70">
          Continue Mikaella Arkean's story
        </p>
        <Link
          href="/gallery"
          className="group relative inline-flex h-full min-h-[3.5rem] sm:min-h-[3.75rem] items-center justify-center overflow-hidden rounded-full border border-[#E6A379]/40 bg-[#172822] px-10 sm:px-12 md:px-14 text-[9px] sm:text-[10px] md:text-xs tracking-[0.48em] uppercase text-[#E6A379] shadow-[0_26px_58px_rgba(23,40,34,0.55)] transition-all duration-600 ease-out hover:-translate-y-2 hover:shadow-[0_36px_70px_rgba(23,40,34,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A379]/50"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#E6A379]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
          <span className="absolute inset-[2px] rounded-full bg-[#172822]/90 backdrop-blur-2xl border border-[#E6A379]/25" />
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out bg-gradient-to-r from-transparent via-[#E6A379]/35 to-transparent" />
          <span className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-[1100ms] ease-out bg-gradient-to-l from-transparent via-[#E6A379]/20 to-transparent" />
          <span className="relative z-10 inline-flex items-center justify-center">
            View Mikaella Arkean's Gallery
          </span>
        </Link>
        <p className={`${inter.className} text-xs text-[#E9D3A4]/75 max-w-md`}>
          Step inside the complete photo journal to experience every magical moment, elegant twirl, and enchanted celebration from Mikaella Arkean's debut.
        </p>
      </div>
    </Section>
  )
}
