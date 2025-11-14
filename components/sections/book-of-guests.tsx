"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

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
      className="relative z-[40] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 bg-[#2E041A]"
    >
      {/* Ornate pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Base pattern - diagonal lines forming diamonds */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(252,225,182,0.1) 70px, rgba(252,225,182,0.1) 71px),
              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(252,225,182,0.1) 70px, rgba(252,225,182,0.1) 71px),
              repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(252,225,182,0.08) 35px, rgba(252,225,182,0.08) 36px),
              repeating-linear-gradient(225deg, transparent, transparent 35px, rgba(252,225,182,0.08) 35px, rgba(252,225,182,0.08) 36px)
            `,
            backgroundSize: '70px 70px, 70px 70px, 35px 35px, 35px 35px',
          }}
        />
        
        {/* Decorative scroll motifs - using SVG pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <pattern id="scrollPatternGuests" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
              {/* Scroll motifs at intersections */}
              <g fill="none" stroke="#FCE1B6" strokeWidth="0.5">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E041A]/80 via-transparent to-[#2E041A]/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FCE1B6]/20 bg-[#2E041A]/40 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-[#FCE1B6]">
            Our Honored Guests
          </div>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FCE1B6] drop-shadow-[0_18px_40px_rgba(46,4,26,0.68)]`}
          >
            Celebrating Together
          </h2>
          <p className={`${inter.className} text-xs sm:text-sm md:text-base text-[#FCE1B6]/85 max-w-2xl mx-auto leading-relaxed`}>
            Each name here represents someone special in Kath's life. Thank you for being part of this elegant
            debut celebration and for honoring this milestone with your presence.
          </p>
        </div>

        <div className="relative mb-10 sm:mb-12 lg:mb-16">
          <div className="absolute inset-0 -z-10 blur-3xl bg-[#FCE1B6]/10 opacity-60" />
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border-2 border-[#FCE1B6]/20 bg-[#FCE1B6] shadow-[0_25px_75px_rgba(46,4,26,0.4)] px-6 sm:px-10 md:px-12 py-8 sm:py-10 md:py-12">
            <div className="relative z-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">
                <div className="inline-flex items-center gap-3 sm:gap-4 rounded-2xl border-2 border-[#2E041A]/20 bg-[#2E041A]/10 px-5 py-3 shadow-[0_12px_30px_rgba(46,4,26,0.25)]">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2E041A] shadow-[0_8px_20px_rgba(46,4,26,0.3)]">
                    <Heart className="h-6 w-6 text-[#FCE1B6]" />
                  </div>
                  <div>
                    <p className={`${inter.className} text-[10px] sm:text-xs uppercase tracking-[0.48em] text-[#2E041A]/70`}>
                      confirmed guests
                    </p>
                    <h3
                      className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl text-[#2E041A] leading-tight`}
                    >
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Confirmed
                    </h3>
                  </div>
                </div>

                <div className="grid gap-4 sm:gap-5 text-left sm:text-right">
                  <div>
                    <p className={`${inter.className} text-[10px] sm:text-xs uppercase tracking-[0.42em] text-[#2E041A]/70`}>
                      RSVP ENTRIES
                    </p>
                    <p className={`${playfair.className} text-xl sm:text-2xl text-[#2E041A]`}>
                      {guests.length} {guests.length === 1 ? "Loved One" : "Loved Ones"}
                    </p>
                  </div>
                  <div className="inline-flex items-center justify-center sm:justify-end gap-2 text-[11px] sm:text-xs tracking-[0.4em] uppercase text-[#2E041A]/80">
                    <Sparkles className="h-4 w-4 text-[#2E041A]" />
                    <span>Thank you for joining us</span>
                  </div>
                </div>
              </div>
              <p className={`${inter.className} text-sm sm:text-base text-[#2E041A]/80 leading-relaxed max-w-3xl`}>
                Your RSVP ensures we can prepare for your presence at this elegant celebration. If your plans change,
                please update your response so we can welcome every guest with care and attention.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-[#FCE1B6]/5 blur-3xl opacity-60" />
          <div className="relative overflow-hidden rounded-[30px] border-2 border-[#FCE1B6]/20 bg-[#FCE1B6] shadow-[0_30px_85px_rgba(46,4,26,0.4)] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10">
            {isLoading ? (
              <div className="relative z-10 flex flex-col items-center justify-center gap-5 py-24 sm:py-28">
                <Loader2 className="h-12 w-12 animate-spin text-[#2E041A]" />
                <span className={`${inter.className} text-base sm:text-lg text-[#2E041A]/80`}>
                  Loading the guest list…
                </span>
              </div>
            ) : error ? (
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-24 sm:py-28 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#2E041A] bg-[#2E041A]/10">
                  <MessageSquare className="h-6 w-6 text-[#2E041A]" />
                </div>
                <p className={`${inter.className} text-base sm:text-lg text-[#2E041A]/80 max-w-md`}>{error}</p>
              </div>
            ) : guests.length === 0 ? (
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-24 sm:py-28 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#2E041A] bg-[#2E041A]/10">
                  <Heart className="h-8 w-8 text-[#2E041A]" />
                </div>
                <h3 className={`${playfair.className} text-2xl sm:text-3xl text-[#2E041A]`}>
                  No RSVPs confirmed yet.
                </h3>
                <p className={`${inter.className} text-sm sm:text-base text-[#2E041A]/75 max-w-md`}>
                  Be the first to confirm your attendance at Kath's debut. Your name will appear here as soon as
                  you submit your RSVP.
                </p>
              </div>
            ) : (
              <div className="relative z-10 space-y-3 sm:space-y-4">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border-2 border-[#2E041A]/20 bg-white px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 transition-all duration-300 hover:border-[#2E041A]/40 hover:shadow-[0_12px_30px_rgba(46,4,26,0.25)]"
                  >
                    <div className="relative z-10 flex flex-col sm:flex-row gap-3.5 sm:gap-4.5">
                      <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-[#2E041A] shadow-[0_8px_20px_rgba(46,4,26,0.25)]" />
                        <div className="relative h-full w-full rounded-full border-2 border-[#2E041A]/20 bg-[#FCE1B6] flex items-center justify-center text-[#2E041A] font-semibold text-sm sm:text-base">
                          {getInitials(guest.Name)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                          <div className="flex-1 pr-16 sm:pr-0">
                            <h4
                              className={`${playfair.className} text-lg sm:text-xl text-[#2E041A] group-hover:text-[#2E041A]/80 transition-colors`}
                            >
                              {guest.Name}
                            </h4>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="mt-1 inline-flex items-center gap-2 text-[11px] sm:text-xs text-[#2E041A]/60">
                                <Mail className="h-3.5 w-3.5 text-[#2E041A]/50" />
                                <span className={`${inter.className} break-all`}>{guest.Email}</span>
                              </div>
                            )}
                          </div>

                          <div className="absolute right-4 top-4 sm:static sm:right-auto sm:top-auto inline-flex items-center gap-2">
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#2E041A]/10 border-2 border-[#2E041A]/20">
                              <User className="h-4 w-4 text-[#2E041A]" />
                            </div>
                            <span
                              className={`${inter.className} inline-flex items-center justify-center rounded-full border-2 border-[#2E041A]/20 bg-[#2E041A]/10 px-3.5 py-1.5 text-xs sm:text-sm text-[#2E041A]`}
                            >
                              {guest.Guest ? parseInt(String(guest.Guest)) || 1 : 1}{" "}
                              {(parseInt(String(guest.Guest || "1")) || 1) === 1 ? "guest" : "guests"}
                            </span>
                          </div>
                        </div>

                        {guest.Message && (
                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#2E041A]/20">
                            <div className="flex items-start gap-2 sm:gap-3">
                              <MessageSquare className="mt-0.5 h-4 w-4 text-[#2E041A]" />
                              <p className={`${inter.className} text-sm sm:text-base text-[#2E041A]/80 italic leading-relaxed flex-1`}>
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
