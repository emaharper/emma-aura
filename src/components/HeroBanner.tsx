import React, { useState, useEffect } from 'react';
import { ArrowRight, Crown } from 'lucide-react';
import { HERO_SLIDES } from '../data/galleryData';

interface HeroBannerProps {
  onExplore: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance slides gently every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="relative overflow-hidden rounded-[2rem] border border-pink-500/25 bg-[#120a27] shadow-2xl shadow-pink-950/40 min-h-[460px] md:min-h-[520px] flex items-center">
        {/* Background Image Carousel with smooth fade */}
        <div className="absolute inset-0">
          <img
            src={slide.image}
            alt={slide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_35%] transition-all duration-1000 transform scale-105"
          />
          {/* Gradients to guarantee legibility and match screenshot aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b061a]/95 via-[#0b061a]/70 to-[#0b061a]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b061a]/85 via-transparent to-transparent" />
          {/* Subtle magenta ambient vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(236,72,153,0.18),transparent_60%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Left Vertical Indicator Dots & Left Hero Content Lockup */}
          <div className="flex items-center gap-6 sm:gap-8 max-w-2xl">
            {/* 5 Vertical Carousel Dots */}
            <div className="flex flex-col items-center gap-3 py-2 z-20">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full focus:outline-none ${
                    currentSlide === idx
                      ? 'w-2.5 h-6 bg-gradient-to-b from-cyan-400 to-sky-300 shadow-md shadow-cyan-400/50'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Left Headline & Details */}
            <div className="space-y-4">
              {/* Handwritten script welcome */}
              <div className="flex items-center gap-2">
                <span className="font-cursive text-2xl sm:text-3xl text-pink-300/95 tracking-wide drop-shadow">
                  {slide.tagline}
                </span>
              </div>

              {/* Title with Crown */}
              <div className="relative inline-block">
                {/* Glowing Crown on top */}
                <div className="absolute -top-6 left-[180px] sm:left-[230px] md:left-[270px] transform -rotate-6">
                  <Crown className="w-8 h-8 text-cyan-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] fill-cyan-400/30" />
                </div>
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
                  Emma{' '}
                  <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(236,72,153,0.4)]">
                    Aura
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="space-y-1">
                <p className="text-base sm:text-xl font-medium text-slate-200 tracking-wide">
                  112 Captivating Stories
                </p>
                <p className="text-sm sm:text-lg text-pink-200/80 font-light">
                  Of Beauty & Elegance
                </p>
              </div>

              {/* Decorative scribble squiggle */}
              <div className="w-28 h-4 text-pink-400/80 -mt-1">
                <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path
                    d="M2 12C20 4 35 18 55 10C75 2 85 16 98 12"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={onExplore}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                >
                  <span className="tracking-wide text-sm sm:text-base">Explore Gallery</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Romantic Quote */}
          <div className="hidden lg:flex flex-col items-end text-right max-w-sm pl-4">
            <div className="p-6 rounded-2xl bg-black/30 backdrop-blur-md border border-pink-500/20 shadow-xl shadow-black/40 relative">
              <span className="absolute -top-3 -left-3 text-4xl text-pink-400/50 font-serif leading-none">“</span>
              <p className="font-cursive text-2xl xl:text-3xl text-pink-100/90 leading-relaxed italic drop-shadow-md">
                {slide.quote}
              </p>
              <div className="mt-3 flex items-center justify-end gap-2 text-xs text-pink-300/70 font-sans-clean uppercase tracking-widest">
                <span>Curated Edition</span>
                <span>·</span>
                <span>2026</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
