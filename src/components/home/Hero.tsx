import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrainFront,
  ArrowRight,
  GitMerge,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface DemoRoute {
  id: string;
  city: string;
  metroName: string;
  link: string;
  from: string;
  to: string;
  totalStops: number;
  transfers: number;
  timeNote: string;
  segments: {
    lineName: string;
    lineColor: string;
    textColor: string;
    stations: string[];
    transferNotice?: string;
  }[];
}

const demoRoutes: DemoRoute[] = [
  {
    id: 'delhi',
    city: 'Delhi NCR',
    metroName: 'Delhi Metro',
    link: '/delhi-metro',
    from: 'Rajiv Chowk',
    to: 'IGI Airport T3',
    totalStops: 6,
    transfers: 1,
    timeNote: 'Fastest Transit to Airport',
    segments: [
      {
        lineName: 'Yellow Line (Line 2)',
        lineColor: '#EAB308',
        textColor: '#000000',
        stations: ['Rajiv Chowk (CP)', 'New Delhi'],
        transferNotice: 'Transfer at New Delhi to Airport Express Line',
      },
      {
        lineName: 'Airport Express (Orange Line)',
        lineColor: '#EA580C',
        textColor: '#FFFFFF',
        stations: ['New Delhi', 'Shivaji Stadium', 'Dhaula Kuan', 'Delhi Aerocity', 'Airport (IGI Terminal 3)'],
      },
    ],
  },
  {
    id: 'kolkata',
    city: 'Kolkata',
    metroName: 'Kolkata Metro',
    link: '/kolkata-metro',
    from: 'Howrah Maidan',
    to: 'Salt Lake Sector V',
    totalStops: 12,
    transfers: 0,
    timeNote: 'Under-River Hooghly Tunnel',
    segments: [
      {
        lineName: 'Green Line (Line 2)',
        lineColor: '#00802B',
        textColor: '#FFFFFF',
        stations: ['Howrah Maidan', 'Howrah Railway Station', 'Mahakaran', 'Esplanade', 'Sealdah', 'Salt Lake Sector V'],
      },
    ],
  },
  {
    id: 'chennai',
    city: 'Chennai',
    metroName: 'Chennai Metro',
    link: '/chennai-metro',
    from: 'Koyambedu (CMBT)',
    to: 'Chennai Airport',
    totalStops: 10,
    transfers: 1,
    timeNote: 'Bus Terminal to Flight Link',
    segments: [
      {
        lineName: 'Green Line (Corridor 2)',
        lineColor: '#43B02A',
        textColor: '#FFFFFF',
        stations: ['Koyambedu', 'CMBT', 'Arumbakkam', 'Vadapalani', 'Ashok Nagar', 'Arignar Anna Alandur'],
        transferNotice: 'Transfer at Alandur to Blue Line (Corridor 1)',
      },
      {
        lineName: 'Blue Line (Corridor 1)',
        lineColor: '#0085CA',
        textColor: '#FFFFFF',
        stations: ['Arignar Anna Alandur', 'Nanganallur Road', 'Meenambakkam', 'Chennai International Airport'],
      },
    ],
  },
];

