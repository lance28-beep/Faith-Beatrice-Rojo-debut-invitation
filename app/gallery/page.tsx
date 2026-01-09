import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import MasonryGallery from "@/components/masonry-gallery"
import { siteConfig } from "@/content/site"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const [desktop, mobile] = await Promise.all([
    getImagesFrom("desktop-background"),
    getImagesFrom("mobile-background"),
  ])
  const images = [
    ...desktop.map((src) => ({ src, category: "desktop" as const })),
    ...mobile.map((src) => ({ src, category: "mobile" as const })),
  ]
  const debutanteNickname = siteConfig.couple.brideNickname
  const sanitizedTagName = debutanteNickname.replace(/\s+/g, "")
  const hashtags = [
    "#MikasChapter18",
    `#${sanitizedTagName}Debut2026`,
    "#NaturesEvening",
    "#FlorestaEncantada",
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(230,163,121,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(126,138,88,0.38),transparent_45%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_85%,rgba(23,40,34,0.45),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#E9D3A4]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#E9D3A4]/5 to-transparent" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm tracking-[0.45em] uppercase text-[#E9D3A4]/75 mb-3">{siteConfig.couple.bride}'s Nature's Keepsakes</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-3 sm:mb-4 drop-shadow-[0_8px_24px_rgba(23,40,34,0.6)]" style={{ fontFamily: 'var(--font-serif)' }}>
            {siteConfig.couple.bride}'s Nature's Gallery
          </h1>
          <p className="mt-3 text-[#E9D3A4]/90 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed">Moments captured in golden light, warm elegance, and nature's beauty—every frame tells the story of {siteConfig.couple.bride}'s natural debut celebration.</p>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#E6A379]/60 to-transparent" />
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#E9D3A4]/80">
            <p>No images found. Add files to <code className="px-2 py-1 bg-[#172822]/60 rounded border border-[#E6A379]/30 text-[#E9D3A4]/90">public/desktop-background</code> or <code className="px-2 py-1 bg-[#172822]/60 rounded border border-[#E6A379]/30 text-[#E9D3A4]/90">public/mobile-background</code>.</p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <div className="bg-[#172822]/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-[#E6A379]/30 max-w-2xl mx-auto shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Share Your Moments
            </h2>
            <p className="text-[#E9D3A4]/90 font-sans font-light text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              Share your celebration photos with us and be part of {siteConfig.couple.bride}'s nature's debut story
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#E6A379]/15 border border-[#E6A379]/30 rounded-full text-[#E6A379] font-sans font-medium text-xs sm:text-sm hover:bg-[#E6A379]/25 hover:border-[#E6A379]/50 transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/#snap-share"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#E6A379] to-[#E6A379]/90 text-white font-semibold rounded-full border border-[#E6A379] hover:from-[#E6A379]/90 hover:to-[#E6A379] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-sans text-sm sm:text-base"
              >
                Share on Social
              </Link>
              <a
                href="https://drive.google.com/drive/folders/1GnDuEIUc8mB23WIOGrfVw6tLF7wKWyxS?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#172822]/60 backdrop-blur-sm text-[#E6A379] font-semibold rounded-full border border-[#E6A379]/50 hover:bg-[#172822]/80 hover:border-[#E6A379]/70 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-sans text-sm sm:text-base"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/0/svg">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L12 8L17 13H14Z" fill="currentColor"/>
                </svg>
                Upload Photos
              </a>
            </div>
            <p className="mt-6 text-[10px] sm:text-xs text-[#E9D3A4]/60 font-sans tracking-[0.2em] uppercase">
              © 2026 {siteConfig.couple.bride}. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}


