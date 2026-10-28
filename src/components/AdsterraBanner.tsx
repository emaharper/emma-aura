import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, ExternalLink, ShieldCheck, Zap, DollarSign } from 'lucide-react';

export const AdsterraBanner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-b from-[#241344] via-[#1a0e33] to-[#120826] border border-pink-500/30 p-5 shadow-xl shadow-pink-950/30 flex flex-col items-center text-center transition-all duration-300 hover:border-pink-500/50 hover:shadow-pink-500/10">
        
        {/* Subtle decorative glowing background */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

        {/* Stylized Logo 'A' */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-indigo-500 p-0.5 shadow-lg shadow-pink-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#160a2c] rounded-[14px] flex items-center justify-center">
              <span className="text-3xl font-black bg-gradient-to-b from-white via-pink-100 to-rose-300 bg-clip-text text-transparent font-display">
                A
              </span>
            </div>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white tracking-wide">
          Adsterra Ads
        </h3>

        {/* Description */}
        <p className="text-xs text-pink-200/70 mt-1.5 leading-relaxed font-light">
          Premium Ads for Maximum Earnings
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-600 shadow-md shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Small subtle disclaimer */}
        <span className="text-[10px] text-pink-400/50 mt-3 font-mono">
          Sponsored Partner
        </span>
      </div>

      {/* Adsterra Partner Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#180f33] border border-pink-500/30 rounded-3xl p-6 shadow-2xl shadow-black text-left">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-pink-500/30">
                A
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Adsterra Network</h4>
                <p className="text-xs text-pink-300">Creator Monetization Platform</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Empowering global visual artists, photographers, and independent galleries with high CPM monetization formats and 100% fill rates worldwide.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#221544] border border-pink-500/15">
                <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white">Instant Payouts</div>
                  <div className="text-[11px] text-slate-400">Bi-weekly automatic payments with low threshold</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#221544] border border-pink-500/15">
                <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white">Non-Intrusive Formats</div>
                  <div className="text-[11px] text-slate-400">Native banners and discreet creative placements</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#221544] border border-pink-500/15">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white">Anti-Adblock Protection</div>
                  <div className="text-[11px] text-slate-400">Smart multi-layer traffic verification</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:opacity-95 transition-all text-center"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
