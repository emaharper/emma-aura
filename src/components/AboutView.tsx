import React, { useState } from 'react';
import { Camera, MapPin, Award, Mail, Heart, Sparkles, Send, Check } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const AboutView: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSent(false);
    }, 4000);
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      
      {/* Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        
        {/* Left Portrait */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-pink-500/30 shadow-2xl shadow-pink-950/40">
            <SafeImage
              src="/src/assets/images/flower_girl_portrait_1791366760409.jpg"
              alt="Emma Aura"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b061a] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-script text-3xl text-pink-300">Emma Aura</span>
              <p className="text-xs text-slate-300 font-sans-clean uppercase tracking-widest mt-1">
                Visual Artist · Storyteller · Collector
              </p>
            </div>
          </div>
        </div>

        {/* Right Story Prose */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-semibold text-pink-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Behind The Vision</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            I don’t take photographs to freeze time. I capture them to let time speak.
          </h2>

          <div className="text-sm sm:text-base text-slate-300/90 leading-relaxed space-y-4 font-light">
            <p>
              Emma Aura is a fine-art visual storyteller working across the Mediterranean, the Japanese archipelago, and the wild alpine passes of Europe.
            </p>
            <p>
              Founded on the belief that <strong className="text-pink-300 font-medium">“Every Picture Holds A Story,”</strong> this gallery represents a meticulously curated catalog of 112 visual memories. From sun-bleached coastal terraces in Amalfi to midnight neon reflections in Tokyo, each print is an emotional sanctuary.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-[#170e30] border border-pink-500/15">
              <div className="text-2xl font-bold text-white tabular-nums">112+</div>
              <div className="text-xs text-pink-300/80 mt-1 font-medium">Master Works</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#170e30] border border-pink-500/15">
              <div className="text-2xl font-bold text-white tabular-nums">18</div>
              <div className="text-xs text-pink-300/80 mt-1 font-medium">Countries Traveled</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#170e30] border border-pink-500/15">
              <div className="text-2xl font-bold text-white tabular-nums">100%</div>
              <div className="text-xs text-pink-300/80 mt-1 font-medium">Authentic Light</div>
            </div>
          </div>
        </div>

      </div>

      {/* Gear & Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Camera Gear */}
        <div className="p-8 rounded-3xl bg-[#150c2c] border border-pink-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Camera & Optical Equipment</h3>
              <p className="text-xs text-pink-300/70">What brings each moment into focus</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-[#1e123d] flex justify-between items-center text-slate-200">
              <span>Leica M11 Rangefinder</span>
              <span className="text-pink-300 font-mono text-xs">Summilux-M 50mm f/1.4</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#1e123d] flex justify-between items-center text-slate-200">
              <span>Sony A7R V High-Resolution</span>
              <span className="text-pink-300 font-mono text-xs">FE 35mm & 85mm GM</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#1e123d] flex justify-between items-center text-slate-200">
              <span>Hasselblad X2D 100C Medium Format</span>
              <span className="text-pink-300 font-mono text-xs">XCD 55mm f/2.5 V</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#1e123d] flex justify-between items-center text-slate-200">
              <span>Natural Prism & Diffusion Glass</span>
              <span className="text-pink-300 font-mono text-xs">Black Pro-Mist 1/4</span>
            </div>
          </div>
        </div>

        {/* Contact / Inquiries Form */}
        <div className="p-8 rounded-3xl bg-[#150c2c] border border-pink-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Inquiries & Private Print Orders</h3>
                <p className="text-xs text-pink-300/70">Reach out for collaborations and gallery acquisitions</p>
              </div>
            </div>

            {formSent ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Message Received with Gratitude</h4>
                <p className="text-xs text-emerald-300/80">
                  Emma will respond personally within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1e123d] border border-pink-500/20 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1e123d] border border-pink-500/20 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your thought or inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1e123d] border border-pink-500/20 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-pink-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Emma Aura</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
