import React from 'react';
import { motion } from 'framer-motion';
import {
  Map,
  Zap,
  Search,
  GitBranch,
  Moon,
  Smartphone,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: <Map className="w-6 h-6 text-blue-500" />,
    title: 'Interactive Metro Maps',
    description:
      'High-resolution vector & raster network maps with smooth pan, multi-level zoom, and reset controls designed for intricate metro lines.',
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    title: 'Quick Route Search',
    description:
      'Shortest path calculation powered by Breadth-First Search (BFS) graph traversal, minimizing both station hops and unnecessary platform transfers.',
  },
  {
    icon: <Search className="w-6 h-6 text-emerald-500" />,
    title: 'Station Selection',
    description:
      'Instant autocomplete station search with keyboard navigation, line indicators, and clear interchange identifiers.',
  },
  {
    icon: <GitBranch className="w-6 h-6 text-purple-500" />,
    title: 'Route Visualization',
    description:
      'Readable vertical journey timeline detailing boarding stations, intermediate stops, and prominent line transfer notices.',
  },
  {
    icon: <Moon className="w-6 h-6 text-indigo-500" />,
    title: 'Dark and Light Mode',
    description:
      'Seamless theme switching with persistent storage and system preference detection, engineered with zero contrast issues.',
  },
  {
    icon: <Smartphone className="w-6 h-6 text-rose-500" />,
    title: 'Responsive Mobile Experience',
    description:
      'Flawless touch controls, pinch-to-zoom support, and an ergonomic view toggle tailored for commuters on mobile and tablet screens.',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Everything You Need for a Smarter Journey
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Engineered with modern web standards, graph routing algorithms, and verified transit topology for Delhi, Kolkata, and Chennai.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 w-fit mb-5 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