export const Hero: React.FC = () => {
  const [selectedDemoId, setSelectedDemoId] = useState<'delhi' | 'kolkata' | 'chennai'>('delhi');
  const activeRoute = demoRoutes.find((r) => r.id === selectedDemoId) || demoRoutes[0];

  return (
    <section className="relative pt-14 sm:pt-20 pb-12 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* 1. ClearBG-style Centered Titles */}
      <div className="max-w-2xl mx-auto space-y-3.5 mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-medium tracking-tight text-zinc-950 dark:text-white mb-5 transition-colors duration-150">
          Navigate your city.
          <br />
          Find your fastest route.
        </h1>

        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-normal leading-relaxed mb-6 transition-colors duration-150">
          Explore metro maps, discover shortest paths, and plan your journey across Delhi, Kolkata, and Chennai in seconds.
        </p>

        {/* Pill CTA button (exactly like ClearBG "Make it transparent") */}
        <div className="pt-1">
          <Link
            to={activeRoute.link}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-medium text-sm transition-colors shadow-sm"
          >
            <span>Plan your journey</span>
          </Link>
        </div>
      </div>

      {/* 2. The Hero Showcase Mock Card (matching ClearBG) */}
      <div className="w-full max-w-2xl mx-auto mt-2">
        {/* Outer glowing frame container with purple/indigo aura */}
        <div className="relative p-2 sm:p-2.5 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-purple-800/30 dark:from-purple-900/40 dark:via-indigo-950/30 dark:to-violet-900/40 shadow-2xl backdrop-blur-2xl border border-purple-500/20 dark:border-purple-500/10">
          
          {/* Inner Mock Card Surface */}
          <div className="rounded-2xl bg-zinc-950 text-white border border-zinc-800/90 p-4 sm:p-6 overflow-hidden relative">
            
            {/* Top Interactive City Tabs inside card */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-zinc-800/80">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800">
                {demoRoutes.map((route) => {
                  const isActive = route.id === selectedDemoId;
                  return (
                    <button
                      key={route.id}
                      onClick={() => setSelectedDemoId(route.id as any)}
                      type="button"
                      className={`relative px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-zinc-800 text-white shadow-xs'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="demo-tab-pill"
                          className="absolute inset-0 bg-zinc-800 rounded-lg"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <span>{route.metroName}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] text-emerald-400">{activeRoute.timeNote}</span>
              </div>
            </div>

            {/* Journey Header */}
            <div className="text-left mb-6">
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span className="uppercase tracking-wider text-[11px] font-semibold">{activeRoute.city} Route Finder Simulation</span>
              </div>
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>{activeRoute.from}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>{activeRoute.to}</span>
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono">
                  {activeRoute.totalStops} Stations • {activeRoute.transfers === 0 ? 'Direct Route' : `${activeRoute.transfers} Transfer`}
                </span>
              </div>
            </div>

            {/* Visual Route Timeline inside Mock Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoute.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 text-left"
              >
                {activeRoute.segments.map((segment, segIdx) => (
                  <div key={segIdx} className="space-y-2.5">
                    {/* Line badge */}
                    <div className="flex items-center gap-2">
                      <span
                        style={{ backgroundColor: segment.lineColor }}
                        className="w-2.5 h-2.5 rounded-full"
                      />
                      <span className="text-xs font-bold text-zinc-300">
                        {segment.lineName}
                      </span>
                    </div>

                    {/* Stations Bar / Chips */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex flex-wrap items-center gap-2 sm:gap-3">
                      {segment.stations.map((st, i) => {
                        const isStart = i === 0 && segIdx === 0;
                        const isEnd = i === segment.stations.length - 1 && segIdx === activeRoute.segments.length - 1;
                        return (
                          <div key={i} className="flex items-center gap-2 sm:gap-3">
                            <span
                              className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${
                                isStart
                                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                                  : isEnd
                                  ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30'
                                  : 'bg-zinc-800/80 text-zinc-300 font-normal'
                              }`}
                            >
                              <span
                                style={{ backgroundColor: segment.lineColor }}
                                className="w-1.5 h-1.5 rounded-full"
                              />
                              <span>{st}</span>
                            </span>
                            {i !== segment.stations.length - 1 && (
                              <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Interchange Notification if exists */}
                    {segment.transferNotice && (
                      <div className="my-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2 font-medium">
                        <GitMerge className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{segment.transferNotice}</span>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Subtle animated transit glow */}
            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified transit topology & real platform connections</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                <TrainFront className="w-3.5 h-3.5 text-zinc-400" />
                <span>BFS Shortest Hop Engine</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar below Mock Card (Clean Right-Aligned Button) */}
        <div className="mt-4 flex justify-end px-1">
          <Link
            to={activeRoute.link}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-semibold transition-colors shadow-sm transform-none hover:transform-none active:transform-none select-none"
          >
            <span>Open {activeRoute.city} Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
