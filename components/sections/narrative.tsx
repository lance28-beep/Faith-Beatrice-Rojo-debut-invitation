"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import Stack from "@/components/stack"
import { motion } from "motion/react"
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
  weight: ["300", "400", "500", "600"],
})

type TabId = "about" | "dreams" | "bio"

const TAB_CONTENT: Record<
  TabId,
  {
    headline: string
    blurb: string
    paragraphs: string[]
    highlights?: string[]
  }
> = {
  about: {
    headline: "Wine-red letters to the heart",
    blurb: "The girl beyond the gown, wrapped in warmth and gratitude.",
    paragraphs: [
      "Kath is a soft-spoken spark who remembers every promise and keeps every kindness tucked away like handwritten notes. She is the eldest sister, the steady confidante, and the creative dreamer who sketches gown details while listening to soul playlists.",
      "Her debut is a love letter to family and friends—the people who whispered prayers, lifted her through late-night talks, and taught her what elegance truly means. Tonight’s palette of wine red, gold, and black mirrors the warmth, loyalty, and boldness she learned from them.",
    ],
    highlights: ["Eldest of three siblings", "Curates soulful playlists", "Collects gilded keepsakes"],
  },
  dreams: {
    headline: "Dreaming in gilded tones",
    blurb: "Plans penned between sketches and candlelit journal pages.",
    paragraphs: [
      "Kath envisions a creative studio that brings luxe soirées to life—where color palettes feel like poetry and every guest receives a story to keep. Her sketchbook brims with corset lines, velvet swatches, and deckled invitations inspired by crimson sunsets.",
      "More than accolades, she longs for slow weekend drives with cousins, mornings steeped in prayer, and a home that hums with music and shared meals. Her dreams glow softly, grounded in faith, family, and a desire to honor the people who shaped her courage.",
    ],
    highlights: ["Study events & design", "Launch a keepsake studio", "Travel with the whole family"],
  },
  bio: {
    headline: "Moments stitched in velvet",
    blurb: "Snapshots that led to this crimson-lit celebration.",
    paragraphs: [
      "Raised in Naga City, Kath grew up arranging living-room performances with cousins and turning every school project into a mini production. Home felt like warm kitchens, loud laughter, and the echo of karaoke microphones.",
      "At sixteen, she planned a small outreach with friends and realized how generosity can linger like perfume. That moment convinced her that elegance and empathy can coexist—and should.",
      "Tonight she stands at the cusp of adulthood, draped in deep hues yet anchored in humility. This debut is her graceful bow to the people who refined her glow.",
    ],
    highlights: ["Born June 13, 2008 — Gemini sun", "Writes acoustic melodies", "Weekend youth volunteer"],
  },
}

export function Narrative() {
  const [activeTab, setActiveTab] = useState<TabId>("about")

  return (
    <Section id="narrative" className="relative py-20 md:py-32 bg-[#1A0310]">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs sm:text-sm tracking-[0.4em] uppercase text-[#FCE1B6]/80 mb-4">
            Crimson tales of the celebrant
          </p>
          <h2
            className={`${greatVibes.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FCE1B6]`}
          >
            My Journey to 18
          </h2>
          <p className={`${inter.className} text-base sm:text-lg md:text-xl text-[#FCE1B6]/80 mt-4 tracking-[0.08em]`}>
            Every chapter glows richer beneath wine-red skies and gilded lights.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col items-center gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="flex justify-center w-full">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Stack
                randomRotation
                sensitivity={190}
                sendToBackOnClick={false}
                cardDimensions={{ width: 280, height: 340 }}
                cardsData={[
                  { id: 1, img: "/desktop-background/image (1).jpg" },
                  { id: 2, img: "/desktop-background/image (2).jpg" },
                  { id: 3, img: "/desktop-background/image (3).jpg" },
                  { id: 4, img: "/desktop-background/image (4).jpg" },
                  { id: 5, img: "/desktop-background/image (5).jpg" },
                  { id: 6, img: "/desktop-background/image (6).jpg" },
                  { id: 7, img: "/desktop-background/image (7).jpg" },

                ]}
                animationConfig={{ stiffness: 260, damping: 22 }}
              />

              <motion.p
                className="text-center text-xs sm:text-sm text-[#FCE1B6]/80 mt-6 tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                drag to discover memories
              </motion.p>
            </motion.div>
          </div>

          <div className="w-full max-w-3xl space-y-8">
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {(["about", "dreams", "bio"] as TabId[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`group relative overflow-hidden rounded-full border border-[#FCE1B6]/25 px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.32em] uppercase transition-all duration-400 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#FCE1B6] via-[#f7d9a2] to-[#FCE1B6] text-[#2E041A] shadow-[0_12px_24px_rgba(252,225,182,0.35)]"
                      : "bg-[#2E041A]/40 text-[#FCE1B6]/75 hover:bg-[#2E041A]/60"
                  }`}
                >
                  <span className="relative z-10">
                    {tab === "about" && "About Me"}
                    {tab === "dreams" && "My Dreams"}
                    {tab === "bio" && "Bio"}
                  </span>
                  {activeTab === tab && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2E041A]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              className="relative overflow-hidden rounded-3xl border border-[#FCE1B6]/25 bg-[#2E041A] px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 transition-all duration-500"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <p className="text-xs sm:text-sm tracking-[0.38em] uppercase text-[#FCE1B6]/70">
                    {TAB_CONTENT[activeTab].blurb}
                  </p>
                  <h3 className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl text-[#FCE1B6] mt-3 leading-tight`}>
                    {TAB_CONTENT[activeTab].headline}
                  </h3>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {TAB_CONTENT[activeTab].paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-sm sm:text-base md:text-lg text-[#FCE1B6]/85 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {TAB_CONTENT[activeTab].highlights && (
                  <div className="pt-4 border-t border-[#FCE1B6]/15">
                    <p className="text-[10px] sm:text-xs tracking-[0.42em] uppercase text-[#FCE1B6]/60 mb-3 sm:mb-4">
                      Favorite highlights
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {TAB_CONTENT[activeTab].highlights?.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full border border-[#FCE1B6]/25 bg-[#2E041A]/40 px-4 py-2 text-[11px] sm:text-xs text-[#FCE1B6]/90 tracking-[0.28em]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FCE1B6]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 grid sm:grid-cols-3 gap-4 sm:gap-6 rounded-3xl border border-[#FCE1B6]/20 bg-[#2E041A] px-6 sm:px-10 md:px-12 py-6 sm:py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            { label: "Debut Date", value: siteConfig.wedding.date },
            { label: "Grand Venue", value: siteConfig.ceremony.venue },
            { label: "Call Time", value: siteConfig.wedding.time },
          ].map((item) => (
            <div key={item.label} className="text-center space-y-2">
              <p className="text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[#FCE1B6]/70">{item.label}</p>
              <p className={`${playfair.className} text-lg sm:text-xl md:text-2xl text-[#FCE1B6]`}>{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
