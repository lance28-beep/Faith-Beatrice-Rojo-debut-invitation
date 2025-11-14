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
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
} from "lucide-react"
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
      setError("Please let us know if you can join Kath's debut.")
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 space-y-3 sm:space-y-4">
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-[#FCE1B6]/20 bg-[#2E041A]/40 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-[#FCE1B6] ${inter.className}`}
          >
            RSVP & Guestbook
          </div>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FCE1B6] drop-shadow-[0_18px_40px_rgba(46,4,26,0.68)]`}
          >
            Join Us in This Elegant Celebration
          </h2>
          <p className={`${inter.className} text-xs sm:text-sm md:text-base text-[#FCE1B6]/85 max-w-2xl mx-auto leading-relaxed`}>
            Search your name to confirm your presence at Kath's debut. Your RSVP helps us create an evening of grace,
            warmth, and cherished memories as we honor this milestone together.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 px-2 sm:px-4 md:px-6">
          <div className="absolute inset-0 -z-10 blur-3xl bg-[#2E041A]/20 opacity-60" />
          <div className="relative overflow-visible rounded-[30px] border-2 border-[#2E041A]/20 bg-[#FCE1B6] shadow-[0_28px_75px_rgba(46,4,26,0.4)]">
            <div className="relative p-5 sm:p-7 md:p-9 lg:p-10 space-y-6 sm:space-y-8" ref={searchRef}>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#2E041A] shadow-[0_12px_30px_rgba(46,4,26,0.35)]">
                  <Search className="h-5 w-5 text-[#FCE1B6]" />
                </div>
                <div>
                  <p className={`${inter.className} text-[10px] sm:text-xs uppercase tracking-[0.38em] text-[#2E041A]/70`}>
                    Step 1
                  </p>
                  <h3 className={`${playfair.className} text-lg sm:text-xl text-[#2E041A]`}>Find Your Name</h3>
                  <p className={`${inter.className} text-xs sm:text-sm text-[#2E041A]/75`}>
                    Begin typing to see your RSVP details appear.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2E041A]/40 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type your name to find your invitation..."
                    className={`${inter.className} w-full rounded-2xl border-2 border-[#2E041A]/30 bg-white px-12 py-4 text-sm sm:text-base text-[#2E041A] placeholder:text-[#2E041A]/50 shadow-[0_8px_20px_rgba(46,4,26,0.15)] focus:border-[#2E041A] focus:outline-none focus:ring-4 focus:ring-[#2E041A]/20 transition-all duration-300`}
                  />
                </div>

                {isSearching && filteredGuests.length > 0 && (
                  <div className="absolute z-50 mt-3 w-full overflow-hidden rounded-2xl border-2 border-[#2E041A]/30 bg-[#FCE1B6] shadow-[0_24px_60px_rgba(46,4,26,0.4)]">
                    {filteredGuests.map((guest, index) => (
                      <button
                        key={`${guest.Name}-${index}`}
                        onClick={() => handleSearchSelect(guest)}
                        className="group flex w-full items-center gap-3 px-4 py-4 text-left transition-all duration-300 hover:bg-[#2E041A]/10 border-b border-[#2E041A]/10 last:border-b-0"
                      >
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2E041A] shadow-[0_8px_20px_rgba(46,4,26,0.3)]">
                          <User className="h-4 w-4 text-[#FCE1B6]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`${playfair.className} text-sm sm:text-base text-[#2E041A] truncate group-hover:text-[#2E041A]/80`}>
                            {guest.Name}
                          </p>
                          {guest.Email && guest.Email !== "Pending" && (
                            <p className={`${inter.className} text-[11px] text-[#2E041A]/60 truncate`}>{guest.Email}</p>
                          )}
                        </div>
                        <Sparkles className="h-4 w-4 text-[#2E041A]/50 group-hover:text-[#2E041A] transition-colors" />
                      </button>
                    ))}
                  </div>
                )}

                {searchQuery && filteredGuests.length === 0 && (
                  <div className="absolute z-50 mt-3 w-full overflow-hidden rounded-2xl border-2 border-[#2E041A]/30 bg-[#FCE1B6] shadow-[0_24px_60px_rgba(46,4,26,0.4)]">
                    <div className="space-y-4 px-5 py-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2E041A] shadow-[0_12px_30px_rgba(46,4,26,0.35)]">
                        <UserPlus className="h-5 w-5 text-[#FCE1B6]" />
                      </div>
                      <div className="space-y-2">
                        <h4 className={`${playfair.className} text-lg text-[#2E041A]`}>Not seeing your name?</h4>
                        <p className={`${inter.className} text-sm text-[#2E041A]/75 leading-relaxed`}>
                          We'd be honored to have you join us. Send a request and we'll make sure you're part of Kath's elegant debut celebration.
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setRequestFormData({ ...requestFormData, Name: searchQuery })
                          setShowRequestModal(true)
                        }}
                        className="w-full rounded-2xl bg-[#2E041A] px-5 py-3 text-sm font-semibold text-[#FCE1B6] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(46,4,26,0.4)]"
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
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#2E041A]/80 backdrop-blur-sm p-2 sm:p-4">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-[#FCE1B6]/20 bg-[#FCE1B6] shadow-[0_35px_120px_rgba(46,4,26,0.75)]">
              <div className="relative flex flex-col">
                <div className="relative overflow-hidden bg-[#2E041A] px-5 py-6 sm:px-8 sm:py-8">
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#FCE1B6]/30 bg-[#FCE1B6]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.42em] text-[#FCE1B6]">
                        RSVP Update
                      </div>
                      <h3 className={`${greatVibes.className} text-3xl sm:text-4xl text-[#FCE1B6]`}>
                        Welcome, {selectedGuest?.Name?.split(" ")[0]}
                      </h3>
                      <p className={`${inter.className} text-sm sm:text-base text-[#FCE1B6]/90 leading-relaxed`}>
                        We're delighted to have you join us for Kath's elegant debut celebration. Please confirm your attendance for this special evening.
                      </p>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="rounded-full border border-[#FCE1B6]/30 bg-[#FCE1B6]/10 p-2 text-[#FCE1B6] transition-colors hover:bg-[#FCE1B6]/20"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative max-h-[70vh] overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 bg-[#FCE1B6]">
                  {hasResponded ? (
                    <div className="space-y-6 text-center">
                      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#2E041A] bg-[#2E041A]/10">
                        <CheckCircle className="h-8 w-8 text-[#2E041A]" />
                      </div>
                      <div className="space-y-2">
                        <h4 className={`${playfair.className} text-2xl text-[#2E041A]`}>Your RSVP is Confirmed</h4>
                        <p className={`${inter.className} text-sm sm:text-base text-[#2E041A]/80`}>
                          Thank you for confirming your attendance. We're looking forward to celebrating this elegant evening with you.
                        </p>
                      </div>
                      {selectedGuest?.RSVP === "Yes" && (
                        <div className="mx-auto max-w-sm rounded-2xl border-2 border-[#2E041A] bg-[#2E041A]/10 px-6 py-4">
                          <p className={`${inter.className} text-[11px] uppercase tracking-[0.38em] text-[#2E041A]/70`}>
                            Party Count
                          </p>
                          <p className={`${playfair.className} text-3xl text-[#2E041A]`}>
                            {selectedGuest.Guest || "1"}{" "}
                            {(parseInt(String(selectedGuest.Guest || "1")) || 1) === 1 ? "Guest" : "Guests"}
                          </p>
                        </div>
                      )}
                      {selectedGuest?.Message && selectedGuest.Message.trim() !== "" && (
                        <div className="mx-auto max-w-lg rounded-2xl border-2 border-[#2E041A] bg-[#2E041A]/10 px-6 py-4 text-left">
                          <p className={`${inter.className} text-xs uppercase tracking-[0.32em] text-[#2E041A]/70`}>
                            Your Note for Kath
                          </p>
                          <p className={`${inter.className} mt-2 text-sm text-[#2E041A] italic`}>
                            "{selectedGuest.Message}"
                          </p>
                        </div>
                      )}
                      <Button
                        onClick={handleCloseModal}
                        className="rounded-2xl bg-[#2E041A] px-6 py-3 text-sm font-semibold text-[#FCE1B6] transition-transform duration-300 hover:-translate-y-1"
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
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <label
                          className={`${inter.className} flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#2E041A]`}
                        >
                          <Sparkles className="h-4 w-4 text-[#2E041A]" />
                          Will you be joining us?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, RSVP: "Yes" }))}
                            className={`rounded-2xl border-2 px-4 py-5 transition-all ${
                              formData.RSVP === "Yes"
                                ? "border-[#2E041A] bg-[#2E041A] text-[#FCE1B6]"
                                : "border-[#2E041A] bg-transparent text-[#2E041A] hover:bg-[#2E041A]/10"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <CheckCircle
                                className={`h-5 w-5 ${
                                  formData.RSVP === "Yes" ? "text-[#FCE1B6]" : "text-[#2E041A]"
                                }`}
                              />
                              <span className={`${playfair.className} text-lg`}>Yes, I'll attend</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                            className={`rounded-2xl border-2 px-4 py-5 transition-all ${
                              formData.RSVP === "No"
                                ? "border-[#2E041A] bg-[#2E041A] text-[#FCE1B6]"
                                : "border-[#2E041A] bg-transparent text-[#2E041A] hover:bg-[#2E041A]/10"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <XCircle
                                className={`h-5 w-5 ${
                                  formData.RSVP === "No" ? "text-[#FCE1B6]" : "text-[#2E041A]"
                                }`}
                              />
                              <span className={`${playfair.className} text-lg`}>Send my regards</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      {formData.RSVP === "Yes" && (
                        <div className="space-y-2">
                          <label
                            className={`${inter.className} text-xs uppercase tracking-[0.32em] text-[#2E041A]`}
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
                            className={`${inter.className} w-full rounded-2xl border-2 border-[#2E041A] bg-white px-4 py-3 text-sm text-[#2E041A] placeholder:text-[#2E041A]/50 focus:border-[#2E041A] focus:outline-none focus:ring-2 focus:ring-[#2E041A]/20`}
                            placeholder="Enter your guest count"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-[#2E041A]`}>
                          Message for Kath <span className="text-[#2E041A]/60">(optional)</span>
                        </label>
                        <textarea
                          name="Message"
                          value={formData.Message}
                          onChange={handleFormChange}
                          rows={4}
                          className={`${inter.className} w-full rounded-2xl border-2 border-[#2E041A] bg-white px-4 py-3 text-sm text-[#2E041A] placeholder:text-[#2E041A]/50 focus:border-[#2E041A] focus:outline-none focus:ring-2 focus:ring-[#2E041A]/20 resize-none`}
                          placeholder="Share a heartfelt message or wish for Kath on her special day..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-[#2E041A]`}>
                          Email Address <span className="text-[#2E041A]/60">(optional)</span>
                        </label>
                        <input
                          type="email"
                          name="Email"
                          value={formData.Email}
                          onChange={handleFormChange}
                          className={`${inter.className} w-full rounded-2xl border-2 border-[#2E041A] bg-white px-4 py-3 text-sm text-[#2E041A] placeholder:text-[#2E041A]/50 focus:border-[#2E041A] focus:outline-none focus:ring-2 focus:ring-[#2E041A]/20`}
                          placeholder="For important updates about the celebration"
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full rounded-2xl bg-[#2E041A] px-5 py-3 text-sm font-semibold text-[#FCE1B6] transition-transform duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              <span>Sending RSVP…</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <Heart className="h-4 w-4" />
                              <span>Submit RSVP</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                {success && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#FCE1B6]/95 backdrop-blur-xl">
                    <div className="space-y-4 text-center">
                      <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#2E041A] bg-[#2E041A]/10">
                        <CheckCircle className="h-10 w-10 text-[#2E041A]" />
                      </div>
                      <h4 className={`${playfair.className} text-2xl text-[#2E041A]`}>RSVP Successfully Submitted</h4>
                      <p className={`${inter.className} text-sm text-[#2E041A]/80`}>
                        Thank you for being part of Kath's elegant debut celebration. This window will close automatically.
                      </p>
                    </div>
                  </div>
                )}

                {error && !success && (
                  <div className="px-5 pb-6 sm:px-8">
                    <div className="rounded-2xl border-2 border-[#2E041A] bg-[#2E041A]/10 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-[#2E041A]">
                        <AlertCircle className="h-5 w-5 text-[#2E041A]" />
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
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#2E041A]/80 backdrop-blur-sm p-2 sm:p-4">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-[#FCE1B6]/20 bg-[#FCE1B6] shadow-[0_35px_120px_rgba(46,4,26,0.75)]">
              <div className="relative flex flex-col">
                <div className="relative overflow-hidden bg-[#2E041A] px-5 py-6 sm:px-8 sm:py-8">
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#FCE1B6]/30 bg-[#FCE1B6]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.42em] text-[#FCE1B6]">
                        Join the Celebration
                      </div>
                      <h3 className={`${greatVibes.className} text-3xl sm:text-4xl text-[#FCE1B6]`}>
                        Join Our Celebration
                      </h3>
                      <p className={`${inter.className} text-sm sm:text-base text-[#FCE1B6]/90 leading-relaxed`}>
                        We'd be honored to have you join us for Kath's debut. Share your details and we'll reach out to confirm your place at this elegant celebration.
                      </p>
                    </div>
                    <button
                      onClick={handleCloseRequestModal}
                      className="rounded-full border border-[#FCE1B6]/30 bg-[#FCE1B6]/10 p-2 text-[#FCE1B6] transition-colors hover:bg-[#FCE1B6]/20"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative max-h-[70vh] overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 bg-[#FCE1B6]">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRequest()
                    }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-[#2E041A]`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="Name"
                        value={requestFormData.Name}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                        required
                        className={`${inter.className} w-full rounded-2xl border-2 border-[#2E041A] bg-white px-4 py-3 text-sm text-[#2E041A] placeholder:text-[#2E041A]/50 focus:border-[#2E041A] focus:outline-none focus:ring-2 focus:ring-[#2E041A]/20`}
                        placeholder="Tell us who's hoping to join"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-[#2E041A]`}>
                        Email Address <span className="text-[#2E041A]/60">(optional)</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={requestFormData.Email}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                        className={`${inter.className} w-full rounded-2xl border-2 border-[#2E041A] bg-white px-4 py-3 text-sm text-[#2E041A] placeholder:text-[#2E041A]/50 focus:border-[#2E041A] focus:outline-none focus:ring-2 focus:ring-[#2E041A]/20`}
                        placeholder="Where can we reach you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-[#2E041A]`}>
                        Phone Number <span className="text-[#2E041A]/60">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="Phone"
                        value={requestFormData.Phone}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                        className={`${inter.className} w-full rounded-2xl border-2 border-[#2E041A] bg-white px-4 py-3 text-sm text-[#2E041A] placeholder:text-[#2E041A]/50 focus:border-[#2E041A] focus:outline-none focus:ring-2 focus:ring-[#2E041A]/20`}
                        placeholder="Add a number if that's easier"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-[#2E041A]`}>
                        Number of Guests *
                      </label>
                      <input
                        type="number"
                        name="Guest"
                        value={requestFormData.Guest}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Guest: e.target.value })}
                        min="1"
                        required
                        className={`${inter.className} w-full rounded-2xl border-2 border-[#2E041A] bg-white px-4 py-3 text-sm text-[#2E041A] placeholder:text-[#2E041A]/50 focus:border-[#2E041A] focus:outline-none focus:ring-2 focus:ring-[#2E041A]/20`}
                        placeholder="How many will celebrate with you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-[#2E041A]`}>
                        Tell us a little more <span className="text-[#2E041A]/60">(optional)</span>
                      </label>
                      <textarea
                        name="Message"
                        value={requestFormData.Message}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                        rows={4}
                        className={`${inter.className} w-full rounded-2xl border-2 border-[#2E041A] bg-white px-4 py-3 text-sm text-[#2E041A] placeholder:text-[#2E041A]/50 focus:border-[#2E041A] focus:outline-none focus:ring-2 focus:ring-[#2E041A]/20 resize-none`}
                        placeholder="Share how you know Kath or what you're most looking forward to at her debut..."
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-2xl bg-[#2E041A] px-5 py-3 text-sm font-semibold text-[#FCE1B6] transition-transform duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Sending request…</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            <span>Submit Request</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>

                  {requestSuccess && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#FCE1B6]/95 backdrop-blur-xl">
                      <div className="space-y-4 text-center">
                        <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#2E041A] bg-[#2E041A]/10">
                          <CheckCircle className="h-10 w-10 text-[#2E041A]" />
                        </div>
                        <h4 className={`${playfair.className} text-2xl text-[#2E041A]`}>Request Received</h4>
                        <p className={`${inter.className} text-sm text-[#2E041A]/80`}>
                          Thank you for your interest in joining us. We'll review your request and reach out to confirm your place at this elegant celebration.
                        </p>
                      </div>
                    </div>
                  )}

                  {error && !requestSuccess && (
                    <div className="px-5 pb-6 sm:px-8">
                      <div className="rounded-2xl border-2 border-[#2E041A] bg-[#2E041A]/10 px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-[#2E041A]">
                          <AlertCircle className="h-5 w-5 text-[#2E041A]" />
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
            <div className="rounded-2xl border border-white/18 bg-[#060d1f]/90 px-5 py-4 text-center shadow-[0_25px_65px_rgba(6,14,40,0.5)]">
              <div className="flex items-center justify-center gap-2 text-sm text-white">
                <CheckCircle className="h-5 w-5 text-[#9cd6ff]" />
                <span className={`${inter.className}`}>{success}</span>
              </div>
            </div>
          </div>
        )}

        {error && !showModal && !showRequestModal && !success && !requestSuccess && (
          <div className="fixed left-1/2 top-20 z-[90] w-full max-w-md -translate-x-1/2 px-4">
            <div className="rounded-2xl border border-[#ff8aa4]/45 bg-[#2b1222]/90 px-5 py-4 text-center shadow-[0_25px_65px_rgba(40,10,24,0.45)]">
              <div className="flex items-center justify-center gap-2 text-sm text-white">
                <AlertCircle className="h-5 w-5 text-[#ffb3c4]" />
                <span className={`${inter.className}`}>{error}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

