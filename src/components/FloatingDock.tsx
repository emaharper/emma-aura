import React, { useState } from 'react';
import { Heart, Download, Share2, Check, ArrowUp } from 'lucide-react';

interface FloatingDockProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onQuickDownload: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  favoriteCount,
  onOpenFavorites,
  onQuickDownload,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Emma Aura — Every Picture Holds A Story',
        text: '112 Captivating Stories Of Beauty & Elegance',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      {/* Floating Glass Pill Dock matching the screenshot exactly */}
      <div className="flex flex-col items-center gap-3 p-2 rounded-2xl bg-[#160d2e]/90 backdrop-blur-xl border border-pink-500/25 shadow-2xl shadow-black/60">
        
        {/* Heart with counter badge */}
        <button
          onClick={onOpenFavorites}
          className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-pink-500/20 transition-all group focus:outline-none"
          title="Saved Favorites"
        >
          <Heart className="w-5 h-5 text-slate-200 group-hover:text-pink-400 group-hover:fill-pink-500/30 transition-colors" />
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md shadow-pink-500/50">
            {favoriteCount}
          </span>
        </button>

        {/* Download Icon */}
        <button
          onClick={onQuickDownload}
          className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-pink-500/20 transition-all focus:outline-none"
          title="Download Featured Collection"
        >
          <Download className="w-5 h-5 text-slate-200 hover:text-pink-300 transition-colors" />
        </button>

        {/* Share Icon */}
        <button
          onClick={handleShare}
          className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-pink-500/20 transition-all focus:outline-none relative"
          title="Share Emma Aura"
        >
          {copied ? (
            <Check className="w-5 h-5 text-emerald-400" />
          ) : (
            <Share2 className="w-5 h-5 text-slate-200 hover:text-pink-300 transition-colors" />
          )}
        </button>

      </div>

      {copied && (
        <div className="absolute right-14 top-24 whitespace-nowrap px-3 py-1 bg-black/90 border border-pink-500/30 rounded-lg text-xs text-emerald-300 shadow-xl pointer-events-none">
          Link copied!
        </div>
      )}
    </div>
  );
};

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-xl shadow-pink-500/40 hover:scale-110 active:scale-95 transition-all focus:outline-none"
      title="Scroll to Top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
