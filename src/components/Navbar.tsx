import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, TrainFront } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { name: 'Delhi Metro', path: '/delhi-metro' },
  { name: 'Kolkata Metro', path: '/kolkata-metro' },
  { name: 'Chennai Metro', path: '/chennai-metro' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/70 dark:bg-black/75 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-900/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black transition-transform duration-200 group-hover:scale-105">
            <TrainFront className="w-4 h-4" />
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white">
            MetroMap
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`text-xs uppercase tracking-wider font-medium transition-colors ${
                  isActive
                    ? 'text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Right side: X icon, Theme toggle, and Text CTA with Arrow */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* X (Twitter) icon */}
          <a
            href="https://x.com/codewithdhruba"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on X"
            className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-4 h-4 fill-current"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Text CTA with arrow (Just like ClearBG "Remove background →") */}
          <Link
            to="/delhi-metro"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors group"
          >
            <span>Explore routes</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMobileMenu}
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black px-6 py-4"
          >
            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `text-sm font-medium py-1 ${
                    isActive ? 'text-zinc-950 dark:text-white font-bold' : 'text-zinc-500 dark:text-zinc-400'
                  }`
                }
              >
                Home Overview
              </NavLink>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `text-sm font-medium py-1 ${
                      isActive ? 'text-zinc-950 dark:text-white font-bold' : 'text-zinc-500 dark:text-zinc-400'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-900">
                <Link
                  to="/delhi-metro"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-zinc-900 dark:text-white py-1"
                >
                  <span>Explore routes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
