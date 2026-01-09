"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { siteConfig } from "@/content/site"
import StaggeredMenu from "./StaggeredMenu"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#gallery", label: "Gallery" },
  { href: "#messages", label: "Messages" },
  { href: "#details", label: "Details" },
  { href: "#entourage", label: "Entourage" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#guest-list", label: "RSVP" },
  { href: "#registry", label: "Registry" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null
        setIsScrolled(window.scrollY > 50)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener("scroll", onScroll as EventListener)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sectionIds = navLinks.map(l => l.href.substring(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible.length > 0) {
          const topMost = visible[0]
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`
            setActiveSection(prev => (prev === newActive ? prev : newActive))
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const menuItems = useMemo(() => navLinks.map((l) => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href })), [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-700 ease-out ${
      isScrolled 
        ? 'bg-[#172822]/98 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(23,40,34,0.6)] border-b border-[#E6A379]/30' 
        : 'bg-[#172822]/95 backdrop-blur-lg border-b border-[#E6A379]/20'
    }`}>
      {/* Elegant glow effect when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#E6A379]/10 via-[#7E8A58]/5 to-[#E6A379]/10 pointer-events-none" />
      )}
      {/* Subtle texture overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#172822]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative">
        <div className="flex justify-between items-center h-14 sm:h-20 md:h-24">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 relative">
              {/* Decorative sparkles on the left */}
              <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 opacity-60 group-hover:opacity-100 transition-all duration-500">
                <Sparkles 
                  size={12} 
                  className="text-[#E6A379] group-hover:animate-pulse drop-shadow-[0_0_8px_rgba(230,163,121,0.6)]" 
                />
              </div>
              
              {/* Decorative dots */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#E6A379] to-[#E9D3A4] group-hover:shadow-[0_0_8px_rgba(230,163,121,0.8)]" />
              </div>
              
              {/* Main text with Fleur De Leah font */}
              <div className="relative">
                <div
                  className="fleur-de-leah-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] group-hover:text-[#E9D3A4] group-active:text-[#E9D3A4] transition-all duration-500 drop-shadow-[0_4px_12px_rgba(23,40,34,0.8)] text-white group-hover:drop-shadow-[0_5px_20px_rgba(230,163,121,0.6),0_0_30px_rgba(233,211,164,0.4)]"
                  style={{ letterSpacing: "0.08em" }}
                >
                  <span className="relative inline-block">
                    {siteConfig.couple.bride}
                    {/* Sparkle effects around the text */}
                    <Sparkles 
                      size={8} 
                      className="absolute -top-2 -left-2 text-[#E6A379] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 drop-shadow-[0_0_6px_rgba(230,163,121,0.8)]" 
                    />
                    <Sparkles 
                      size={8} 
                      className="absolute -bottom-1 -right-2 text-[#E6A379] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700 drop-shadow-[0_0_6px_rgba(230,163,121,0.8)]" 
                    />
                    <Sparkles 
                      size={6} 
                      className="absolute top-1/2 -right-4 text-[#E9D3A4] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-600 drop-shadow-[0_0_4px_rgba(233,211,164,0.8)]" 
                    />
                  </span>
                </div>
                {/* Elegant underline accent */}
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E6A379] via-[#E9D3A4] to-[#E6A379] group-hover:w-full transition-all duration-700 rounded-full group-hover:shadow-[0_0_8px_rgba(230,163,121,0.7)]" />
              </div>
              
              {/* Decorative dots */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#E6A379] to-[#E9D3A4] group-hover:shadow-[0_0_8px_rgba(230,163,121,0.8)]" />
              </div>
              
              {/* Decorative sparkles on the right */}
              <div className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 opacity-60 group-hover:opacity-100 transition-all duration-500">
                <Sparkles 
                  size={12} 
                  className="text-[#E6A379] group-hover:animate-pulse drop-shadow-[0_0_8px_rgba(230,163,121,0.6)]" 
                />
              </div>
            </div>
            
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7E8A58]/0 via-[#E6A379]/10 to-[#7E8A58]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
          </Link>

          <div className="hidden md:flex gap-1.5 lg:gap-2 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all duration-500 relative group drop-shadow-md ${
                    isActive 
                      ? 'text-white bg-gradient-to-br from-[#E6A379]/30 via-[#7E8A58]/20 to-[#E6A379]/25 backdrop-blur-md shadow-[0_4px_15px_rgba(230,163,121,0.4)] border border-[#E6A379]/50' 
                      : 'hover:text-white hover:bg-gradient-to-br hover:from-[#E6A379]/20 hover:via-[#7E8A58]/15 hover:to-[#E6A379]/20 hover:backdrop-blur-md hover:border hover:border-[#E6A379]/40 hover:shadow-lg text-[#E9D3A4]/95 hover:scale-105 active:scale-95'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#E6A379] via-[#E9D3A4] to-[#E6A379] transition-all duration-500 rounded-full ${
                    isActive ? 'w-full shadow-[0_0_8px_rgba(230,163,121,0.7)]' : 'w-0 group-hover:w-full group-hover:shadow-[0_0_6px_rgba(230,163,121,0.5)]'
                  }`} />
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#E6A379] animate-pulse shadow-[0_0_6px_rgba(230,163,121,0.9)]" />
                  )}
                  {/* Subtle accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7E8A58]/0 via-[#172822]/5 to-[#7E8A58]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </Link>
              )
            })}
          </div>

          <div className="md:hidden absolute right-2 top-0 z-20">
            {/* Decorative halo to improve tap target and visual affordance */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#E6A379]/20 via-[#7E8A58]/15 to-transparent blur-lg pointer-events-none" />
            <div className="absolute inset-0 rounded-full ring-1 ring-[#E6A379]/30 pointer-events-none" />
            <StaggeredMenu
              position="left"
              items={menuItems}
              socialItems={[]}
              displaySocials={false}
              displayItemNumbering={true}
              menuButtonColor="#E9D3A4"
              openMenuButtonColor="#E6A379"
              changeMenuColorOnOpen={true}
              colors={["#172822", "#172822", "#7E8A58", "#E6A379", "#E9D3A4"]}
              accentColor="#E6A379"
              isFixed={true}
              onMenuOpen={() => {}}
              onMenuClose={() => {}}
            />
          </div>
        </div>

      </div>
    </nav>
  )
}
