import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import MasonryGallery from "@/components/masonry-gallery"

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A0310] via-[#2E041A]/90 to-[#1A0310] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#FCE1B6]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#FCE1B6]/5 to-transparent" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#FFFFFF] mb-3 sm:mb-4 drop-shadow-md">
            Gallery
          </h1>
          <p className="mt-3 text-[#FFFFFF]/90 font-sans font-light text-sm sm:text-base md:text-lg">A collection from our favorite moments</p>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#FCE1B6]/60 to-transparent" />
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#FFFFFF]/80">
            <p>No images found. Add files to <code className="px-2 py-1 bg-white/10 rounded border border-[#FCE1B6]/30 text-[#FFFFFF]/90">public/desktop-background</code> or <code className="px-2 py-1 bg-white/10 rounded border border-[#FCE1B6]/30 text-[#FFFFFF]/90">public/mobile-background</code>.</p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-[#FCE1B6]/30 max-w-2xl mx-auto shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#FFFFFF] mb-3 sm:mb-4">
              Share Your Moments
            </h2>
            <p className="text-[#FFFFFF]/80 font-sans font-light text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              Share your celebration photos with us
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              <span className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#FCE1B6]/15 border border-[#FCE1B6]/30 rounded-full text-[#FCE1B6] font-sans font-medium text-xs sm:text-sm hover:bg-[#FCE1B6]/25 hover:border-[#FCE1B6]/50 transition-all duration-200 cursor-default">
                #KathAt18
              </span>
              <span className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#FCE1B6]/15 border border-[#FCE1B6]/30 rounded-full text-[#FCE1B6] font-sans font-medium text-xs sm:text-sm hover:bg-[#FCE1B6]/25 hover:border-[#FCE1B6]/50 transition-all duration-200 cursor-default">
                #KathDebut2026
              </span>
              <span className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#FCE1B6]/15 border border-[#FCE1B6]/30 rounded-full text-[#FCE1B6] font-sans font-medium text-xs sm:text-sm hover:bg-[#FCE1B6]/25 hover:border-[#FCE1B6]/50 transition-all duration-200 cursor-default">
                #ElegantCelebration
              </span>
              <span className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#FCE1B6]/15 border border-[#FCE1B6]/30 rounded-full text-[#FCE1B6] font-sans font-medium text-xs sm:text-sm hover:bg-[#FCE1B6]/25 hover:border-[#FCE1B6]/50 transition-all duration-200 cursor-default">
                #DebutanteKath
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/#snap-share"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FCE1B6] to-[#FCE1B6]/90 text-[#0A3428] font-semibold rounded-full border border-[#FCE1B6] hover:from-[#FCE1B6]/90 hover:to-[#FCE1B6] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-sans text-sm sm:text-base"
              >
                Share on Social
              </Link>
              <a
                href="https://drive.google.com/drive/folders/1GnDuEIUc8mB23WIOGrfVw6tLF7wKWyxS?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-[#FCE1B6] font-semibold rounded-full border border-[#FCE1B6]/50 hover:bg-white/15 hover:border-[#FCE1B6]/70 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-sans text-sm sm:text-base"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/0/svg">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L12 8L17 13H14Z" fill="currentColor"/>
                </svg>
                Upload Photos
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


