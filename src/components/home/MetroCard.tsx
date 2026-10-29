import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Layers, Train, Navigation } from 'lucide-react';
import { MetroNetwork } from '../../types/metro';

interface MetroCardProps {
  network: MetroNetwork;
  to: string;
  badge?: string;
  lineAccentColors: string[];
}

export const MetroCard: React.FC<MetroCardProps> = ({
  network,
  to,
  badge,
  lineAccentColors,
}) => {
  const stationCount = Object.keys(network.stations).length;
  const lineCount = network.lines.length;

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col justify-between rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl p-6 sm:p-7 shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/10 transition-all duration-300"
    >
      {/* Top Accent Lines Strip */}
      <div className="absolute top-0 left-8 right-8 h-1 flex rounded-t-full overflow-hidden">
        {lineAccentColors.map((color, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: color }}
            className="flex-1 h-full"
          />
        ))}
      </div>

      <div className="space-y-4 pt-1">
        {/* City & Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>{network.city}</span>
          </div>

          {badge && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
              {badge}
            </span>
          )}
        </div>

        {/* Metro Name & Description */}
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {network.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
            {network.description}
          </p>
        </div>

        {/* Verified Network Metrics */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
              Lines Mapped
            </div>
            <div className="text-base font-extrabold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1">
              <Train className="w-3.5 h-3.5 text-blue-500" />
              <span>{lineCount} Lines</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
              Verified Stations
            </div>
            <div className="text-base font-extrabold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>{stationCount} Stations</span>
            </div>
          </div>
        </div>

        {/* Metro Line Color Badges */}
        <div className="pt-2">
          <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider">
            Connected Lines
          </div>
          <div className="flex flex-wrap gap-1.5">
            {network.lines.slice(0, 4).map((line) => (
              <span
                key={line.id}
                style={{
                  backgroundColor: `${line.color}15`,
                  borderColor: line.color,
                  color: line.color,
                }}
                className="px-2 py-0.5 rounded-md text-[11px] font-bold border"
              >
                {line.name.split(' (')[0]}
              </span>
            ))}
            {network.lines.length > 4 && (
              <span className="px-1.5 py-0.5 rounded-md text-[11px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800">
                +{network.lines.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center gap-2">
        <Link
          to={to}
          className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-950 dark:hover:text-white font-bold text-xs sm:text-sm text-center shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 group-hover:shadow-md"
        >
          <span>Explore Map</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          to={to}
          title="Plan route directly"
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
        >
          <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </Link>
      </div>
    </motion.div>
  );
};

