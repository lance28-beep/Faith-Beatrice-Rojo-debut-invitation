import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Kaith Lorraine D. Andres - Debut Celebration",
  description:
    "You're invited to the debut celebration of Kaith Lorraine D. Andres! Join us on December 28, 2025 in De Guzman's Events Place, Ayos Lumboy, Guimba, Nueva Ecija. RSVP, view the gallery, and leave your wishes!",
  keywords:
    "Kaith Lorraine D. Andres debut celebration, Filipino debut celebration, RSVP, debut celebration gallery, debut celebration message wall, debut celebration invitation, 2026 debut celebrations, debut celebration venues De Guzman's Events Place, Ayos Lumboy, Guimba, Nueva Ecija, #KaithLorraineDAndresDebutCelebration",
  authors: [
    { name: "Kath Lorraine D. Andres" },
    { name: "Kath Lorraine D. Andres" },
  ],
  creator: "Kath Lorraine D. Andres",
  publisher: "Kath Lorraine D. Andres",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://kath-debut-celebration-invitation.vercel.app/"),
  alternates: {
    canonical: "https://kath-debut-celebration-invitation.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Kaith Lorraine D. Andres Debut Celebration | February 14, 2026",
    description:
      "Celebrate the union of Kaith Lorraine D. Andres on February 14, 2026 in De Guzman's Events Place, Ayos Lumboy, Guimba, Nueva Ecija. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://kath-debut-celebration-invitation.vercel.app/",
    siteName: "Kath Lorraine D. Andres Debut Celebration ",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://kath-debut-celebration-invitation.vercel.app/Details/image.png",
        width: 1200,
        height: 630,
        alt: "Kath Lorraine D. Andres Debut Celebration - February 14, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kath Lorraine D. Andres Debut Celebration",
    description:
      "You're invited to the debut celebration of Kath Lorraine D. Andres! February 14, 2026. RSVP, view our gallery, and leave your wishes! #KathLorraineDAndresDebutCelebration",
    images: ["https://kath-debut-celebration-invitation.vercel.app/Details/image.png"],
    creator: "@airezandbrendan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Talitha & Karol Wedding",
      startDate: "2026-02-14T14:00:00+08:00",
      endDate: "2026-02-14T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "De Guzman's Events Place, Ayos Lumboy, Guimba, Nueva Ecija",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Guimba, Nueva Ecija",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://kath-debut-celebration-invitation.vercel.app/Details/image.png"],
      description:
        "You're invited to the debut celebration of Kath Lorraine D. Andres! Join us on February 14, 2026 in De Guzman's Events Place, Ayos Lumboy, Guimba, Nueva Ecija. RSVP, view our gallery, and leave your wishes!",
      organizer: {
        "@type": "Person",
        name: "Kath Lorraine D. Andres",
      },
      offers: {
        "@type": "Offer",
        url: "https://kath-debut-celebration-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#KathLorraineDAndresDebutCelebration",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A3428" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
