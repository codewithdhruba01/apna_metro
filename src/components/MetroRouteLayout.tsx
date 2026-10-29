import React, { useState } from 'react';
import { MetroNetwork } from '../types/metro';
import { MetroMapViewer } from './MetroMapViewer';
import { RoutePlanner } from './RoutePlanner';
import { Map, Navigation, Train, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MetroRouteLayoutProps {
  network: MetroNetwork;
}

export const MetroRouteLayout: React.FC<MetroRouteLayoutProps> = ({ network }) => {
  const [mobileTab, setMobileTab] = useState<'both' | 'map' | 'planner'>('both');

  const totalStationsCount = Object.keys(network.stations).length;
  const totalLinesCount = network.lines.length;

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Metro Header Hero Banner */}
        <div className="relative p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 shadow-xs overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-zinc-200/80 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 border border-zinc-300/60 dark:border-zinc-800">
                  {network.city} Transit
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Network Data</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {network.name}
              </h1>

              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                {network.description}
              </p>
            </div>

            {/* Quick Network Stats Badges */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <div className="px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">
                  Lines
                </div>
                <div className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Train className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  <span>{totalLinesCount}</span>
                </div>
              </div>

              <div className="px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">
                  Stations
                </div>
                <div className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{totalStationsCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Network Lines Color Pills */}
          <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-900 text-left">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
              Network Lines
            </div>
            <div className="flex flex-wrap gap-2">
              {network.lines.map((line) => (
                <div
                  key={line.id}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs"
                >
                  <span
                    style={{ backgroundColor: line.color }}
                    className="w-2 h-2 rounded-full inline-block"
                  />
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {line.name}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[11px]">
                    ({line.stations.length})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View Toggle Switcher (visible on mobile only) */}
        <div className="lg:hidden flex items-center justify-center p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60">
          <button
            onClick={() => setMobileTab('both')}
            type="button"
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mobileTab === 'both'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            All Views
          </button>
          <button
            onClick={() => setMobileTab('planner')}
            type="button"
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'planner'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Route Planner</span>
          </button>
          <button
            onClick={() => setMobileTab('map')}
            type="button"
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'map'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Metro Map</span>
          </button>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Metro Map Viewer (takes 7 columns on desktop) */}
          <div
            className={`lg:col-span-7 space-y-4 ${
              mobileTab === 'planner' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Interactive Network Map
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Pinch / Scroll to zoom
              </span>
            </div>

            <MetroMapViewer
              mapImage={network.mapImage}
              vectorMapImage={network.vectorMapImage}
              altText={network.mapAlt}
              metroName={network.name}
              cityName={network.city}
            />
          </div>

          {/* Right Column: Route Planner & Results (takes 5 columns on desktop) */}
          <div
            className={`lg:col-span-5 space-y-6 ${
              mobileTab === 'map' ? 'hidden lg:block' : 'block'
            }`}
          >
            <RoutePlanner network={network} />
          </div>
        </div>
      </div>
    </div>
  );
};
