import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpDown,
  Navigation,
  RotateCcw,
  AlertCircle,
  MapPin,
  Sparkles,
  Info
} from 'lucide-react';
import { MetroNetwork, MetroRoute } from '../types/metro';
import { StationSelector } from './StationSelector';
import { RouteResults } from './RouteResults';
import { findRoute } from '../utils/routeFinder';

interface RoutePlannerProps {
  network: MetroNetwork;
}

export const RoutePlanner: React.FC<RoutePlannerProps> = ({ network }) => {
  const [sourceId, setSourceId] = useState<string>('');
  const [destinationId, setDestinationId] = useState<string>('');
  const [route, setRoute] = useState<MetroRoute | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Swap source and destination
  const handleSwap = () => {
    const temp = sourceId;
    setSourceId(destinationId);
    setDestinationId(temp);

    // If a route was already calculated, recalculate immediately
    if (destinationId && temp) {
      if (destinationId === temp) {
        setError('Source and destination cannot be the same station.');
        setRoute(null);
      } else {
        const newRoute = findRoute(network, destinationId, temp);
        setRoute(newRoute);
        setError(newRoute ? null : 'No route could be found between these stations.');
      }
    }
  };

  // Find Route handler
  const handleFindRoute = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setHasCalculated(true);

    if (!sourceId && !destinationId) {
      setError('Please select both a starting station and a destination station.');
      setRoute(null);
      return;
    }

    if (!sourceId) {
      setError('Please select your starting station.');
      setRoute(null);
      return;
    }

    if (!destinationId) {
      setError('Please select your destination station.');
      setRoute(null);
      return;
    }

    if (sourceId === destinationId) {
      setError('Starting station and destination cannot be identical. Please choose two different stations.');
      setRoute(null);
      return;
    }

    const calculatedRoute = findRoute(network, sourceId, destinationId);

    if (!calculatedRoute) {
      setError('Unable to calculate a route between these stations with the verified network data.');
      setRoute(null);
    } else {
      setError(null);
      setRoute(calculatedRoute);
    }
  };

  // Reset form
  const handleReset = () => {
    setSourceId('');
    setDestinationId('');
    setRoute(null);
    setError(null);
    setHasCalculated(false);
  };

  // Quick route picker handler
  const handleSelectQuickRoute = (from: string, to: string) => {
    setSourceId(from);
    setDestinationId(to);
    setError(null);
    const calculatedRoute = findRoute(network, from, to);
    setRoute(calculatedRoute);
    setHasCalculated(true);
  };

  return (
    <div className="w-full space-y-6">
      {/* Planner Card */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-md dark:shadow-2xl">
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Navigation className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Smart Transit Planner
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Find Your Route
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Select your origin and destination stations to compute the optimal path, interchanges, and sequence across {network.name}.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleFindRoute} className="space-y-4">
          <div className="space-y-3 relative">
            <StationSelector
              label="Starting From"
              placeholder="Select origin station..."
              selectedStationId={sourceId}
              onSelectStation={(id) => {
                setSourceId(id);
                setError(null);
              }}
              stations={network.stations}
              lines={network.lines}
              icon={<MapPin className="w-4 h-4 text-emerald-500" />}
            />

            {/* Station Swap Button */}
            <div className="relative flex justify-center -my-1 z-10">
              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap starting station and destination station"
                title="Swap stations"
                className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>

            <StationSelector
              label="Destination"
              placeholder="Select destination station..."
              selectedStationId={destinationId}
              onSelectStation={(id) => {
                setDestinationId(id);
                setError(null);
              }}
              stations={network.stations}
              lines={network.lines}
              icon={<MapPin className="w-4 h-4 text-rose-500" />}
            />
          </div>

          {/* Validation Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span>Find Route</span>
              <Navigation className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Reset form"
              aria-label="Reset selection"
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors border border-slate-200/60 dark:border-slate-700/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Popular Quick Route Shortcuts */}
        {network.popularRoutes && network.popularRoutes.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Popular Routes</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {network.popularRoutes.map((pop, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectQuickRoute(pop.fromId, pop.toId)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100/90 hover:bg-blue-50 dark:bg-slate-800/90 dark:hover:bg-blue-950/50 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/60 dark:border-slate-700/60 transition-colors text-left"
                >
                  {pop.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Route Results or Empty State */}
      <AnimatePresence mode="wait">
        {route ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            <RouteResults route={route} cityName={network.city} />
          </motion.div>
        ) : !hasCalculated ? (
          <div className="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 text-center backdrop-blur-sm">
            <div className="inline-flex p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mb-2">
              <Info className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
              No Route Selected
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              Choose your origin and destination stations above or click one of the popular routes to begin navigation.
            </p>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

