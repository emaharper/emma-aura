import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  Calendar,
  Clock,
  Sparkles,
  Leaf,
  Plane,
  Coffee,
  User,
  Shirt,
  Grid,
  Image as ImageIcon,
  Check,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  X,
  Scan,
} from 'lucide-react';
import { GalleryItem } from '../data/galleryData';
import { SafeImage } from './SafeImage';

interface PhotoDetailViewProps {
  item: GalleryItem;
  items: GalleryItem[];
  isLiked: boolean;
  onToggleLike: (id: string) => void;
  onBackToGallery: () => void;
  onSelectStory: (item: GalleryItem) => void;
  onOpenEdit?: (item: GalleryItem) => void;
}

export const PhotoDetailView: React.FC<PhotoDetailViewProps> = ({
  item,
  items,
  isLiked,
  onToggleLike,
  onBackToGallery,
  onSelectStory,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);
  // Default to 'contain' so 100% of any photo (portrait, landscape, square) is visible without cropping
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Keyboard navigation for previous/next and ESC for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showFullscreen) {
          setShowFullscreen(false);
          setZoomLevel(1);
        }
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullscreen, item, items]);

  // Find index in current collection
  const currentIndex = items.findIndex((i) => i.id === item.id);
  const totalCount = items.length;

  const handleNext = () => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % totalCount;
    onSelectStory(items[nextIndex]);
    setZoomLevel(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + totalCount) % totalCount;
    onSelectStory(items[prevIndex]);
    setZoomLevel(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = item.image;
    link.download = `emma_aura_${item.title.toLowerCase().replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${item.title} — Emma Aura`,
          text: item.quote,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleHeartClick = () => {
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 500);
    onToggleLike(item.id);
  };

  // 3 Curated items for "You May Also Love" matching the screenshot aesthetic
  const recommendedItems = (() => {
    const curatedMatches = items.filter(
      (i) =>
        i.id !== item.id &&
        (i.title.toLowerCase().includes('island') ||
          i.title.toLowerCase().includes('sunset') ||
          i.title.toLowerCase().includes('golden') ||
          i.title.toLowerCase().includes('nature') ||
          i.title.toLowerCase().includes('flower'))
    );
    const fallbacks = items.filter((i) => i.id !== item.id);
    const combined = [...curatedMatches, ...fallbacks];
    const uniqueMap = new Map<string, GalleryItem>();
    combined.forEach((c) => {
      if (!uniqueMap.has(c.id) && c.id !== item.id) {
        uniqueMap.set(c.id, c);
      }
    });
    return Array.from(uniqueMap.values()).slice(0, 3);
  })();

  // Category Icon helper
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'nature':
        return <Leaf className="w-3.5 h-3.5 text-emerald-400" />;
      case 'travel':
        return <Plane className="w-3.5 h-3.5 text-sky-400" />;
      case 'lifestyle':
        return <Coffee className="w-3.5 h-3.5 text-amber-400" />;
      case 'portrait':
        return <User className="w-3.5 h-3.5 text-rose-400" />;
      case 'fashion':
        return <Shirt className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-pink-400" />;
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden pb-16">
      {/* Background ambient lighting effects matching the screenshot */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-purple-600/12 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute -left-12 top-20 w-52 h-80 bg-gradient-to-br from-fuchsia-600/20 to-pink-500/15 rounded-full blur-3xl" />
        <div className="absolute -right-12 top-28 w-60 h-96 bg-gradient-to-bl from-pink-500/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -left-10 bottom-28 w-60 h-60 bg-gradient-to-tr from-purple-700/20 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -right-8 bottom-16 w-56 h-80 bg-gradient-to-tl from-fuchsia-600/20 to-rose-500/15 rounded-full blur-3xl" />
      </div>

      {/* Outer wrapper */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        {/* Top Header Row: Compact Breadcrumbs, Integrated Back Button & Elegant Script Accent */}
        <div className="flex items-center justify-between gap-3 mb-2.5 py-1">
          {/* Left: Back Button & Breadcrumbs */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={onBackToGallery}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-pink-200 bg-[#160b2e]/90 hover:bg-[#231247] border border-pink-500/30 hover:border-pink-500/60 shadow-md shadow-purple-950/40 transition-all hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-pink-400" />
              <span>Back to Gallery</span>
            </button>
            <div className="flex items-center gap-1.5 text-xs text-pink-200/70">
              <button
                onClick={onBackToGallery}
                className="hover:text-white transition-colors"
              >
                Home
              </button>
              <span className="text-pink-400/40">/</span>
              <button
                onClick={onBackToGallery}
                className="hover:text-white transition-colors"
              >
                Gallery
              </button>
              <span className="text-pink-400/40">/</span>
              <span className="text-pink-300 font-medium truncate max-w-[120px] sm:max-w-[220px]">{item.title}</span>
            </div>
          </div>

          {/* Right: Sleek Compact Quote Accent */}
          <div className="hidden sm:flex items-center gap-2 pr-2">
            <span className="font-cursive text-sm md:text-base text-cyan-300/90 drop-shadow-[0_0_8px_rgba(34,211,238,0.35)]">
              “Nature always wears the colors of the spirit”
            </span>
            <span className="text-xs text-pink-400">♡</span>
          </div>
        </div>

        {/* Main Showcase Container (Photo on Left, Story Card on Right) */}
        <div className="relative">
          {/* Vertical Dots on far left edge (matching screenshot) */}
          <div className="hidden xl:flex flex-col items-center gap-2.5 absolute -left-6 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* Left Column: Responsive Photo Card with Full Visibility for ANY Size & Orientation */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[560px] lg:h-[620px] max-h-[80vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0c061a] border border-pink-500/25 shadow-2xl shadow-purple-950/70 group flex items-center justify-center p-2 sm:p-3">
                {/* 1. Ambient Blurred Backdrop: Fills any empty space (top/bottom for wide, sides for tall) with smooth matching tones */}
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-40 filter brightness-75 pointer-events-none select-none transition-all duration-700"
                />

                {/* Subtle dark gradient scrim at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* 2. Main Photograph:
                    When fitMode === 'contain' (default), 100% of the photo is displayed completely in pristine resolution,
                    whether portrait (vertical), landscape (horizontal), square, or panoramic.
                */}
                <img
                  src={item.image}
                  alt={item.title}
                  onClick={() => setShowFullscreen(true)}
                  className={`relative z-10 transition-all duration-300 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-zoom-in rounded-xl sm:rounded-2xl select-none ${
                    fitMode === 'cover'
                      ? 'w-full h-full object-cover'
                      : 'max-h-full max-w-full object-contain mx-auto'
                  }`}
                  title="Click to view fullscreen HD zoom"
                />

                {/* Top-Right Control Bar: Fit Toggle & Fullscreen Zoom Button */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center gap-2">
                  {/* Fit Mode Toggle: Puro Image (Fit) vs Fill */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFitMode((prev) => (prev === 'contain' ? 'cover' : 'contain'));
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-pink-500/50 text-xs font-medium text-white shadow-lg transition-all hover:scale-105"
                    title={fitMode === 'contain' ? 'Click to fill card' : 'Click to see 100% full uncropped image'}
                  >
                    {fitMode === 'contain' ? (
                      <>
                        <Scan className="w-3.5 h-3.5 text-cyan-300" />
                        <span className="hidden sm:inline">Puro Photo</span>
                        <span className="sm:hidden">Fit</span>
                      </>
                    ) : (
                      <>
                        <Minimize2 className="w-3.5 h-3.5 text-pink-300" />
                        <span className="hidden sm:inline">Fill Card</span>
                        <span className="sm:hidden">Fill</span>
                      </>
                    )}
                  </button>

                  {/* Fullscreen HD Lightbox Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFullscreen(true);
                    }}
                    className="p-2 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-pink-500/50 text-white shadow-lg transition-all hover:scale-110"
                    title="Open Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-pink-300" />
                  </button>
                </div>

                {/* Left Navigation Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-xl focus:outline-none"
                  title="Previous Story"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-100" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-xl focus:outline-none"
                  title="Next Story"
                >
                  <ChevronRight className="w-5 h-5 text-slate-100" />
                </button>

                {/* Index Pill at bottom left [ 🖼 1 / 118 ] */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20 flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-lg">
                    <ImageIcon className="w-3.5 h-3.5 text-pink-300" />
                    <span>
                      {currentIndex !== -1 ? currentIndex + 1 : 1} / {totalCount}
                    </span>
                  </div>

                  {/* 100% Uncropped Badge */}
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-900/60 backdrop-blur-md border border-purple-400/30 text-[10px] text-pink-200">
                    <Check className="w-3 h-3 text-cyan-300" />
                    <span>100% Complete View</span>
                  </span>
                </div>

                {/* Mobile tap prompt at bottom right */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 sm:hidden">
                  <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-slate-300">
                    Tap to Zoom
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Story & Metadata Card */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
              <div className="h-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#160c30]/90 via-[#130928]/95 to-[#0e061e]/90 backdrop-blur-2xl border border-pink-500/25 p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-purple-950/40">
                <div>
                  {/* Category Pill with Icon */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 shadow-sm">
                    {getCategoryIcon(item.category)}
                    <span>{item.category}</span>
                  </div>

                  {/* Big Cursive Title */}
                  <h1 className="font-cursive text-4xl sm:text-5xl font-medium tracking-wide bg-gradient-to-r from-pink-400 via-rose-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm mt-3">
                    {item.title}
                  </h1>

                  {/* Subtitle / Tagline */}
                  <p className="italic text-sm text-pink-200/90 font-light mt-1.5">
                    {item.quote || 'A quiet moment where the mountains meet the wild'}
                  </p>

                  {/* Story Paragraph */}
                  <div className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light space-y-2">
                    <p>{item.story}</p>
                  </div>
                </div>

                {/* Bottom Section: Published Info + Action Buttons */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  {/* Meta Line: Published October 2026 • 4 min read */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-pink-200/70 mb-5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-pink-400" />
                      <span>Published {item.date}</span>
                    </div>
                    <span className="text-pink-400/60">•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-pink-400" />
                      <span>4 min read</span>
                    </div>
                  </div>

                  {/* Action Buttons Row matching screenshot */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    {/* Heart Button: [ ♡ 482 ] */}
                    <button
                      onClick={handleHeartClick}
                      className={`px-4 sm:px-5 py-2.5 rounded-full border transition-all duration-200 flex items-center gap-2 text-xs font-semibold ${
                        isLiked
                          ? 'bg-pink-500/30 border-pink-500 text-pink-200 shadow-lg shadow-pink-500/20'
                          : 'bg-[#180f33]/80 hover:bg-[#231548] border-pink-500/30 text-pink-200 hover:text-white'
                      }`}
                      title={isLiked ? 'Unlike' : 'Love this photo'}
                    >
                      <Heart
                        className={`w-4 h-4 text-pink-400 ${
                          isLiked ? 'fill-pink-400' : ''
                        } ${animateHeart ? 'scale-125' : ''} transition-transform`}
                      />
                      <span>{item.likes + (isLiked ? 1 : 0)}</span>
                    </button>

                    {/* Share Button: [ 🔗 Share ] */}
                    <button
                      onClick={handleShare}
                      className="px-4 sm:px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-slate-200 hover:text-white flex items-center gap-2 text-xs font-semibold transition-all"
                      title="Share this story"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4 text-slate-300" />
                          <span>Share</span>
                        </>
                      )}
                    </button>

                    {/* Download Photo Button: Glowing Gradient Pill */}
                    <button
                      onClick={handleDownload}
                      className="px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-sky-400 text-white flex items-center gap-2 text-xs font-bold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:brightness-110 transition-all hover:scale-102 ml-auto"
                      title="Download full quality photo"
                    >
                      <Download className="w-4 h-4 text-white" />
                      <span>Download Photo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: "✨ You May Also Love" */}
        <div className="mt-10 sm:mt-12">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-white tracking-wide">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span>You May Also Love</span>
            </div>
            <button
              onClick={onBackToGallery}
              className="text-xs font-semibold text-pink-300 hover:text-white transition-colors flex items-center gap-1 group"
            >
              <span>View More</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>

          {/* 3 Full-Visibility Recommendation Cards (Faces and full photos clearly visible) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendedItems.map((rec) => (
              <div
                key={rec.id}
                onClick={() => {
                  onSelectStory(rec);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/11] sm:aspect-[4/3] md:aspect-[16/11] min-h-[250px] sm:min-h-[270px] bg-[#100722] border border-pink-500/25 hover:border-pink-500/70 shadow-xl shadow-black/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-900/40 flex items-center justify-center p-2.5 sm:p-3"
              >
                {/* 1. Ambient Blurred Backdrop: Fills entire card with matching colors so no blank space */}
                <img
                  src={rec.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40 filter brightness-75 pointer-events-none transition-transform duration-700 group-hover:scale-135"
                />

                {/* Subtle scrim behind image */}
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />

                {/* 2. Pristine Full Photo: 100% complete view, faces, heads and scenes clearly visible without cropping */}
                <SafeImage
                  src={rec.image}
                  alt={rec.title}
                  fallbackTitle={rec.title}
                  fallbackCategory={rec.category}
                  fitMode="smart-contain"
                  className="relative z-10 max-h-full max-w-full object-contain mx-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-104 select-none"
                />

                {/* Category Pill (Top Left) */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/20 shadow-md">
                    {getCategoryIcon(rec.category)}
                    <span>{rec.category}</span>
                  </span>
                </div>

                {/* 100% Full View Badge (Top Right) */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-cyan-200 bg-black/60 backdrop-blur-md border border-cyan-400/30 shadow-md">
                    <Scan className="w-3 h-3 text-cyan-300" />
                    <span>Puro Photo</span>
                  </span>
                </div>

                {/* Bottom Card Content: Title, Subtitle, Likes */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 z-20 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex items-end justify-between gap-2 pointer-events-none">
                  <div className="min-w-0 pr-2">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-pink-200 transition-colors drop-shadow-sm">
                      {rec.title}
                    </h4>
                    <p className="text-[11px] text-slate-300/90 truncate font-light mt-0.5">
                      {rec.quote || 'Capturing timeless beauty and horizons'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-pink-300 shrink-0 bg-black/65 px-2.5 py-1 rounded-full border border-pink-500/25 backdrop-blur-md shadow">
                    <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                    <span>{rec.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner: ADSTERRA BANNER HERE (Matching screenshot) */}
        <div className="mt-8">
          <div className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#120826]/90 via-[#1d0e3a]/90 to-[#120826]/90 border border-purple-500/30 backdrop-blur-xl flex items-center justify-center gap-3 shadow-xl shadow-purple-950/20">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-fuchsia-500 to-pink-500 flex items-center justify-center font-black text-white text-xs shadow-md shadow-pink-500/30">
              A
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-200 uppercase">
              Adsterra Banner Here
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX & HD ZOOM VIEWER MODAL                                */}
      {/* Allows seeing 100% of ANY image size with high-def clarity and zoom controls */}
      {/* ========================================================================= */}
      {showFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#06030c]/98 backdrop-blur-2xl flex flex-col justify-between animate-in fade-in duration-200 select-none">
          {/* Top Bar in Lightbox */}
          <div className="relative z-50 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
            {/* Title & Index */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {item.title}
                </h3>
              </div>
              <span className="text-xs text-pink-300/70 font-mono">
                ({currentIndex + 1} / {totalCount})
              </span>
            </div>

            {/* Controls: Zoom In / Zoom Out / Reset / Close */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 p-1 text-xs">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.5))}
                  disabled={zoomLevel <= 1}
                  className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 font-mono text-pink-200">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(3, z + 0.5))}
                  disabled={zoomLevel >= 3}
                  className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  setShowFullscreen(false);
                  setZoomLevel(1);
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-105"
                title="Close (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Display Area: 100% Uncropped Image */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-auto">
            {/* Ambient matching glow */}
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-25 filter brightness-50 pointer-events-none"
            />

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all hover:scale-110 shadow-2xl"
              title="Previous Photo (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all hover:scale-110 shadow-2xl"
              title="Next Photo (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Photo with Zoom */}
            <div
              className="relative z-30 flex items-center justify-center max-w-full max-h-full transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[82vh] max-w-[92vw] object-contain rounded-lg shadow-2xl drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              />
            </div>
          </div>

          {/* Bottom Info Bar in Lightbox */}
          <div className="relative z-50 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 font-semibold">
                {item.category}
              </span>
              <span className="text-slate-400 hidden sm:inline">{item.location}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleHeartClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-slate-200'}`} />
                <span>{item.likes + (isLiked ? 1 : 0)}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-sky-400 text-white font-semibold transition-all hover:brightness-110"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
