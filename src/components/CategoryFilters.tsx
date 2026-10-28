import React from 'react';
import {
  Sparkles,
  Leaf,
  Shirt,
  User,
  Coffee,
  Plane,
  Heart,
  Grid,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

export type CategoryType =
  | 'All'
  | 'Nature'
  | 'Fashion'
  | 'Portrait'
  | 'Lifestyle'
  | 'Travel'
  | 'Love'
  | 'Others';

interface CategoryFiltersProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'newest' | 'likes';
  setSortBy: (sort: 'featured' | 'newest' | 'likes') => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = React.useState(false);

  const categories: { label: CategoryType; icon: React.FC<{ className?: string }> }[] = [
    { label: 'All', icon: Sparkles },
    { label: 'Nature', icon: Leaf },
    { label: 'Fashion', icon: Shirt },
    { label: 'Portrait', icon: User },
    { label: 'Lifestyle', icon: Coffee },
    { label: 'Travel', icon: Plane },
    { label: 'Love', icon: Heart },
    { label: 'Others', icon: Grid },
  ];

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Category Pills (Horizontal scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar">
          {categories.map(({ label, icon: Icon }) => {
            const isActive = selectedCategory === label;
            return (
              <button
                key={label}
                onClick={() => onSelectCategory(label)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-lg shadow-pink-500/30 scale-105'
                    : 'bg-[#180f33]/80 hover:bg-[#231548] text-slate-300 hover:text-white border border-pink-500/15'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-pink-300/80'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Search Bar & Filter Options */}
        <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-auto w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photos..."
              className="w-full pl-10 pr-4 py-2 bg-[#180f33]/90 border border-pink-500/20 rounded-full text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter options trigger */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`p-2.5 rounded-full border transition-all ${
                showFilterDropdown
                  ? 'bg-pink-600 text-white border-pink-500'
                  : 'bg-[#180f33] text-slate-300 border-pink-500/20 hover:text-white hover:border-pink-500/40'
              }`}
              title="Filter & Sorting options"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {showFilterDropdown && (
              <div className="absolute right-0 top-12 w-48 bg-[#180f33] border border-pink-500/30 rounded-2xl p-2 shadow-2xl shadow-black/80 z-30">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-pink-300 uppercase tracking-wider">
                  Sort Photos
                </div>
                <button
                  onClick={() => {
                    setSortBy('featured');
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    sortBy === 'featured'
                      ? 'bg-pink-500/20 text-pink-300'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  Featured Stories
                </button>
                <button
                  onClick={() => {
                    setSortBy('newest');
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    sortBy === 'newest'
                      ? 'bg-pink-500/20 text-pink-300'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  Newest Uploads
                </button>
                <button
                  onClick={() => {
                    setSortBy('likes');
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    sortBy === 'likes'
                      ? 'bg-pink-500/20 text-pink-300'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  Most Loved ♡
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
