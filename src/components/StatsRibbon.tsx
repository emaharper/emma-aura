import React from 'react';
import { Image as ImageIcon, Heart, Star, Sparkles } from 'lucide-react';

export const StatsRibbon: React.FC = () => {
  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#140b2a] via-[#1a0f37] to-[#120826] border border-pink-500/20 backdrop-blur-xl px-6 py-4 shadow-xl shadow-pink-950/20">
        
        <div className="flex flex-wrap items-center justify-between gap-6 md:gap-8">
          
          {/* Metrics Cluster */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-12 md:gap-16">
            {/* Stat 1: Beautiful Photos */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
                  112+
                </span>
                <span className="text-xs sm:text-sm text-pink-200/70 font-medium">
                  Beautiful Photos
                </span>
              </div>
            </div>

            {/* Stat 2: Premium Collection */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 text-white fill-white/30" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
                  100%
                </span>
                <span className="text-xs sm:text-sm text-pink-200/70 font-medium">
                  Premium Collection
                </span>
              </div>
            </div>

            {/* Stat 3: Emma Aura Edition */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30 group-hover:scale-105 transition-transform">
                <Star className="w-6 h-6 text-white fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
                  2026
                </span>
                <span className="text-xs sm:text-sm text-pink-200/70 font-medium">
                  Emma Aura Edition
                </span>
              </div>
            </div>
          </div>

          {/* Right Cursive Script Lockup */}
          <div className="flex items-center gap-2">
            <span className="font-cursive text-2xl sm:text-3xl font-medium bg-gradient-to-r from-cyan-300 via-sky-300 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
              More Photos More Stories ♡
            </span>
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse hidden sm:inline-block" />
          </div>

        </div>
      </div>
    </div>
  );
};
