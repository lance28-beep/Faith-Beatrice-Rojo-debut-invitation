"use client"

import React from "react"
import { useState, useEffect, useMemo } from "react"
import { Loader2, Users } from "lucide-react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { ButterflyCluster } from "@/components/butterfly-cluster"
import { siteConfig } from "@/content/site"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

interface EntourageMember {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

const ROLE_CATEGORY_ORDER = [
  "The Debutante",
  "Parents",
  "Her Court",
  "Honored Pair",
  "Special Sponsors",
  "Circle of Eighteen",
  "Event Coordinators",
  "Dancers",
  "Young Attendants",
  "Special Roles",
]

const DEFAULT_CATEGORY_MAP: Record<string, string> = {
  "The Couple": "The Debutante",
  "Parents of the Bride": "Parents",
  "Parents of the Groom": "Parents",
  "Best Man": "Her Court",
  "Maid/Matron of Honor": "Her Court",
  "Bridesmaids": "Circle of Eighteen",
  "Groomsmen": "Circle of Eighteen",
  "Candle Sponsors": "Special Sponsors",
  "Veil Sponsors": "Special Sponsors",
  "Cord Sponsors": "Special Sponsors",
  "Flower Girls": "Young Attendants",
  "Ring/Coin Bearers": "Young Attendants",
  "Bible Bearer": "Special Roles",
  "Presider": "Special Roles",
  "Reader": "Special Roles",
  "Dancers": "Dancers",
  "Coordinators": "Event Coordinators",
}

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEntourage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data: EntourageMember[] = await response.json()
      setEntourage(data)
    } catch (error: any) {
      console.error("Failed to load entourage:", error)
      setError(error?.message || "Failed to load entourage")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEntourage()

    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage()
      }, 1000)
    }

    window.addEventListener("entourageUpdated", handleEntourageUpdate)

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate)
    }
  }, [])

  const remapCategory = (original: string) => {
    if (!original) return "Special Roles"
    return DEFAULT_CATEGORY_MAP[original] || original
  }

  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {}

    entourage.forEach((member) => {
      const category = remapCategory(member.RoleCategory)
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(member)
    })

    return grouped
  }, [entourage])

  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <h3
                  className={`${playfair.className} text-[10px] sm:text-sm md:text-base tracking-[0.4em] sm:tracking-[0.45em] uppercase text-[#172822] font-semibold mb-1.5 sm:mb-2 md:mb-3 ${textAlign} ${className}`}
      >
        {children}
      </h3>
    )
  }

  const capitalizeName = (name: string) => {
    if (!name) return name
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  const NameItem = ({
    member,
    align = "center",
    showRole = true,
  }: {
    member: EntourageMember
    align?: "left" | "center" | "right"
    showRole?: boolean
  }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1.5 md:py-2 leading-tight sm:leading-relaxed`}
      >
        <p className={`${inter.className} text-[12px] sm:text-sm md:text-base font-medium text-[#172822] ${textAlign}`}>
          {capitalizeName(member.Name)}
        </p>
        {showRole && member.RoleTitle && (
          <p className={`${inter.className} text-[9px] sm:text-[11px] md:text-xs font-normal text-[#172822]/70 mt-0 leading-tight sm:leading-snug ${textAlign}`}>
            {member.RoleTitle}
          </p>
        )}
      </div>
    )
  }

  const TwoColumnLayout = ({
    children,
    leftTitle,
    rightTitle,
    singleTitle,
    centerContent = false,
  }: {
    children: React.ReactNode
    leftTitle?: string
    rightTitle?: string
    singleTitle?: string
    centerContent?: boolean
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div
            className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-3 md:gap-x-5 gap-y-1 sm:gap-y-2 md:gap-y-3 ${centerContent ? "max-w-2xl mx-auto" : ""}`}
          >
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-3 md:gap-x-5 mb-2 sm:mb-3">
          {leftTitle && (
            <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-5">
              {leftTitle}
            </SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-5">
              {rightTitle}
            </SectionTitle>
          )}
        </div>
        <div
          className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-3 md:gap-x-5 gap-y-1 sm:gap-y-2 md:gap-y-3 ${centerContent ? "max-w-2xl mx-auto" : ""}`}
        >
          {children}
        </div>
      </div>
    )
  }

  const renderDivider = (categoryIndex: number) =>
    categoryIndex > 0 && (
      <div className="flex justify-center py-2 sm:py-3 mb-3 sm:mb-5 md:mb-6">
        <div className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent via-[#E6A379]/20 to-transparent" />
      </div>
    )

  return (
    <section
      id="entourage"
      className="relative overflow-hidden py-8 sm:py-12 md:py-20 lg:py-24 bg-transparent"
    >
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

      <div className="relative z-10 text-center mb-6 sm:mb-10 md:mb-12 px-3 sm:px-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[9px] sm:text-xs tracking-[0.42em] uppercase text-white">
          {siteConfig.couple.bride}&apos;s Circle
        </div>
        <h2
          className={`${greatVibes.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_48px_rgba(23,40,34,0.75)] mt-2 sm:mt-4`}
        >
          Her Nature's Entourage
        </h2>
        <p
          className={`${inter.className} text-[11px] sm:text-sm md:text-base text-[#E9D3A4]/90 max-w-2xl mx-auto mt-2 sm:mt-4 leading-relaxed px-2`}
        >
          Every role blooms around {siteConfig.couple.bride}—parents, sponsors, and friends who hold her steady, cheer her on, and illuminate the evening with their love.
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="relative bg-white border-2 border-[#E6A379]/20 rounded-lg sm:rounded-2xl shadow-[0_25px_80px_rgba(23,40,34,0.45)] overflow-hidden">
          <div className="absolute inset-[8px] sm:inset-[14px] md:inset-[18px] border-2 border-[#E6A379]/20 rounded-md sm:rounded-xl pointer-events-none" />
          <div className="relative p-3 sm:p-6 md:p-9 lg:p-12">
            {isLoading ? (
              <div className="flex items-center justify-center py-12 sm:py-20">
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-[#E6A379]" />
                  <span className={`${inter.className} text-[#172822]/80 text-sm sm:text-lg`}>
                    Loading the entourage…
                  </span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12 sm:py-20">
                <div className="text-center">
                  <p className={`${inter.className} text-red-600 text-sm sm:text-lg mb-2`}>{error}</p>
                  <button
                    onClick={fetchEntourage}
                    className={`${playfair.className} text-[#E6A379] hover:text-[#E6A379]/70 transition-colors underline text-sm sm:text-base`}
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : entourage.length === 0 ? (
              <div className="text-center py-12 sm:py-20">
                <Users className="h-12 w-12 sm:h-16 sm:w-16 text-[#E6A379]/30 mx-auto mb-3 sm:mb-4" />
                <p className={`${inter.className} text-[#172822]/70 text-sm sm:text-lg`}>
                  The entourage list will be available soon.
                </p>
              </div>
            ) : (
              <div className="relative z-10 w-full">
                {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                  const members = grouped[category] || []
                  if (members.length === 0) return null

                  if (category === "The Debutante") {
                    const debutante = members[0]
                    return (
                      <div key={category}>
                        {renderDivider(categoryIndex)}
                        <TwoColumnLayout singleTitle="The Debutante" centerContent>
                          <div className="col-span-full">
                            <div className="max-w-sm mx-auto px-1.5 sm:px-3">
                              {debutante && <NameItem member={debutante} align="center" showRole />}
                            </div>
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  if (category === "Parents") {
                    const parents = members
                    const left = parents.filter((member) =>
                      member.RoleTitle?.toLowerCase().includes("father")
                    )
                    const right = parents.filter((member) =>
                      member.RoleTitle?.toLowerCase().includes("mother")
                    )
                    const maxLen = Math.max(left.length, right.length)
                    return (
                      <div key={category}>
                        {renderDivider(categoryIndex)}
                        <TwoColumnLayout leftTitle="Fathers" rightTitle="Mothers">
                          {Array.from({ length: maxLen }).map((_, idx) => (
                            <React.Fragment key={`parents-row-${idx}`}>
                              <div className="px-1.5 sm:px-3 md:px-5">
                                {left[idx] ? <NameItem member={left[idx]} align="right" /> : <div className="py-1" />}
                              </div>
                              <div className="px-1.5 sm:px-3 md:px-5">
                                {right[idx] ? <NameItem member={right[idx]} align="left" /> : <div className="py-1" />}
                              </div>
                            </React.Fragment>
                          ))}
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  if (category === "Her Court" || category === "Honored Pair") {
                    const leftMembers = grouped["Honored Pair"] || []
                    const rightMembers = grouped["Her Court"] || []
                    if (category !== "Honored Pair") return null
                    const maxLen = Math.max(leftMembers.length, rightMembers.length)
                    return (
                      <div key="court">
                        {renderDivider(categoryIndex)}
                        <TwoColumnLayout leftTitle="Honored Pair" rightTitle="Her Court">
                          {Array.from({ length: maxLen }).map((_, idx) => (
                            <React.Fragment key={`court-row-${idx}`}>
                              <div className="px-1.5 sm:px-3 md:px-5">
                                {leftMembers[idx] ? (
                                  <NameItem member={leftMembers[idx]} align="right" />
                                ) : (
                                  <div className="py-1" />
                                )}
                              </div>
                              <div className="px-1.5 sm:px-3 md:px-5">
                                {rightMembers[idx] ? (
                                  <NameItem member={rightMembers[idx]} align="left" />
                                ) : (
                                  <div className="py-1" />
                                )}
                              </div>
                            </React.Fragment>
                          ))}
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  if (category === "Circle of Eighteen") {
                    const debutantes = grouped["Circle of Eighteen"] || []
                    const half = Math.ceil(debutantes.length / 2)
                    const left = debutantes.slice(0, half)
                    const right = debutantes.slice(half)
                    const maxLen = Math.max(left.length, right.length)
                    return (
                      <div key="circle">
                        {renderDivider(categoryIndex)}
                        <TwoColumnLayout leftTitle="Circle A" rightTitle="Circle B">
                          {Array.from({ length: maxLen }).map((_, idx) => (
                            <React.Fragment key={`circle-row-${idx}`}>
                              <div className="px-1.5 sm:px-3 md:px-5">
                                {left[idx] ? <NameItem member={left[idx]} align="right" /> : <div className="py-1" />}
                              </div>
                              <div className="px-1.5 sm:px-3 md:px-5">
                                {right[idx] ? <NameItem member={right[idx]} align="left" /> : <div className="py-1" />}
                              </div>
                            </React.Fragment>
                          ))}
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  if (category === "Special Sponsors") {
                    const sponsors = members
                    const half = Math.ceil(sponsors.length / 2)
                    const left = sponsors.slice(0, half)
                    const right = sponsors.slice(half)
                    const maxLen = Math.max(left.length, right.length)
                    return (
                      <div key="sponsors">
                        {renderDivider(categoryIndex)}
                        <TwoColumnLayout leftTitle="Special Sponsors A" rightTitle="Special Sponsors B">
                          {Array.from({ length: maxLen }).map((_, idx) => (
                            <React.Fragment key={`sponsors-row-${idx}`}>
                              <div className="px-1.5 sm:px-3 md:px-5">
                                {left[idx] ? <NameItem member={left[idx]} align="right" /> : <div className="py-1" />}
                              </div>
                              <div className="px-1.5 sm:px-3 md:px-5">
                                {right[idx] ? <NameItem member={right[idx]} align="left" /> : <div className="py-1" />}
                              </div>
                            </React.Fragment>
                          ))}
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  const singleColumn = new Set([
                    "Honored Pair",
                    "Event Coordinators",
                    "Dancers",
                    "Young Attendants",
                    "Special Roles",
                  ])

                  return (
                    <div key={category}>
                      {renderDivider(categoryIndex)}
                      <TwoColumnLayout singleTitle={category} centerContent>
                        {(() => {
                          if (singleColumn.has(category) || members.length <= 2) {
                            return (
                              <div className="col-span-full">
                                <div className="max-w-sm mx-auto flex flex-col items-center gap-1.5 sm:gap-2">
                                  {members.map((member, idx) => (
                                    <NameItem
                                      key={`${category}-${idx}-${member.Name}`}
                                      member={member}
                                      align="center"
                                    />
                                  ))}
                                </div>
                              </div>
                            )
                          }

                          const half = Math.ceil(members.length / 2)
                          const left = members.slice(0, half)
                          const right = members.slice(half)
                          const maxLen = Math.max(left.length, right.length)
                          return Array.from({ length: maxLen }).map((_, idx) => (
                            <React.Fragment key={`${category}-row-${idx}`}>
                              <div className="px-1.5 sm:px-3 md:px-5">
                                {left[idx] ? <NameItem member={left[idx]} align="right" /> : <div className="py-1" />}
                              </div>
                              <div className="px-1.5 sm:px-3 md:px-5">
                                {right[idx] ? <NameItem member={right[idx]} align="left" /> : <div className="py-1" />}
                              </div>
                            </React.Fragment>
                          ))
                        })()}
                      </TwoColumnLayout>
                    </div>
                  )
                })}

                {Object.keys(grouped)
                  .filter((cat) => !ROLE_CATEGORY_ORDER.includes(cat))
                  .map((category) => {
                    const members = grouped[category]
                    if (!members || members.length === 0) return null
                    return (
                      <div key={category}>
                        <div className="flex justify-center py-2 sm:py-3 mb-3 sm:mb-5 md:mb-6">
                          <div className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent via-[#E6A379]/20 to-transparent" />
                        </div>
                        <TwoColumnLayout singleTitle={category} centerContent>
                          {(() => {
                            if (members.length <= 2) {
                              return (
                                <div className="col-span-full">
                                  <div className="max-w-sm mx-auto flex flex-col items-center gap-1.5 sm:gap-2">
                                    {members.map((member, idx) => (
                                      <NameItem
                                        key={`${category}-${idx}-${member.Name}`}
                                        member={member}
                                        align="center"
                                      />
                                    ))}
                                  </div>
                                </div>
                              )
                            }
                            const half = Math.ceil(members.length / 2)
                            const left = members.slice(0, half)
                            const right = members.slice(half)
                            const maxLen = Math.max(left.length, right.length)
                            return Array.from({ length: maxLen }).map((_, idx) => (
                              <React.Fragment key={`${category}-row-${idx}`}>
                                <div className="px-1.5 sm:px-3 md:px-5">
                                  {left[idx] ? <NameItem member={left[idx]} align="right" /> : <div className="py-1" />}
                                </div>
                                <div className="px-1.5 sm:px-3 md:px-5">
                                  {right[idx] ? <NameItem member={right[idx]} align="left" /> : <div className="py-1" />}
                                </div>
                              </React.Fragment>
                            ))
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

