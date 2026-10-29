import React from 'react';
import { Link } from 'react-router-dom';
import { TrainTrack, Home, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xl backdrop-blur-xl">
        <div className="inline-flex p-4 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
          <TrainTrack className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            404
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            Station Not Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The page or metro route you are looking for has been moved or does not exist on this transit line.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all hover:gap-3"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

