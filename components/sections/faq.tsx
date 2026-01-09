"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"
import { ButterflyCluster } from "@/components/butterfly-cluster"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

interface FAQItem {
  question: string
  answer: string
}

const debutanteFullName = siteConfig.couple.bride
const debutanteNickname = siteConfig.couple.brideNickname

const faqItems: FAQItem[] = [
  {
    question: `What is the dress code for ${debutanteNickname}'s nature's debut?`,
    answer:
      `Ladies: ${siteConfig.dressCode.guests.ladies}.\n\nGentlemen: ${siteConfig.dressCode.guests.gentlemen}.\n\n${siteConfig.dressCode.note}`,
  },
  {
    question: "When and where is the nature's celebration?",
    answer:
      `${debutanteNickname}'s eighteenth debut is on ${siteConfig.ceremony.day}, ${siteConfig.ceremony.date} at ${siteConfig.ceremony.time} at ${siteConfig.ceremony.venue}. The celebration will take place at ${siteConfig.ceremony.venue}.`,
  },
  {
    question: "What time should I arrive?",
    answer:
      `Guest doors open at ${siteConfig.ceremony.guestsTime}. We recommend arriving 15-20 minutes early to sign the debut guest book, take portraits, and find your seat before the formal program begins.`,
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      `Kindly RSVP by ${siteConfig.details.rsvp.deadline}. Your response helps us prepare for ${debutanteNickname}'s special nature's evening. [RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,
  },
  {
    question: "Is there parking available at the venue?",
    answer:
      `Yes! Complimentary parking is available at ${siteConfig.ceremony.venue}. Just mention ${debutanteNickname}'s debut at the gate. We recommend arriving early to secure a spot.`,
  },
  {
    question: "Can I bring additional guests?",
    answer:
      `We kindly ask that any additional guests be included in your RSVP so we can make proper arrangements. Please update your guest count when you submit your RSVP. Thank you for helping us create a perfect nature's celebration for ${debutanteNickname}!`,
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP. We'll do our best to accommodate your needs.",
  },
  {
    question: "Can I take photos during the debut?",
    answer:
      `Yes! We have a professional photographer, but you're welcome to capture magical moments throughout the evening. We'll have a dedicated time for group photos with ${debutanteNickname} after the formal program.`,
  },
  {
    question: "What should I do if I need to cancel or update my RSVP?",
    answer:
      "Please update your RSVP as soon as possible if your plans change. You can search for your name in the RSVP section and update your response. We appreciate your timely communication!",
  },
  {
    question: "What is the 18 Enchanting Flowers and 18 Treasures ceremony?",
    answer:
      `During the 18 Nature's Flowers and 18 Treasures ceremony, ${debutanteNickname} will receive 18 natural flowers and 18 treasures from loved ones. If you're participating, please prepare a short wish or keepsake. This is a beautiful tradition that celebrates her journey to adulthood in this nature's evening.`,
  },
  {
    question: "What time does the celebration end?",
    answer:
      "The program wraps by 9:00 PM so you can rest and travel home safely. We want everyone to enjoy the nature's evening while ensuring a safe journey home.",
  },
  {
    question: "Will there be a program or schedule for the evening?",
    answer:
      "Yes, there will be a formal program that includes the debutante's entrance, 18 Enchanting Flowers ceremony, 18 treasures presentation, and special performances. The program will be provided at the venue, and we'll ensure all guests are informed of the schedule.",
  },
  {
    question: "Are children welcome at the debut?",
    answer:
      "While we love children, this is a formal evening celebration. We kindly request that only guests listed in your RSVP attend. If you have questions about bringing children, please reach out to us directly.",
  },
  {
    question: "What should I bring to the debut?",
    answer:
      "Just bring yourself and your nature's presence! If you're participating in the 18 Treasures ceremony, please bring your prepared treasure or wish. Otherwise, your attendance is the greatest gift.",
  },
  {
    question: "Is there a specific entrance or registration area?",
    answer:
      "Yes, there will be a registration area at the entrance where you can sign the guest book and receive your program. Our ushers will be available to guide you to your assigned table.",
  },
  {
    question: "What if I'm running late?",
    answer:
      "We understand that sometimes delays happen. Please arrive as soon as possible and our ushers will help you find your seat with minimal disruption to the program.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section
      id="faq"
      className="relative z-[30] overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822]"
    >
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
            <pattern id="scrollPatternFAQ" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#scrollPatternFAQ)" />
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

      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16 px-3 sm:px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-white">
          For {siteConfig.couple.bride}
        </div>
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_48px_rgba(23,40,34,0.65)] mt-4`}
        >
          Frequently Asked Questions
        </h2>
        <p className={`${inter.className} text-xs sm:text-sm md:text-base text-[#E9D3A4]/90 max-w-2xl mx-auto mt-4 leading-relaxed px-2`}>
          Everything you need to know about {debutanteFullName}&apos;s nature's debut celebration
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/25 bg-white shadow-[0_20px_55px_rgba(23,40,34,0.4)] sm:shadow-[0_26px_70px_rgba(23,40,34,0.45)]">
          <div className="relative px-3.5 py-5 sm:px-6 sm:py-8 md:px-10 md:py-10">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-[#172822]/15 bg-white transition-all duration-300 hover:border-[#E6A379]/35 hover:shadow-[0_10px_24px_rgba(23,40,34,0.18)]"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-3.5 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 flex items-start sm:items-center justify-between gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#E6A379]/30 transition-colors min-h-[3.25rem] sm:min-h-[4rem]"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span
                        className={`${playfair.className} font-semibold text-[#172822] flex-1 text-[13px] sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed group-hover:text-[#E6A379] transition-colors duration-200`}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-[#E6A379]/70 flex-shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-[#E6A379]" : ""} w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-0 group-hover:text-[#E6A379]`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3.5 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-white border-t border-[#172822]/10">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className={`${inter.className} text-[#172822]/80 leading-relaxed text-[12px] sm:text-sm md:text-base whitespace-pre-line`}>
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a
                                href="#guest-list"
                                className="text-[#E6A379] underline font-semibold hover:text-[#E6A379]/70 transition-colors break-words"
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className={`${inter.className} text-[#172822]/80 leading-relaxed text-[12px] sm:text-sm md:text-base whitespace-pre-line`}>
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
