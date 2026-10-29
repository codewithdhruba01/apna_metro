import React from 'react';
import { Link } from 'react-router-dom';
import { TrainFront } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black transition-colors duration-150 py-8 mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-zinc-900 text-white dark:bg-white dark:text-black">
            <TrainFront className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium text-sm tracking-tight text-zinc-900 dark:text-white">
            MetroMap
          </span>
        </Link>

        {/* Center: Clean links */}
        <div className="flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <Link to="/delhi-metro" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Delhi Metro
          </Link>
          <Link to="/kolkata-metro" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Kolkata Metro
          </Link>
          <Link to="/chennai-metro" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Chennai Metro
          </Link>
        </div>

        {/* Right: Made by @codewithdhruba (matching the screenshot) */}
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Made by{' '}
          <a
            href="https://x.com/codewithdhruba"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-600"
          >
            @codewithdhruba
          </a>
        </div>
      </div>
    </footer>
  );
};
