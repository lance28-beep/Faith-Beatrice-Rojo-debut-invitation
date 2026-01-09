"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"
import { ButterflyCluster } from "@/components/butterfly-cluster"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)
  const debutanteName = siteConfig.couple.bride
  const debutanteFirstName = siteConfig.couple.brideNickname

  const getInitials = (name: string) => {
    if (!name) return "?"
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?"
  }

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("We couldn’t open the guestbook right now. Please try again in a moment.")
      }

      const data: Guest[] = await response.json()

      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || "1",
        }))

      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1
        return sum + guestCount
      }, 0)

      setGuests(attendingGuests)
      setTotalGuests(totalGuestCount)
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "We couldn’t open the guestbook right now. Please try again in a moment.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGuests()

    const handleRsvpUpdate = () => {
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  return (
    <Section
      id="guests"
      className="relative z-[40] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822]"
    >
      <ButterflyCluster
        className="pointer-events-none absolute -top-8 sm:-top-12 left-0 sm:left-8 opacity-70"
        style={{ width: "170px", height: "170px", transform: "rotate(-12deg)" }}
        ariaHidden={true}
      />
      <ButterflyCluster
        className="pointer-events-none absolute bottom-6 sm:bottom-10 right-2 sm:right-8 opacity-60"
        style={{ width: "200px", height: "200px", transform: "rotate(10deg)" }}
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
            <pattern id="scrollPatternGuests" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#scrollPatternGuests)" />
        </svg>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#172822]/80 via-transparent to-[#172822]/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 lg:px-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-14 space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[9px] sm:text-xs tracking-[0.42em] uppercase text-white">
            Guestbook for {debutanteFirstName}
          </div>
          <h2
            className={`${greatVibes.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_40px_rgba(23,40,34,0.8)]`}
          >
            Nature's Signatures of Love
          </h2>
          <p className={`${inter.className} text-[11px] sm:text-sm md:text-base text-[#E9D3A4]/90 max-w-2xl mx-auto leading-relaxed`}>
            Every RSVP is a shimmer on {debutanteName}'s runway to eighteen—thank you for adding your light to
            this natural, nature's celebration.
          </p>
        </div>

        <div className="relative mb-6 sm:mb-12 lg:mb-14">
          <div className="absolute inset-0 -z-10 blur-[70px] bg-white/20 opacity-70" />
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[30px] border border-white/25 bg-white px-3 sm:px-6 md:px-8 py-4 sm:py-8 shadow-[0_25px_75px_rgba(5,0,20,0.45)] text-[#372847]">
            <div className="relative z-10 flex flex-col gap-3 sm:gap-7">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-6">
                <div className="inline-flex items-center gap-2 rounded-xl sm:rounded-2xl border border-[#E6A379]/15 bg-[#E6A379]/5 px-3 py-2.5 sm:px-5 sm:py-4">
                  <div className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#172822] to-[#E6A379] text-white shadow-[0_10px_25px_rgba(23,40,34,0.35)]">
                    <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className={`${inter.className} text-[8px] sm:text-[10px] uppercase tracking-[0.38em] text-[#172822]/70`}>
                      Confirmed Guests
                    </p>
                    <h3 className={`${playfair.className} text-lg sm:text-3xl md:text-4xl leading-tight text-[#172822]`}>
                      {totalGuests} {totalGuests === 1 ? "Radiant Guest" : "Radiant Guests"}
                    </h3>
                  </div>
                </div>

                <div className="grid gap-2 text-left sm:text-right">
                  <div>
                    <p className={`${inter.className} text-[8px] sm:text-[10px] uppercase tracking-[0.32em] text-[#172822]/70`}>
                      RSVP Signatures
                    </p>
                    <p className={`${playfair.className} text-base sm:text-2xl text-[#172822]`}>
                      {guests.length} {guests.length === 1 ? "Loved One" : "Loved Ones"}
                    </p>
                  </div>
                  <div className="inline-flex items-center justify-start sm:justify-end gap-1 text-[8px] sm:text-xs tracking-[0.32em] uppercase text-[#172822]/75">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E6A379]" />
                    <span>Nature's lights await you</span>
                  </div>
                </div>
              </div>
              <p className={`${inter.className} text-[10px] sm:text-sm md:text-base text-[#172822]/85 leading-relaxed max-w-3xl`}>
                Kindly keep your RSVP up to date so we can seat you with grace and welcome you into this nature's celebration the moment you arrive.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-white/10 blur-3xl opacity-60" />
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-[30px] border border-white/25 bg-white shadow-[0_30px_85px_rgba(23,40,34,0.4)] px-3 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-8 md:py-10 text-[#172822]">
            {isLoading ? (
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-16 sm:py-24">
                <Loader2 className="h-10 w-10 animate-spin text-[#E6A379]" />
                <span className={`${inter.className} text-sm sm:text-base text-[#172822]/80`}>
                  Loading the guest list…
                </span>
              </div>
            ) : error ? (
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-16 sm:py-24 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#E6A379]/20 bg-white">
                  <MessageSquare className="h-6 w-6 text-[#E6A379]" />
                </div>
                <p className={`${inter.className} text-sm sm:text-base text-[#172822]/80 max-w-md`}>{error}</p>
              </div>
            ) : guests.length === 0 ? (
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-16 sm:py-24 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#E6A379]/20 bg-white">
                  <Heart className="h-7 w-7 text-[#E6A379]" />
                </div>
                <h3 className={`${playfair.className} text-xl sm:text-3xl text-[#172822]`}>
                  No RSVPs confirmed yet.
                </h3>
                <p className={`${inter.className} text-sm text-[#172822]/75 max-w-md`}>
                  Be the first to confirm your attendance at {debutanteFirstName}'s debut. Your name will appear here as soon as
                  you submit your RSVP.
                </p>
              </div>
            ) : (
              <div className="relative z-10 space-y-2 sm:space-y-3.5">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-[#E6A379]/15 bg-white px-3 sm:px-4 md:px-5 py-3 sm:py-4.5 md:py-5 transition-all duration-300 hover:border-[#E6A379]/40 hover:shadow-[0_12px_26px_rgba(23,40,34,0.18)]"
                  >
                    <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4.5">
                      <div className="relative h-10 w-10 sm:h-14 sm:w-14 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-[#E6A379] shadow-[0_8px_20px_rgba(23,40,34,0.25)]" />
                        <div className="relative h-full w-full rounded-full border border-white/60 bg-white flex items-center justify-center text-[#172822] font-semibold text-[13px] sm:text-base">
                          {getInitials(guest.Name)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
                          <div className="flex-1 pr-12 sm:pr-0">
                            <h4 className={`${playfair.className} text-[15px] sm:text-xl text-[#172822] group-hover:text-[#E6A379] transition-colors`}>
                              {guest.Name}
                            </h4>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="mt-1 inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-[#172822]/70 leading-tight">
                                <Mail className="h-3 w-3 text-[#E6A379]/70" />
                                <span className={`${inter.className} break-all`}>{guest.Email}</span>
                              </div>
                            )}
                          </div>

                          <div className="absolute right-3 top-3 sm:static sm:right-auto sm:top-auto inline-flex items-center gap-1.5 sm:gap-2">
                            <div className="inline-flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white border border-[#E6A379]/20">
                              <User className="h-4 w-4 text-[#E6A379]" />
                            </div>
                            <span
                              className={`${inter.className} inline-flex items-center justify-center rounded-full border border-[#E6A379]/20 bg-white/60 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-sm text-[#172822]`}
                            >
                              {guest.Guest ? parseInt(String(guest.Guest)) || 1 : 1}{" "}
                              {(parseInt(String(guest.Guest || "1")) || 1) === 1 ? "guest" : "guests"}
                            </span>
                          </div>
                        </div>

                        {guest.Message && (
                          <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-[#E6A379]/15">
                            <div className="flex items-start gap-1.5 sm:gap-2">
                              <MessageSquare className="mt-0.5 h-3 w-3 text-[#E6A379]" />
                              <p className={`${inter.className} text-[13px] sm:text-base text-[#172822]/80 italic leading-relaxed flex-1`}>
                                "{guest.Message}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
