import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white shadow-2xl overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Subtle background circles */}
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-80 h-80 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rapid Urban Transit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Your Next Journey Starts Here
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
              Choose your metro network and find a convenient route to your destination across Delhi, Kolkata, and Chennai.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/delhi-metro"
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-blue-700 font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group hover:scale-105 active:scale-95"
            >
              <Navigation className="w-4 h-4 text-blue-600" />
              <span>Plan Your Journey</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

