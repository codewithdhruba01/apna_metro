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
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/90 via-slate-50/80 to-blue-50/70 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-blue-950/40 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-xl overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {network.city} Transit
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Network Data</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {network.name}
              </h1>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {network.description}
              </p>
            </div>

            {/* Quick Network Stats Badges */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <div className="px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Active Lines
                </div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Train className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>{totalLinesCount}</span>
                </div>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Verified Stations
                </div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>{totalStationsCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Network Lines Color Pills */}
          <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800/80">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Network Lines & Corridors
            </div>
            <div className="flex flex-wrap gap-2">
              {network.lines.map((line) => (
                <div
                  key={line.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs text-xs"
                >
                  <span
                    style={{ backgroundColor: line.color }}
                    className="w-2.5 h-2.5 rounded-full inline-block shadow-xs"
                  />
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {line.name}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 font-medium text-[11px]">
                    ({line.stations.length} stops)
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
