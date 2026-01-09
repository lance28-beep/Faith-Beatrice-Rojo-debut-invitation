"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Copy, Check, Download } from "lucide-react"
import { Section } from "@/components/section"
import { QRCodeCanvas } from "qrcode.react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

export function SnapShare() {
  const [copiedHashtag, setCopiedHashtag] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const driveLink = "https://drive.google.com/drive/folders/1yiMLxyqKSs7-b1rZf_FcA_sG_Tdle8_Z?usp=sharing"
  const debutanteNickname = siteConfig.couple.brideNickname
  const sanitizedTagName = debutanteNickname.replace(/\s+/g, "")

  const hashtags = [
    `#${sanitizedTagName}sChapter18`,
    `#${sanitizedTagName}Debut2026`,
    "#NaturesEvening",
    "#FlorestaNatural",
  ]
  const shareText = `Celebrate ${debutanteNickname}'s nature's debut! Explore the details and share your special memories: ${websiteUrl} ${hashtags.join(" ")} ✨`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedHashtag(true)
      setTimeout(() => setCopiedHashtag(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    }

    const target = urls[platform]
    if (target) {
      window.open(target, "_blank", "width=600,height=400")
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `${sanitizedTagName.toLowerCase()}-debut-qr.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <Section
      id="snap-share"
      className="relative overflow-hidden py-14 sm:py-20 md:py-24 lg:py-28 bg-transparent"
    >
      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 md:px-8">
        <motion.div
          className="text-center mb-7 sm:mb-12"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-[8px] sm:text-xs tracking-[0.42em] uppercase text-white">
            Share Your Memories
          </div>
          <h2
            className={`${greatVibes.className} text-2xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_40px_rgba(10,0,25,0.8)] mt-3 sm:mt-4`}
          >
            Capture & Share the Celebration
          </h2>
          <p className={`${inter.className} text-[10px] sm:text-sm md:text-base text-white/85 max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed px-2`}>
            Capture the nature's beauty of {debutanteNickname}'s debut. Share your favorite moments so her keepsake gallery glows with every
            smile, twirl, and toast from the evening. Tag photos with #{sanitizedTagName}sChapter18 to share the magic.
          </p>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-7 lg:gap-10" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div
            className="p-[1.5px] rounded-[22px] bg-gradient-to-br from-[#6A239E]/50 via-[#DC96FD]/30 to-[#6A239E]/50 h-full"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-[20px] p-3 sm:p-6 md:p-8 shadow-xl border border-white/60 h-full flex flex-col">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className={`${playfair.className} text-[15px] sm:text-xl md:text-2xl font-semibold text-[#372847] mb-3`}>
                  Share Your Moments
                </h3>
                <p className={`${inter.className} text-[#172822]/80 text-[11px] sm:text-sm mb-4 sm:mb-5 leading-relaxed px-1`}>
                  Every snapshot keeps {debutanteNickname}'s story glowing. Use these hashtags to weave your memories into her nature's keepsake.
                </p>
                <div className="space-y-2 mb-4">
                  {hashtags.map((hashtag) => (
                    <div
                      key={hashtag}
                      className="inline-flex items-center justify-center gap-2.5 bg-[#E9D3A4]/20 px-3 py-2 rounded-xl shadow-md border border-[#7E8A58]/25 w-full sm:w-auto mx-auto hover:shadow-lg hover:border-[#7E8A58]/40 transition-all"
                    >
                      <span className={`${inter.className} text-[11px] sm:text-sm md:text-base font-semibold text-[#172822] tracking-[0.14em] uppercase break-all sm:break-normal`}>
                        {hashtag}
                      </span>
                      <button
                        onClick={() => copyToClipboard(hashtag)}
                        className="p-1 rounded-full bg-white hover:bg-[#7E8A58]/10 transition-colors duration-200 shadow-sm flex-shrink-0 border border-[#7E8A58]/30 hover:border-[#7E8A58]/60"
                        title="Copy hashtag"
                      >
                        {copiedHashtag ? <Check className="w-4 h-4 text-[#172822]" /> : <Copy className="w-4 h-4 text-[#172822]/70" />}
                      </button>
                    </div>
                  ))}
                </div>
                <p className={`${inter.className} text-[#172822]/70 text-[10px] sm:text-xs italic`}>
                  Click to copy and paste into your posts, stories, and reels.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-4 lg:space-y-6 h-full flex flex-col" variants={fadeInUp}>
            <div className="p-[1.5px] rounded-[22px] bg-gradient-to-br from-[#7E8A58]/50 via-[#E6A379]/30 to-[#7E8A58]/50 flex-1">
              <div className="bg-white rounded-[20px] p-3 sm:p-6 md:p-8 shadow-xl border border-white/60 text-center h-full flex flex-col">
                <h4 className={`${playfair.className} text-[15px] sm:text-xl md:text-2xl font-semibold text-[#172822] mb-3`}>
                  Share Her Debut Website
                </h4>
                <p className={`${inter.className} text-[#172822]/80 text-[11px] sm:text-sm mb-4 sm:mb-5 leading-relaxed px-1`}>
                  Spread the word about {debutanteNickname}'s nature's debut celebration. Share this QR code with friends and family so they can join the celebration.
                </p>
                <div className="mx-auto inline-flex flex-col items-center bg-[#E9D3A4]/20 p-3 sm:p-6 md:p-7 rounded-2xl shadow-md border border-[#7E8A58]/20 mb-4 flex-1 justify-center">
                  <div className="mb-3 p-2 sm:p-4 rounded-xl bg-white border border-[#7E8A58]/15">
                    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-sm border border-[#7E8A58]/15">
                      <QRCodeCanvas 
                        id="snapshare-qr" 
                        value={websiteUrl} 
                        size={isMobile ? 160 : 220} 
                        includeMargin 
                        className="bg-white" 
                      />
                    </div>
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-2 mx-auto px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#7E8A58] to-[#E6A379] text-white transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-xs sm:text-sm border border-[#7E8A58]/40"
                  >
                    <Download className="w-4 h-4" />
                    <span className={`${inter.className} tracking-[0.18em] uppercase font-medium`}>Download QR</span>
                  </button>
                </div>
                <p className={`${inter.className} text-[#172822]/70 text-[10px] sm:text-xs mt-auto`}>
                  Scan with any camera app to open the full invitation and schedule.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-3 sm:p-6 md:p-7 shadow-xl border border-white/60">
              <h5 className={`${playfair.className} text-[15px] sm:text-xl font-semibold text-[#172822] mb-3 text-center`}>
                Share on Social Media
              </h5>
              <p className={`${inter.className} text-[#172822]/75 text-[10px] sm:text-xs text-center mb-4`}>
                Help spread the word about {debutanteNickname}'s debut celebration. Share the event across your favorite platforms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <button
                  onClick={() => shareOnSocial("instagram")}
                  className="group flex items-center justify-center gap-2 bg-[#7E8A58] text-white px-4 py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border border-[#7E8A58]/70"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className={`${inter.className} font-medium text-xs sm:text-sm uppercase tracking-[0.2em]`}>Instagram</span>
                </button>
                <button
                  onClick={() => shareOnSocial("facebook")}
                  className="group flex items-center justify-center gap-2 bg-[#7E8A58] text-white px-4 py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border border-[#7E8A58]/70"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className={`${inter.className} font-medium text-xs sm:text-sm uppercase tracking-[0.2em]`}>Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocial("tiktok")}
                  className="group flex items-center justify-center gap-2 bg-[#7E8A58] text-white px-4 py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border border-[#7E8A58]/70"
                >
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className={`${inter.className} font-medium text-xs sm:text-sm uppercase tracking-[0.2em]`}>TikTok</span>
                </button>
                <button
                  onClick={() => shareOnSocial("twitter")}
                  className="group flex items-center justify-center gap-2 bg-[#7E8A58] text-white px-4 py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border border-[#7E8A58]/70"
                >
                  <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className={`${inter.className} font-medium text-xs sm:text-sm uppercase tracking-[0.2em]`}>Twitter</span>
                </button>
              </div>
            </div>

            <div className="p-[1.5px] rounded-[22px] bg-gradient-to-br from-[#7E8A58]/50 via-[#E6A379]/30 to-[#7E8A58]/50">
              <div className="bg-white rounded-[20px] p-3 sm:p-6 md:p-7 shadow-xl border border-white/60 text-center">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#7E8A58]/25 bg-[#E9D3A4]/20 px-2.5 py-1 text-[9px] uppercase tracking-[0.32em] text-[#7E8A58] mb-3">
                  Upload Your Photos & Videos
                </div>
                <p className={`${inter.className} text-[#172822]/80 text-[11px] sm:text-sm leading-relaxed mb-4 sm:mb-5 px-1`}>
                  Help us capture our special day! Scan the QR or use the actions below to drop your clips into our shared Drive.
                </p>
                <div className="mx-auto inline-flex flex-col items-center bg-[#E9D3A4]/20 p-3 sm:p-6 rounded-2xl shadow-md border border-[#7E8A58]/20 mb-4">
                  <div className="mb-3 p-2 sm:p-4 rounded-xl bg-white border border-[#7E8A58]/15">
                    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-sm border border-[#7E8A58]/15">
                      <QRCodeCanvas id="drive-qr" value={driveLink} size={isMobile ? 150 : 200} includeMargin className="bg-white" />
                    </div>
                  </div>
                  <p className={`${inter.className} text-[#172822]/80 text-[10px] sm:text-xs`}>📱 Scan with your camera app</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <button
                    onClick={() => copyToClipboard(driveLink)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#7E8A58] border border-[#7E8A58]/40 shadow-sm hover:shadow-md text-xs sm:text-sm transition-all"
                  >
                    <Copy className="w-4 h-4" />
                    <span className={`${inter.className} tracking-[0.18em] uppercase font-medium`}>Copy Link</span>
                  </button>
                  <a
                    href={driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#7E8A58] to-[#E6A379] text-white border border-[#7E8A58]/50 shadow-sm hover:shadow-md text-xs sm:text-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span className={`${inter.className} tracking-[0.18em] uppercase font-medium`}>Open Google Drive</span>
                  </a>
                </div>
                <p className={`${inter.className} text-[#172822]/70 text-[10px] sm:text-xs mt-3`}>or tap "Open Google Drive Folder."</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-7 sm:mt-12" variants={fadeInUp}>
          <div className="bg-white/10 rounded-[22px] p-4 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.35)] border border-white/20 max-w-3xl mx-auto backdrop-blur-xl">
            <p className={`${inter.className} text-white text-[13px] sm:text-base md:text-lg leading-relaxed mb-4 px-2`}>
              Thank you for helping make {debutanteNickname}'s debut celebration memorable. Your photos and messages create beautiful memories
              that will last a lifetime—keep sharing the joy throughout the evening.
            </p>
            <div className={`${inter.className} flex items-center justify-center gap-2 text-white text-[10px] sm:text-xs tracking-[0.32em] uppercase`}>
              <span>See you in the nature's evening</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
