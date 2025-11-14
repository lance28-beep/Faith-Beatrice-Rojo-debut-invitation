"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-[#FCE1B6]/20 shadow-[0_20px_40px_rgba(46,4,26,0.35)] bg-[#2E041A]/30 backdrop-blur-xl rounded-3xl">
            <CardContent className="p-4 sm:p-6 lg:p-7">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                <Skeleton className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FCE1B6]/20" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 sm:w-32 bg-[#FCE1B6]/20" />
                  <Skeleton className="h-3 w-20 sm:w-28 bg-[#FCE1B6]/15" />
                </div>
              </div>
              <Skeleton className="h-20 sm:h-24 w-full rounded-2xl bg-[#FCE1B6]/15" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 px-4">
        <div className="relative inline-block mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCE1B6]/25 to-[#f7d9a2]/20 rounded-full blur-xl scale-150 animate-pulse" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#2E041A] to-[#640c35] rounded-full flex items-center justify-center mx-auto shadow-[0_18px_35px_rgba(46,4,26,0.5)] border border-[#FCE1B6]/30">
            <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-[#FCE1B6]" />
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-[#FCE1B6] mb-3 sm:mb-4">
          No Gilded Wishes Yet
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-[#FCE1B6]/85 font-lora max-w-md mx-auto leading-relaxed">
          Be the first to pen a wish for Kath's eighteenth celebration—your message will shine here in wine red and gold.
        </p>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-[#FCE1B6]/80">
            <Sparkles className="h-4 w-4 animate-pulse text-[#FCE1B6]" />
            <span className="text-xs sm:text-sm font-lora text-[#FCE1B6] tracking-[0.28em] uppercase">Her crimson keepsake awaits</span>
            <Sparkles className="h-4 w-4 animate-pulse text-[#FCE1B6]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border border-[#FCE1B6]/30 shadow-[0_24px_55px_rgba(46,4,26,0.4)] bg-white/85 backdrop-blur-2xl hover:shadow-[0_30px_65px_rgba(46,4,26,0.5)] hover:border-[#FCE1B6]/40 transition-all duration-500 group overflow-hidden rounded-[26px] ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FCE1B6]/15 via-white/60 to-[#FCE1B6]/10 opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E041A]/5 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FCE1B6] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-left" />
          <div className="absolute -inset-[1px] rounded-[26px] pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(252,225,182,0.2)' }} />
          
          <CardContent className="relative p-5 sm:p-7 lg:p-8">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#2E041A] to-[#640c35] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_16px_32px_rgba(46,4,26,0.4)] border border-[#FCE1B6]/30">
                    <span className="text-[#FCE1B6] font-lora text-sm sm:text-base font-semibold tracking-wide">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FCE1B6]/25 to-[#2E041A]/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-lora text-[#2E041A] text-base sm:text-lg font-semibold truncate tracking-wide">{msg.name}</h4>
                  <span className="text-[11px] sm:text-sm text-[#2E041A]/70 font-lora">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-[#2E041A]/70 fill-[#2E041A]/20 group-hover:fill-[#2E041A]/40 group-hover:text-[#2E041A] transition-all duration-300" />
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#2E041A]/70 group-hover:text-[#2E041A] transition-colors duration-300" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-1 -top-1 sm:-left-2 sm:-top-3 text-2xl sm:text-4xl text-[#2E041A]/20 font-playfair group-hover:text-[#2E041A]/30 transition-colors duration-300">\"</span>
              <p className="text-[#2E041A] text-sm sm:text-base leading-relaxed pl-4 sm:pl-6 font-lora group-hover:text-[#2E041A] transition-colors duration-300">{msg.message}</p>
              <span className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-3 text-2xl sm:text-4xl text-[#2E041A]/20 font-playfair group-hover:text-[#2E041A]/30 transition-colors duration-300">\"</span>
            </div>
            
            <div className="mt-4 flex justify-end">
              <div className="w-14 h-px bg-gradient-to-r from-transparent via-[#2E041A]/30 to-transparent group-hover:via-[#2E041A]/50 transition-colors duration-300" />
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="pt-4 sm:pt-6 text-center">
        <div className="relative inline-flex flex-col items-center gap-3 px-5 py-4 rounded-3xl border border-[#FCE1B6]/30 bg-white/85 backdrop-blur-xl shadow-[0_18px_45px_rgba(46,4,26,0.4)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FCE1B6]/15 via-white/60 to-[#FCE1B6]/10 opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E041A]/5 via-transparent to-transparent" />
          <p className="relative text-xs sm:text-sm font-lora text-[#2E041A] leading-relaxed max-w-md font-medium">
            Have a memory, blessing, or gilded wish for Kath? Add your letter above and let her feel your love on this crimson evening.
          </p>
          <div className="relative inline-flex items-center gap-2 text-[#2E041A] text-[10px] sm:text-xs tracking-[0.38em] uppercase font-semibold">
            <Sparkles className="h-4 w-4 animate-pulse text-[#2E041A]" />
            <span>Pen your gilded wish</span>
            <Sparkles className="h-4 w-4 animate-pulse text-[#2E041A]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
