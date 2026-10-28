/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { StatsRibbon } from './components/StatsRibbon';
import { CategoryFilters, CategoryType } from './components/CategoryFilters';
import { AdsterraBanner } from './components/AdsterraBanner';
import { PhotoCard } from './components/PhotoCard';
import { PhotoDetailModal } from './components/PhotoDetailModal';
import { PhotoDetailView } from './components/PhotoDetailView';
import { ScrollToTop } from './components/FloatingDock';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { StoriesView } from './components/StoriesView';
import { AboutView } from './components/AboutView';
import { EditPhotoModal } from './components/EditPhotoModal';
import { GALLERY_ITEMS, GalleryItem } from './data/galleryData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'gallery' | 'stories' | 'about'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'likes'>('featured');
  const [isLightMode, setIsLightMode] = useState(false);

  // Gallery items state with persistence
  const [items, setItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('emma_aura_gallery_items_v6');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= GALLERY_ITEMS.length) {
          return parsed;
        }
      }
      return GALLERY_ITEMS;
    } catch {
      return GALLERY_ITEMS;
    }
  });

  // Liked items stored in localStorage with initial favorites
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('emma_aura_likes');
      return saved ? JSON.parse(saved) : ['1', '8'];
    } catch {
      return ['1', '8'];
    }
  });

  const [selectedStoryItem, setSelectedStoryItem] = useState<GalleryItem | null>(null);
  const [selectedModalItem, setSelectedModalItem] = useState<GalleryItem | null>(null);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cardFitMode, setCardFitMode] = useState<'smart-contain' | 'cover'>('smart-contain');

  // Sync items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('emma_aura_gallery_items_v6', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  // Sync likes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('emma_aura_likes', JSON.stringify(likedIds));
    } catch {
      // ignore
    }
  }, [likedIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSavePhoto = (updatedItem: GalleryItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === updatedItem.id);
      if (exists) {
        return prev.map((i) => (i.id === updatedItem.id ? updatedItem : i));
      } else {
        return [updatedItem, ...prev];
      }
    });

    if (selectedStoryItem && selectedStoryItem.id === updatedItem.id) {
      setSelectedStoryItem(updatedItem);
    }
    if (selectedModalItem && selectedModalItem.id === updatedItem.id) {
      setSelectedModalItem(updatedItem);
    }
    showToast(`Saved "${updatedItem.title}" successfully! ♡`);
  };

  const handleAddNewPhoto = () => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: 'New Memory',
      category: 'Lifestyle',
      image: '/src/assets/images/sunset_vibes_photo_1791366743972.jpg',
      isNew: true,
      likes: 12,
      date: 'Today',
      location: 'Golden Coast',
      camera: 'Sony A7R V',
      settings: '1/500s · f/2.0 · ISO 100',
      palette: ['#ec4899', '#f43f5e', '#38bdf8', '#0c071a'],
      quote: '“A brand new memory etched in warm light...” ♡',
      story: 'A new captivating photograph added to the Emma Aura collection.',
    };
    setEditingItem(newItem);
  };

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const isAlreadyLiked = prev.includes(id);
      if (isAlreadyLiked) {
        showToast('Removed from favorites ♡');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your favorites ♡');
        return [...prev, id];
      }
    });
  };

  const clearAllFavorites = () => {
    setLikedIds([]);
    showToast('Cleared all favorites');
  };

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Others'
          ? item.category === 'Others' || item.category === 'City'
          : item.category.toLowerCase() === selectedCategory.toLowerCase());

      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.story.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'likes') {
        const likesA = a.likes + (likedIds.includes(a.id) ? 1 : 0);
        const likesB = b.likes + (likedIds.includes(b.id) ? 1 : 0);
        return likesB - likesA;
      }
      if (sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      return 0;
    });
  }, [items, selectedCategory, searchQuery, sortBy, likedIds]);

  const favoriteItems = useMemo(() => {
    return items.filter((item) => likedIds.includes(item.id));
  }, [items, likedIds]);

  const handleQuickDownload = () => {
    const featured = GALLERY_ITEMS[0];
    const link = document.createElement('a');
    link.href = featured.image;
    link.download = `emma_aura_${featured.title.toLowerCase().replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading "${featured.title}"`);
  };

  // Navigate next/prev in modal
  const handleModalNext = () => {
    if (!selectedModalItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedModalItem.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedModalItem(filteredItems[nextIndex]);
  };

  const handleModalPrev = () => {
    if (!selectedModalItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedModalItem.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedModalItem(filteredItems[prevIndex]);
  };

  return (
    <div
      className={`min-h-screen selection:bg-pink-500 selection:text-white transition-colors duration-500 font-sans-clean ${
        isLightMode
          ? 'bg-[#f8f5fd] text-slate-900'
          : 'bg-[#0c071a] text-slate-100'
      }`}
    >
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Top Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedStoryItem(null);
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLightMode={isLightMode}
          setIsLightMode={setIsLightMode}
          favoriteCount={likedIds.length}
          openFavorites={() => setIsFavoritesOpen(true)}
        />

        {/* Dynamic Views */}
        <main className="flex-1 pb-16">
          {selectedStoryItem ? (
            <PhotoDetailView
              item={selectedStoryItem}
              items={filteredItems.length > 0 ? filteredItems : items}
              isLiked={likedIds.includes(selectedStoryItem.id)}
              onToggleLike={toggleLike}
              onBackToGallery={() => {
                setSelectedStoryItem(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectStory={(newItem) => {
                setSelectedStoryItem(newItem);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenEdit={(item) => setEditingItem(item)}
            />
          ) : activeTab === 'stories' ? (
            <StoriesView
              onOpenStory={(item) => {
                setSelectedStoryItem(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreGallery={() => setActiveTab('gallery')}
            />
          ) : activeTab === 'about' ? (
            <AboutView />
          ) : (
            <>
              {/* Hero Banner (visible on Home) */}
              {activeTab === 'home' && (
                <HeroBanner
                  onExplore={() => {
                    const el = document.getElementById('gallery-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              )}

              {/* Stats Ribbon Bar matching the screenshot */}
              <StatsRibbon />

              {/* Category Filter Pills & Search */}
              <div id="gallery-section">
                <CategoryFilters
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>

              {/* Main Content Area: Left Adsterra Ads Card + Photo Grid */}
              <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col xl:flex-row gap-5 items-start">
                  
                  {/* Left Column: Adsterra Ads Banner matching the screenshot */}
                  <aside className="w-full xl:w-56 2xl:w-64 shrink-0">
                    <AdsterraBanner />
                  </aside>

                  {/* Main Gallery Grid */}
                  <div className="flex-1 w-full">
                    {/* Story count & status bar with Photo View switcher */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 px-1 text-xs text-pink-200/70">
                      <span className="font-medium">
                        Showing <strong className="text-white font-semibold">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'story' : 'stories'}
                        {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
                      </span>

                      {/* Display Mode: Puro Photo (100% uncropped fit) vs Fill */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-pink-300/70 hidden sm:inline-block">Photo View:</span>
                        <div className="inline-flex items-center p-0.5 rounded-full bg-black/60 border border-white/10 text-[11px] shadow-sm">
                          <button
                            onClick={() => setCardFitMode('smart-contain')}
                            className={`px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1 ${
                              cardFitMode === 'smart-contain'
                                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow'
                                : 'text-slate-300 hover:text-white'
                            }`}
                            title="Shows 100% full uncropped image for all cards"
                          >
                            <span>🖼️ Puro Photo (Fit)</span>
                          </button>
                          <button
                            onClick={() => setCardFitMode('cover')}
                            className={`px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1 ${
                              cardFitMode === 'cover'
                                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow'
                                : 'text-slate-300 hover:text-white'
                            }`}
                            title="Fills the entire card frame"
                          >
                            <span>⛶ Fill Card</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {filteredItems.length === 0 ? (
                      <div className="rounded-3xl bg-[#140b2a]/60 border border-pink-500/20 p-12 text-center my-6">
                        <p className="text-lg font-bold text-white">No photos found</p>
                        <p className="text-xs text-pink-300/80 mt-1">
                          No stories match your current filter or search &ldquo;{searchQuery}&rdquo;.
                        </p>
                        <button
                          onClick={() => {
                            setSelectedCategory('All');
                            setSearchQuery('');
                          }}
                          className="mt-4 px-5 py-2 rounded-full text-xs font-semibold bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                        >
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3.5 sm:gap-4">
                        {filteredItems.map((item) => (
                          <PhotoCard
                            key={item.id}
                            item={item}
                            isLiked={likedIds.includes(item.id)}
                            onToggleLike={toggleLike}
                            defaultFitMode={cardFitMode}
                            onOpenStory={(it) => {
                              setSelectedStoryItem(it);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </>
          )}
        </main>

        {/* Scroll To Top button at bottom right */}
        <ScrollToTop />

        {/* Photo Detail Modal */}
        <PhotoDetailModal
          item={selectedModalItem}
          items={filteredItems}
          isLiked={selectedModalItem ? likedIds.includes(selectedModalItem.id) : false}
          onToggleLike={toggleLike}
          onClose={() => setSelectedModalItem(null)}
          onSelectNext={handleModalNext}
          onSelectPrev={handleModalPrev}
          onOpenEdit={(item) => setEditingItem(item)}
        />

        {/* Edit / Change Photo Modal */}
        {editingItem && (
          <EditPhotoModal
            item={editingItem}
            isOpen={!!editingItem}
            onClose={() => setEditingItem(null)}
            onSave={handleSavePhoto}
          />
        )}

        {/* Favorites Slide-over Drawer */}
        <FavoritesDrawer
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          favoriteItems={favoriteItems}
          onRemoveFavorite={toggleLike}
          onOpenStory={(item) => {
            setSelectedStoryItem(item);
            setIsFavoritesOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onClearAll={clearAllFavorites}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-black/90 border border-pink-500/40 text-xs text-pink-200 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
            {toastMessage}
          </div>
        )}

        {/* Site Footer */}
        <footer className="border-t border-pink-500/15 bg-[#090514] py-8 text-center text-xs text-slate-400">
          <div className="max-w-[1720px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-script text-2xl text-pink-300 font-bold">Emma Aura</span>
              <span className="text-pink-400">·</span>
              <span className="text-[11px] text-pink-200/70">Every Picture Holds A Story</span>
            </div>

            <div className="text-[11px] text-slate-400">
              © 2026 Emma Aura Edition. 112 Captivating Stories Of Beauty & Elegance.
            </div>

            <div className="flex items-center gap-4 text-[11px] text-pink-300/80">
              <button
                onClick={() => {
                  setActiveTab('home');
                  setSelectedStoryItem(null);
                }}
                className="hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveTab('gallery');
                  setSelectedStoryItem(null);
                }}
                className="hover:text-white transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => {
                  setActiveTab('stories');
                  setSelectedStoryItem(null);
                }}
                className="hover:text-white transition-colors"
              >
                Stories
              </button>
              <button
                onClick={() => {
                  setActiveTab('about');
                  setSelectedStoryItem(null);
                }}
                className="hover:text-white transition-colors"
              >
                About
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
