'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Countdown boxes with color photos - numbers show days, hours, minutes
const COUNTDOWN_BOXES = [
  { src: '/mobile-background/debut (1).webp' },
  { src: '/mobile-background/debut (2).webp' },
  { src: '/mobile-background/debut (3).webp' },
];

const MAIN_BW_IMAGE = '/mobile-background/debut (8).webp';
const STAGGER_DELAY_MS = 4000; // Each image appears every 4 seconds
const BOX_TRANSITION_MS = 1200; // Slow, smooth transition
const TOTAL_DURATION_MS = COUNTDOWN_BOXES.length * STAGGER_DELAY_MS + 3000;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());

  // Live countdown: days, hours, minutes until debut
  const countdown = useMemo(() => {
    const debutDate = new Date('2026-02-21T18:00:00');
    const diff = debutDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  }, [now]);

  const countdownText = useMemo(() => {
    const { days } = countdown;
    if (days === 0) return 'TODAY IS THE DEBUT';
    if (days === 1) return 'ONE DAY TO GO';
    if (days >= 28 && days <= 31) return 'ONE MONTH TO GO';
    if (days >= 58 && days <= 62) return 'TWO MONTHS TO GO';
    if (days >= 88 && days <= 93) return 'THREE MONTHS TO GO';
    if (days >= 118 && days <= 123) return 'FOUR MONTHS TO GO';
    if (days >= 148 && days <= 153) return 'FIVE MONTHS TO GO';
    return `${days} DAYS TO GO`;
  }, [countdown.days]);

  // Debut date: 02.21.26 (month, day, year)
  const countdownNumbers = ['02', '21', '26'];
  const countdownLabels = ['MONTH', 'DAY', 'YEAR'];

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    COUNTDOWN_BOXES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleBoxes((prev) => [...prev, i]), i * STAGGER_DELAY_MS)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgress(pct);
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`;
  const hashtag =
    siteConfig.snapShare?.hashtag ??
    `#${siteConfig.couple.groomNickname}And${siteConfig.couple.brideNickname}`;
  const productionCredit = siteConfig.snapShare?.productionCredit ?? '';

  // Palette: dark brown, medium brown, tan, light peachy cream, cream
  const palette = {
    dark: '#5E3311',
    medium: '#935F3B',
    tan: '#C99167',
    light: '#EFBE94',
    cream: '#FFF9E1',
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src={MAIN_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay for readability and warmth */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${palette.dark}40 0%, transparent 25%, transparent 75%, ${palette.dark}50 100%)`,
          }}
        />
      </div>

      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Top: Debut label + hashtag + countdown - refined styling, centered on mobile */}
        <div className="flex flex-col items-center justify-center w-full pt-12 sm:pt-16 md:pt-24 px-4 sm:px-6 flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 w-full max-w-lg mx-auto">
            <span
              className="hidden sm:block h-px w-12 flex-shrink-0"
              style={{ backgroundColor: palette.tan }}
            />
            <p
              className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-sans uppercase text-center"
              style={{ color: palette.light }}
            >
              Save the date for the debut
            </p>
            <span
              className="hidden sm:block h-px w-12 flex-shrink-0"
              style={{ backgroundColor: palette.tan }}
            />
          </div>
          <p
            className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-sans mb-8 sm:mb-10 text-center"
            style={{
              color: palette.cream,
              textShadow: `0 1px 2px rgba(0,0,0,0.3)`,
            }}
          >
            {hashtag}
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center tracking-[0.08em] sm:tracking-[0.12em] uppercase max-w-md leading-tight px-2"
            style={{
              fontFamily: '"Cinzel", serif',
              color: palette.cream,
              textShadow: `0 2px 12px rgba(0,0,0,0.35), 0 0 40px rgba(94,51,17,0.15)`,
            }}
          >
            {countdownText}
          </h2>
        </div>

        {/* Spacer - lets B&W image dominate (upper 2/3) */}
        <div className="flex-1 min-h-[12vh]" />

        {/* Middle: Three color countdown boxes - staggered reveal */}
        <div className="flex items-stretch justify-center gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 py-4 flex-shrink-0">
          {COUNTDOWN_BOXES.map((item, i) => {
            const isVisible = visibleBoxes.includes(i);
            return (
              <div
                key={i}
                className="relative flex-1 max-w-[28vw] sm:max-w-[140px] md:max-w-[160px] aspect-[3/4] overflow-hidden"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
                  transition: `opacity ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <Image
                  src={item.src}
                  alt={`${coupleNames}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 28vw, 160px"
                />
                {/* Bold debut date number + label - right corner */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex flex-col items-end">
                  <span
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black select-none leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    style={{
                      fontFamily: 'var(--font-granika), sans-serif',
                      color: palette.cream,
                    }}
                  >
                    {countdownNumbers[i]}
                  </span>
                  <span
                    className="text-[8px] sm:text-[9px] tracking-widest uppercase mt-0.5"
                    style={{ color: palette.light }}
                  >
                    {countdownLabels[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: Names + production credit + progress bar */}
        <div className="flex flex-col items-center justify-center w-full py-6 sm:py-8 px-4 flex-shrink-0">
          <div
            className="text-center text-2xl sm:text-3xl md:text-4xl mb-2"
            style={{
              fontFamily: 'var(--font-serif), cursive',
              color: '#0A3629',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {coupleNames}
          </div>
          {productionCredit && (
            <p
              className="text-[10px] sm:text-xs font-sans tracking-wider"
              style={{ color: palette.light }}
            >
              {productionCredit}
            </p>
          )}
          {/* Preparing message + progress bar */}
          <p
            className="text-xs sm:text-sm tracking-widest mt-6 mb-3 font-sans uppercase"
            style={{ color: '#0A3629' }}
          >
            Preparing your debut invitation
          </p>
          <div className="w-full max-w-xs mx-auto">
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: `${palette.medium}60` }}
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: '#0A3629',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
