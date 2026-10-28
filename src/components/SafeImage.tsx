import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
  fitMode?: 'cover' | 'contain' | 'smart-contain';
  showBlurredBackdrop?: boolean;
  containerClassName?: string;
  imgClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Emma Aura Photography',
  className = '',
  containerClassName = '',
  imgClassName = '',
  fallbackTitle,
  fallbackCategory,
  fitMode = 'cover',
  showBlurredBackdrop = false,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1e1338] via-[#2d1b54] to-[#120a24] text-pink-200 ${containerClassName || className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(236,72,153,0.25),transparent_70%)]" />
        <div className="relative z-10 flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mb-2 shadow-lg shadow-pink-500/10">
            <ImageIcon className="w-6 h-6 text-pink-300" />
          </div>
          {fallbackTitle && (
            <span className="text-sm font-semibold text-white tracking-wide">
              {fallbackTitle}
            </span>
          )}
          {fallbackCategory && (
            <span className="text-xs text-pink-300/80 font-medium mt-0.5">
              {fallbackCategory}
            </span>
          )}
        </div>
      </div>
    );
  }

  const effectiveFit = fitMode === 'smart-contain' || fitMode === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${containerClassName || className}`}>
      {/* Loading Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1236] to-[#0f0920] animate-pulse z-0" />
      )}

      {/* Optional ambient blurred backdrop so any aspect ratio (portrait, landscape, square) fills the frame with lush matching color */}
      {(showBlurredBackdrop || fitMode === 'smart-contain') && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40 filter brightness-75 pointer-events-none transition-opacity duration-500 z-0"
        />
      )}

      {/* Main image - with contain mode it ensures 100% of the image is visible */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`relative z-10 transition-all duration-300 ${effectiveFit} ${
          effectiveFit === 'object-contain' ? 'max-w-full max-h-full drop-shadow-2xl' : 'w-full h-full object-[center_20%]'
        } ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        {...props}
      />
    </div>
  );
};
