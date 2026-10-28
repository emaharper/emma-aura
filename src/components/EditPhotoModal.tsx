import React, { useState } from 'react';
import { X, Upload, Link, Check, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';
import { SafeImage } from './SafeImage';

interface EditPhotoModalProps {
  item: GalleryItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedItem: GalleryItem) => void;
}

export const EditPhotoModal: React.FC<EditPhotoModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [location, setLocation] = useState(item.location);
  const [imageUrl, setImageUrl] = useState(item.image);
  const [story, setStory] = useState(item.story);
  const [quote, setQuote] = useState(item.quote);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImageUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...item,
      title: title.trim() || item.title,
      category,
      location: location.trim() || item.location,
      image: imageUrl.trim() || item.image,
      story: story.trim() || item.story,
      quote: quote.trim() || item.quote,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#160d2e] border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-500/20 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-300">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Change Photo & Details</h3>
              <p className="text-xs text-pink-300/80">Update image from device or URL</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Image Preview & Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Current / New Image
            </label>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/40 border border-pink-500/20 mb-3 flex items-center justify-center">
              <SafeImage
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Upload from Computer / Device */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-xs font-semibold text-pink-200 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload From Device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="url"
                  placeholder="Or paste Image URL..."
                  value={imageUrl.startsWith('data:') ? '' : imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#1f133e] border border-pink-500/20 rounded-xl text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#1f133e] border border-pink-500/20 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-pink-500"
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                className="w-full px-3 py-2 bg-[#1f133e] border border-pink-500/20 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-pink-500"
              >
                <option value="Lifestyle">Lifestyle</option>
                <option value="Nature">Nature</option>
                <option value="Fashion">Fashion</option>
                <option value="Portrait">Portrait</option>
                <option value="Travel">Travel</option>
                <option value="Love">Love</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-[#1f133e] border border-pink-500/20 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          {/* Quote */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Quote (Romantic Cursive text)
            </label>
            <input
              type="text"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full px-3 py-2 bg-[#1f133e] border border-pink-500/20 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-pink-500"
            />
          </div>

          {/* Story */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Story Behind The Photo
            </label>
            <textarea
              rows={3}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full px-3 py-2 bg-[#1f133e] border border-pink-500/20 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-pink-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Save Photo Changes</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-full bg-white/10 text-slate-300 hover:text-white text-xs font-medium"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
