"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import Stack from "@/components/stack"
import { motion } from "motion/react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"
import { ButterflyCluster } from "@/components/butterfly-cluster"

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
    headline: "The Enchanted Story",
    blurb: "Like the turning of a page in a fairytale",
    paragraphs: [
      "Like the turning of a page in a fairytale, the time has come for Mikaella to step into a new chapter of her life. You are cordially invited to an enchanted celebration as we mark her 18th birthday in the most magical way.",
      "In the spirit of magic and wonder, we invite you to witness Mikaella's transformation into the young woman she has always been destined to become. The evening will be filled with mystical moments, fairy-tale elegance, and the kind of charm that only an enchanted evening can bring.",
      "This debut marks the moment when Mikaella begins her journey into adulthood, and we would be honored to have you share in this extraordinary celebration.",
    ],
    highlights: [
      "An enchanted evening of transformation",
      "Mystical moments and fairy-tale elegance",
      "A magical celebration of womanhood",
    ],
  },
  dreams: {
    headline: "The Magic of New Beginnings",
    blurb: "Stepping into a world of wonder and possibility",
    paragraphs: [
      "As Mikaella steps into this new chapter, she carries with her the dreams of a young woman ready to embrace all that life has to offer. This enchanted evening marks not just a birthday, but the beginning of a journey filled with endless possibilities.",
      "The magic of this night will create memories that will last a lifetime, as we celebrate the beautiful transformation from girl to woman. Every moment will be touched with the wonder and elegance that only an enchanted celebration can bring.",
      "We invite you to be part of this magical moment, to share in the joy and wonder as Mikaella begins her journey into adulthood.",
    ],
    highlights: [
      "A celebration of transformation and growth",
      "Memories that will last a lifetime",
      "An evening filled with magic and wonder",
    ],
  },
  bio: {
    headline: "An Enchanted Journey",
    blurb: "From dreams to reality, with grace and elegance",
    paragraphs: [
      "Mikaella's journey has been one of grace, determination, and the kind of magic that comes from believing in oneself. As she turns 18, she steps into a new world filled with opportunities, dreams, and the promise of a bright future.",
      "This enchanted evening is a celebration of all that she is and all that she will become. It's a moment to honor the past, celebrate the present, and look forward to the future with hope and excitement.",
      "Come and be part of the magic as we celebrate this special milestone in Mikaella's life. Your presence will make this night even more special as we step into a world of wonder and create memories that will last forever.",
    ],
    highlights: [
      "A journey of grace and determination",
      "Celebrating past, present, and future",
      "Creating magical memories together",
    ],
  },
}

