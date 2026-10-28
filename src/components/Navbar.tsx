import React from 'react';
import { Home, Image as ImageIcon, BookOpen, User, Search, Moon, Sun, Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'gallery' | 'stories' | 'about';
  setActiveTab: (tab: 'home' | 'gallery' | 'stories' | 'about') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLightMode: boolean;
  setIsLightMode: React.Dispatch<React.SetStateAction<boolean>>;
  favoriteCount: number;
  openFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  isLightMode,
  setIsLightMode,
  favoriteCount,
  openFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0b0717]/85 border-b border-pink-500/15 transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex flex-col items-start text-left group focus:outline-none"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-script text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 bg-clip-text text-transparent group-hover:scale-[1.02] transition-transform">
              Emma Aura
            </span>
            <span className="text-pink-400 text-sm animate-pulse">♡</span>
          </div>
          <span className="text-[10px] sm:text-xs tracking-wider text-pink-200/70 uppercase font-sans-clean -mt-1 font-medium">
            Every Picture Holds A Story
          </span>
        </button>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 bg-[#170e2f]/80 p-1.5 rounded-full border border-pink-500/20 shadow-inner">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-lg shadow-pink-500/30 scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-lg shadow-pink-500/30 scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'stories'
                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-lg shadow-pink-500/30 scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Stories</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-lg shadow-pink-500/30 scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>About</span>
          </button>
        </nav>

        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative hidden sm:block w-48 lg:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photos..."
              className="w-full pl-10 pr-4 py-2 bg-[#170e2f]/90 border border-pink-500/20 rounded-full text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Favorites quick trigger */}
          <button
            onClick={openFavorites}
            className="relative p-2.5 rounded-full bg-[#170e2f] border border-pink-500/20 text-slate-300 hover:text-pink-400 hover:border-pink-500/40 transition-all"
            title="Saved Favorites"
          >
            <Heart className="w-4 h-4" />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Theme mode toggle */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="p-2.5 rounded-full bg-[#170e2f] border border-pink-500/20 text-slate-300 hover:text-white hover:border-pink-500/40 transition-all"
            title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Ambient Glow'}
          >
            {isLightMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-[#170e2f] border border-pink-500/20 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#120a27] border-b border-pink-500/20 px-6 py-4 space-y-3">
          <div className="relative w-full mb-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photos..."
              className="w-full pl-10 pr-4 py-2 bg-[#1b1038] border border-pink-500/20 rounded-full text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === 'home' ? 'bg-pink-600 text-white' : 'bg-[#1a0f35] text-slate-300'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('gallery');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === 'gallery' ? 'bg-pink-600 text-white' : 'bg-[#1a0f35] text-slate-300'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Gallery</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('stories');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === 'stories' ? 'bg-pink-600 text-white' : 'bg-[#1a0f35] text-slate-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Stories</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('about');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === 'about' ? 'bg-pink-600 text-white' : 'bg-[#1a0f35] text-slate-300'
              }`}
            >
              <User className="w-4 h-4" />
              <span>About</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
