import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

const desktopImages: string[] = [
  '/desktop-background/debut (1).webp',
  '/desktop-background/debut (2).webp',
  '/desktop-background/debut (3).webp',
  '/desktop-background/debut (4).webp',
  '/desktop-background/debut (5).webp',
];

const mobileImages: string[] = [
  '/mobile-background/debut (6).webp',
  '/mobile-background/debut (7).webp',
  '/mobile-background/debut (8).webp',
  '/mobile-background/debut (9).webp',
  '/mobile-background/debut (10).webp',
];

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 5500);
    return () => clearInterval(timer);
  }, [mounted]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setContentVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [visible]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gentleFloat {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-8px);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const images = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);

  return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: i === index ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
            }}
          >
            <Image
              src={src}
              alt="Couple"
              fill
              quality={90}
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(225, 213, 199, 0.5), rgba(225, 213, 199, 0.7))'
          }}
        />
        
        {/* Subtle vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(225, 213, 199, 0.3) 100%)'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-5 sm:gap-6 pb-14 sm:pb-16 md:pb-20">
          <h2
            className={`text-6xl md:text-8xl transform -rotate-6 transition-all duration-1000 ease-out delay-200 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: '#0A3629',
              textShadow: '0 2px 8px rgba(10, 54, 41, 0.2)',
            }}
          >
            You are
          </h2>
          
          <h1
            className={`text-5xl md:text-7xl font-bold tracking-wider uppercase transition-all duration-1000 ease-out delay-300 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: '#0A3629',
              textShadow: '0 2px 8px rgba(10, 54, 41, 0.2)',
              letterSpacing: '0.05em',
            }}
          >
            Invited!
          </h1>

          <button 
            onClick={() => {
              onOpen();
            }}
            className={`px-10 py-4 font-serif text-sm tracking-[0.2em] uppercase rounded-sm border transition-all duration-500 ease-out delay-500 shadow-lg hover:shadow-xl ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              backgroundColor: '#0A3629',
              borderColor: '#0A3629',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#07241a';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = '#07241a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0A3629';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#0A3629';
            }}
          >
            <span
              style={{ fontFamily: '"Cinzel", serif', fontWeight: 500, color: '#FFFFFF' }}
            >
              Open Invitation
            </span>
          </button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};