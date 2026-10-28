import React from 'react';
import { X } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';
import { PhotoDetailView } from './PhotoDetailView';

interface PhotoDetailModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  isLiked: boolean;
  onToggleLike: (id: string) => void;
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
  onOpenEdit?: (item: GalleryItem) => void;
}

export const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({
  item,
  items,
  isLiked,
  onToggleLike,
  onClose,
  onSelectNext,
  onSelectPrev,
  onOpenEdit,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#090514]/95 backdrop-blur-2xl text-slate-100 animate-in fade-in duration-200">
      {/* Floating Close Button on top right */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 sm:right-8 z-50 p-3 rounded-full bg-black/60 hover:bg-black/90 text-slate-200 hover:text-white border border-white/20 backdrop-blur-md shadow-2xl transition-all hover:scale-110"
        title="Close (ESC)"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="pt-4 sm:pt-6">
        <PhotoDetailView
          item={item}
          items={items}
          isLiked={isLiked}
          onToggleLike={onToggleLike}
          onBackToGallery={onClose}
          onSelectStory={(newItem) => {
            const curIdx = items.findIndex((i) => i.id === item.id);
            const newIdx = items.findIndex((i) => i.id === newItem.id);
            if (newIdx > curIdx) {
              onSelectNext();
            } else {
              onSelectPrev();
            }
          }}
          onOpenEdit={onOpenEdit}
        />
      </div>
    </div>
  );
};
