import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Navigation, ArrowRight } from 'lucide-react';

const steps = [
  {
    stepNumber: 'Step 01',
    title: 'Choose Your Metro',
    description: 'Select Delhi, Kolkata, or Chennai Metro network to open its high-resolution transit system map and station database.',
    icon: <MapPin className="w-5 h-5 text-blue-500" />,
    badgeColor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300',
  },
  {
    stepNumber: 'Step 02',
    title: 'Select Your Stations',
    description: 'Choose your starting station and destination station using instant autocomplete search with line color tags.',
    icon: <Search className="w-5 h-5 text-indigo-500" />,
    badgeColor: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-300',
  },
  {
    stepNumber: 'Step 03',
    title: 'Explore Your Route',
    description: 'View the suggested route, station sequence, and interchange stations when applicable with clear platform switch notices.',
    icon: <Navigation className="w-5 h-5 text-emerald-500" />,
    badgeColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Intuitive Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Plan Your Journey in Three Simple Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            From discovering line connections to boarding your train, experience hassle-free urban navigation.
          </p>
        </div>

        {/* 3 Step Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="relative p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${step.badgeColor}`}>
                    {step.stepNumber}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connecting arrow indicator for first two cards on desktop */}
              {idx < 2 && (
                <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-slate-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

