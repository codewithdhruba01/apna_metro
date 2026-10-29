import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Navigation,
  Map,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-teal-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                Delhi • Kolkata • Chennai
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Verified Transit Graph
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Navigate Your City,{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                One Station at a Time.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore metro maps, discover routes, and plan your journey across Delhi, Kolkata, and Chennai.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#metro-networks"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
              >
                <Map className="w-4 h-4" />
                <span>Explore Metro Maps</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <Link
                to="/delhi-metro"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/80 hover:bg-slate-100/90 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Find Your Route</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Official Station Coordinates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Smart Interchange Routing</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Metro Line Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-2xl shadow-2xl">
              {/* Header inside illustration card */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                    metro-graph://active
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Realtime BFS
                </span>
              </div>

              {/* Metro Visual Graphic SVG */}
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-slate-950 p-4 overflow-hidden border border-slate-800">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                    <linearGradient id="greenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                    <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#C084FC" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines subtle */}
                  <g opacity="0.1" stroke="#FFFFFF" strokeWidth="0.5">
                    <line x1="0" y1="50" x2="400" y2="50" />
                    <line x1="0" y1="100" x2="400" y2="100" />
                    <line x1="0" y1="150" x2="400" y2="150" />
                    <line x1="0" y1="200" x2="400" y2="200" />
                    <line x1="0" y1="250" x2="400" y2="250" />
                    <line x1="50" y1="0" x2="50" y2="300" />
                    <line x1="100" y1="0" x2="100" y2="300" />
                    <line x1="150" y1="0" x2="150" y2="300" />
                    <line x1="200" y1="0" x2="200" y2="300" />
                    <line x1="250" y1="0" x2="250" y2="300" />
                    <line x1="300" y1="0" x2="300" y2="300" />
                    <line x1="350" y1="0" x2="350" y2="300" />
                  </g>

                  {/* Line 1: Blue Diagonal Line */}
                  <path
                    d="M 40 240 L 140 150 L 260 150 L 360 60"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Line 2: Green Crossing Line */}
                  <path
                    d="M 60 70 L 140 150 L 200 240 L 320 240"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Line 3: Magenta / Violet Curved Line */}
                  <path
                    d="M 260 270 L 260 150 L 320 150 L 360 210"
                    fill="none"
                    stroke="#EC4899"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Stations on Blue Line */}
                  <circle cx="40" cy="240" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />
                  <circle cx="90" cy="195" r="4" fill="#FFFFFF" />
                  <circle cx="200" cy="150" r="4" fill="#FFFFFF" />
                  <circle cx="310" cy="105" r="4" fill="#FFFFFF" />
                  <circle cx="360" cy="60" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />

                  {/* Stations on Green Line */}
                  <circle cx="60" cy="70" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="3" />
                  <circle cx="100" cy="110" r="4" fill="#FFFFFF" />
                  <circle cx="170" cy="195" r="4" fill="#FFFFFF" />
                  <circle cx="260" cy="240" r="4" fill="#FFFFFF" />
                  <circle cx="320" cy="240" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="3" />

                  {/* Interchanges with Double Rings */}
                  {/* Interchange 1: (140, 150) */}
                  <circle cx="140" cy="150" r="9" fill="#0F172A" stroke="#FFFFFF" strokeWidth="3" />
                  <circle cx="140" cy="150" r="4" fill="#EAB308" />

                  {/* Interchange 2: (260, 150) */}
                  <circle cx="260" cy="150" r="9" fill="#0F172A" stroke="#FFFFFF" strokeWidth="3" />
                  <circle cx="260" cy="150" r="4" fill="#EAB308" />

                  {/* Animated Train Node traveling along Blue line */}
                  <motion.circle
                    r="6"
                    fill="#38BDF8"
                    animate={{
                      cx: [40, 140, 260, 360, 260, 140, 40],
                      cy: [240, 150, 150, 60, 150, 150, 240],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Labels for stations */}
                  <text x="140" y="130" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="bold">
                    Central Interchange
                  </text>
                  <text x="260" y="130" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="bold">
                    Transfer Station
                  </text>
                </svg>

                {/* Live simulation banner */}
                <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Interactive Topology</span>
                </div>
              </div>

              {/* Bottom Quick Line Legends */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                    Delhi Metro
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    250+ Stations
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    Kolkata Metro
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Underwater Tunnel
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">
                    Chennai Metro
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Airport Direct
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
