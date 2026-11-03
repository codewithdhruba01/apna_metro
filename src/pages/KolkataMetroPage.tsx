import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpDown,
  Navigation,
  RotateCcw,
  AlertCircle,
  MapPin,
  Sparkles,
  Train,
  CheckCircle2,
  ShieldCheck,
  Copy,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  GitMerge,
  Waves,
  Car,
  Map as MapIcon
} from 'lucide-react';
import { kolkataMetroData } from '../data/kolkataMetro';
import { KolkataMetroMap } from '../components/ui/KolkataMetroMap';
import { StationSelector } from '../components/StationSelector';
import { findRoute } from '../utils/routeFinder';
import { MetroRoute } from '../types/metro';

export const KolkataMetroPage: React.FC = () => {
  // Initial state: empty selection, full network view until user chooses and clicks Find
  const [sourceId, setSourceId] = useState<string>('');
  const [destinationId, setDestinationId] = useState<string>('');
  const [route, setRoute] = useState<MetroRoute | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedSegments, setExpandedSegments] = useState<Record<number, boolean>>({});
  const [mobileTab, setMobileTab] = useState<'map' | 'planner' | 'both'>('both');

  // Handle station selection from interactive map clicks
  const handleMapSelectStation = (stationId: string, role: 'source' | 'destination') => {
    if (role === 'source') {
      setSourceId(stationId);
      setError(null);
    } else {
      setDestinationId(stationId);
      setError(null);
    }
  };

  // Station selector changes
  const handleSourceChange = (newSourceId: string) => {
    setSourceId(newSourceId);
    setError(null);
  };

  const handleDestinationChange = (newDestId: string) => {
    setDestinationId(newDestId);
    setError(null);
  };

  // Swap origin and destination
  const handleSwap = () => {
    const temp = sourceId;
    setSourceId(destinationId);
    setDestinationId(temp);

    // If route was already calculated, recalculate for swapped stations
    if (destinationId && temp) {
      if (destinationId === temp) {
        setError('Starting station and destination cannot be the same.');
        setRoute(null);
      } else {
        const newRoute = findRoute(kolkataMetroData, destinationId, temp);
        setRoute(newRoute);
        setError(newRoute ? null : 'No route found between these stations.');
      }
    }
  };

  // Find Route handler: executed when user clicks "Find Fastest Route"
  const handleFindRoute = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!sourceId && !destinationId) {
      setError('Please select both a Starting Station and Destination Station.');
      setRoute(null);
      return;
    }

    if (!sourceId) {
      setError('Please select your Starting Station.');
      setRoute(null);
      return;
    }

    if (!destinationId) {
      setError('Please select your Destination Station.');
      setRoute(null);
      return;
    }

    if (sourceId === destinationId) {
      setError('Starting station and destination cannot be identical. Please choose two distinct stations.');
      setRoute(null);
      return;
    }

    const calculated = findRoute(kolkataMetroData, sourceId, destinationId);
    if (!calculated) {
      setError('Unable to calculate a route between these stations.');
      setRoute(null);
    } else {
      setError(null);
      setRoute(calculated);
    }
  };

  // Reset planner: clears route and returns map to full city view
  const handleReset = () => {
    setSourceId('');
    setDestinationId('');
    setRoute(null);
    setError(null);
  };

  // Quick route picker: instantly populates and finds the route
  const handleSelectQuickRoute = (from: string, to: string) => {
    setSourceId(from);
    setDestinationId(to);
    setError(null);
    const calculated = findRoute(kolkataMetroData, from, to);
    setRoute(calculated);
  };

  // Copy route summary to clipboard
  const handleCopy = () => {
    if (!route) return;
    const text = [
      `Kolkata Metro Route:`,
      `From: ${route.source.name} ➔ To: ${route.destination.name}`,
      `Stops: ${route.totalStations} stations (${route.hops} hops)`,
      `Transfers: ${route.totalInterchanges}`,
      '',
      ...route.segments.map((seg, i) => {
        const stops = seg.stations.map((s) => s.name).join(' ➔ ');
        return `Step ${i + 1} [${seg.lineName}]: ${stops}`;
      }),
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSegment = (idx: number) => {
    setExpandedSegments((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalStationsCount = Object.keys(kolkataMetroData.stations).length;
  const totalLinesCount = kolkataMetroData.lines.length;

  return (
    <div className="min-h-screen py-6 sm:py-10 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* 1. Header Banner */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 shadow-xs text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-zinc-200/80 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 border border-zinc-300/60 dark:border-zinc-800">
                  Kolkata Transit Network
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Topology</span>
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-sky-400">
                  <Waves className="w-3.5 h-3.5" />
                  <span>Hooghly Underwater Tunnel Active</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Kolkata Metro Route Finder
              </h1>

              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Choose your Starting Station and Destination Station, then click Find to see that exact route map with an animated car following the journey in real-time.
              </p>
            </div>

            {/* Network Stats Badges */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Lines</div>
                <div className="text-lg font-semibold text-zinc-950 dark:text-white flex items-center gap-1.5">
                  <Train className="w-4 h-4 text-zinc-500" />
                  <span>{totalLinesCount}</span>
                </div>
              </div>

              <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Stations</div>
                <div className="text-lg font-semibold text-zinc-950 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{totalStationsCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Mobile View Switcher (Tabs for small screens) */}
        <div className="lg:hidden flex items-center justify-center p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setMobileTab('both')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              mobileTab === 'both'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setMobileTab('map')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'map'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Map View</span>
          </button>
          <button
            onClick={() => setMobileTab('planner')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'planner'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Route Planner</span>
          </button>
        </div>

        {/* 3. Main Split Screen (Side by Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Schematic Kolkata Metro Map (Takes 7 cols) */}
          <div
            className={`lg:col-span-7 space-y-4 ${
              mobileTab === 'planner' ? 'hidden lg:block' : 'block'
            }`}
          >
            <KolkataMetroMap
              network={kolkataMetroData}
              selectedRoute={route}
              selectedSourceId={sourceId}
              selectedDestinationId={destinationId}
              onSelectStation={handleMapSelectStation}
            />
          </div>

          {/* Right Column: Route Choose & Journey Results (Takes 5 cols) */}
          <div
            className={`lg:col-span-5 space-y-6 ${
              mobileTab === 'map' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Route Selector Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 shadow-xs text-left">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200 dark:border-zinc-900">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-zinc-950 dark:text-white">
                      Plan Your Journey
                    </h2>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Choose Starting Station & Destination Station
                    </p>
                  </div>
                </div>

                {(sourceId || destinationId || route) && (
                  <button
                    onClick={handleReset}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-900 transition-colors"
                    title="Clear route & show full network map"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <form onSubmit={handleFindRoute} className="space-y-4">
                {/* Origin Station Selector */}
                <div className="space-y-1.5">
                  <StationSelector
                    label="Starting Station"
                    placeholder="Choose starting station (e.g. Howrah, Dakshineswar)..."
                    selectedStationId={sourceId}
                    onSelectStation={handleSourceChange}
                    stations={kolkataMetroData.stations}
                    lines={kolkataMetroData.lines}
                    icon={<MapPin className="w-4 h-4 text-emerald-500" />}
                  />
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-1">
                  <button
                    type="button"
                    onClick={handleSwap}
                    disabled={!sourceId && !destinationId}
                    aria-label="Swap Stations"
                    className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white shadow-xs transition-transform active:rotate-180 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Destination Station Selector */}
                <div className="space-y-1.5">
                  <StationSelector
                    label="Destination Station"
                    placeholder="Choose destination (e.g. Salt Lake Sector V, Kavi Subhash)..."
                    selectedStationId={destinationId}
                    onSelectStation={handleDestinationChange}
                    stations={kolkataMetroData.stations}
                    lines={kolkataMetroData.lines}
                    icon={<MapPin className="w-4 h-4 text-rose-500" />}
                  />
                </div>

                {/* Error Notice */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Find Route Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer select-none"
                >
                  <Car className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                  <span>Find Fastest Route & Show Map</span>
                </button>
              </form>

              {/* Quick Popular Routes */}
              <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-900">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Popular Direct Routes</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {kolkataMetroData.popularRoutes.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuickRoute(p.fromId, p.toId)}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors text-left"
                    >
                      {p.label.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Route Details Card */}
            <AnimatePresence mode="wait">
              {route && (
                <motion.div
                  key={`${route.source.id}-${route.destination.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 sm:p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 shadow-xs text-left space-y-5"
                >
                  {/* Journey Overview Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-900">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                        Chosen Route Map Active
                      </span>
                      <h3 className="text-base font-semibold text-zinc-950 dark:text-white flex items-center gap-2 mt-0.5">
                        <span>{route.source.name}</span>
                        <span className="text-zinc-400">➔</span>
                        <span>{route.destination.name}</span>
                      </h3>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white text-xs flex items-center gap-1 shadow-2xs transition-colors"
                      title="Copy itinerary"
                    >
                      {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <div className="text-[10px] text-zinc-400 uppercase font-mono">Stations</div>
                      <div className="text-base font-bold text-zinc-900 dark:text-white">
                        {route.totalStations}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <div className="text-[10px] text-zinc-400 uppercase font-mono">Transfers</div>
                      <div className="text-base font-bold text-zinc-900 dark:text-white">
                        {route.totalInterchanges === 0 ? 'Direct' : route.totalInterchanges}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <div className="text-[10px] text-zinc-400 uppercase font-mono">Est. Time</div>
                      <div className="text-base font-bold text-zinc-900 dark:text-white">
                        ~{Math.round(route.hops * 2.2 + route.totalInterchanges * 5)} min
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Follow Notification */}
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium">
                    <Car className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>The map above is now displaying your chosen route with live car navigation.</span>
                  </div>

                  {/* Step-by-Step Line Segments Breakdown */}
                  <div className="space-y-3">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Journey Itinerary
                    </div>

                    {route.segments.map((seg, idx) => {
                      const isExpanded = expandedSegments[idx] ?? true;
                      return (
                        <div
                          key={idx}
                          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
                        >
                          {/* Segment Line Header */}
                          <div
                            onClick={() => toggleSegment(idx)}
                            className="p-3 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                style={{ backgroundColor: seg.lineColor }}
                                className="w-3 h-3 rounded-full shrink-0"
                              />
                              <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                                {seg.lineName}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-400">
                                ({seg.stations.length} stops)
                              </span>
                            </div>

                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                            )}
                          </div>

                          {/* Station Stops Timeline */}
                          {isExpanded && (
                            <div className="px-4 pb-3 pt-1 border-t border-zinc-100 dark:border-zinc-800/80 space-y-1.5">
                              {seg.stations.map((st, sIdx) => {
                                const isStart = sIdx === 0 && idx === 0;
                                const isEnd =
                                  sIdx === seg.stations.length - 1 &&
                                  idx === route.segments.length - 1;

                                return (
                                  <div
                                    key={st.id}
                                    className="flex items-center gap-2 text-xs py-0.5 text-zinc-700 dark:text-zinc-300"
                                  >
                                    <span
                                      style={{ backgroundColor: seg.lineColor }}
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        isStart || isEnd ? 'ring-2 ring-emerald-500' : ''
                                      }`}
                                    />
                                    <span className={isStart || isEnd ? 'font-bold' : 'font-normal'}>
                                      {st.name}
                                    </span>
                                  </div>
                                );
                              })}

                              {/* Transfer Announcement */}
                              {seg.interchangeAtEnd && (
                                <div className="mt-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-[11px] flex items-center gap-2 font-medium">
                                  <GitMerge className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                                  <span>
                                    Transfer at {seg.interchangeAtEnd.station.name} to{' '}
                                    {seg.interchangeAtEnd.nextLineName}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