export function Narrative() {
  const [activeTab, setActiveTab] = useState<TabId>("about")

  return (
    <Section id="narrative" className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822]">
      {/* Top-right butterfly */}
      <ButterflyCluster
        className="pointer-events-none absolute z-0 opacity-40 sm:opacity-50 md:opacity-60"
        style={{
          right: "-60px",
          top: "5%",
          transform: "scale(0.8) rotate(15deg)",
          width: "150px",
          height: "160px",
        }}
        ariaHidden={true}
      />
      
      {/* Top-left butterfly */}
      <ButterflyCluster
        className="pointer-events-none absolute z-0 opacity-40 sm:opacity-50 md:opacity-60"
        style={{
          left: "-60px",
          top: "8%",
          transform: "scale(0.9) rotate(-15deg)",
          width: "160px",
          height: "170px",
        }}
        ariaHidden={true}
      />
      
      {/* Middle-right butterfly */}
      <ButterflyCluster
        className="pointer-events-none absolute z-0 opacity-45 sm:opacity-55 md:opacity-65"
        style={{
          right: "-70px",
          top: "45%",
          transform: "scale(1.0) rotate(-10deg)",
          width: "170px",
          height: "180px",
        }}
        ariaHidden={true}
      />
      
      {/* Middle-left butterfly */}
      <ButterflyCluster
        className="pointer-events-none absolute z-0 opacity-40 sm:opacity-50 md:opacity-60"
        style={{
          left: "-70px",
          top: "50%",
          transform: "scale(0.85) rotate(12deg)",
          width: "155px",
          height: "165px",
        }}
        ariaHidden={true}
      />
      
      {/* Bottom-right butterfly */}
      <ButterflyCluster
        className="pointer-events-none absolute z-0 opacity-50 sm:opacity-60 md:opacity-70"
        style={{
          right: "-80px",
          bottom: "10%",
          transform: "scale(1.1) rotate(20deg)",
          width: "180px",
          height: "190px",
        }}
        ariaHidden={true}
      />
      
      {/* Bottom-left butterfly */}
      <ButterflyCluster
        className="pointer-events-none absolute z-0 opacity-45 sm:opacity-55 md:opacity-65"
        style={{
          left: "-75px",
          bottom: "8%",
          transform: "scale(0.95) rotate(-18deg)",
          width: "165px",
          height: "175px",
        }}
        ariaHidden={true}
      />
      
      {/* Additional floating butterfly near content area - top */}
      <ButterflyCluster
        className="pointer-events-none absolute z-0 opacity-30 sm:opacity-40 md:opacity-50"
        style={{
          right: "15%",
          top: "25%",
          transform: "scale(0.6) rotate(8deg)",
          width: "120px",
          height: "130px",
        }}
        ariaHidden={true}
      />
      
      {/* Additional floating butterfly near content area - bottom */}
      <ButterflyCluster
        className="pointer-events-none absolute z-0 opacity-35 sm:opacity-45 md:opacity-55"
        style={{
          left: "12%",
          bottom: "25%",
          transform: "scale(0.7) rotate(-12deg)",
          width: "135px",
          height: "145px",
        }}
        ariaHidden={true}
      />
      
      <Image
        src="/lavander%20decoration/righ-bottom-corner.png"
        alt=""
        width={420}
        height={420}
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 right-[-40px] w-48 sm:w-64 md:w-72 opacity-80"
        sizes="(max-width: 640px) 12rem, (max-width: 768px) 16rem, 18rem"
        priority={false}
      />
      <Image
        src="/lavander%20decoration/righ-bottom-corner.png"
        alt=""
        width={420}
        height={420}
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-[-40px] w-40 sm:w-56 md:w-64 opacity-70"
        style={{ transform: "scaleX(-1)" }}
        sizes="(max-width: 640px) 10rem, (max-width: 768px) 14rem, 16rem"
        priority={false}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#E9D3A4]/80 mb-2 sm:mb-3 md:mb-4">
            The Enchanted Story
          </p>
          <h2
            className={`${greatVibes.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight drop-shadow-[0_8px_24px_rgba(23,40,34,0.6)]`}
          >
            My Journey to 18
          </h2>
          <p className={`${inter.className} text-sm sm:text-base md:text-lg lg:text-xl text-[#E9D3A4]/90 mt-2 sm:mt-3 md:mt-4 tracking-[0.06em] sm:tracking-[0.08em] px-2`}>
            An enchanted evening filled with mystical moments and fairy-tale elegance.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-12 md:mt-16 flex flex-col items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16"
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
              <div className="scale-75 sm:scale-90 md:scale-100 origin-center">
                <Stack
                  randomRotation
                  sensitivity={190}
                  sendToBackOnClick={false}
                  cardDimensions={{ width: 240, height: 300 }}
                  cardsData={[
                    { id: 1, img: "/mobile-background/debut 3.jpg" },
                    { id: 2, img: "/mobile-background/debut 2.jpg" },
                    { id: 3, img: "/mobile-background/debut 1.jpg" },
                    { id: 4, img: "/mobile-background/debut 4.jpg" },
                    { id: 5, img: "/mobile-background/debut (29).jpg" },
                    { id: 6, img: "/mobile-background/debut (18).jpg" },
                    { id: 7, img: "/mobile-background/debut (5).jpg" },
                    { id: 8, img: "/mobile-background/debut (20).jpg" },
                    { id: 9, img: "/mobile-background/debut (36).jpg" },


                  ]}
                  animationConfig={{ stiffness: 260, damping: 22 }}
                />
              </div>

              <motion.p
                className="text-center text-[10px] sm:text-xs md:text-sm text-white/80 mt-3 sm:mt-4 md:mt-6 tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                drag to discover memories
              </motion.p>
            </motion.div>
          </div>

          <div className="w-full max-w-3xl space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 px-1 sm:px-0 relative">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start relative z-10">
              {(["about", "dreams", "bio"] as TabId[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`group relative overflow-hidden rounded-full border border-[#E6A379]/25 px-3.5 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 text-[10px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.32em] uppercase transition-all duration-400 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#E6A379] via-[#7E8A58] to-[#E6A379] text-white shadow-[0_12px_24px_rgba(230,163,121,0.35)]"
                      : "bg-[#172822]/40 text-white/75 hover:bg-[#172822]/60"
                  }`}
                >
                  <span className="relative z-10">
                    {tab === "about" && "About Me"}
                    {tab === "dreams" && "My Dreams"}
                    {tab === "bio" && "Bio"}
                  </span>
                  {activeTab === tab && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#172822]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              className="relative z-10 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-[#E6A379]/30 bg-[#172822]/95 backdrop-blur-sm mx-1 sm:mx-0 px-3.5 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 transition-all duration-500 shadow-[0_8px_32px_rgba(23,40,34,0.4)] hover:shadow-[0_12px_40px_rgba(230,163,121,0.2)]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E6A379]/5 via-transparent to-[#7E8A58]/5 pointer-events-none" />
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-6 relative z-10">
                <div>
                  <p className="text-[9px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.38em] uppercase text-[#E6A379]/70 leading-snug">
                    {TAB_CONTENT[activeTab].blurb}
                  </p>
                  <h3 className={`${playfair.className} text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#E6A379] mt-1.5 sm:mt-2 md:mt-3 leading-tight`}>
                    {TAB_CONTENT[activeTab].headline}
                  </h3>
                </div>

                <div className="space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-5">
                  {TAB_CONTENT[activeTab].paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-xs sm:text-sm md:text-base lg:text-lg text-[#E9D3A4]/85 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {TAB_CONTENT[activeTab].highlights && (
                  <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-[#E6A379]/15">
                    <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] sm:tracking-[0.42em] uppercase text-[#E6A379]/60 mb-2 sm:mb-3 md:mb-4">
                      Favorite highlights
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5">
                      {TAB_CONTENT[activeTab].highlights?.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 rounded-full border border-[#E6A379]/25 bg-[#172822]/40 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs text-[#E9D3A4]/90 tracking-[0.2em] sm:tracking-[0.24em] md:tracking-[0.28em]"
                        >
                          <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#E6A379] flex-shrink-0" />
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
          className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 rounded-2xl sm:rounded-3xl border border-[#E6A379]/20 bg-[#172822] px-4 sm:px-6 md:px-10 lg:px-12 py-4 sm:py-6 md:py-8"
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
            <div key={item.label} className="text-center space-y-1 sm:space-y-2">
              <p className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.35em] sm:tracking-[0.42em] uppercase text-[#E6A379]/70">{item.label}</p>
              <p className={`${playfair.className} text-base sm:text-lg md:text-xl lg:text-2xl text-[#E6A379] leading-tight`}>{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
