import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrainTrack,
  ArrowRight,
  GitMerge,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCheck
} from 'lucide-react';
import { MetroRoute } from '../types/metro';

interface RouteResultsProps {
  route: MetroRoute;
  cityName: string;
}

export const RouteResults: React.FC<RouteResultsProps> = ({ route, cityName }) => {
  const [expandedSegments, setExpandedSegments] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleSegmentExpand = (index: number) => {
    setExpandedSegments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    route.segments.forEach((_, idx) => {
      all[idx] = true;
    });
    setExpandedSegments(all);
  };

  const collapseAll = () => {
    setExpandedSegments({});
  };

  const handleCopySummary = () => {
    const summary = [
      `Metro Route in ${cityName}:`,
      `From: ${route.source.name}`,
      `To: ${route.destination.name}`,
      `Total Stops: ${route.totalStations} stations (${route.hops} hops)`,
      `Interchanges: ${route.totalInterchanges}`,
      '',
      ...route.segments.map((seg, i) => {
        const stops = seg.stations.map((s) => s.name).join(' ➔ ');
        return `Step ${i + 1} [${seg.lineName}]:\n${stops}`;
      }),
    ].join('\n');

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Route Journey Overview Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white/80 to-indigo-50/80 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 shadow-sm backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <TrainTrack className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Suggested Shortest Path
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
                <span>{route.source.name}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{route.destination.name}</span>
              </h3>
            </div>
          </div>

          <button
            onClick={handleCopySummary}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-xs transition-colors"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Route</span>
              </>
            )}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-center">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Stations
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {route.totalStations}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-center">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Connections
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {route.hops} hops
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-center">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Transfers
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {route.totalInterchanges}
            </div>
          </div>
        </div>

        {/* Lines Used Badges */}
        <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Lines used:
          </span>
          {route.linesUsed.map((line) => (
            <span
              key={line.id}
              style={{
                backgroundColor: line.color,
                color: line.textColor || '#FFFFFF',
              }}
              className="px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs"
            >
              {line.name}
            </span>
          ))}
        </div>
      </div>

      {/* Segment by Segment Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Station Sequence & Guidance
          </h4>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={expandAll}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Expand all
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={collapseAll}
              className="text-slate-500 dark:text-slate-400 hover:underline font-semibold"
            >
              Collapse
            </button>
          </div>
        </div>

        <div className="relative pl-6 space-y-6">
          {route.segments.map((segment, segIdx) => {
            const isExpanded = !!expandedSegments[segIdx];
            const startStation = segment.stations[0];
            const endStation = segment.stations[segment.stations.length - 1];
            const intermediateStations = segment.stations.slice(1, -1);
            const isFirstSegment = segIdx === 0;
            const isLastSegment = segIdx === route.segments.length - 1;

            return (
              <div key={segIdx} className="relative">
                {/* Vertical Line Bar */}
                <div
                  style={{ backgroundColor: segment.lineColor }}
                  className="absolute -left-[17px] top-4 bottom-0 w-1.5 rounded-full opacity-80"
                />

                {/* Segment Header Box */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
                  {/* Line Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        style={{ backgroundColor: segment.lineColor }}
                        className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                      />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        {segment.lineName}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {segment.stations.length} stations
                    </span>
                  </div>

                  {/* Boarding Station */}
                  <div className="flex items-start gap-3 my-2">
                    <div className="mt-1 relative flex items-center justify-center">
                      {isFirstSegment ? (
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                      ) : (
                        <div
                          style={{ borderColor: segment.lineColor }}
                          className="w-3.5 h-3.5 rounded-full bg-white dark:bg-slate-900 border-2"
                        />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {startStation.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {isFirstSegment ? 'Board train here' : 'Continue on this line'}
                      </div>
                    </div>
                  </div>

                  {/* Intermediate Stops Accordion */}
                  {intermediateStations.length > 0 && (
                    <div className="my-2 ml-1">
                      <button
                        onClick={() => toggleSegmentExpand(segIdx)}
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-1"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span>Hide {intermediateStations.length} intermediate stops</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" />
                            <span>Show {intermediateStations.length} intermediate stops</span>
                          </>
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 border-l border-dashed border-slate-300 dark:border-slate-700 my-2 space-y-1.5"
                          >
                            {intermediateStations.map((station) => (
                              <div
                                key={station.id}
                                className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2 py-0.5"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                                <span>{station.name}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Exit / Segment End Station */}
                  <div className="flex items-start gap-3 mt-2">
                    <div className="mt-1 relative flex items-center justify-center">
                      {isLastSegment ? (
                        <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {endStation.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {isLastSegment ? 'Destination station • De-board' : 'Interchange station'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prominent Interchange Notice Banner */}
                {segment.interchangeAtEnd && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="my-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-xs"
                  >
                    <div className="p-1.5 rounded-lg bg-amber-200/80 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 shrink-0">
                      <GitMerge className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                        <span>Interchange at {segment.interchangeAtEnd.station.name}</span>
                      </div>
                      <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                        Change from{' '}
                        <strong className="font-semibold">{segment.lineName}</strong> to{' '}
                        <strong
                          style={{ color: segment.interchangeAtEnd.nextLineColor }}
                          className="font-bold underline decoration-2 underline-offset-2"
                        >
                          {segment.interchangeAtEnd.nextLineName}
                        </strong>
                        . Follow signs on the platform.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
