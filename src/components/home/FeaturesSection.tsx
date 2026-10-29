import React from 'react';
import { motion } from 'framer-motion';
import {
  Map,
  Zap,
  GitBranch
} from 'lucide-react';

const features = [
  {
    icon: <Map className="w-5 h-5 text-zinc-400" />,
    title: 'Interactive Metro Maps',
    description:
      'High-resolution vector & raster network maps with smooth pan, multi-level zoom, and reset controls.',
  },
  {
    icon: <Zap className="w-5 h-5 text-zinc-400" />,
    title: 'Quick Route Search',
    description:
      'Shortest path calculation powered by BFS graph traversal, minimizing both station hops and transfers.',
  },
  {
    icon: <GitBranch className="w-5 h-5 text-zinc-400" />,
    title: 'Route Visualization',
    description:
      'Readable vertical journey timeline detailing boarding stations, intermediate stops, and transfer notices.',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-6 sm:pt-8 pb-16 sm:pb-20 border-t border-zinc-200 dark:border-zinc-900 text-left">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900"
          >
            <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 w-fit mb-4 border border-zinc-200 dark:border-zinc-800">
              {feature.icon}
            </div>

            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1.5">
              {feature.title}
            </h3>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
