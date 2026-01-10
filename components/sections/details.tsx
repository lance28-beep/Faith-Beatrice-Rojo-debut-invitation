import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, PartyPopper, Navigation, Copy, Check, Palette, Car, Sparkles } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { Great_Vibes, Inter } from "next/font/google"
import { ButterflyCluster } from "@/components/butterfly-cluster"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems((prev) => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems((prev) => {
          const updated = new Set(prev)
          updated.delete(itemId)
          return updated
        })
      }, 1800)
    } catch (error) {
      console.error("Failed to copy text:", error)
    }
  }

  const { ceremony, reception } = siteConfig
  const venue = ceremony.location
  const venueAddress = siteConfig.wedding.address
  const entourageCall = ceremony.entourageTime
  const guestsCall = ceremony.guestsTime
  const mapsLink = `https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`

  const openInMaps = () => {
    window.open(mapsLink, "_blank", "noopener,noreferrer")
  }

  const colorPalette = [
    "#EDD9DB",
    "#E874A5",
    "#F9DB9D",
    "#F4C3BF",
    "#AB82D1",
    "#FEFBF6",
    "#D3DEF2",
    "#BCB6DA",
    "#D77486",
    "#ADBA9C",
    "#E09F89",
    "#F7DFA1",
    "#C5DBAC",
    "#FCF4CF",
    "#B96080",
  ]

  const schedule = [
    { label: "Ceremony Begins", value: ceremony.time },
    entourageCall && { label: "Entourage Call Time", value: entourageCall },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <Section id="details" className="relative overflow-hidden py-14 sm:py-18 md:py-20 lg:py-24 bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822]">
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
            <pattern id="scrollPatternDetails" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#scrollPatternDetails)" />
        </svg>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#172822]/80 via-transparent to-[#172822]/80" />
      </div>

      {/* Butterfly accents */}
      <ButterflyCluster
        className="pointer-events-none absolute -top-10 sm:-top-16 -left-6 sm:left-2 opacity-70"
        style={{ width: "150px", height: "150px", transform: "rotate(-8deg)" }}
        ariaHidden={true}
      />
      <ButterflyCluster
        className="pointer-events-none absolute -top-8 sm:-top-12 -right-6 sm:-right-4 opacity-60"
        style={{ width: "140px", height: "140px", transform: "rotate(10deg)" }}
        ariaHidden={true}
      />
      <ButterflyCluster
        className="pointer-events-none absolute top-1/2 sm:top-[45%] right-4 sm:right-10 opacity-50"
        style={{ width: "130px", height: "130px", transform: "rotate(6deg)" }}
        ariaHidden={true}
      />
      <ButterflyCluster
        className="pointer-events-none absolute bottom-4 sm:bottom-10 right-0 sm:right-6 opacity-65"
        style={{ width: "190px", height: "190px", transform: "rotate(12deg)" }}
        ariaHidden={true}
      />

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

      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-white">
            For {siteConfig.couple.bride}
          </div>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_48px_rgba(23,40,34,0.65)] mt-4`}
          >
            Your Evening Guide
          </h2>
          <p
            className={`${inter.className} text-xs sm:text-sm md:text-base text-[#E9D3A4]/90 max-w-2xl mx-auto mt-4 leading-relaxed`}
          >
            Step into the nature's celebration of {siteConfig.couple.bride}&apos;s eighteenth chapter. These notes share the call times, venue details, and dress code so you arrive ready for her natural milestone.
          </p>
        </div>



        <div className="grid gap-5 lg:gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch mb-12 sm:mb-16 lg:mb-20">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/14 bg-white/8 backdrop-blur-2xl shadow-[0_26px_65px_rgba(8,16,34,0.42)]">
            <div className="relative h-[220px] sm:h-60 md:h-80 lg:h-[420px] xl:h-[460px] overflow-hidden">
              <Image
                src="/Details/Roys Hotel Bacolod.jpg"
                alt={venue}
                fill
                priority
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172822]/95 via-[#172822]/35 to-transparent" />
            </div>

            <div className="p-4 sm:p-7 lg:p-8 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="inline-flex justify-center rounded-full border border-white/18 bg-white/10 px-4 py-1.5 text-white/80 text-[9px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.32em] uppercase whitespace-nowrap">
                  {`${ceremony.day}, ${ceremony.date}`}
                </div>
                <p className="text-[10px] sm:text-xs text-[#E9D3A4]/70 tracking-[0.3em] uppercase text-center sm:text-right">
                  Doors open in the nature's evening
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {schedule.map((entry) => (
                  <div
                    key={entry.label}
                    className="rounded-2xl border border-white/18 bg-white/12 px-3.5 py-3 text-center shadow-[0_12px_30px_rgba(12,20,46,0.28)]"
                  >
                    <p className="text-[9px] sm:text-[11px] tracking-[0.34em] uppercase text-white/70 mb-1">
                      {entry.label}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-white text-sm sm:text-base font-semibold">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{entry.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-row gap-2.5 sm:gap-3">
                <button
                  onClick={openInMaps}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E6A379] px-4 py-3 text-xs sm:text-sm font-semibold text-[#172822] transition-all duration-300 hover:-translate-y-1"
                  aria-label="Get directions to the venue"
                >
                  <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Get Directions
                </button>
                <button
                  onClick={() => copyToClipboard(venueAddress, "venue")}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-4 py-3 text-xs sm:text-sm font-semibold text-white/85 shadow-[0_12px_30px_rgba(12,20,48,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:text-white"
                  aria-label="Copy venue address"
                >
                  {copiedItems.has("venue") ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {copiedItems.has("venue") ? "Copied!" : "Copy Address"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div className="rounded-[26px] sm:rounded-[30px] border border-white/18 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,16,34,0.4)] p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <PartyPopper className="h-6 w-6 text-[#E6A379]" />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Debut Agenda</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Moments to Look Forward To</h3>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-1 h-3.5 w-3.5 text-[#E6A379]" />
                  18 Enchanting Flowers &amp; 18 Treasures will follow after the formal program—prepare a short wish or keepsake.
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-1 h-3.5 w-3.5 text-[#E6A379]" />
                  Please arrive before the entourage call time to sign the debut guest book and take portraits.
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-1 h-3.5 w-3.5 text-[#E6A379]" />
                  Program wraps by 9:00 PM so you can rest and travel home safely.
                </li>
              </ul>
            </div>

            <div className="rounded-[26px] sm:rounded-[30px] border border-white/18 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,16,34,0.4)] p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6 text-[#E6A379]" />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Attire & Palette</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Pastel Spring Party</h3>
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75 leading-relaxed">
                <li>
                  Ladies: {siteConfig.dressCode.guests.ladies}.
                </li>
                <li>Gentlemen: {siteConfig.dressCode.guests.gentlemen}.</li>
                <li className="italic text-white/85">{siteConfig.dressCode.note}</li>
              </ul>
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-[0_8px_24px_rgba(10,16,34,0.4)]">
                <Image
                  src="/Details/Attire%20Guide.png"
                  alt="Attire Color Palette Guide"
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-[11px] sm:text-sm text-white/75">
                Kindly align outfits with the debut palette below for a cohesive, nature's look.
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {colorPalette.map((hex) => (
                  <span
                    key={hex}
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-white/25 shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
                    style={{ backgroundColor: hex }}
                    aria-label={`Palette color ${hex}`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[26px] sm:rounded-[30px] border border-white/18 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,16,34,0.4)] p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <Car className="h-6 w-6 text-[#E6A379]" />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Travel Notes</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Parking & Transport</h3>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                <li>Complimentary parking is available at the venue—just mention {siteConfig.couple.bride}&apos;s debut at the gate.</li>
                <li>Need a ride? The venue is accessible via private transport; kindly set drop-off to the venue address.</li>
                <li>For guests traveling from afar, nearby accommodations are available in the area.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}






