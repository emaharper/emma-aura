import React from 'react';
import { X, Heart, Trash2, Download, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';
import { SafeImage } from './SafeImage';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteItems: GalleryItem[];
  onRemoveFavorite: (id: string) => void;
  onOpenStory: (item: GalleryItem) => void;
  onClearAll: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteItems,
  onRemoveFavorite,
  onOpenStory,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const handleDownloadAll = () => {
    favoriteItems.forEach((item, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = item.image;
        link.download = `emma_aura_${item.title.toLowerCase().replace(/\s+/g, '_')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 400);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#140b2a] border-l border-pink-500/20 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-pink-500/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                <Heart className="w-4 h-4 fill-pink-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Your Loved Stories</h3>
                <p className="text-xs text-pink-300/80">
                  {favoriteItems.length} {favoriteItems.length === 1 ? 'photo' : 'photos'} saved
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Saved Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favoriteItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <Heart className="w-12 h-12 text-pink-500/30 mb-3" />
                <p className="text-sm font-medium text-slate-200">No loved stories yet</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Tap the heart icon on any photo in the gallery to curate your personal collection.
                </p>
              </div>
            ) : (
              favoriteItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-[#1b1037] border border-pink-500/10 hover:border-pink-500/30 transition-all group"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                    <span className="text-[11px] text-pink-300 font-medium">{item.category}</span>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => {
                          onOpenStory(item);
                          onClose();
                        }}
                        className="text-xs text-pink-400 hover:text-pink-300 font-medium inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFavorite(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer with actions */}
          {favoriteItems.length > 0 && (
            <div className="p-6 border-t border-pink-500/15 bg-[#170e30] space-y-3">
              <button
                onClick={handleDownloadAll}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Saved ({favoriteItems.length})</span>
              </button>

              <button
                onClick={onClearAll}
                className="w-full py-2 text-xs text-slate-400 hover:text-rose-300 transition-colors"
              >
                Clear all favorites
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
