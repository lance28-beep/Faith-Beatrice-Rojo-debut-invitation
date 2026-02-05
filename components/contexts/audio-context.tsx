"use client"

import { createContext, useContext, useRef, ReactNode } from "react"

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>
  pauseMusic: () => void
  resumeMusic: () => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const pauseMusic = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
    }
  }

  const resumeMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.log("Resume playback blocked:", error)
      })
    }
  }

  return (
    <AudioContext.Provider value={{ audioRef, pauseMusic, resumeMusic }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}




