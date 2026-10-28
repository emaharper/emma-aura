import React, { useState } from 'react';
import { Heart, ArrowRight, Scan, Minimize2 } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';
import { SafeImage } from './SafeImage';

interface PhotoCardProps {
  item: GalleryItem;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
  onOpenStory: (item: GalleryItem) => void;
  defaultFitMode?: 'contain' | 'cover' | 'smart-contain';
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  item,
  isLiked,
  onToggleLike,
  onOpenStory,
  defaultFitMode = 'smart-contain',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [localFitMode, setLocalFitMode] = useState<'smart-contain' | 'cover'>(
    defaultFitMode === 'cover' ? 'cover' : 'smart-contain'
  );

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 600);
    onToggleLike(item.id);
  };

  const handleToggleFit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalFitMode((prev) => (prev === 'cover' ? 'smart-contain' : 'cover'));
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenStory(item)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#140b2a] border border-pink-500/20 shadow-lg shadow-black/40 transition-all duration-300 hover:border-pink-500/60 hover:shadow-2xl hover:shadow-pink-900/30 hover:-translate-y-1"
    >
      {/* Aspect Ratio Container (approx 3/4 portrait) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden flex items-center justify-center bg-[#0c0618]">
        {/* Ambient Blurred Backdrop: Enables photos of ANY aspect ratio (landscape, square, portrait) to be seen completely */}
        {localFitMode === 'smart-contain' && (
          <img
            src={item.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 opacity-40 filter brightness-75 pointer-events-none transition-opacity duration-300"
          />
        )}

        {/* Foreground Image: when smart-contain, shows 100% full uncropped image */}
        <SafeImage
          src={item.image}
          alt={item.title}
          fallbackTitle={item.title}
          fallbackCategory={item.category}
          fitMode={localFitMode}
          className={`transition-transform duration-500 group-hover:scale-105 ${
            localFitMode === 'smart-contain'
              ? 'relative z-10 max-h-full max-w-full object-contain drop-shadow-xl'
              : 'w-full h-full object-cover object-[center_20%]'
          }`}
        />

        {/* New Badge (Top Left) */}
        {item.isNew && (
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-md shadow-pink-500/40 uppercase tracking-wider">
              New
            </span>
          </div>
        )}

        {/* Individual Card Fit Toggle (Top Right on hover or mobile) */}
        <div className="absolute top-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleToggleFit}
            className="p-1.5 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-lg transition-transform hover:scale-110"
            title={localFitMode === 'smart-contain' ? 'Fill card' : 'Fit full image without crop'}
          >
            {localFitMode === 'smart-contain' ? (
              <Minimize2 className="w-3 h-3 text-pink-300" />
            ) : (
              <Scan className="w-3 h-3 text-cyan-300" />
            )}
          </button>
        </div>

        {/* Overlay Scrim: dark gradient at bottom for maximum contrast and elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090514] via-[#090514]/40 to-transparent pointer-events-none z-10" />

        {/* Bottom Card Content Lockup */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 z-20 flex items-end justify-between gap-1.5">
          {/* Left Text: Title, Category, View Story */}
          <div className="flex flex-col min-w-0 pr-1">
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate group-hover:text-pink-200 transition-colors">
              {item.title}
            </h3>

            <div className="text-[10px] sm:text-[11px] font-medium text-pink-300/80 -mt-0.5">
              {item.category}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenStory(item);
              }}
              className="mt-1 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-slate-300 hover:text-pink-300 group/link transition-colors focus:outline-none"
            >
              <span>View Story</span>
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover/link:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Action: Heart Button */}
          <div className="flex flex-col items-center shrink-0">
            <button
              onClick={handleHeartClick}
              className={`p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none ${
                isLiked
                  ? 'bg-pink-500/90 text-white shadow-lg shadow-pink-500/50 scale-110'
                  : 'bg-black/40 text-slate-200 hover:bg-black/60 hover:text-pink-300 border border-white/10'
              }`}
              title={isLiked ? 'Unlike photo' : 'Love this photo'}
            >
              <Heart
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                  isLiked ? 'fill-white' : ''
                } ${animateHeart ? 'scale-125' : ''} transition-transform`}
              />
            </button>
            <span className="text-[9px] sm:text-[10px] text-slate-300/80 tabular-nums font-mono mt-0.5">
              {item.likes + (isLiked ? 1 : 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
