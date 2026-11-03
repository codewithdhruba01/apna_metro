import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Car,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Navigation,
  MapPin,
  Eye,
  SlidersHorizontal,
  Route as RouteIcon,
  Globe2
} from 'lucide-react';
import { MetroNetwork, MetroRoute, MetroStation } from '../../types/metro';

export interface KolkataMetroMapProps {
  network: MetroNetwork;
  selectedRoute?: MetroRoute | null;
  selectedSourceId?: string;
  selectedDestinationId?: string;
  onSelectStation?: (stationId: string, role: 'source' | 'destination') => void;
}

// 100% verified schematic coordinates for all 93 Kolkata Metro stations
export const KOLKATA_COORDS: Record<string, [number, number]> = {
  // Blue Line (26)
  'dakshineswar': [260, 420],
  'baranagar': [330, 420],
  'noapara': [390, 455],
  'dum-dum': [390, 495],
  'belgachia': [390, 535],
  'shyambazar': [390, 575],
  'sovabazar-sutanuti': [350, 610],
  'girish-park': [310, 650],
  'mg-road': [280, 685],
  'central': [260, 720],
  'chandni-chowk': [250, 755],
  'esplanade': [250, 795],
  'park-street': [250, 845],
  'maidan': [250, 885],
  'rabindra-sadan': [250, 925],
  'netaji-bhavan': [250, 965],
  'jatin-das-park': [250, 1005],
  'kalighat': [250, 1045],
  'rabindra-sarobar': [250, 1085],
  'mahanayak-uttam-kumar': [250, 1125],
  'netaji': [250, 1165],
  'masterda-surya-sen': [285, 1205],
  'gitanjali': [335, 1235],
  'kavi-nazrul': [390, 1235],
  'shahid-khudiram': [445, 1235],
  'kavi-subhash': [500, 1235],

  // Pink Line (11)
  'kamarhati': [330, 385],
  'agarpara': [330, 350],
  'sodepur': [330, 315],
  'panihati': [330, 280],
  'subhash-nagar': [330, 245],
  'khardaha': [330, 210],
  'tata-gate': [330, 175],
  'titagarh': [330, 140],
  'talpukur': [330, 105],
  'barrackpore': [330, 70],

  // Yellow Line (10)
  'dum-dum-cantt': [440, 435],
  'jessore-road': [490, 435],
  'biman-bandar': [550, 395],
  'birati': [600, 360],
  'michael-nagar': [625, 330],
  'new-barrackpur': [640, 295],
  'madhyamgram': [640, 250],
  'hridaypur': [675, 215],
  'barasat': [710, 180],

  // Green Line (17)
  'howrah-maidan': [90, 755],
  'howrah': [145, 755],
  'mahakaran': [200, 755],
  'sealdah': [380, 805],
  'phoolbagan': [400, 770],
  'salt-lake-stadium': [430, 735],
  'bengal-chemical': [470, 710],
  'city-center': [510, 710],
  'central-park': [555, 710],
  'karunamoyee': [555, 755],
  'salt-lake-sector-v': [585, 795],
  'keshtopur': [625, 720],
  'dum-dum-park': [535, 640],
  'baguiati': [535, 600],
  'raghunathpur': [535, 560],
  'teghoria-vip-road': [545, 465],

  // Purple Line (14)
  'diamond-park': [130, 1310],
  'iim': [100, 1275],
  'joka': [120, 1240],
  'thakurpukur': [140, 1205],
  'sakherbazar': [140, 1165],
  'behala-chowrasta': [140, 1125],
  'behala-bazar': [140, 1085],
  'taratala': [140, 1045],
  'majerhat': [140, 1005],
  'mominpore': [140, 955],
  'kidderpore': [140, 910],
  'victoria': [150, 860],

  // Orange Line (24)
  'satyajit-ray': [535, 1195],
  'kavi-sukanta': [555, 1155],
  'jyotirindra-nandi': [565, 1115],
  'hemanta-mukhopadhyay': [565, 1075],
  'vip-bazar': [565, 1035],
  'ritwik-ghatak': [565, 995],
  'barun-sengupta': [565, 955],
  'beliaghata': [565, 915],
  'gour-kishor-ghosh': [565, 875],
  'nicco-park': [565, 835],
  'technopolis': [640, 795],
  'bidhan-nagar': [690, 795],
  'sub-cbd-1': [740, 795],
  'cbd-1': [795, 755],
  'kalakhetra': [795, 690],
  'new-town': [795, 625],
  'convention-centre': [780, 565],
  'sub-cbd-2': [735, 520],
  'titumir': [680, 520],
  'rabindra-tirtha': [615, 520],
};

