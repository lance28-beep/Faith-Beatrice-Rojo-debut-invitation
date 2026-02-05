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
      </section>
    </main>
  )
}


