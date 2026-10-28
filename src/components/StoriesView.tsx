import React, { useState, useEffect } from 'react';
import { BookOpen, Volume2, VolumeX, Sparkles, ArrowRight, Heart, Share2, Compass } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { SafeImage } from './SafeImage';

interface StoriesViewProps {
  onOpenStory: (item: GalleryItem) => void;
  onExploreGallery: () => void;
}

export const StoriesView: React.FC<StoriesViewProps> = ({ onOpenStory, onExploreGallery }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Gentle acoustic ambient harp synthesizer using Web Audio API
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlayingAudio) {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      setAudioCtx(ctx);

      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 587.33]; // C, E, G, C, E, D
      let noteIndex = 0;

      const playChordNote = () => {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIndex % notes.length], ctx.currentTime);
        noteIndex++;

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.2);
      };

      playChordNote();
      interval = setInterval(playChordNote, 1600);
    } else {
      if (audioCtx) {
        audioCtx.close().catch(() => {});
        setAudioCtx(null);
      }
    }

    return () => {
      clearInterval(interval);
      if (audioCtx) {
        audioCtx.close().catch(() => {});
      }
    };
  }, [isPlayingAudio]);

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1b0f38] via-[#25134d] to-[#160a2c] border border-pink-500/25 p-8 sm:p-12 mb-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-300 tracking-wider uppercase mb-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Emma Aura Journal & Chronicles</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Every Picture Holds A Story
          </h2>
          <p className="text-sm sm:text-base text-pink-200/80 mt-3 font-light leading-relaxed">
            Behind every frame lies a hidden heartbeat: the fragrance of sea salt, the sudden stillness of mountain passes, and the poetry of fleeting glances.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                isPlayingAudio
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/40 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
              }`}
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'Ambient Melody Playing' : 'Play Ambient Music'}</span>
            </button>

            <button
              onClick={onExploreGallery}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-pink-300 hover:text-white transition-colors"
            >
              <span>Back to Visual Grid</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Story Chapters List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {GALLERY_ITEMS.slice(0, 6).map((item, idx) => (
          <article
            key={item.id}
            onClick={() => onOpenStory(item)}
            className="group cursor-pointer rounded-3xl bg-[#140b2a] border border-pink-500/20 overflow-hidden shadow-xl hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-900/20 transition-all flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center bg-[#0c0618]">
              {/* Ambient blur */}
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 opacity-40 filter brightness-75 pointer-events-none"
              />
              <SafeImage
                src={item.image}
                alt={item.title}
                fitMode="smart-contain"
                className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-pink-300 border border-white/10">
                Chapter 0{idx + 1}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#140b2a] via-transparent to-transparent" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
                  {item.category} · {item.location}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-pink-300 transition-colors">
                  {item.title}
                </h3>
                <p className="font-cursive text-lg text-pink-200/90 mt-2 italic leading-relaxed">
                  {item.quote}
                </p>
                <p className="text-xs sm:text-sm text-slate-300/80 mt-3 line-clamp-3 leading-relaxed font-light">
                  {item.story}
                </p>
              </div>

              <div className="pt-4 border-t border-pink-500/15 flex items-center justify-between text-xs">
                <span className="text-slate-400">{item.date}</span>
                <span className="text-pink-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Chapter →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