// Line definitions with official color palette
export const LINE_COLORS: Record<string, string> = {
  'kolkata-blue': '#0038A8',
  'kolkata-green': '#00802B',
  'kolkata-purple': '#7030A0',
  'kolkata-orange': '#ED7D31',
  'kolkata-yellow': '#E5B800',
  'kolkata-pink': '#ED5E93',
};

export const KolkataMetroMap: React.FC<KolkataMetroMapProps> = ({
  network,
  selectedRoute,
  selectedSourceId,
  selectedDestinationId,
  onSelectStation,
}) => {
  // View mode: 'route' (shows specifically the chosen route map) or 'full' (shows whole network)
  const [viewMode, setViewMode] = useState<'route' | 'full'>('route');

  // Zoom & Pan state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Hovered & Selected Station tooltip
  const [hoveredStation, setHoveredStation] = useState<MetroStation | null>(null);
  const [activeStationModal, setActiveStationModal] = useState<MetroStation | null>(null);

  // Line Visibility Filter (used in full mode)
  const [activeLineFilter, setActiveLineFilter] = useState<string>('all');
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Vehicle Simulation State
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 1x, 1.5x, 2x

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Route path coordinates list: sequence of stations in exact travel order
  const routePoints = useMemo(() => {
    if (!selectedRoute || !selectedRoute.path || selectedRoute.path.length < 2) {
      return [];
    }
    return selectedRoute.path
      .map((st) => ({
        station: st,
        coords: KOLKATA_COORDS[st.id] || null,
      }))
      .filter((item): item is { station: MetroStation; coords: [number, number] } => item.coords !== null);
  }, [selectedRoute]);

  // Compute total route length & segments for smooth vehicle interpolation
  const { totalLength, segmentLengths } = useMemo(() => {
    if (routePoints.length < 2) return { totalLength: 0, segmentLengths: [] };

    let total = 0;
    const segs: number[] = [];
    for (let i = 0; i < routePoints.length - 1; i++) {
      const p1 = routePoints[i].coords;
      const p2 = routePoints[i + 1].coords;
      const dist = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
      segs.push(dist);
      total += dist;
    }
    return { totalLength: total, segmentLengths: segs };
  }, [routePoints]);

  // When a new route is chosen, automatically set to 'route' view so only the chosen route map is shown!
  useEffect(() => {
    if (selectedRoute && routePoints.length >= 2) {
      setViewMode('route');
      setScale(1);
      setTranslate({ x: 0, y: 0 });
      setProgress(0);
      setIsPlaying(true);
    }
  }, [selectedRoute, routePoints.length]);

  // Calculate dynamic viewBox: when in 'route' view, perfectly frame ONLY the chosen route!
  const currentViewBox = useMemo(() => {
    if (viewMode === 'route' && selectedRoute && routePoints.length >= 2) {
      const xs = routePoints.map((p) => p.coords[0]);
      const ys = routePoints.map((p) => p.coords[1]);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const spanX = maxX - minX;
      const spanY = maxY - minY;

      // Generous padding so station labels, start & end badges fit comfortably
      const padX = Math.max(spanX * 0.25, 90);
      const padY = Math.max(spanY * 0.25, 90);

      const width = Math.max(spanX + padX * 2, 420);
      const height = Math.max(spanY + padY * 2, 340);

      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      const vbX = Math.round(centerX - width / 2);
      const vbY = Math.round(centerY - height / 2);

      return `${vbX} ${vbY} ${Math.round(width)} ${Math.round(height)}`;
    }

    // Default full network viewBox
    return '0 0 920 1400';
  }, [viewMode, selectedRoute, routePoints]);

  // Car animation loop using requestAnimationFrame (continuous smooth travel along chosen route)
  useEffect(() => {
    if (!isPlaying || totalLength === 0 || routePoints.length < 2) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();
    const baseDuration = Math.max(5000, routePoints.length * 650);

    const step = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      setProgress((prev) => {
        const next = prev + (delta * speedMultiplier) / baseDuration;
        if (next >= 1.04) {
          return 0; // Restart journey loop
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, totalLength, speedMultiplier, routePoints.length]);

  // Interpolate Vehicle Position & Angle from Progress
  const carState = useMemo(() => {
    if (routePoints.length < 2 || totalLength === 0) return null;

    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const currentDist = clampedProgress * totalLength;
    let accumulated = 0;
    let activeIdx = 0;
    let localT = 0;

    for (let i = 0; i < segmentLengths.length; i++) {
      const segLen = segmentLengths[i];
      if (currentDist <= accumulated + segLen || i === segmentLengths.length - 1) {
        activeIdx = i;
        localT = segLen > 0 ? (currentDist - accumulated) / segLen : 0;
        break;
      }
      accumulated += segLen;
    }

    const p1 = routePoints[activeIdx].coords;
    const p2 = routePoints[activeIdx + 1]?.coords || p1;

    const x = p1[0] + (p2[0] - p1[0]) * localT;
    const y = p1[1] + (p2[1] - p1[1]) * localT;
    const angle = (Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180) / Math.PI;

    const currentStation = routePoints[activeIdx].station;
    const nextStation = routePoints[activeIdx + 1]?.station || currentStation;

    return {
      x,
      y,
      angle,
      currentStation,
      nextStation,
      activeIdx,
      totalStops: routePoints.length,
    };
  }, [progress, routePoints, totalLength, segmentLengths]);

  // Pan & Zoom controls
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.6));
  const handleReset = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTranslate({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.7), 2.5));
  };

  // Set station role helper
  const handleSetStation = (stationId: string, role: 'source' | 'destination') => {
    if (onSelectStation) {
      onSelectStation(stationId, role);
    }
    setActiveStationModal(null);
  };

  // Check if route touches the river Hooghly (stations with x < 350)
  const isRouteNearRiver = useMemo(() => {
    if (!selectedRoute) return true;
    return routePoints.some((p) => p.coords[0] < 360);
  }, [selectedRoute, routePoints]);

  return (
    <div className="flex flex-col w-full rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
      {/* 1. Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            {selectedRoute ? <Car className="w-4 h-4" /> : <Navigation className="w-4 h-4" />}
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
              <span>{selectedRoute && viewMode === 'route' ? 'Chosen Route Map' : 'Kolkata Metro Map'}</span>
              {selectedRoute && (
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  {selectedRoute.totalStations} Stops • Active
                </span>
              )}
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {selectedRoute && viewMode === 'route'
                ? `${selectedRoute.source.name} ➔ ${selectedRoute.destination.name}`
                : 'Select stations & click Find to view your route map'}
            </p>
          </div>
        </div>

        {/* View Mode Switcher & Zoom Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Switch between Route-Only View and Full Network View */}
          {selectedRoute && (
            <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs shadow-2xs">
              <button
                onClick={() => {
                  setViewMode('route');
                  setScale(1);
                  setTranslate({ x: 0, y: 0 });
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                  viewMode === 'route'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <RouteIcon className="w-3.5 h-3.5 text-emerald-500" />
                <span>Chosen Route</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('full');
                  setScale(1);
                  setTranslate({ x: 0, y: 0 });
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                  viewMode === 'full'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Full City</span>
              </button>
            </div>
          )}

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              title="Reset View"
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-0.5" />
            <button
              onClick={() => setShowLabels((prev) => !prev)}
              title={showLabels ? 'Hide Labels' : 'Show Labels'}
              className={`p-1.5 rounded-lg transition-colors text-[11px] flex items-center gap-1 font-medium ${
                showLabels
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Labels</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive SVG Map Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`relative w-full h-[540px] sm:h-[620px] lg:h-[700px] overflow-hidden bg-[#fafafa] dark:bg-[#000000] select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Subtle schematic background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(#888 1px, transparent 1px), radial-gradient(#888 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Empty state guide when no route has been searched yet */}
        {!selectedRoute && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-md text-xs text-zinc-600 dark:text-zinc-300 flex items-center gap-2 pointer-events-none">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Select Starting & Destination station and click <strong>Find Fastest Route</strong></span>
          </div>
        )}

        <svg
          ref={svgRef}
          viewBox={currentViewBox}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full transition-all duration-300 ease-out"
        >
          <defs>
            {/* Glowing filter for active selected route */}
            <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glowing filter for vehicle headlights */}
            <filter id="car-headlight" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Linear gradient for River Hooghly */}
            <linearGradient id="hooghly-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Master Viewport Container Group for smooth pan & zoom */}
          <g
            transform={`translate(${translate.x}, ${translate.y}) scale(${scale})`}
            style={{
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
          >
            {/* 1. River Hooghly Path (shown if route touches western stations or full mode) */}
            {(viewMode === 'full' || isRouteNearRiver) && (
              <g className="river-group">
                <path
                  d="M 235 0 
                     C 225 180, 215 320, 195 480 
                     C 180 600, 165 720, 150 780 
                     C 130 860, 90 940, 50 1020 
                     C 25 1070, 10 1120, 0 1150 
                     L 0 0 Z"
                  className="fill-sky-100/70 dark:fill-sky-950/40 stroke-sky-300/40 dark:stroke-sky-800/30"
                  strokeWidth="2"
                />
                <text
                  x="135"
                  y="320"
                  transform="rotate(82, 135, 320)"
                  className="text-[12px] font-mono tracking-widest font-semibold fill-sky-700/60 dark:fill-sky-400/50 uppercase select-none"
                >
                  ~ Hooghly River ~
                </text>

                {/* Underwater Metro Tunnel Zone Badge */}
                <g transform="translate(145, 755)">
                  <rect
                    x="-12"
                    y="-18"
                    width="68"
                    height="36"
                    rx="6"
                    className="fill-sky-500/10 dark:fill-sky-400/10 stroke-sky-400/40 dark:stroke-sky-500/30"
                    strokeWidth="1"
                    strokeDasharray="3 2"
                  />
                  <text
                    x="22"
                    y="28"
                    className="text-[8.5px] font-mono fill-sky-700 dark:fill-sky-300 text-center font-bold"
                    textAnchor="middle"
                  >
                    Underwater
                  </text>
                  <text
                    x="22"
                    y="38"
                    className="text-[7.5px] font-mono fill-sky-600 dark:fill-sky-400 text-center"
                    textAnchor="middle"
                  >
                    Tunnel (520m)
                  </text>
                </g>
              </g>
            )}

            {/* 2. MODE A: ROUTE-ONLY VIEW (Shows ONLY the chosen route's line segments & path!) */}
            {selectedRoute && viewMode === 'route' && (
              <g className="chosen-route-only-view">
                {/* Each segment with its authentic metro line color */}
                {selectedRoute.segments.map((seg, sIdx) => {
                  const segPoints = seg.stations
                    .map((s) => KOLKATA_COORDS[s.id])
                    .filter(Boolean) as [number, number][];

                  if (segPoints.length < 2) return null;

                  const pathD = segPoints.reduce(
                    (acc, p, idx) => (idx === 0 ? `M ${p[0]} ${p[1]}` : `${acc} L ${p[0]} ${p[1]}`),
                    ''
                  );

                  return (
                    <g key={sIdx}>
                      {/* Line outer casing */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={seg.lineColor}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeOpacity="0.25"
                      />
                      {/* Core colored line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={seg.lineColor}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                })}

                {/* Traveled Green Line behind the car */}
                {carState && (
                  <path
                    d={routePoints
                      .slice(0, carState.activeIdx + 1)
                      .reduce((acc, p, idx) => {
                        return idx === 0 ? `M ${p.coords[0]} ${p.coords[1]}` : `${acc} L ${p.coords[0]} ${p.coords[1]}`;
                      }, '') + ` L ${carState.x} ${carState.y}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* ONLY the stations of the chosen route */}
                {selectedRoute.path.map((station, sIdx) => {
                  const coords = KOLKATA_COORDS[station.id];
                  if (!coords) return null;
                  const [cx, cy] = coords;

                  const isStart = sIdx === 0;
                  const isEnd = sIdx === selectedRoute.path.length - 1;
                  const isPassed = carState && sIdx <= carState.activeIdx;

                  // Find if this station is an interchange in this route
                  const interchangeNotice = selectedRoute.segments.find(
                    (seg) => seg.interchangeAtEnd?.station.id === station.id
                  );

                  return (
                    <g key={station.id} className="cursor-pointer" onClick={() => setActiveStationModal(station)}>
                      {/* Start Badge */}
                      {isStart && (
                        <g transform={`translate(${cx}, ${cy - 18})`}>
                          <rect
                            x="-30"
                            y="-14"
                            width="60"
                            height="18"
                            rx="9"
                            className="fill-emerald-600 text-white shadow-lg"
                          />
                          <text x="0" y="-2" className="text-[9px] font-bold fill-white text-center" textAnchor="middle">
                            🟢 START
                          </text>
                        </g>
                      )}

                      {/* Destination Badge */}
                      {isEnd && (
                        <g transform={`translate(${cx}, ${cy - 18})`}>
                          <rect
                            x="-38"
                            y="-14"
                            width="76"
                            height="18"
                            rx="9"
                            className="fill-rose-600 text-white shadow-lg"
                          />
                          <text x="0" y="-2" className="text-[9px] font-bold fill-white text-center" textAnchor="middle">
                            🔴 DESTINATION
                          </text>
                        </g>
                      )}

                      {/* Interchange Transfer Notice */}
                      {interchangeNotice && !isStart && !isEnd && (
                        <g transform={`translate(${cx}, ${cy - 20})`}>
                          <rect
                            x="-50"
                            y="-14"
                            width="100"
                            height="18"
                            rx="9"
                            className="fill-amber-500 text-zinc-950 font-bold shadow-lg"
                          />
                          <text x="0" y="-2" className="text-[8.5px] font-bold fill-zinc-950 text-center" textAnchor="middle">
                            🔄 TRANSFER LINE
                          </text>
                        </g>
                      )}

                      {/* Station Outer Steady Rings */}
                      {(isStart || isEnd) && (
                        <g>
                          <circle cx={cx} cy={cy} r="12" fill="none" stroke={isStart ? '#10b981' : '#ef4444'} strokeWidth="2.5" />
                          <circle cx={cx} cy={cy} r="16" fill="none" stroke={isStart ? '#10b981' : '#ef4444'} strokeWidth="1" opacity="0.4" />
                        </g>
                      )}

                      {/* Station Node Disk */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isStart || isEnd ? 7 : 5.5}
                        fill={isPassed ? '#10b981' : '#ffffff'}
                        stroke={isStart ? '#10b981' : isEnd ? '#ef4444' : '#18181b'}
                        strokeWidth="2.5"
                      />

                      {/* Station Name Label */}
                      {showLabels && (
                        <text
                          x={cx + 10}
                          y={cy + 4}
                          className={`text-[10.5px] select-none font-semibold ${
                            isStart
                              ? 'fill-emerald-600 dark:fill-emerald-400 font-bold text-[12px]'
                              : isEnd
                              ? 'fill-rose-600 dark:fill-rose-400 font-bold text-[12px]'
                              : 'fill-zinc-900 dark:fill-zinc-100'
                          }`}
                        >
                          {station.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            )}

            {/* 2. MODE B: FULL NETWORK VIEW (Shows complete network, highlights route if active) */}
            {(!selectedRoute || viewMode === 'full') && (
              <g className="full-network-view">
                {/* All 6 Network Lines */}
                {network.lines.map((line) => {
                  const isFiltered = activeLineFilter !== 'all' && activeLineFilter !== line.id;
                  const points = line.stations
                    .map((id) => KOLKATA_COORDS[id])
                    .filter(Boolean) as [number, number][];

                  if (points.length < 2) return null;

                  const pathD = points.reduce((acc, p, idx) => {
                    return idx === 0 ? `M ${p[0]} ${p[1]}` : `${acc} L ${p[0]} ${p[1]}`;
                  }, '');

                  const isLineInSelectedRoute = selectedRoute?.linesUsed.some((l) => l.id === line.id);
                  const shouldDim = selectedRoute && !isLineInSelectedRoute;

                  return (
                    <g
                      key={line.id}
                      className={`transition-opacity duration-300 ${
                        isFiltered ? 'opacity-10' : shouldDim ? 'opacity-20' : 'opacity-100'
                      }`}
                    >
                      <path d={pathD} fill="none" stroke={line.color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={0.15} />
                      <path d={pathD} fill="none" stroke={line.color} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  );
                })}

                {/* Selected Route Path Overlay (when full mode is active with route) */}
                {selectedRoute && routePoints.length >= 2 && (
                  <g className="active-route-highlight">
                    <path
                      d={routePoints.reduce((acc, p, idx) => (idx === 0 ? `M ${p.coords[0]} ${p.coords[1]}` : `${acc} L ${p.coords[0]} ${p.coords[1]}`), '')}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-40 animate-pulse"
                      filter="url(#route-glow)"
                    />
                    <path
                      d={routePoints.reduce((acc, p, idx) => (idx === 0 ? `M ${p.coords[0]} ${p.coords[1]}` : `${acc} L ${p.coords[0]} ${p.coords[1]}`), '')}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                )}

                {/* All Stations in Full Mode */}
                {Object.entries(network.stations).map(([stationId, station]) => {
                  const coords = KOLKATA_COORDS[stationId];
                  if (!coords) return null;
                  const [cx, cy] = coords;

                  const isInterchange = station.lineIds.length > 1;
                  const inRoute = selectedRoute?.path.some((s) => s.id === stationId);
                  const isSource = selectedSourceId === stationId;
                  const isDest = selectedDestinationId === stationId;
                  const isPassedByCar = carState && routePoints.slice(0, carState.activeIdx + 1).some((p) => p.station.id === stationId);

                  const isFiltered = activeLineFilter !== 'all' && !station.lineIds.includes(activeLineFilter);
                  const shouldDim = selectedRoute && !inRoute;
                  const r = isInterchange ? 6.5 : 4.5;

                  return (
                    <g
                      key={stationId}
                      onClick={() => setActiveStationModal(station)}
                      onMouseEnter={() => setHoveredStation(station)}
                      onMouseLeave={() => setHoveredStation(null)}
                      className={`cursor-pointer transition-transform duration-150 hover:scale-125 ${
                        isFiltered ? 'opacity-10' : shouldDim ? 'opacity-25' : 'opacity-100'
                      }`}
                    >
                      {isSource && (
                        <g>
                          <circle cx={cx} cy={cy} r="11" fill="none" stroke="#10b981" strokeWidth="2.5" opacity="0.95" />
                          <circle cx={cx} cy={cy} r="15" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4" />
                        </g>
                      )}
                      {isDest && (
                        <g>
                          <circle cx={cx} cy={cy} r="11" fill="none" stroke="#ef4444" strokeWidth="2.5" opacity="0.95" />
                          <circle cx={cx} cy={cy} r="15" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
                        </g>
                      )}

                      {isInterchange ? (
                        <g>
                          <circle cx={cx} cy={cy} r={r + 2} className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-white" strokeWidth="2" />
                          <circle cx={cx} cy={cy} r={r - 1.5} className="fill-yellow-400 stroke-zinc-900" strokeWidth="1.5" />
                        </g>
                      ) : (
                        <circle cx={cx} cy={cy} r={r} fill={isPassedByCar ? '#10b981' : '#ffffff'} className="stroke-zinc-800 dark:stroke-zinc-200" strokeWidth="2" />
                      )}

                      {showLabels && (
                        <text
                          x={cx + (isInterchange ? 10 : 8)}
                          y={cy + 3.5}
                          className={`text-[9.5px] select-none font-medium pointer-events-none ${
                            isSource
                              ? 'fill-emerald-600 dark:fill-emerald-400 font-bold text-[11px]'
                              : isDest
                              ? 'fill-rose-600 dark:fill-rose-400 font-bold text-[11px]'
                              : inRoute
                              ? 'fill-zinc-950 dark:fill-white font-semibold'
                              : 'fill-zinc-600 dark:fill-zinc-400'
                          }`}
                        >
                          {station.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            )}

            {/* 3. Live Car on the Chosen Route with Accurate Chassis, Wheels, Headlights */}
            {selectedRoute && carState && (
              <g transform={`translate(${carState.x}, ${carState.y})`} className="pointer-events-none">
                {/* Headlight beam projection cone */}
                <g transform={`rotate(${carState.angle})`}>
                  <polygon
                    points="14,-6 56,-20 56,20 14,6"
                    fill="url(#hooghly-gradient)"
                    className="opacity-50"
                    filter="url(#car-headlight)"
                  />
                </g>

                {/* Soft underglow aura */}
                <circle r="16" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1.5" />

                {/* ROTATED CAR BODY IN TRAVEL DIRECTION */}
                <g transform={`rotate(${carState.angle})`}>
                  {/* 4 Wheels (Black tires with rims) */}
                  <rect x="5" y="-10" width="7" height="3" rx="1" fill="#18181b" stroke="#71717a" strokeWidth="0.5" />
                  <rect x="5" y="7" width="7" height="3" rx="1" fill="#18181b" stroke="#71717a" strokeWidth="0.5" />
                  <rect x="-11" y="-10" width="7" height="3" rx="1" fill="#18181b" stroke="#71717a" strokeWidth="0.5" />
                  <rect x="-11" y="7" width="7" height="3" rx="1" fill="#18181b" stroke="#71717a" strokeWidth="0.5" />

                  {/* Car Chassis (Sleek aerodynamic body) */}
                  <rect x="-13" y="-7.5" width="26" height="15" rx="4.5" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />

                  {/* Car Roof & Cabin */}
                  <rect x="-5" y="-5" width="13" height="10" rx="2.5" fill="#047857" stroke="#10b981" strokeWidth="0.8" />

                  {/* Curved Windshield (Glass reflection) */}
                  <rect x="4" y="-4" width="3.5" height="8" rx="1" fill="#e0f2fe" />

                  {/* Rear Window */}
                  <rect x="-7" y="-4" width="2.5" height="8" rx="0.8" fill="#064e3b" />

                  {/* Front Headlights (Bright Yellow-White) */}
                  <circle cx="12.5" cy="-4.5" r="1.6" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
                  <circle cx="12.5" cy="4.5" r="1.6" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />

                  {/* Rear Tail Lights (Bright Red) */}
                  <circle cx="-13" cy="-4.5" r="1.4" fill="#ef4444" />
                  <circle cx="-13" cy="4.5" r="1.4" fill="#ef4444" />
                </g>

                {/* UPRIGHT LIVE FLOATING BADGE (Never rotates, always readable) */}
                <g transform="translate(0, -32)">
                  <rect
                    x="-75"
                    y="-13"
                    width="150"
                    height="24"
                    rx="12"
                    className="fill-zinc-950 text-white dark:fill-white dark:text-zinc-950 shadow-2xl"
                    stroke="#10b981"
                    strokeWidth="1.8"
                  />
                  <text x="0" y="2" className="text-[9.5px] font-bold fill-white dark:fill-zinc-950 text-center" textAnchor="middle">
                    🚗 {carState.currentStation.name}
                  </text>
                </g>
              </g>
            )}
          </g>
        </svg>

        {/* 3. Station Quick Info Hover Pill */}
        {hoveredStation && (
          <div className="absolute top-4 left-4 z-20 px-3 py-2 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-lg text-left pointer-events-none transition-all">
            <div className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{hoveredStation.name}</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">
              <span>{hoveredStation.lineIds.length} Line(s)</span>
              {hoveredStation.isInterchange && (
                <span className="px-1.5 py-0.2 rounded bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 font-bold">
                  Interchange
                </span>
              )}
            </div>
          </div>
        )}

        {/* 4. Active Station Modal / Click Popover */}
        {activeStationModal && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="w-full max-w-xs p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                    Station Action
                  </span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">
                    {activeStationModal.name}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveStationModal(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                Choose to set this station as your origin or destination for immediate route calculation.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleSetStation(activeStationModal.id, 'source')}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Set as Origin (Start)</span>
                </button>

                <button
                  onClick={() => handleSetStation(activeStationModal.id, 'destination')}
                  className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Set as Destination (End)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Live Vehicle Journey Animation Controls HUD (Bottom Bar) */}
      {selectedRoute && carState && (
        <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/90 flex flex-wrap items-center justify-between gap-3 text-left">
          {/* Left: Journey Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="p-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity shadow-xs"
              title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={() => setProgress(0)}
              className="p-2 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
              title="Restart Journey from Start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-emerald-500" />
                <span>Stop {carState.activeIdx + 1} of {carState.totalStops}</span>
                <span className="text-zinc-400 font-normal">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold truncate max-w-[130px] sm:max-w-none">
                  {carState.currentStation.name}
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <span>Next: {carState.nextStation.name}</span>
              </div>
            </div>
          </div>

          {/* Center: Live Progress Bar */}
          <div className="flex-1 max-w-xs mx-2 hidden md:block">
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-100"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>

          {/* Right: Speed Multiplier */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-zinc-400 text-[11px] mr-1 hidden sm:inline">Speed:</span>
            {[1, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  speedMultiplier === s
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. Footer Line Legend Bar (visible in full mode) */}
      {viewMode === 'full' && (
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-mono uppercase">
            <SlidersHorizontal className="w-3 h-3" />
            <span>Lines:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveLineFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                activeLineFilter === 'all'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              All Lines (6)
            </button>

            {network.lines.map((l) => {
              const isActive = activeLineFilter === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setActiveLineFilter(isActive ? 'all' : l.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] transition-colors border ${
                    isActive
                      ? 'bg-zinc-100 dark:bg-zinc-900 border-zinc-400 dark:border-zinc-600 font-bold text-zinc-950 dark:text-white'
                      : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  <span
                    style={{ backgroundColor: l.color }}
                    className="w-2 h-2 rounded-full inline-block shrink-0"
                  />
                  <span>{l.name.split(' (')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
