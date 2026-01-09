"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  UserPlus,
} from "lucide-react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })
const debutanteName = siteConfig.couple.bride
const debutanteFirstName = siteConfig.couple.brideNickname

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Guest: "1",
    Message: "",
  })

  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  })

  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchGuests()
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests([])
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = guests.filter((guest) => guest.Name.toLowerCase().includes(query))

    setFilteredGuests(filtered)
    setIsSearching(filtered.length > 0)
  }, [searchQuery, guests])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("We couldn’t load the guest constellation. Please try again.")
      }
      const data = await response.json()
      setGuests(data)
    } catch (err: any) {
      console.error("Error fetching guests:", err)
      setError(err?.message || "We couldn’t load the guest constellation. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.Name)
    setIsSearching(false)

    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Guest: guest.Guest && guest.Guest !== "" ? guest.Guest : "1",
      Message: guest.Message || "",
    })

    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""))
    setShowModal(true)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return

    if (!formData.RSVP) {
      setError(`Please let us know if you can join ${debutanteName}'s debut.`)
      setTimeout(() => setError(null), 5000)
      return
    }

    if (formData.RSVP === "Yes" && (!formData.Guest || parseInt(formData.Guest) < 1)) {
      setError("Let us know how many loved ones are coming with you (at least 1).")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: selectedGuest.Name,
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Guest: formData.RSVP === "Yes" ? (formData.Guest || "1") : "0",
          Message: formData.Message,
        }),
      })

      if (!response.ok) {
        throw new Error("Your RSVP didn’t reach us. Please try again in a moment.")
      }

      setSuccess("Your RSVP is starlit and saved. Thank you!")
      setHasResponded(true)

      window.dispatchEvent(new Event("rsvpUpdated"))

      setTimeout(() => {
        setShowModal(false)
        setSearchQuery("")
        setSelectedGuest(null)
        setSuccess(null)
        fetchGuests()
      }, 3000)
    } catch (err: any) {
      console.error("Error submitting RSVP:", err)
      setError(err?.message || "Your RSVP didn’t reach us. Please try again in a moment.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedGuest(null)
    setSearchQuery("")
    setFormData({ Name: "", Email: "", RSVP: "", Guest: "1", Message: "" })
    setHasResponded(false)
    setError(null)
  }

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Please share your name so we know who to welcome.")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setRequestSuccess(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestFormData),
      })

      if (!response.ok) {
        throw new Error("We couldn’t send your request. Please try again.")
      }

      setRequestSuccess("Your request is on its way. We’ll get back to you shortly!")

      setTimeout(() => {
        setShowRequestModal(false)
        setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
        setSearchQuery("")
        setRequestSuccess(null)
      }, 3000)
    } catch (err: any) {
      console.error("Error submitting request:", err)
      setError(err?.message || "We couldn’t send your request. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseRequestModal = () => {
    setShowRequestModal(false)
    setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
    setError(null)
    setRequestSuccess(null)
  }

  return (
    <Section
      id="guest-list"
      className="relative z-[60] overflow-visible py-16 sm:py-20 md:py-24 lg:py-28 bg-transparent"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-2 sm:space-y-4">
        <div
            className={`inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[9px] sm:text-xs tracking-[0.42em] uppercase text-white ${inter.className}`}
        >
            RSVP & Guestbook
          </div>
          <h2
            className={`${greatVibes.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_40px_rgba(23,40,34,0.68)]`}
          >
            Join Us in This Nature's Celebration
          </h2>
          <p className={`${inter.className} text-[11px] sm:text-sm md:text-base text-[#E9D3A4]/90 max-w-xl sm:max-w-2xl mx-auto leading-relaxed`}>
            Search your name to confirm your presence at {debutanteName}&apos;s debut. Your RSVP helps us create an evening of magic,
            warmth, and cherished memories as we honor this milestone together.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-4 md:px-6">
          <div className="absolute inset-0 -z-10 blur-[72px] bg-[#172822]/60 opacity-70" />
          <div className="relative overflow-visible rounded-2xl sm:rounded-[30px] border border-[#E6A379]/20 bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822] shadow-[0_25px_70px_rgba(23,40,34,0.55)]">
            <div className="relative p-3 sm:p-7 md:p-8 lg:p-10 space-y-3 sm:space-y-8" ref={searchRef}>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="inline-flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-white/25 bg-white/10 shadow-[0_12px_24px_rgba(6,0,20,0.55)]">
                  <Search className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <p className={`${inter.className} text-[8px] sm:text-xs uppercase tracking-[0.3em] text-white/70`}>
                    Step 1
                  </p>
                  <h3 className={`${playfair.className} text-sm sm:text-xl text-white`}>Find Your Name</h3>
                  <p className={`${inter.className} hidden sm:block text-[11px] sm:text-sm text-white/80`}>
                    Begin typing to see your RSVP details appear.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-5 sm:w-5 text-white/50 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type your name..."
                    className={`${inter.className} w-full rounded-xl sm:rounded-2xl border border-white/30 bg-white/5 px-9 sm:px-11 py-2 sm:py-3 text-xs sm:text-base text-white placeholder:text-white/50 shadow-[0_8px_20px_rgba(6,0,20,0.4)] focus:border-white focus:outline-none focus:ring-2 sm:ring-4 focus:ring-white/20 transition-all duration-300`}
                  />
                </div>

                {isSearching && filteredGuests.length > 0 && (
                  <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#E6A379]/40 bg-gradient-to-br from-[#172822] to-[#3B553C] shadow-[0_20px_50px_rgba(23,40,34,0.7)]">
                    {filteredGuests.map((guest, index) => (
                      <button
                        key={`${guest.Name}-${index}`}
                        onClick={() => handleSearchSelect(guest)}
                        className="group flex w-full items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-4 text-left transition-all duration-300 hover:bg-[#E6A379]/20 border-b border-white/10 last:border-b-0"
                      >
                        <div className="inline-flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#E6A379]/30 bg-gradient-to-br from-[#172822] to-[#E6A379] shadow-[0_8px_20px_rgba(230,163,121,0.3)]">
                          <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`${playfair.className} text-xs sm:text-base text-white truncate group-hover:text-[#E6A379]`}>
                            {guest.Name}
                          </p>
                          {guest.Email && guest.Email !== "Pending" && (
                            <p className={`${inter.className} text-[9px] sm:text-[11px] text-white/70 truncate`}>{guest.Email}</p>
                          )}
                        </div>
                        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#E6A379] group-hover:text-white transition-colors" />
                      </button>
                    ))}
                  </div>
                )}

                {searchQuery && filteredGuests.length === 0 && (
                  <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#E6A379]/40 bg-gradient-to-br from-[#172822] to-[#3B553C] shadow-[0_20px_50px_rgba(23,40,34,0.7)]">
                    <div className="space-y-3 sm:space-y-4 px-3 sm:px-5 py-4 sm:py-6">
                      <div className="inline-flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-[#E6A379]/30 bg-gradient-to-br from-[#172822] to-[#E6A379] shadow-[0_12px_30px_rgba(230,163,121,0.4)]">
                        <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <h4 className={`${playfair.className} text-base sm:text-lg text-white`}>Not seeing your name?</h4>
                        <p className={`${inter.className} text-xs sm:text-sm text-white/85 leading-relaxed`}>
                          We&apos;d be honored to have you join us. Send a request and we&apos;ll make sure you&apos;re part of {debutanteName}&apos;s nature's debut celebration.
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setRequestFormData({ ...requestFormData, Name: searchQuery })
                          setShowRequestModal(true)
                        }}
                        className="w-full rounded-xl sm:rounded-2xl bg-[#E6A379] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#172822] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E9D3A4] hover:shadow-[0_12px_30px_rgba(230,163,121,0.6)]"
                      >
                        Request to Join the Celebration
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#172822]/85 backdrop-blur-sm p-1 sm:p-4">
            <div className="relative w-full max-w-[92vw] sm:max-w-3xl overflow-hidden rounded-xl sm:rounded-[32px] border border-[#E6A379]/15 bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822] shadow-[0_45px_140px_rgba(23,40,34,0.85)] text-white">
              <div className="relative flex flex-col">
                <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl px-3 py-3 sm:px-8 sm:py-8">
                  <div className="relative flex items-start justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-3 pr-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 sm:px-4 sm:py-1.5 text-[9px] sm:text-[11px] uppercase tracking-[0.42em] text-white">
                        RSVP Update
                      </div>
                      <h3 className={`${greatVibes.className} text-xl sm:text-3xl md:text-4xl text-white leading-tight`}>
                        Welcome, {(selectedGuest?.Name || formData.Name) || "Guest"}
                      </h3>
                      <p className={`${inter.className} hidden sm:block text-xs sm:text-sm md:text-base text-[#E9D3A4]/85 leading-relaxed`}>
                        We&apos;re delighted to have you join us for {debutanteName}&apos;s nature's debut celebration. Please confirm your attendance for this special evening.
                      </p>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="rounded-full border border-white/25 bg-white/10 p-1.5 sm:p-2 text-white transition-colors hover:bg-white/20 flex-shrink-0 z-10"
                      aria-label="Close modal"
                    >
                      <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative max-h-[calc(100vh-120px)] sm:max-h-[70vh] overflow-y-auto px-3 py-3 sm:px-8 sm:py-8 text-white">
                  {hasResponded ? (
                    <div className="space-y-3 sm:space-y-6 text-center">
                      <div className="mx-auto inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/30 bg-white/10">
                        <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <h4 className={`${playfair.className} text-lg sm:text-2xl text-white`}>Your RSVP is Confirmed</h4>
                        <p className={`${inter.className} text-xs sm:text-sm md:text-base text-[#E9D3A4]/80`}>
                          Thank you for confirming your attendance. We're looking forward to celebrating this nature's evening with you.
                        </p>
                      </div>
                      {selectedGuest?.RSVP === "Yes" && (
                        <div className="mx-auto max-w-sm rounded-lg sm:rounded-2xl border border-white/25 bg-white/5 px-4 py-3 sm:px-6 sm:py-4">
                          <p className={`${inter.className} text-[9px] sm:text-[11px] uppercase tracking-[0.38em] text-white/70`}>
                            Party Count
                          </p>
                          <p className={`${playfair.className} text-xl sm:text-3xl text-white`}>
                            {selectedGuest.Guest || "1"}{" "}
                            {(parseInt(String(selectedGuest.Guest || "1")) || 1) === 1 ? "Guest" : "Guests"}
                          </p>
                        </div>
                      )}
                      {selectedGuest?.Message && selectedGuest.Message.trim() !== "" && (
                        <div className="mx-auto max-w-lg rounded-lg sm:rounded-2xl border border-white/25 bg-white/5 px-4 py-3 sm:px-6 sm:py-4 text-left">
                          <p className={`${inter.className} text-[9px] sm:text-xs uppercase tracking-[0.32em] text-white/70`}>
                            Your Note for {debutanteFirstName}
                          </p>
                          <p className={`${inter.className} mt-1.5 sm:mt-2 text-xs sm:text-sm text-white italic`}>
                            "{selectedGuest.Message}"
                          </p>
                        </div>
                      )}
                      <Button
                        onClick={handleCloseModal}
                        className="rounded-lg sm:rounded-2xl bg-white/10 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-1 hover:bg-white/20"
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmitRSVP()
                      }}
                      className="space-y-3 sm:space-y-5"
                    >
                      <div className="space-y-1.5 sm:space-y-2">
                        <label
                          className={`${inter.className} flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs uppercase tracking-[0.32em] text-white/75`}
                        >
                          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                          Will you be joining us?
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, RSVP: "Yes" }))}
                            className={`rounded-lg sm:rounded-2xl border px-2.5 py-3 sm:px-4 sm:py-5 transition-all ${
                              formData.RSVP === "Yes"
                                ? "border-white bg-white/10 text-white"
                                : "border-white/30 bg-transparent text-white hover:bg-white/5"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-1 sm:gap-2">
                              <CheckCircle
                                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                                  formData.RSVP === "Yes" ? "text-white" : "text-white/70"
                                }`}
                              />
                              <span className={`${playfair.className} text-xs sm:text-lg`}>Yes, I'll attend</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                            className={`rounded-lg sm:rounded-2xl border px-2.5 py-3 sm:px-4 sm:py-5 transition-all ${
                              formData.RSVP === "No"
                                ? "border-white bg-white/10 text-white"
                                : "border-white/30 bg-transparent text-white hover:bg-white/5"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-1 sm:gap-2">
                              <XCircle
                                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                                  formData.RSVP === "No" ? "text-white" : "text-white/70"
                                }`}
                              />
                              <span className={`${playfair.className} text-xs sm:text-lg`}>Send my regards</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      {formData.RSVP === "Yes" && (
                        <div className="space-y-1.5 sm:space-y-2">
                          <label
                            className={`${inter.className} text-[9px] sm:text-xs uppercase tracking-[0.32em] text-white/75`}
                          >
                            How many are joining you?
                          </label>
                          <input
                            type="number"
                            name="Guest"
                            value={formData.Guest}
                            onChange={handleFormChange}
                            min="1"
                            required
                            className={`${inter.className} w-full rounded-lg sm:rounded-2xl border border-white/30 bg-white/5 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20`}
                            placeholder="Enter your guest count"
                          />
                        </div>
                      )}

                      <div className="space-y-1.5 sm:space-y-2">
                        <label className={`${inter.className} text-[9px] sm:text-xs uppercase tracking-[0.32em] text-white/75`}>
                          Message for {debutanteFirstName} <span className="text-white/60">(optional)</span>
                        </label>
                        <textarea
                          name="Message"
                          value={formData.Message}
                          onChange={handleFormChange}
                          rows={3}
                          className={`${inter.className} w-full rounded-lg sm:rounded-2xl border border-white/30 bg-white/5 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 resize-none`}
                          placeholder={`Share a heartfelt message or wish for ${debutanteName} on her special day...`}
                        />
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <label className={`${inter.className} text-[9px] sm:text-xs uppercase tracking-[0.32em] text-white/75`}>
                          Email Address <span className="text-white/60">(optional)</span>
                        </label>
                        <input
                          type="email"
                          name="Email"
                          value={formData.Email}
                          onChange={handleFormChange}
                          className={`${inter.className} w-full rounded-lg sm:rounded-2xl border border-white/30 bg-white/5 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20`}
                          placeholder="For important updates about the celebration"
                        />
                      </div>

                      <div className="pt-1 sm:pt-2">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full rounded-lg sm:rounded-2xl bg-white/10 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-1 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                              <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                              <span>Sending RSVP…</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              <span>Submit RSVP</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                  {success && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#172822]/90 backdrop-blur-xl">
                    <div className="space-y-3 sm:space-y-4 text-center px-3">
                      <div className="mx-auto inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/30 bg-white/10">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <h4 className={`${playfair.className} text-lg sm:text-2xl text-white`}>RSVP Successfully Submitted</h4>
                      <p className={`${inter.className} text-xs sm:text-sm text-[#E9D3A4]/80`}>
                        Thank you for being part of {debutanteName}&apos;s nature's debut celebration. This window will close automatically.
                      </p>
                    </div>
                  </div>
                )}

                {error && !success && (
                  <div className="px-3 pb-3 sm:px-5 sm:pb-6">
                    <div className="rounded-lg sm:rounded-2xl border border-white/25 bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white">
                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showRequestModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#172822]/85 backdrop-blur-sm p-1 sm:p-4">
            <div className="relative w-full max-w-[92vw] sm:max-w-3xl overflow-hidden rounded-xl sm:rounded-[32px] border border-[#E6A379]/15 bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822] shadow-[0_45px_140px_rgba(23,40,34,0.85)] text-white">
              <div className="relative flex flex-col">
                <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl px-3 py-3 sm:px-8 sm:py-8">
                  <div className="relative flex items-start justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-3 pr-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 sm:px-4 sm:py-1.5 text-[9px] sm:text-[11px] uppercase tracking-[0.42em] text-white">
                        Join the Celebration
                      </div>
                      <h3 className={`${greatVibes.className} text-xl sm:text-3xl md:text-4xl text-white leading-tight`}>
                        Join Our Celebration
                      </h3>
                      <p className={`${inter.className} hidden sm:block text-xs sm:text-sm md:text-base text-[#E9D3A4]/85 leading-relaxed`}>
                        We&apos;d be honored to have you join us for {debutanteName}&apos;s debut. Share your details and we&apos;ll reach out to confirm your place at this nature's celebration.
                      </p>
                    </div>
                    <button
                      onClick={handleCloseRequestModal}
                      className="rounded-full border border-white/25 bg-white/10 p-1.5 sm:p-2 text-white transition-colors hover:bg-white/20 flex-shrink-0 z-10"
                      aria-label="Close modal"
                    >
                      <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative max-h-[calc(100vh-120px)] sm:max-h-[70vh] overflow-y-auto px-3 py-3 sm:px-8 sm:py-8 text-white">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRequest()
                    }}
                    className="space-y-3 sm:space-y-5"
                  >
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className={`${inter.className} text-[9px] sm:text-xs uppercase tracking-[0.32em] text-white/75`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="Name"
                        value={requestFormData.Name}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                        required
                        className={`${inter.className} w-full rounded-lg sm:rounded-2xl border border-white/30 bg-white/5 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20`}
                        placeholder="Tell us who's hoping to join"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className={`${inter.className} text-[9px] sm:text-xs uppercase tracking-[0.32em] text-white/75`}>
                        Email Address <span className="text-white/60">(optional)</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={requestFormData.Email}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                        className={`${inter.className} w-full rounded-lg sm:rounded-2xl border border-white/30 bg-white/5 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20`}
                        placeholder="Where can we reach you?"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className={`${inter.className} text-[9px] sm:text-xs uppercase tracking-[0.32em] text-white/75`}>
                        Phone Number <span className="text-white/60">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="Phone"
                        value={requestFormData.Phone}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                        className={`${inter.className} w-full rounded-lg sm:rounded-2xl border border-white/30 bg-white/5 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20`}
                        placeholder="Add a number if that's easier"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className={`${inter.className} text-[9px] sm:text-xs uppercase tracking-[0.32em] text-white/75`}>
                        Number of Guests *
                      </label>
                      <input
                        type="number"
                        name="Guest"
                        value={requestFormData.Guest}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Guest: e.target.value })}
                        min="1"
                        required
                        className={`${inter.className} w-full rounded-lg sm:rounded-2xl border border-white/30 bg-white/5 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20`}
                        placeholder="How many will celebrate with you?"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className={`${inter.className} text-[9px] sm:text-xs uppercase tracking-[0.32em] text-white/75`}>
                        Tell us a little more <span className="text-white/60">(optional)</span>
                      </label>
                      <textarea
                        name="Message"
                        value={requestFormData.Message}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                        rows={3}
                        className={`${inter.className} w-full rounded-lg sm:rounded-2xl border border-white/30 bg-white/5 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 resize-none`}
                        placeholder={`Share how you know ${debutanteFirstName} or what you're most looking forward to at her debut...`}
                      />
                    </div>

                    <div className="pt-1 sm:pt-2">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg sm:rounded-2xl bg-white/10 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-1 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                            <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                            <span>Sending request…</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                            <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span>Submit Request</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>

                  {requestSuccess && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#172822]/90 backdrop-blur-xl">
                      <div className="space-y-3 sm:space-y-4 text-center px-3">
                        <div className="mx-auto inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/30 bg-white/10">
                          <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                        </div>
                        <h4 className={`${playfair.className} text-lg sm:text-2xl text-white`}>Request Received</h4>
                        <p className={`${inter.className} text-xs sm:text-sm text-[#E9D3A4]/80`}>
                          Thank you for your interest in joining us. We'll review your request and reach out to confirm your place at this nature's celebration.
                        </p>
                      </div>
                    </div>
                  )}

                  {error && !requestSuccess && (
                    <div className="px-3 pb-3 sm:px-5 sm:pb-6">
                      <div className="rounded-lg sm:rounded-2xl border border-white/25 bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white">
                          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {success && !showModal && !showRequestModal && !requestSuccess && (
          <div className="fixed left-1/2 top-20 z-[90] w-full max-w-md -translate-x-1/2 px-4">
            <div className="rounded-2xl border border-[#E6A379]/18 bg-[#172822]/90 px-5 py-4 text-center shadow-[0_25px_65px_rgba(23,40,34,0.5)]">
              <div className="flex items-center justify-center gap-2 text-sm text-white">
                <CheckCircle className="h-5 w-5 text-[#E6A379]" />
                <span className={`${inter.className}`}>{success}</span>
              </div>
            </div>
          </div>
        )}

        {error && !showModal && !showRequestModal && !success && !requestSuccess && (
          <div className="fixed left-1/2 top-20 z-[90] w-full max-w-md -translate-x-1/2 px-4">
            <div className="rounded-2xl border border-red-500/45 bg-[#172822]/90 px-5 py-4 text-center shadow-[0_25px_65px_rgba(23,40,34,0.45)]">
              <div className="flex items-center justify-center gap-2 text-sm text-white">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className={`${inter.className}`}>{error}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

