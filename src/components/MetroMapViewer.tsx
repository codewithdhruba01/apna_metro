import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  AlertCircle,
  Layers,
  Sparkles
} from 'lucide-react';

interface MetroMapViewerProps {
  mapImage: string;
  vectorMapImage?: string;
  altText: string;
  metroName: string;
  cityName: string;
}

export const MetroMapViewer: React.FC<MetroMapViewerProps> = ({
  mapImage,
  vectorMapImage,
  altText,
  metroName,
  cityName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeFormat, setActiveFormat] = useState<'raster' | 'vector'>('raster');

  const currentImageSrc =
    activeFormat === 'vector' && vectorMapImage ? vectorMapImage : mapImage;

  // Reset image status when source changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentImageSrc]);

  // Zoom handlers
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.35, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.35, 0.7);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Toggle fullscreen container
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1 && e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
    setScale((prev) => Math.min(Math.max(prev + zoomFactor, 0.7), 4));
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-900/5 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-slate-950' : 'h-[500px] sm:h-[620px] lg:h-[720px]'
      }`}
    >
      {/* Top Header Badge */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
            {metroName}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
            • {cityName} Network Map
          </span>
        </div>

        {/* Vector / Raster format switch if vector map is available */}
        {vectorMapImage && (
          <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setActiveFormat('raster')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                activeFormat === 'raster'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              HD Map
            </button>
            <button
              onClick={() => setActiveFormat('vector')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                activeFormat === 'vector'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Vector (SVG)</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating Control Toolbar */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-lg">
        <button
          onClick={handleZoomIn}
          type="button"
          aria-label="Zoom in"
          title="Zoom In"
          className="p-2 rounded-lg text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          type="button"
          aria-label="Zoom out"
          title="Zoom Out"
          className="p-2 rounded-lg text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800 my-auto" />

        <div className="px-2 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 min-w-[42px] text-center select-none">
          {Math.round(scale * 100)}%
        </div>

        <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800 my-auto" />

        <button
          onClick={handleReset}
          type="button"
          aria-label="Reset zoom and position"
          title="Reset View"
          className="p-2 rounded-lg text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleFullscreen}
          type="button"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          className="p-2 rounded-lg text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Map Drag / Viewport Canvas */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {/* Loading Spinner State */}
        <AnimatePresence>
          {isLoading && !hasError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10"
            >
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Loading official {metroName} map...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Fallback */}
        {hasError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center max-w-md">
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 border border-rose-200 dark:border-rose-900 mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Unable to load map image
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              The high-resolution map asset could not be loaded directly. You can still use the full route planner on the right side.
            </p>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : (
          <motion.div
            style={{
              x: position.x,
              y: position.y,
              scale: scale,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
            className="w-full h-full flex items-center justify-center p-4 sm:p-8"
          >
            <img
              src={currentImageSrc}
              alt={altText}
              loading="lazy"
              draggable={false}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              className="max-w-full max-h-full object-contain rounded-lg drop-shadow-md transition-opacity duration-300"
            />
          </motion.div>
        )}
      </div>

      {/* Bottom Pan/Zoom Hint */}
      <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/70 text-slate-200 backdrop-blur-md border border-slate-700/50 text-[11px] flex items-center gap-1.5 shadow-sm">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Drag to pan • Scroll / pinch to zoom</span>
        </div>
      </div>
    </div>
  );
};
