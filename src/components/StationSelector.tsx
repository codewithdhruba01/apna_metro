import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check, GitMerge, ChevronDown } from 'lucide-react';
import { MetroStation, MetroLine } from '../types/metro';

interface StationSelectorProps {
  label: string;
  placeholder?: string;
  selectedStationId: string;
  onSelectStation: (stationId: string) => void;
  stations: Record<string, MetroStation>;
  lines: MetroLine[];
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const StationSelector: React.FC<StationSelectorProps> = ({
  label,
  placeholder = 'Search or select station...',
  selectedStationId,
  onSelectStation,
  stations,
  lines,
  icon,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedStation = stations[selectedStationId];
  const stationList = Object.values(stations).sort((a, b) => a.name.localeCompare(b.name));

  // Map of lineId -> line object
  const linesMap = new Map(lines.map((l) => [l.id, l]));

  // Filter stations based on search query
  const filteredStations = stationList.filter((s) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      s.name.toLowerCase().includes(query) ||
      s.lineIds.some((lid) => {
        const line = linesMap.get(lid);
        return line?.name.toLowerCase().includes(query);
      })
    );
  });

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredStations.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredStations.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredStations[highlightedIndex]) {
        onSelectStation(filteredStations[highlightedIndex].id);
        setIsOpen(false);
        setSearchQuery('');
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const handleSelect = (stationId: string) => {
    onSelectStation(stationId);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectStation('');
    setSearchQuery('');
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      {/* Input / Trigger Button */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
            setTimeout(() => inputRef.current?.focus(), 50);
          }
        }}
        onKeyDown={handleKeyDown}
        className={`relative flex items-center justify-between w-full px-3.5 py-3 rounded-xl border transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'ring-2 ring-blue-500 border-blue-500 bg-white dark:bg-slate-900 shadow-md'
            : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 shadow-xs'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden flex-1">
          <span className="text-slate-400 dark:text-slate-500 shrink-0">
            {icon || <Search className="w-4 h-4" />}
          </span>

          {selectedStation ? (
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {selectedStation.name}
              </span>

              {/* Station Lines Dots */}
              <div className="flex items-center gap-1 shrink-0">
                {selectedStation.lineIds.map((lid) => {
                  const line = linesMap.get(lid);
                  return (
                    <span
                      key={lid}
                      title={line?.name}
                      style={{ backgroundColor: line?.color || '#3B82F6' }}
                      className="w-2.5 h-2.5 rounded-full inline-block shadow-2xs"
                    />
                  );
                })}
              </div>

              {selectedStation.isInterchange && (
                <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  <GitMerge className="w-2.5 h-2.5" />
                  <span>Transfer</span>
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm text-slate-400 dark:text-slate-500 select-none">
              {placeholder}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          {selectedStation && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear selection"
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-blue-500' : ''
            }`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl"
          >
            {/* Search Input */}
            <div className="relative mb-2">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type to filter stations..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-100/80 dark:bg-slate-800/80 rounded-xl border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Station List */}
            <div className="max-h-60 overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
              {filteredStations.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                  No stations found matching "{searchQuery}"
                </div>
              ) : (
                filteredStations.map((station, idx) => {
                  const isSelected = station.id === selectedStationId;
                  const isHighlighted = idx === highlightedIndex;

                  return (
                    <div
                      key={station.id}
                      onClick={() => handleSelect(station.id)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold'
                          : isHighlighted
                          ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="flex items-center gap-1 shrink-0">
                          {station.lineIds.map((lid) => {
                            const line = linesMap.get(lid);
                            return (
                              <span
                                key={lid}
                                style={{ backgroundColor: line?.color || '#3B82F6' }}
                                title={line?.name}
                                className="w-2 h-2 rounded-full inline-block"
                              />
                            );
                          })}
                        </div>
                        <span className="truncate">{station.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {station.isInterchange && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 flex items-center gap-0.5">
                            <GitMerge className="w-2.5 h-2.5" />
                            <span>Interchange</span>
                          </span>
                        )}
                        {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

