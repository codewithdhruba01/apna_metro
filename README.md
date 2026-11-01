# MetroMap — Premium Metro Route Finder & Interactive Network Map

**MetroMap** is a responsive, production-grade transit navigation web application built for modern urban commuters in India. Inspired by clean, glassmorphic AI applications like ClearBG, it combines a minimal UI, smooth animations, authentic metro line styling, and a verified graph-based route finder for **Delhi Metro (DMRC)**, **Kolkata Metro**, and **Chennai Metro (CMRL)**.

## Features

- **Multi-System Support**:
  - **Delhi Metro**: India's largest rapid transit network (Red, Yellow, Blue, Blue Branch, Violet, Pink, Magenta, and Airport Express lines) with major hubs like Rajiv Chowk, Kashmere Gate, Central Secretariat, Hauz Khas, and Mandi House.
  - **Kolkata Metro**: India's pioneer metro system featuring the historic Blue Line, the underwater Hooghly tunnel on the Green Line (Howrah Maidan to Sector V), Purple Line, Orange Line, Yellow Line, and Pink Line.
  - **Chennai Metro**: Corridor 1 (Blue Line) and Corridor 2 (Green Line) connecting Chennai Central, Egmore, CMBT Bus Terminus, and Chennai International Airport with key interchanges at Central and Alandur.
- **Shortest Path Route Finding**:
  - Real graph algorithm (Breadth-First Search / Dijkstra) calculating minimal station stops and minimal line transfers.
  - Automatic identification of interchange stations with platform change guidance (e.g., *"Change at Esplanade: Switch from Green Line to Blue Line"*).
  - Detailed journey timeline showing boarding stations, intermediate stops, de-boarding points, and total station-to-station hops.
  - Input validation: same-station error alert, unreachable station handling, and quick station swap.
- **Interactive Metro Map Viewer**:
  - Complete, uncropped maps with original aspect ratio preservation.
  - Mouse and touch-friendly pan & drag.
  - Multi-level zoom controls (`+`, `-`, reset view, zoom percentage readout).
  - Fullscreen viewing mode.
  - Support for high-res raster and SVG vector maps.
  - Loading states, spinners, and graceful error fallbacks.
- **Light & Dark Mode**:
  - Persistent theme switching saved to `localStorage`.
  - Automatic system preference detection on first visit (`prefers-color-scheme`).
  - Smooth animated toggle button with spring physics.
- **Responsive Layout**:
  - Desktop: Ergonomic two-column view (Interactive Map on the left, Route Planner & Results on the right).
  - Mobile: Clean stacked layout with an ergonomic view switcher (`All Views` | `Route Planner` | `Metro Map`).
  - Mobile hamburger slide-down navigation.

## Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)

## Project Architecture

```text
src/
├── components/
│   ├── home/
│   │   ├── Hero.tsx               # Animated hero with metro line canvas
│   │   ├── MetroCard.tsx          # City cards with live network metrics
│   │   ├── FeaturesSection.tsx    # 6 feature cards with icons
│   │   ├── HowItWorks.tsx         # 3-step timeline guide
│   │   └── FinalCTA.tsx           # Call-to-action banner
│   ├── MetroMapViewer.tsx         # Pan, zoom, reset, fullscreen viewer
│   ├── MetroRouteLayout.tsx       # Reusable layout for all metro pages
│   ├── Navbar.tsx                 # Responsive navbar with active pill & hamburger
│   ├── Footer.tsx                 # Project footer with verified data notices
│   ├── RoutePlanner.tsx           # Station selector, swap, & route triggers
│   ├── RouteResults.tsx           # Journey breakdown, interchanges, & timeline
│   ├── StationSelector.tsx        # Searchable autocomplete dropdown
│   ├── ThemeToggle.tsx            # Animated dark/light toggle button
│   └── ScrollToTop.tsx            # Scroll restoration helper
├── context/
│   └── ThemeContext.tsx           # Theme persistence & state
├── data/
│   ├── delhiMetro.ts              # Verified stations, lines & popular routes
│   ├── kolkataMetro.ts            # Kolkata verified station network
│   └── chennaiMetro.ts            # Chennai CMRL verified corridors
├── hooks/
│   └── useTheme.ts                # useTheme consumer hook
├── pages/
│   ├── HomePage.tsx               # Main landing page
│   ├── DelhiMetroPage.tsx         # /delhi-metro page
│   ├── KolkataMetroPage.tsx       # /kolkata-metro page
│   ├── ChennaiMetroPage.tsx       # /chennai-metro page
│   └── NotFoundPage.tsx           # 404 handler page
├── tests/
│   └── metroNavigation.test.ts    # Automated test suite for graph routing
├── types/
│   └── metro.ts                   # Strict TypeScript definitions
├── utils/
│   └── routeFinder.ts             # Graph BFS shortest-path calculation
├── App.tsx                        # Router setup & layout shell
├── index.css                      # Tailwind base & scrollbar styling
└── main.tsx                       # Root React entry point
```

## Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed:
```bash
node -v
npm -v
```

### 2. Installation
Install the project dependencies:
```bash
npm install
```

### 3. Start Development Server
Run Vite in development mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Automated Routing Tests
Execute the verification test suite:
```bash
npm run test:metro
```

### 5. Production Build
Compile TypeScript and generate optimized production assets:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

## Metro Map Assets

All map references are located in `public/assets/maps/`:
- `public/assets/maps/delhi-metro-map.jpg` (Official DMRC network map)
- `public/assets/maps/delhi-metro-map.svg` (Official vector map)
- `public/assets/maps/kolkata-metro-map.jpg` (Kolkata metro system map)
- `public/assets/maps/chennai-metro-map.jpg` (Chennai metro official map)

## Data Verification & Accuracy

- Station sequences, terminal connections, and interchange points are structured strictly from verified transit maps and official operator publications (DMRC, Metro Railway Kolkata, CMRL).
- Where transit times or live fare rates vary by ticketing mode or time of day, estimated times are not fabricated, adhering to verified topological data.

